import { num, sanitizeQuiz } from "../shared/calc.ts";
import { CONTEXT_TAG, type ApiBlock, type ApiMessage, type ChatEvent, type ChatRequest } from "../shared/protocol.ts";
import { CARD_LABEL, quizCard, toolCard } from "./cards.ts";
import { redrawCharts } from "./chart.ts";
import { addXp, store, unlock } from "./store.ts";
import { $, $$, esc, md, splitFollowups, toast } from "./ui.ts";

// Coach-Tab: Chat mit Claude über den eigenen Server.

interface Status { coach: boolean; accessRequired: boolean; accessOk: boolean; remaining: number | null; dailyLimit: number | null }

let status: Status | null = null;
let busy = false;
let live = "";
let liveStatus = "";
let lastError = "";
let ctl: AbortController | null = null;
let attached: { mediaType: "image/jpeg"; data: string; url: string } | null = null;
let root: HTMLElement | null = null;
let onStats = () => {};

export function initCoach(stats: () => void) { onStats = stats; void refreshStatus(); }

async function refreshStatus() {
  try {
    const r = await fetch("/api/status", { headers: headers() });
    status = await r.json();
  } catch { status = null; }
  if (root?.isConnected) renderStatusLine();
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { "X-Device-Id": store.deviceId() };
  if (store.settings.accessCode) h["X-Access-Code"] = store.settings.accessCode;
  return h;
}

const PROFILE_FIELDS: [string, string, string][] = [
  ["alter", "Alter", "number"], ["status", "Situation", "select"], ["netto", "Netto / Monat (€)", "number"], ["ausgaben", "Ausgaben / Monat (€)", "number"],
  ["ruecklagen", "Rücklagen (€)", "number"], ["investiert", "Investiert (€)", "number"], ["schulden", "Schulden (€)", "number"], ["wissen", "Wissensstand", "select"],
];
const OPTIONS: Record<string, string[]> = {
  status: ["Schule", "Ausbildung", "Studium", "Angestellt", "Selbstständig", "Beamtet", "Rente"],
  wissen: ["Einsteiger", "Grundlagen", "Fortgeschritten"],
};

const STARTERS: [string, string][] = [
  ["Verstehen", "Wie funktioniert ein ETF-Sparplan, und worauf achte ich bei der Auswahl?"],
  ["Rechnen", "Was wird aus 150 € im Monat, wenn ich 30 Jahre lang investiere?"],
  ["Rechnen", "Ich habe 2.400 € Dispo-Schulden. Lohnt sich ein Ratenkredit zur Ablösung?"],
  ["Steuern", "Wie viel Steuer zahle ich auf 1.800 € ETF-Erträge im Jahr?"],
  ["Üben", "Quiz mich zum Thema Inflation und Zinseszins."],
  ["Prüfen", "Mir verspricht jemand auf Instagram 3 % Rendite pro Woche mit Krypto. Seriös?"],
];

