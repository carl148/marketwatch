import { ALL_LESSONS } from "./content.ts";
import { GLOSSARY } from "./glossary.ts";
import { $, esc } from "./ui.ts";

// Finanzlexikon mit Suche und Buchstaben-Navigation.

let query = "";
const norm = (s: string) => s.toLocaleLowerCase("de-DE").normalize("NFD").replace(/[̀-ͯ]/g, "");
const sorted = [...GLOSSARY].sort((a, b) => a.t.localeCompare(b.t, "de"));
const letterOf = (t: string) => norm(t)[0].toUpperCase();

export function renderLexicon(m: HTMLElement) {
  m.innerHTML = `
    <div class="section-title"><h2>Finanzlexikon</h2><span class="eyebrow">${GLOSSARY.length} Begriffe</span></div>
    <label class="sr-only" for="lexSearch">Begriff suchen</label>
    <input id="lexSearch" class="lex-search" type="search" placeholder="Begriff suchen, z. B. ETF oder Dispo" value="${esc(query)}" autocomplete="off">
    <div id="lexList"></div>`;
  const input = $("#lexSearch", m) as HTMLInputElement;
  input.addEventListener("input", () => { query = input.value; list(m); });
  list(m);
}

function list(m: HTMLElement) {
  const q = norm(query.trim());
  const hits = q ? sorted.filter(x => norm(x.t).includes(q) || norm(x.d).includes(q)) : sorted;
  const groups = new Map<string, typeof hits>();
  for (const x of hits) { const k = letterOf(x.t); groups.set(k, [...(groups.get(k) ?? []), x]); }
  const box = $("#lexList", m);
  if (!hits.length) { box.innerHTML = `<div class="empty"><h3>Nichts gefunden</h3><p>Versuch einen anderen Begriff.</p></div>`; return; }
  box.innerHTML = `
    ${q ? "" : `<nav class="lex-letters" aria-label="Buchstaben">${[...groups.keys()].map(k => `<a href="#lex-${k}" data-jump="${k}">${k}</a>`).join("")}</nav>`}
    ${[...groups].map(([k, items]) => `<section class="lex-group" id="lex-${k}"><h3>${k}</h3>${items.map(x => {
      const lesson = x.l ? ALL_LESSONS.find(l => l.id === x.l) : undefined;
      return `<div class="lex-item"><b>${esc(x.t)}</b><p>${esc(x.d)}</p>${lesson ? `<small>Mehr dazu in der Lektion „${esc(lesson.title)}“</small>` : ""}</div>`;
    }).join("")}</section>`).join("")}`;
  // Sprungmarken ohne die Seiten-Navigation über den Hash zu stören.
  box.querySelectorAll<HTMLAnchorElement>("[data-jump]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(`lex-${a.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}
