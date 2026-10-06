import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";
import { createApp } from "../src/server/app.ts";
import { loadConfig } from "../src/server/config.ts";
import { validateChatRequest, ValidationError } from "../src/server/validate.ts";
import { fakeClaude } from "./fake-claude.ts";

const staticDir = path.resolve("public");
const quiet = () => {};

function start(env: Record<string, string>, withCoach = true) {
  const fake = fakeClaude([{ stop_reason: "end_turn", content: [{ type: "text", text: "Hallo!\n>> a | b | c" }] }]);
  const app = createApp({ config: loadConfig(env), stream: withCoach ? fake.stream : null, staticDir, log: quiet });
  const server = app.listen(0);
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  return { server, base, fake };
}

const chat = (base: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(`${base}/api/chat`, { method: "POST", headers: { "Content-Type": "application/json", "X-Device-Id": "test-device-1", ...headers }, body: JSON.stringify(body) });

let s: ReturnType<typeof start>;
before(() => { s = start({ DAILY_LIMIT_PER_DEVICE: "2" }); });
after(() => { s.server.close(); });

test("Chat streamt Ereignisse als Server-Sent Events", async () => {
  const res = await chat(s.base, { history: [], message: "Hi" });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /text\/event-stream/);
  const events = (await res.text()).split("\n\n").filter(Boolean).map(c => JSON.parse(c.replace(/^data: /, "")));
  assert.deepEqual(events.map(e => e.type).filter(t => t !== "text"), ["turn", "turn", "done"]);
  assert.equal(events.at(-1).remaining, 1);
});

test("Tageslimit pro Gerät", async () => {
  await chat(s.base, { history: [], message: "zwei" });
  const res = await chat(s.base, { history: [], message: "drei" });
  assert.equal(res.status, 429);
  assert.equal((await res.json()).code, "limit");
  // Anderes Gerät darf weiter fragen
  assert.equal((await chat(s.base, { history: [], message: "x" }, { "X-Device-Id": "anderes-geraet" })).status, 200);
});

test("Ungültige Anfrage wird mit Erklärung abgelehnt", async () => {
  const res = await chat(s.base, { history: [{ role: "assistant", content: [{ type: "server_tool_use" }] }], message: "x" }, { "X-Device-Id": "geraet-ungueltig" });
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, "invalid");
});

test("Ohne API-Schlüssel antwortet der Coach mit 503, die App läuft trotzdem", async () => {
  const t = start({}, false);
  try {
    assert.equal((await chat(t.base, { history: [], message: "Hi" })).status, 503);
    const status = await (await fetch(`${t.base}/api/status`)).json();
    assert.equal(status.coach, false);
    const page = await fetch(`${t.base}/`);
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-security-policy") ?? "", /default-src 'self'/);
    assert.equal((await fetch(`${t.base}/impressum`)).status, 200);
  } finally { t.server.close(); }
});

test("Zugangscode für eine geschlossene Testphase", async () => {
  const t = start({ ACCESS_CODES: "geheim, beta2" });
  try {
    assert.equal((await chat(t.base, { history: [], message: "Hi" })).status, 401);
    assert.equal((await chat(t.base, { history: [], message: "Hi" }, { "X-Access-Code": "beta2" })).status, 200);
    const status = await (await fetch(`${t.base}/api/status`, { headers: { "X-Access-Code": "falsch" } })).json();
    assert.deepEqual([status.accessRequired, status.accessOk], [true, false]);
  } finally { t.server.close(); }
});

test("Validierung: Grenzen für Verlauf, Bilder und Gesprächslänge", () => {
  const img = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: "AAAA" } };
  const userWithImg = { role: "user", content: [{ type: "text", text: "a" }, img] };
  const bot = { role: "assistant", content: [{ type: "text", text: "b" }] };
  assert.throws(() => validateChatRequest({ history: [], message: "" }, 30), ValidationError);
  assert.throws(() => validateChatRequest({ history: [], message: "x".repeat(4001) }, 30), ValidationError);
  assert.throws(() => validateChatRequest({ history: [bot], message: "x" }, 30), /beginnen/);
  assert.throws(() => validateChatRequest({ history: Array(5).fill(0).flatMap(() => [userWithImg, bot]), message: "x" }, 30), /Bilder/);
  assert.throws(() => validateChatRequest({ history: Array(3).fill(0).flatMap(() => [{ role: "user", content: "a" }, bot]), message: "x" }, 3), /neues Gespräch/);
  assert.throws(() => validateChatRequest({ history: [], message: "x", image: { mediaType: "image/gif", data: "AAAA" } }, 30), /JPEG/);
  const ok = validateChatRequest({ history: [userWithImg, bot], message: " Hallo ", mode: "quick", profile: { alter: 30, x: { y: 1 } } }, 30);
  assert.equal(ok.message, "Hallo");
  assert.equal(ok.mode, "quick");
  assert.deepEqual(ok.profile, { alter: "30" });
});
