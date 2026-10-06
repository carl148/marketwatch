import assert from "node:assert/strict";
import { test } from "node:test";
import { buildParams, runCoach } from "../src/server/coach.ts";
import { SYSTEM_PROMPT } from "../src/server/prompt.ts";
import type { ApiMessage, ChatEvent, ChatRequest } from "../src/shared/protocol.ts";
import { fakeClaude } from "./fake-claude.ts";

const NOW = new Date("2026-10-06T10:00:00Z");
const req = (over: Partial<ChatRequest> = {}): ChatRequest => ({ history: [], message: "Was wird aus 150 € im Monat?", mode: "deep", ...over });

async function collect(stream: Parameters<typeof runCoach>[0]["stream"], r: ChatRequest, model = "claude-opus-5-5") {
  const events: ChatEvent[] = [];
  await runCoach({ stream, model, req: r, emit: e => events.push(e), signal: new AbortController().signal, now: NOW });
  return events;
}

test("Werkzeugaufruf: rechnet, meldet Züge in gültiger Reihenfolge und antwortet", async () => {
  const fake = fakeClaude([
    { stop_reason: "tool_use", content: [
      { type: "thinking", thinking: "", signature: "sig1" },
      { type: "tool_use", id: "tu_1", name: "sparplan_rechnen", input: { monatsrate: 150, rendite_prozent: 7, jahre: 30, kosten_prozent: 0.2 } },
    ] },
    { stop_reason: "end_turn", content: [{ type: "text", text: "Nach 30 Jahren hast du rund 169.000 €.\n>> Und mit 200 €? | Was kostet die TER? | Wie sicher ist das?" }] },
  ]);
  const events = await collect(fake.stream, req({ profile: { alter: "25", unbekannt: "x" } }));
  const turns = events.filter(e => e.type === "turn").map(e => (e as { message: ApiMessage }).message);

  assert.deepEqual(turns.map(t => t.role), ["user", "assistant", "user", "assistant"]);
  // Kontextblock mit Profil, unbekannte Felder werden ignoriert
  const ctx = (turns[0].content as unknown as { text: string }[])[0].text;
  assert.match(ctx, /<kontext>/);
  assert.match(ctx, /Alter: 25/);
  assert.doesNotMatch(ctx, /unbekannt/);
  // Werkzeugergebnis gehört zur Werkzeug-ID und enthält den echten Endwert
  const result = (turns[2].content as Record<string, unknown>[])[0];
  assert.equal(result.type, "tool_result");
  assert.equal(result.tool_use_id, "tu_1");
  assert.equal(JSON.parse(String(result.content)).endwert, 169084);
  // Denk-Block wird unverändert weitergegeben
  assert.deepEqual((turns[1].content as Record<string, unknown>[])[0], { type: "thinking", thinking: "", signature: "sig1" });
  assert.ok(events.some(e => e.type === "status" && e.text === "Rechnet den Sparplan"));
  assert.equal(events.filter(e => e.type === "text").map(e => (e as { delta: string }).delta).join(""), "Nach 30 Jahren hast du rund 169.000 €.\n>> Und mit 200 €? | Was kostet die TER? | Wie sicher ist das?");

  // Zweite Anfrage enthält den ersten Zug unverändert (nur angehängt)
  assert.equal(fake.calls.length, 2);
  assert.deepEqual(fake.calls[1].messages.slice(0, 1), fake.calls[0].messages);
  assert.equal(fake.calls[1].messages.length, 3);
});

test("Anfrage-Parameter für Claude Opus 5.5", () => {
  const p = buildParams("claude-opus-5-5", "quick", []);
  assert.equal(p.system, SYSTEM_PROMPT);
  assert.deepEqual(p.thinking, { type: "adaptive", block_binding: { prefix_mismatch_behavior: "drop_block" } });
  assert.deepEqual(p.output_config, { effort: "low" });
  assert.equal(p.fallbacks, "default");
  assert.deepEqual(p.betas, ["thinking-binding-controls-2026-08-01", "server-side-fallback-2026-07-01"]);
  assert.deepEqual(p.cache_control, { type: "ephemeral" });
  assert.equal(buildParams("claude-opus-5-5", "deep", []).output_config?.effort, "medium");
  // Werkzeuge streamen ihre Eingaben
  assert.ok(p.tools?.every(t => (t as { eager_input_streaming?: boolean }).eager_input_streaming === true));
});

test("Haiku bekommt keine Funktionen, die es nicht unterstützt", () => {
  const p = buildParams("claude-haiku-4-5", "deep", []);
  assert.equal(p.thinking, undefined);
  assert.equal(p.output_config, undefined);
  assert.equal(p.fallbacks, undefined);
  assert.equal(p.betas, undefined);
});

test("Systemanweisung ist unabhängig von Datum und Profil", () => {
  assert.doesNotMatch(SYSTEM_PROMPT, /\d{1,2}\.\d{1,2}\.\d{4}/);
});

test("Ablehnung: kein Assistenten-Zug, aber eine Fehlermeldung", async () => {
  const fake = fakeClaude([{ stop_reason: "refusal", content: [{ type: "text", text: "Ich" }] }]);
  const events = await collect(fake.stream, req());
  assert.equal(events.filter(e => e.type === "turn").length, 1);
  assert.ok(events.some(e => e.type === "error" && e.code === "refusal"));
});

test("Abgeschnittene Werkzeug-Eingabe wird nicht ausgeführt", async () => {
  const fake = fakeClaude([{ stop_reason: "max_tokens", content: [{ type: "tool_use", id: "tu_x", name: "quiz_zeigen", input: { thema: "x" } }] }]);
  const events = await collect(fake.stream, req());
  assert.equal(events.filter(e => e.type === "turn").length, 1);
  assert.ok(events.some(e => e.type === "error" && e.code === "truncated"));
});

test("Ungültiges Quiz wird als Fehler an das Modell zurückgemeldet", async () => {
  const fake = fakeClaude([
    { stop_reason: "tool_use", content: [{ type: "tool_use", id: "tu_q", name: "quiz_zeigen", input: { thema: "x", fragen: [{ frage: "f", antworten: ["a"], richtig: 3 }] } }] },
    { stop_reason: "end_turn", content: [{ type: "text", text: "ok" }] },
  ]);
  const events = await collect(fake.stream, req());
  const toolTurn = events.filter(e => e.type === "turn").map(e => (e as { message: ApiMessage }).message)[2];
  assert.equal((toolTurn.content as Record<string, unknown>[])[0].is_error, true);
});

test("Endlosschleife wird nach einigen Runden beendet", async () => {
  const fake = fakeClaude([{ stop_reason: "tool_use", content: [{ type: "tool_use", id: "tu_l", name: "inflation_rechnen", input: { betrag: 100, jahre: 5 } }] }]);
  const events = await collect(fake.stream, req());
  assert.ok(events.some(e => e.type === "error" && e.code === "rounds"));
  assert.equal(fake.calls.length, 6);
});

test("Bild wird als base64-Block vor die Frage gestellt", async () => {
  const fake = fakeClaude([{ stop_reason: "end_turn", content: [{ type: "text", text: "Das ist eine Gehaltsabrechnung." }] }]);
  const events = await collect(fake.stream, req({ message: "", image: { mediaType: "image/jpeg", data: "AAAA" } }));
  const user = (events[0] as { message: ApiMessage }).message.content as Record<string, unknown>[];
  assert.deepEqual(user.map(b => b.type), ["text", "image", "text"]);
  assert.match(String(user[2].text), /Bild/);
});