export function renderCoach(m: HTMLElement, prefill?: string) {
  root = m;
  const p = store.profile;
  m.innerHTML = `
  <div class="coach">
    <aside class="profile-panel">
      <details id="profileBox" ${window.matchMedia("(min-width: 900px)").matches ? "open" : ""}>
        <summary><span class="eyebrow">Dein Profil</span><span class="muted small">freiwillig</span></summary>
        <form id="profile" class="profile" autocomplete="off">
          <p class="hint">Je mehr der Coach weiß, desto genauer passen seine Beispiele. Die Angaben bleiben auf deinem Gerät und werden nur mit deinen Fragen gesendet.</p>
          <div class="row2">${PROFILE_FIELDS.map(([k, label, type]) => `<div class="field"><label for="p-${k}">${label}</label>${type === "select"
            ? `<select id="p-${k}" name="${k}"><option value="">–</option>${OPTIONS[k].map(o => `<option ${p[k] === o ? "selected" : ""}>${o}</option>`).join("")}</select>`
            : `<input id="p-${k}" name="${k}" type="number" min="0" inputmode="decimal" value="${esc(p[k] ?? "")}">`}</div>`).join("")}</div>
          <div class="field"><label for="p-ziele">Deine Ziele</label><textarea id="p-ziele" name="ziele" rows="2" placeholder="z. B. Notgroschen aufbauen, in 5 Jahren Eigenkapital für eine Wohnung">${esc(p.ziele ?? "")}</textarea></div>
          <div class="health" id="health"></div>
          <div class="row-actions"><button type="button" class="btn" id="checkBtn">Mit Faustregeln vergleichen</button><button type="button" class="linkbtn" id="clearProfile">Profil leeren</button></div>
        </form>
      </details>
    </aside>
    <section class="chat">
      <div class="chat-bar">
        <div class="seg" role="group" aria-label="Antworttiefe">
          <button data-mode="deep" aria-pressed="${store.settings.mode === "deep"}">Gründlich</button>
          <button data-mode="quick" aria-pressed="${store.settings.mode === "quick"}">Schnell</button>
        </div>
        <span class="muted small" id="statusLine"></span>
        <button class="btn ghost small" id="newChat">Neues Gespräch</button>
      </div>
      <div class="thread" id="thread" aria-live="polite"></div>
      <form class="composer" id="composer">
        <div class="access" id="accessBox" hidden>
          <label for="accessCode">Zugangscode für die Testphase</label>
          <div class="row-actions"><input id="accessCode" type="text" autocomplete="off" value="${esc(store.settings.accessCode)}"><button type="button" class="btn small" id="saveCode">Speichern</button></div>
        </div>
        <div class="attach-preview" id="attachPreview" hidden></div>
        <div class="box">
          <button type="button" class="icon-btn" id="attachBtn" aria-label="Foto oder Dokument anhängen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.5l-8.5 8.5a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.3-8.3"/></svg></button>
          <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp" hidden>
          <textarea id="input" rows="1" placeholder="Frag mich alles rund ums Geld …" aria-label="Deine Frage">${esc(prefill ?? "")}</textarea>
          <button type="submit" class="icon-btn send" id="sendBtn" aria-label="Senden"></button>
        </div>
        <p class="foot">KI-Antworten können Fehler enthalten. Prüfe wichtige Angaben, bevor du danach handelst.</p>
      </form>
    </section>
  </div>`;

  $("#profile", m).addEventListener("input", e => {
    const t = e.target as HTMLInputElement;
    if (!t.name) return;
    store.profile[t.name] = t.value;
    store.saveProfile();
    renderHealth();
  });
  $("#clearProfile", m).addEventListener("click", () => { store.profile = {}; store.saveProfile(); renderCoach(m); toast("Profil geleert"); });
  $("#checkBtn", m).addEventListener("click", () => {
    if (!Object.values(store.profile).some(x => String(x).trim())) { toast("Füll zuerst ein paar Felder in deinem Profil aus."); return; }
    send("Vergleiche mein Profil bitte mit den gängigen Faustregeln für Notgroschen, Sparquote und Schulden. Erkläre, was diese Regeln allgemein bedeuten und welche Themen ich mir als Nächstes anschauen könnte, um mehr zu lernen. Rechne, wo es hilft.");
  });
  $$("[data-mode]", m).forEach(b => b.addEventListener("click", () => {
    store.settings.mode = b.dataset.mode as "deep" | "quick";
    store.saveSettings();
    $$("[data-mode]", m).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  }));
  $("#newChat", m).addEventListener("click", () => {
    ctl?.abort();
    store.convo = { history: [], quiz: {} };
    store.saveConvo();
    lastError = "";
    renderThread();
    $("#input", m).focus();
  });
  $("#saveCode", m).addEventListener("click", () => {
    store.settings.accessCode = ($("#accessCode", m) as HTMLInputElement).value.trim();
    store.saveSettings();
    void refreshStatus();
    toast("Zugangscode gespeichert");
  });

  const input = $("#input", m) as HTMLTextAreaElement;
  const grow = () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 160) + "px"; };
  input.addEventListener("input", grow);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); } });
  $("#composer", m).addEventListener("submit", e => { e.preventDefault(); if (busy) ctl?.abort(); else send(input.value); });
  $("#attachBtn", m).addEventListener("click", () => $("#fileInput", m).click());
  $("#fileInput", m).addEventListener("change", e => void attach(e.target as HTMLInputElement));

  renderHealth();
  renderStatusLine();
  renderThread();
  if (prefill) { grow(); input.focus(); }
}

