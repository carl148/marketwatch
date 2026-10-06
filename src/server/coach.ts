import Anthropic from "@anthropic-ai/sdk";
import type { ApiBlock, ApiMessage, ChatEvent, ChatRequest, CoachToolName } from "../shared/protocol.ts";
import { modelFeatures } from "./config.ts";
import { SYSTEM_PROMPT, contextBlock } from "./prompt.ts";
import { TOOLS, TOOL_STATUS, runTool } from "./tools.ts";

type Params = Parameters<Anthropic["beta"]["messages"]["stream"]>[0];
type Message = Anthropic.Beta.BetaMessage;
type StreamEvent = Anthropic.Beta.BetaRawMessageStreamEvent;

/** Das, was der Coach vom SDK braucht. In Tests wird es durch eine Attrappe ersetzt. */
export interface CoachStream extends AsyncIterable<StreamEvent> { finalMessage(): Promise<Message> }
export type StreamFn = (params: Params, opts: { signal: AbortSignal }) => CoachStream;

export function anthropicStream(client: Anthropic): StreamFn {
  return (params, opts) => client.beta.messages.stream(params, { signal: opts.signal });
}

const MAX_ROUNDS = 6;
const MAX_TOKENS = 16000;

export function buildParams(model: string, mode: ChatRequest["mode"], messages: ApiMessage[]): Params {
  const f = modelFeatures(model);
  const betas: Anthropic.Beta.AnthropicBeta[] = [];
  const params: Params = {
    model,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    // Der Verlauf kommt unverändert aus der App zurück (siehe validate.ts).
    messages: messages as Anthropic.Beta.BetaMessageParam[],
    cache_control: { type: "ephemeral" },
  };
  if (f.adaptive) {
    params.thinking = { type: "adaptive" };
    if (f.blockBinding) {
      // Falls ein Verlauf doch einmal abweicht, verwirft die API die alten
      // Denk-Blöcke, statt die Anfrage abzulehnen.
      params.thinking.block_binding = { prefix_mismatch_behavior: "drop_block" };
      betas.push("thinking-binding-controls-2026-08-01");
    }
  }
  if (f.effort) params.output_config = { effort: mode === "quick" ? "low" : "medium" };
  if (f.fallbacks) {
    // Lehnt das Modell eine harmlose Anfrage aus Sicherheitsgründen ab,
    // beantwortet die API sie automatisch mit einem passenden anderen Modell.
    params.fallbacks = "default";
    betas.push("server-side-fallback-2026-07-01");
  }
  if (betas.length) params.betas = betas;
  return params;
}

export function buildUserTurn(req: ChatRequest, now: Date): ApiMessage {
  const content: ApiBlock[] = [{ type: "text", text: contextBlock(req.profile, now) }];
  if (req.image) content.push({ type: "image", source: { type: "base64", media_type: req.image.mediaType, data: req.image.data } });
  content.push({ type: "text", text: req.message || "Erklär mir bitte, was auf diesem Bild zu sehen ist und worauf ich achten sollte." });
  return { role: "user", content };
}

export interface CoachRun {
  stream: StreamFn;
  model: string;
  req: ChatRequest;
  emit: (e: ChatEvent) => void;
  signal: AbortSignal;
  now?: Date;
  log?: (entry: Record<string, unknown>) => void;
}

/**
 * Führt eine Coach-Antwort aus: streamt Text, führt Rechner-Werkzeuge aus und
 * meldet jede fertige Nachricht als "turn", damit die App ihren Verlauf
 * unverändert fortschreiben kann. Ein Assistenten-Zug mit Werkzeugaufrufen wird
 * nur zusammen mit den Ergebnissen gemeldet, damit der Verlauf immer gültig bleibt.
 */
