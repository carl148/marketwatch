import type Anthropic from "@anthropic-ai/sdk";
import type { CoachStream, StreamFn } from "../src/server/coach.ts";

// Attrappe für die Claude-API: spielt vorbereitete Antworten ab und merkt sich die Anfragen.

type Block = Record<string, unknown> & { type: string };
export interface Scripted { content: Block[]; stop_reason: string }

export function fakeClaude(script: Scripted[]) {
  const calls: Parameters<StreamFn>[0][] = [];
  let i = 0;
  const stream: StreamFn = (params, _opts) => {
    calls.push(structuredClone(params));
    const step = script[Math.min(i++, script.length - 1)];
    const events: Record<string, unknown>[] = [];
    step.content.forEach((b, index) => {
      if (b.type === "text") {
        events.push({ type: "content_block_start", index, content_block: { type: "text", text: "" } });
        for (const part of String(b.text).match(/.{1,12}/gs) ?? []) events.push({ type: "content_block_delta", index, delta: { type: "text_delta", text: part } });
      } else {
        events.push({ type: "content_block_start", index, content_block: b });
      }
      events.push({ type: "content_block_stop", index });
    });
    const message = {
      id: `msg_${i}`, type: "message", role: "assistant", model: params.model, content: step.content,
      stop_reason: step.stop_reason, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 5 },
    };
    const s: CoachStream = {
      async *[Symbol.asyncIterator]() { for (const e of events) yield e as unknown as Anthropic.Beta.BetaRawMessageStreamEvent; },
      finalMessage: async () => message as unknown as Anthropic.Beta.BetaMessage,
    };
    return s;
  };
  return { stream, calls };
}