function renderHealth() {
  const box = root && $("#health", root);
  if (!box) return;
  const p = store.profile;
  const net = num(p.netto), aus = num(p.ausgaben), rue = num(p.ruecklagen);
  if (net === null || aus === null) { box.innerHTML = `<p class="hint">Trag Netto und Ausgaben ein, dann siehst du hier deine Sparquote und deinen Notgroschen.</p>`; return; }
  const rate = net > 0 ? ((net - aus) / net) * 100 : 0;
  const months = aus > 0 && rue !== null ? rue / aus : null;
  const meter = (label: string, val: string, frac: number, cls: string) =>
    `<div class="meter"><span>${label}</span><b class="num">${val}</b><div class="bar"><i class="${cls}" style="width:${Math.max(0, Math.min(100, frac * 100))}%"></i></div></div>`;
  box.innerHTML = meter("Sparquote", `${Math.round(rate)} %`, rate / 20, rate >= 20 ? "ok" : rate >= 10 ? "mid" : "low")
    + (months !== null ? meter("Notgroschen", `${months.toLocaleString("de-DE", { maximumFractionDigits: 1 })} Mon.`, months / 6, months >= 3 ? "ok" : months >= 1 ? "mid" : "low") : "")
    + `<p class="hint">Richtwerte: 20 % Sparquote, 3 bis 6 Monatsausgaben als Notgroschen.</p>`;
}

function renderStatusLine() {
  if (!root?.isConnected) return;
  const line = $("#statusLine", root);
  const access = $("#accessBox", root);
  if (!status) { line.textContent = ""; return; }
  access.hidden = !(status.accessRequired && !status.accessOk);
  if (!status.coach) line.textContent = "Coach auf diesem Server nicht eingerichtet";
  else if (status.remaining !== null) line.textContent = `Heute noch ${status.remaining} Fragen`;
  else line.textContent = "";
}

// ---- Verlauf anzeigen ----

type Piece = { kind: "text"; text: string } | { kind: "tool"; name: string; id: string; input: Record<string, unknown> };
interface Group { role: "user" | "ai"; text?: string; image?: string; pieces: Piece[] }

function groups(history: ApiMessage[]): Group[] {
  const out: Group[] = [];
  for (const msg of history) {
    const blocks: ApiBlock[] = typeof msg.content === "string" ? [{ type: "text", text: msg.content }] : msg.content;
    if (msg.role === "user") {
      if (blocks.every(b => b.type === "tool_result")) continue;
      const texts = blocks.filter(b => b.type === "text" && !String(b.text).startsWith(`<${CONTEXT_TAG}>`));
      const img = blocks.find(b => b.type === "image") as { source?: { media_type?: string; data?: string } } | undefined;
      out.push({ role: "user", text: texts.map(b => String(b.text)).join("\n"), image: img?.source?.data ? `data:${img.source.media_type};base64,${img.source.data}` : undefined, pieces: [] });
      continue;
    }
    let g = out[out.length - 1];
    if (!g || g.role !== "ai") { g = { role: "ai", pieces: [] }; out.push(g); }
    for (const b of blocks) {
      if (b.type === "text" && String(b.text).trim()) g.pieces.push({ kind: "text", text: String(b.text) });
      else if (b.type === "tool_use") g.pieces.push({ kind: "tool", name: String(b.name), id: String(b.id), input: (b.input ?? {}) as Record<string, unknown> });
    }
  }
  return out;
}

