// Kleine DOM-Helfer ohne Framework.

export const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;
export const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll(sel)) as T[];

export const esc = (s: unknown) =>
  String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

let toastTimer: ReturnType<typeof setTimeout> | undefined;
export function toast(msg: string) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2800);
}

/** Sehr kleines, sicheres Markdown: Absätze, Listen, ### Überschriften, **fett**, `code`. */
export function md(text: string): string {
  const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
  let out = "";
  let list: { tag: "ul" | "ol"; items: string[] } | null = null;
  let para: string[] = [];
  const flushP = () => { if (para.length) { out += `<p>${para.map(inline).join("<br>")}</p>`; para = []; } };
  const flushL = () => { if (list) { out += `<${list.tag}>${list.items.map(x => `<li>${inline(x)}</li>`).join("")}</${list.tag}>`; list = null; } };
  for (const raw of text.split("\n")) {
    const l = raw.trimEnd();
    let m: RegExpMatchArray | null;
    if (!l.trim()) { flushP(); flushL(); continue; }
    if ((m = l.match(/^\s*#{1,4}\s+(.*)/))) { flushP(); flushL(); out += `<h4>${inline(m[1])}</h4>`; continue; }
    if ((m = l.match(/^\s*[-*•]\s+(.*)/))) { flushP(); if (list?.tag !== "ul") { flushL(); list = { tag: "ul", items: [] }; } list!.items.push(m[1]); continue; }
    if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { flushP(); if (list?.tag !== "ol") { flushL(); list = { tag: "ol", items: [] }; } list!.items.push(m[1]); continue; }
    flushL();
    para.push(l);
  }
  flushP();
  flushL();
  return out;
}

/** Trennt die Zeile mit Folgefragen (">> a | b | c") vom Antworttext. */
export function splitFollowups(text: string): { body: string; followups: string[] } {
  let followups: string[] = [];
  const keep = text.split("\n").filter(l => {
    const m = l.match(/^\s*>>\s*(.*)$/);
    if (m) { followups = m[1].split("|").map(s => s.trim()).filter(Boolean).slice(0, 3); return false; }
    return !/^\s*>\s*$/.test(l);
  });
  return { body: keep.join("\n").trim(), followups };
}