export async function runCoach(run: CoachRun): Promise<void> {
  const { stream, model, req, emit, signal } = run;
  const userTurn = buildUserTurn(req, run.now ?? new Date());
  const messages: ApiMessage[] = [...req.history, userTurn];
  emit({ type: "turn", message: userTurn });

  let jsonRetries = 0;
  for (let round = 0; round < MAX_ROUNDS; round++) {
    const s = stream(buildParams(model, req.mode, messages), { signal });
    let message: Message;
    try {
      for await (const ev of s) {
        if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") emit({ type: "text", delta: ev.delta.text });
        else if (ev.type === "content_block_start" && ev.content_block.type === "tool_use") {
          const status = TOOL_STATUS[ev.content_block.name as CoachToolName];
          if (status) emit({ type: "status", text: status });
        }
      }
      message = await s.finalMessage();
      jsonRetries = 0;
    } catch (err) {
      // Mit eager_input_streaming kann eine Werkzeug-Eingabe unlesbar sein. Nur
      // dieser Fall wird einmal wiederholt; API-Fehler gehen an den Aufrufer.
      if (err instanceof Anthropic.APIError || signal.aborted || jsonRetries++ >= 1) throw err;
      round--;
      continue;
    }

    run.log?.({ model: message.model, stop: message.stop_reason, usage: message.usage });

    if (message.stop_reason === "refusal") {
      emit({ type: "error", code: "refusal", message: "Darauf kann der Coach nicht antworten. Formuliere die Frage bitte anders." });
      return;
    }

    const assistant: ApiMessage = { role: "assistant", content: message.content as unknown as ApiBlock[] };
    const toolUses = message.content.filter((b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use");

    if (!toolUses.length) {
      messages.push(assistant);
      emit({ type: "turn", message: assistant });
      if (message.stop_reason === "max_tokens") emit({ type: "error", code: "truncated", message: "Die Antwort wurde gekürzt. Frag nach dem Rest, wenn du mehr wissen willst." });
      return;
    }
    if (message.stop_reason === "max_tokens") {
      // Abgeschnittene Werkzeug-Eingaben nie ausführen.
      emit({ type: "error", code: "truncated", message: "Die Antwort war zu lang. Stell die Frage bitte etwas enger." });
      return;
    }

    const results: ApiBlock[] = toolUses.map(t => {
      const out = runTool(t.name, t.input);
      return { type: "tool_result", tool_use_id: t.id, content: out.content, ...(out.isError ? { is_error: true } : {}) };
    });
    const toolTurn: ApiMessage = { role: "user", content: results };
    messages.push(assistant, toolTurn);
    emit({ type: "turn", message: assistant });
    emit({ type: "turn", message: toolTurn });
  }
  emit({ type: "error", code: "rounds", message: "Der Coach hat zu viele Rechenschritte gebraucht. Stell die Frage bitte etwas einfacher." });
}

/** Übersetzt Fehler in Meldungen für die App, ohne interne Details preiszugeben. */
export function describeError(err: unknown): { code: string; message: string; status: number } {
  if (err instanceof Anthropic.RateLimitError) return { code: "busy", status: 503, message: "Der Coach ist gerade stark ausgelastet. Versuch es in einer Minute noch einmal." };
  if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) return { code: "config", status: 503, message: "Der Coach ist auf dem Server nicht richtig eingerichtet." };
  if (err instanceof Anthropic.BadRequestError) return { code: "bad_request", status: 400, message: "Diese Anfrage konnte nicht verarbeitet werden. Starte bitte ein neues Gespräch." };
  if (err instanceof Anthropic.APIConnectionError) return { code: "network", status: 502, message: "Der Coach ist gerade nicht erreichbar. Versuch es gleich noch einmal." };
  if (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500) return { code: "upstream", status: 502, message: "Beim Coach ist ein Fehler aufgetreten. Versuch es gleich noch einmal." };
  return { code: "internal", status: 500, message: "Beim Coach ist ein Fehler aufgetreten. Versuch es gleich noch einmal." };
}