function renderThread() {
  if (!root?.isConnected) return;
  const th = $("#thread", root);
  const send_ = $("#sendBtn", root);
  send_.setAttribute("aria-label", busy ? "Antwort stoppen" : "Senden");
  send_.innerHTML = busy
    ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  const gs = groups(store.convo.history);
  const notice = `<p class="ai-notice">Du schreibst mit einer KI (Claude von Anthropic). Sie erklärt allgemeines Finanzwissen und gibt keine persönliche Anlage-, Steuer- oder Rechtsberatung.</p>`;
  if (!gs.length && !busy) {
    th.innerHTML = notice + `<div class="welcome">
      <div><span class="eyebrow">Groschen Coach</span><h2>Frag mich alles rund ums Geld.</h2>
      <p class="muted">Ich erkläre, rechne mit echten Zahlen, prüfe dein Wissen mit Quizfragen und lese auf Wunsch eine Gehaltsabrechnung oder einen Vertrag mit dir durch.</p></div>
      <div class="starters">${STARTERS.map(([k, q]) => `<button class="starter" data-ask="${esc(q)}"><span class="eyebrow accent">${k}</span><span>${esc(q)}</span></button>`).join("")}</div>
      ${lastError ? `<div class="bubble err">${esc(lastError)}</div>` : ""}
    </div>`;
  } else {
    if (busy && (!gs.length || gs[gs.length - 1].role !== "ai")) gs.push({ role: "ai", pieces: [] });
    th.innerHTML = notice + gs.map((g, gi) => {
      if (g.role === "user") return `<div class="msg me">${g.image ? `<img class="thumb" src="${g.image}" alt="Angehängtes Bild">` : ""}${g.text ? `<div class="bubble">${esc(g.text)}</div>` : ""}</div>`;
      const last = gi === gs.length - 1;
      const pieces = [...g.pieces];
      if (last && busy && live) pieces.push({ kind: "text", text: live });
      let followups: string[] = [];
      const html = pieces.map(pc => {
        if (pc.kind === "text") {
          const { body, followups: fu } = splitFollowups(pc.text);
          if (fu.length) followups = fu;
          return body ? `<div class="bubble">${md(body)}</div>` : "";
        }
        if (pc.name === "quiz_zeigen") {
          const quiz = sanitizeQuiz(pc.input);
          return quiz ? quizCard(quiz, pc.id, store.convo.quiz[pc.id] ?? []) : "";
        }
        return toolCard(pc.name, pc.input, pc.id);
      }).join("");
      const tools = [...new Set(g.pieces.filter(pc => pc.kind === "tool").map(pc => CARD_LABEL[(pc as { name: string }).name]).filter(Boolean))];
      const thinking = last && busy && !live ? `<div class="bubble thinking"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>${esc(liveStatus || "Denkt nach")}</div>` : "";
      const done = !(last && busy);
      return `<div class="msg ai">${html}${thinking}
        ${done && g.pieces.length ? `<div class="msg-actions">${tools.map(t => `<span class="tag">${t}</span>`).join("")}<button class="linkbtn" data-copy="${gi}">Kopieren</button></div>` : ""}
        ${done && last && followups.length ? `<div class="followups">${followups.map(f => `<button class="chip" data-ask="${esc(f)}">${esc(f)}</button>`).join("")}</div>` : ""}
      </div>`;
    }).join("") + (lastError ? `<div class="bubble err">${esc(lastError)}</div>` : "");
  }
  $$("[data-ask]", th).forEach(b => b.addEventListener("click", () => send(b.dataset.ask!)));
  $$("[data-copy]", th).forEach(b => b.addEventListener("click", () => void copyGroup(gs[Number(b.dataset.copy)])));
  $$("[data-quiz]", th).forEach(b => b.addEventListener("click", () => answerQuiz(b.dataset.quiz!, Number(b.dataset.q), Number(b.dataset.a))));
  $$("[data-quizsend]", th).forEach(b => b.addEventListener("click", () => sendQuizResult(b.dataset.quizsend!)));
  redrawCharts(th);
  th.scrollIntoView({ block: "end" });
}

async function copyGroup(g: Group) {
  const text = g.pieces.filter(p => p.kind === "text").map(p => splitFollowups((p as { text: string }).text).body).join("\n\n");
  try { await navigator.clipboard.writeText(text); toast("Kopiert"); } catch { toast("Kopieren nicht möglich. Markiere den Text manuell."); }
}

function findQuiz(id: string) {
  for (const msg of store.convo.history) {
    if (msg.role !== "assistant" || typeof msg.content === "string") continue;
    const b = msg.content.find(x => x.type === "tool_use" && x.id === id);
    if (b) return sanitizeQuiz((b.input ?? {}) as Record<string, unknown>);
  }
  return null;
}

function answerQuiz(id: string, qi: number, ai: number) {
  const answers = store.convo.quiz[id] ?? [];
  if (answers[qi] !== undefined && answers[qi] !== null) return;
  answers[qi] = ai;
  store.convo.quiz[id] = answers;
  store.saveConvo();
  const quiz = findQuiz(id);
  if (quiz && quiz.fragen[qi]?.richtig === ai) { addXp(5); onStats(); }
  const y = window.scrollY;
  renderThread();
  window.scrollTo(0, y);
}

function sendQuizResult(id: string) {
  const quiz = findQuiz(id);
  if (!quiz) return;
  const answers = store.convo.quiz[id] ?? [];
  const wrong = quiz.fragen.map((q, i) => ({ q, a: answers[i] })).filter(x => x.a !== x.q.richtig);
  const right = quiz.fragen.length - wrong.length;
  send(`Ich habe das Quiz "${quiz.thema}" gemacht: ${right} von ${quiz.fragen.length} richtig.` + (wrong.length
    ? ` Falsch hatte ich: ${wrong.map(x => `"${x.q.frage}" (gewählt: ${x.a != null ? x.q.antworten[x.a] : "nichts"})`).join("; ")}. Erklär mir bitte, wo mein Denkfehler lag.`
    : " Was sollte ich als Nächstes lernen?"));
}

// ---- Bild anhängen ----

async function attach(inp: HTMLInputElement) {
  const f = inp.files?.[0];
  inp.value = "";
  if (!f || !root) return;
  if (!/^image\/(jpeg|png|webp)$/.test(f.type)) { toast("Bitte ein Foto als JPEG, PNG oder WebP wählen."); return; }
  try {
    const bmp = await createImageBitmap(f);
    const scale = Math.min(1, 1568 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * scale);
    c.height = Math.round(bmp.height * scale);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const url = c.toDataURL("image/jpeg", 0.85);
    attached = { mediaType: "image/jpeg", data: url.split(",")[1], url };
  } catch { toast("Das Bild konnte nicht gelesen werden."); return; }
  const p = $("#attachPreview", root);
  p.hidden = false;
  p.innerHTML = `<img src="${attached.url}" alt="Vorschau"><span>Schwärze IBAN, Steuer-ID und Namen vorher, wenn möglich. Das Bild wird an Claude gesendet.</span><button type="button" class="linkbtn" id="rmAttach">Entfernen</button>`;
  $("#rmAttach", root).addEventListener("click", clearAttach);
}
function clearAttach() {
  attached = null;
  if (!root) return;
  const p = $("#attachPreview", root);
  p.hidden = true;
  p.innerHTML = "";
}

// ---- Senden ----

export async function send(text: string) {
  text = text.trim();
  if (busy || (!text && !attached)) return;
  if (status && !status.coach) { toast("Der Coach ist auf diesem Server noch nicht eingerichtet."); return; }
  const img = attached;
  const body: ChatRequest = {
    history: store.convo.history,
    message: text,
    profile: store.profile,
    mode: store.settings.mode,
    ...(img ? { image: { mediaType: img.mediaType, data: img.data } } : {}),
  };
  busy = true; live = ""; liveStatus = ""; lastError = "";
  ctl = new AbortController();
  if (root) ($("#input", root) as HTMLTextAreaElement).value = "";
  clearAttach();
  renderThread();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers() },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    if (!res.ok || !res.body) {
      const err = await res.json().catch(() => ({ message: "Der Coach ist gerade nicht erreichbar." }));
      lastError = err.message ?? "Der Coach ist gerade nicht erreichbar.";
      if (err.code === "access" && status) status.accessOk = false;
      if (err.code === "limit" && status) status.remaining = 0;
      if (root) ($("#input", root) as HTMLTextAreaElement).value = text;
      return;
    }
    unlock("coach");
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buf = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += value;
      let idx: number;
      while ((idx = buf.indexOf("\n\n")) >= 0) {
        const chunk = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        for (const line of chunk.split("\n")) if (line.startsWith("data: ")) handle(JSON.parse(line.slice(6)) as ChatEvent);
      }
    }
  } catch (err) {
    if (!(err instanceof DOMException && err.name === "AbortError")) lastError = "Die Verbindung ist abgebrochen. Versuch es gleich noch einmal.";
  } finally {
    busy = false; live = ""; liveStatus = ""; ctl = null;
    if (!store.saveConvo()) toast("Der Speicher ist voll. Starte ein neues Gespräch, damit dieses gespeichert bleibt.");
    renderStatusLine();
    renderThread();
  }
}

function handle(e: ChatEvent) {
  switch (e.type) {
    case "turn":
      store.convo.history.push(e.message);
      if (e.message.role === "assistant") { live = ""; liveStatus = ""; }
      store.saveConvo();
      break;
    case "text": live += e.delta; break;
    case "status": liveStatus = e.text; break;
    case "error": lastError = e.message; break;
    case "done":
      if (status) status.remaining = e.remaining;
      addXp(2);
      onStats();
      break;
  }
  renderThread();
}

