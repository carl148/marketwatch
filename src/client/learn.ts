import { ACHIEVEMENTS, ALL_LESSONS, DAILY_GOAL, QUESTION_BY_ID, UNITS, type Card, type LessonWithUnit, type Question } from "./content.ts";
import { celebrate, countUp, flushCelebrations } from "./celebrate.ts";
import { EXAM_QUESTIONS, NEW_LESSONS_PER_DAY, SPRINT_MIN_QUESTIONS, challengeValue, challengesFor, examPassed, nextRefresh, starsFor } from "./rules.ts";
import { addCoins, addXp, bump, daily, dueLessons, levelOf, levelStart, liveStreak, recordAnswer, store, today, todayXp, unlock } from "./store.ts";
import { mountSprint } from "./sprint.ts";
import { $, $$, esc } from "./ui.ts";

// Lernpfad, Lektionen mit Quiz, Auffrischen, Kapitelprüfungen und der Üben-Bereich.

type Step = { type: "card"; c: Card } | { type: "q"; q: Question & { id: string; lesson: LessonWithUnit }; order: number[] };

/** Antworten in zufälliger Reihenfolge, damit die Position der richtigen Antwort nichts verrät. */
function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const qStep = (id: string): Step => ({ type: "q", q: QUESTION_BY_ID[id], order: shuffled(QUESTION_BY_ID[id].a.length) });
interface Player {
  mode: "lesson" | "review" | "refresh" | "exam";
  /** Kapitel der Prüfung. */
  unitId?: string;
  /** Gerade beantwortet: Feedback einmal animieren. */
  justAnswered?: boolean;
  lesson?: LessonWithUnit;
  steps: Step[];
  i: number;
  correct: number;
  xp: number;
  bonus: number;
  coins: number;
  answered: number | null;
  finished: boolean;
  /** Beim Auffrischen: welche Lektionen dran sind und wie viele Fragen je Lektion richtig waren. */
  refreshIds?: string[];
  perLesson?: Record<string, number>;
}

let player: Player | null = null;
let hooks = { rerender: () => {}, stats: () => {} };
export function initLearn(h: typeof hooks) { hooks = h; }
export const inPlayer = () => player !== null;
export function closePlayer() { player = null; }

/** Vorherige Lektion im Kapitel geschafft? */
const pathOpen = (l: LessonWithUnit) => {
  const idx = l.unit.lessons.findIndex(x => x.id === l.id);
  return idx === 0 || !!store.progress.done[l.unit.lessons[idx - 1].id];
};
const newLeft = () => Math.max(0, NEW_LESSONS_PER_DAY - daily().newLessons);
/** Spielbar: schon geschafft (Wiederholen geht immer) oder Weg frei und heute noch neue Lektionen übrig. */
const isUnlocked = (l: LessonWithUnit) => !!store.progress.done[l.id] || (pathOpen(l) && newLeft() > 0);
const nextLesson = () => ALL_LESSONS.find(l => !store.progress.done[l.id] && pathOpen(l));

const STAR = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z"/></svg>`;
const CROWN = `<svg class="crown-ic" viewBox="0 0 24 24" fill="currentColor" aria-label="Krone"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;
const miniStars = (n: number) => `<span class="mini-stars" aria-label="${n} von 3 Sternen">${"★".repeat(n)}<span class="off">${"★".repeat(3 - n)}</span></span>`;

/** Fragen aus allen bereits geschafften Lektionen (für den Sprint). */
export const learnedQuestionIds = () => ALL_LESSONS.filter(l => store.progress.done[l.id]).flatMap(l => l.qs.map((_, i) => `${l.id}-${i}`));
const sprintOpen = () => learnedQuestionIds().length >= SPRINT_MIN_QUESTIONS;
const unitDone = (unitId: string) => UNITS.find(u => u.id === unitId)!.lessons.every(l => store.progress.done[l.id]);

/** Kapitel, die der Nutzer auf- oder zugeklappt hat (nur für diese Sitzung). */
const toggled = new Map<string, boolean>();

export function renderLearn(m: HTMLElement) {
  if (player) return renderPlayer(m);
  const p = store.progress;
  const lvl = levelOf(p.xp), a = levelStart(lvl), b = levelStart(lvl + 1);
  const nx = nextLesson();
  const left = newLeft();
  const due = dueLessons();
  const doneCount = Object.keys(p.done).length;
  const heroTitle = !nx ? "Alle Lektionen geschafft" : left > 0 ? "Weiter mit: " + esc(nx.title) : "Für heute alle neuen Lektionen geschafft";
  const heroText = !nx ? "Halte dein Wissen mit Auffrischen und Üben frisch."
    : left > 0 ? `${esc(nx.unit.title)} · etwa ${nx.mins} Minuten`
    : `Morgen warten ${NEW_LESSONS_PER_DAY} neue Lektionen. Bis dahin kannst du auffrischen, üben oder Lektionen wiederholen.`;
  m.innerHTML = `
    <section class="hero">
      <div>
        <span class="eyebrow on-dark">${doneCount} von ${ALL_LESSONS.length} Lektionen · heute noch ${left} neue</span>
        <h2>${heroTitle}</h2>
        <p>${heroText}</p>
        <div class="row-actions hero-actions">
          ${nx && left > 0 ? `<button class="btn" id="continueBtn">Lektion starten</button>` : ""}
          ${due.length ? `<button class="btn ${nx && left > 0 ? "ghost-dark" : ""}" id="refreshBtn">${due.length} ${due.length === 1 ? "Lektion" : "Lektionen"} auffrischen</button>` : ""}
        </div>
      </div>
      <div class="lvl"><span class="eyebrow on-dark">Level</span><b>${lvl}</b><span class="num small">${p.xp - a} / ${b - a} XP</span></div>
      <div class="lvl-bar"><i style="width:${((p.xp - a) / (b - a)) * 100}%"></i></div>
    </section>
    ${challengesHtml()}
    <div class="section-title"><h2>Lernpfad</h2><span class="eyebrow">${UNITS.length} Kapitel</span></div>
    <div class="units">${UNITS.map((u, ui) => {
      const d = u.lessons.filter(l => p.done[l.id]).length;
      const hasNext = u.lessons.some(l => l.id === nx?.id);
      const open = toggled.get(u.id) ?? hasNext;
      return `<details class="unit" data-unit="${u.id}" ${open ? "open" : ""}>
        <summary class="unit-head">
          <div><span class="eyebrow">Kapitel ${ui + 1}${d === u.lessons.length ? " · geschafft" : ""}</span><h3>${esc(u.title)}${p.exams?.[u.id]?.passed ? CROWN : ""}</h3></div>
          <div class="unit-meta"><span>${esc(u.sub)}</span><span class="unit-prog"><i style="width:${(d / u.lessons.length) * 100}%"></i></span><span class="num">${d}/${u.lessons.length}</span></div>
        </summary>
        <div class="lessons">${u.lessons.map((l0, li) => {
          const l = ALL_LESSONS.find(x => x.id === l0.id)!;
          const done = p.done[l.id], playable = isUnlocked(l), isNext = nx?.id === l.id;
          const note = done ? miniStars(starsFor(done.score, l.qs.length)) : playable ? `${l.mins} Min · ${l.qs.length} Fragen` : pathOpen(l) ? "Morgen verfügbar" : "Erst vorherige Lektion";
          return `<button class="lesson ${done ? "done" : ""} ${isNext ? "next" : ""}" data-lesson="${l.id}" ${playable ? "" : "disabled"}>
            <span class="dot">${done ? "✓" : li + 1}</span>
            <span><b>${esc(l.title)}</b><small>${note}</small></span>
          </button>`;
        }).join("")}</div>
        ${d === u.lessons.length ? examRow(u.id) : ""}
      </details>`;
    }).join("")}</div>
    <div class="section-title"><h2>Erfolge</h2><span class="eyebrow">${ACHIEVEMENTS.filter(x => p.ach[x.id]).length} / ${ACHIEVEMENTS.length}</span></div>
    <div class="ach">${ACHIEVEMENTS.map(x => `<span class="${p.ach[x.id] ? "got" : ""}">${esc(x.name)}</span>`).join("")}</div>`;
  $("#continueBtn", m)?.addEventListener("click", () => nx && startLesson(nx.id));
  $("#refreshBtn", m)?.addEventListener("click", startRefresh);
  $$("[data-claim]", m).forEach(b => b.addEventListener("click", () => claim(b.dataset.claim!)));
  $$("[data-lesson]", m).forEach(b => b.addEventListener("click", () => startLesson(b.dataset.lesson!)));
  $$<HTMLDetailsElement>("details[data-unit]", m).forEach(d => d.addEventListener("toggle", () => toggled.set(d.dataset.unit!, d.open)));
  $$("[data-exam]", m).forEach(b => b.addEventListener("click", () => startExam(b.dataset.exam!)));
}

function examRow(unitId: string): string {
  const e = store.progress.exams?.[unitId];
  const label = e?.passed ? `Krone erhalten · Bestwert ${e.best}/${e.total}` : e ? `Bestwert ${e.best}/${e.total} · 80 % zum Bestehen` : `${EXAM_QUESTIONS} gemischte Fragen · 80 % für die Krone`;
  return `<div class="exam-row"><span><b>Kapitelprüfung</b><br><small class="muted">${label}</small></span><button class="btn small" data-exam="${unitId}">${e?.passed ? "Nochmal" : e ? "Erneut versuchen" : "Prüfung starten"}</button></div>`;
}

function startExam(unitId: string) {
  const u = UNITS.find(x => x.id === unitId)!;
  const ids = u.lessons.flatMap(l => l.qs.map((_, i) => `${l.id}-${i}`));
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  player = { mode: "exam", unitId, steps: ids.slice(0, EXAM_QUESTIONS).map(qStep), i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false };
  hooks.rerender();
  window.scrollTo(0, 0);
}

/** Auffrischen: Fragen aus bis zu drei fälligen Lektionen, gemischt. */
function startRefresh() {
  const ids = dueLessons().slice(0, 3);
  if (!ids.length) return;
  const qs = ids.flatMap(id => ALL_LESSONS.find(l => l.id === id)!.qs.map((_, i) => `${id}-${i}`));
  for (let i = qs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [qs[i], qs[j]] = [qs[j], qs[i]]; }
  player = { mode: "refresh", refreshIds: ids, steps: qs.map(qStep), i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false, perLesson: {} };
  hooks.rerender();
  window.scrollTo(0, 0);
}

function challengesHtml(): string {
  const d = daily();
  const list = challengesFor(today(), { sprint: sprintOpen() });
  const open = list.filter(c => !d.claimed.includes(c.id)).length;
  return `<section class="challenges">
    <div class="unit-head"><div><span class="eyebrow">Heute</span><h3>Tages-Challenges</h3></div><span>${open ? `${open} offen · neue jeden Tag` : "Alle geschafft. Morgen gibt es neue."}</span></div>
    <div class="ch-list">${list.map(c => {
      const v = Math.min(challengeValue(c, d, todayXp()), c.target);
      const claimed = d.claimed.includes(c.id), ready = v >= c.target && !claimed;
      return `<div class="ch ${claimed ? "claimed" : ready ? "ready" : ""}">
        <div class="ch-text"><b>${esc(c.text)}</b><div class="ch-bar"><i style="width:${(v / c.target) * 100}%"></i></div><small class="num">${v}/${c.target}</small></div>
        ${claimed ? `<span class="ch-done">Erledigt</span>` : `<button class="btn small" data-claim="${c.id}" ${ready ? "" : "disabled"}>+${c.coins} Münzen</button>`}
      </div>`;
    }).join("")}</div>
  </section>`;
}

function claim(id: string) {
  const d = daily();
  const c = challengesFor(today(), { sprint: sprintOpen() }).find(x => x.id === id);
  if (!c || d.claimed.includes(id) || challengeValue(c, d, todayXp()) < c.target) return;
  d.claimed.push(id);
  store.progress.challengesDone = (store.progress.challengesDone ?? 0) + 1;
  addCoins(c.coins);
  unlock("challenge1");
  hooks.stats();
  hooks.rerender();
}

function startLesson(id: string) {
  const l = ALL_LESSONS.find(x => x.id === id)!;
  const steps: Step[] = [
    ...l.cards.map(c => ({ type: "card" as const, c })),
    ...l.qs.map((_, i) => qStep(`${l.id}-${i}`)),
  ];
  player = { mode: "lesson", lesson: l, steps, i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false };
  hooks.rerender();
  window.scrollTo(0, 0);
}

function startReview() {
  const ids = store.progress.review.filter(id => QUESTION_BY_ID[id]).slice(0, 8);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  player = { mode: "review", steps: ids.map(qStep), i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false };
  hooks.rerender();
  window.scrollTo(0, 0);
}

function renderPlayer(m: HTMLElement) {
  const p = player!;
  const total = p.steps.length;
  if (p.i >= total) return renderResult(m);
  const s = p.steps[p.i];
  const head = `<div class="player-top"><button class="x" id="quit" aria-label="Lektion beenden">×</button><div class="pbar"><i style="width:${(p.i / total) * 100}%"></i></div><span class="num small muted">${p.i + 1}/${total}</span></div>`;
  if (s.type === "card") {
    m.innerHTML = `<div class="player">${head}<article class="card enter"><span class="eyebrow">${esc(p.lesson!.title)}</span><h2>${esc(s.c.h)}</h2><p>${esc(s.c.p)}</p>${s.c.f ? `<div class="fact">${esc(s.c.f)}</div>` : ""}</article>
      <div class="actions"><button class="btn" id="next">Weiter</button></div></div>`;
    $("#next", m).addEventListener("click", () => { p.i++; hooks.rerender(); });
    $("#next", m).focus();
  } else {
    const q = s.q, ans = p.answered;
    const just = p.justAnswered ? " just" : "";
    p.justAnswered = false;
    const label = p.mode === "review" ? "Wiederholung · " + esc(q.lesson.title) : p.mode === "refresh" ? "Auffrischen · " + esc(q.lesson.title) : p.mode === "exam" ? "Kapitelprüfung · " + esc(q.lesson.unit.title) : "Frage";
    m.innerHTML = `<div class="player">${head}<article class="card${ans === null ? " enter" : ""}"><span class="eyebrow">${label}</span><h2>${esc(q.q)}</h2>
      <div class="opts">${s.order.map(i => {
        const t = q.a[i];
        let cls = "";
        if (ans !== null) { if (i === q.c) cls = "right" + (i === ans ? just : ""); else if (i === ans) cls = "wrong" + just; }
        return `<button class="opt ${cls}" data-i="${i}" ${ans !== null ? "disabled" : ""}>${esc(t)}</button>`;
      }).join("")}</div>
      ${ans !== null ? `<div class="feedback ${ans === q.c ? "good" : "bad"}${just}"><b>${ans === q.c ? "Richtig! +10 XP" : "Nicht ganz."}</b>${esc(q.e)}${ans !== q.c ? "<br><small>Diese Frage landet in deiner Wiederholung.</small>" : ""}</div>` : ""}
      </article>
      <div class="actions">${ans !== null ? `<button class="btn" id="next">Weiter</button>` : ""}</div></div>`;
    $$(".opt", m).forEach(b => b.addEventListener("click", () => answer(Number(b.dataset.i))));
    const n = $("#next", m);
    if (n) { n.addEventListener("click", () => { p.answered = null; p.i++; hooks.rerender(); }); n.focus(); }
  }
  $("#quit", m).addEventListener("click", () => { player = null; hooks.rerender(); });
}

function answer(i: number) {
  const p = player!;
  const step = p.steps[p.i];
  if (step.type !== "q" || p.answered !== null) return;
  const q = step.q;
  p.answered = i;
  p.justAnswered = true;
  const prog = store.progress;
  recordAnswer(i === q.c);
  if (i === q.c && p.perLesson) p.perLesson[q.lesson.id] = (p.perLesson[q.lesson.id] ?? 0) + 1;
  if (i === q.c) {
    p.correct++;
    p.xp += 10;
    addXp(10);
    if (p.mode === "review") prog.review = prog.review.filter(x => x !== q.id);
  } else if (!prog.review.includes(q.id)) prog.review.push(q.id);
  store.saveProgress();
  hooks.stats();
  hooks.rerender();
}

function renderResult(m: HTMLElement) {
  const p = player!;
  const prog = store.progress;
  const qn = p.steps.filter(s => s.type === "q").length;
  const perfect = p.correct === qn;
  if (!p.finished) {
    p.finished = true;
    if (p.mode === "lesson" && p.lesson) {
      const prev = prog.done[p.lesson.id];
      const unitBefore = unitDone(p.lesson.unit.id);
      p.bonus = (prev ? 5 : 20) + (perfect ? 10 : 0);
      p.coins = (prev ? 3 : 10) + (perfect ? 5 : 0);
      bump("lessons");
      if (perfect) { unlock("perfect"); bump("perfect"); }
      const first = nextRefresh(-1, true, today());
      prog.done[p.lesson.id] = prev ? { ...prev, score: Math.max(p.correct, prev.score) } : { score: p.correct, at: today(), stage: first.stage, due: first.due };
      if (!prev) daily().newLessons++;
      const n = Object.keys(prog.done).length;
      if (n >= 25) unlock("lessons25");
      if (n >= 50) unlock("lessons50");
      unlock("first");
      if (!unitBefore && unitDone(p.lesson.unit.id)) {
        unlock("unit");
        addCoins(20);
        celebrate({ kind: "chapter", title: p.lesson.unit.title, coins: 20 });
      }
      if (ALL_LESSONS.every(l => prog.done[l.id])) unlock("all");
      addXp(p.bonus);
    } else if (p.mode === "refresh" && p.refreshIds) {
      for (const id of p.refreshIds) {
        const d = prog.done[id];
        const l = ALL_LESSONS.find(x => x.id === id)!;
        const passed = (p.perLesson?.[id] ?? 0) >= Math.ceil(l.qs.length * 2 / 3);
        Object.assign(d, nextRefresh(d.stage ?? 0, passed, today()));
      }
      p.bonus = 5;
      p.coins = 3 * p.refreshIds.length;
      unlock("refresh1");
      addXp(p.bonus);
    } else if (p.mode === "exam" && p.unitId) {
      const total = p.steps.length;
      const prev = prog.exams?.[p.unitId];
      const passed = examPassed(p.correct, total);
      prog.exams = prog.exams ?? {};
      prog.exams[p.unitId] = { best: Math.max(p.correct, prev?.best ?? 0), total, passed: passed || !!prev?.passed };
      if (passed && !prev?.passed) {
        p.bonus = 50;
        p.coins = 30;
        unlock("exam1");
        if (Object.values(prog.exams).filter(e => e.passed).length >= 5) unlock("crowns5");
        celebrate({ kind: "crown", title: UNITS.find(u => u.id === p.unitId)!.title, coins: 30 });
      } else p.bonus = passed ? 10 : 0;
      if (p.bonus) addXp(p.bonus);
    } else if (p.correct > 0) { unlock("review"); p.coins = 5; }
    if (p.coins) addCoins(p.coins);
    hooks.stats();
  }
  const nx = nextLesson();
  m.innerHTML = `<div class="player"><article class="card result">
    <span class="eyebrow">${p.mode === "lesson" ? "Lektion abgeschlossen" : p.mode === "refresh" ? "Auffrischen beendet" : p.mode === "exam" ? "Kapitelprüfung beendet" : "Wiederholung beendet"}</span>
    <h2>${p.mode === "exam" ? (examPassed(p.correct, qn) ? "Bestanden!" : "Knapp daneben. Versuch es nochmal!") : perfect ? "Fehlerfrei!" : p.correct >= qn / 2 ? "Gut gemacht!" : "Dranbleiben lohnt sich"}</h2>
    ${p.mode === "lesson" ? `<div class="stars">${[1, 2, 3].map(k => `<span class="star ${k <= starsFor(p.correct, qn) ? "on" : ""}">${STAR}</span>`).join("")}</div>` : ""}
    <div class="big num" id="xpWon">+${p.xp + p.bonus} XP</div>
    ${p.coins ? `<p class="coins-won">+${p.coins} Münzen</p>` : ""}
    <div class="result-grid">
      <div><b>${p.correct}/${qn}</b><small>richtig</small></div>
      <div><b>${liveStreak()}</b><small>Tage Serie</small></div>
      <div><b>${Math.min(todayXp(), DAILY_GOAL)}/${DAILY_GOAL}</b><small>Tagesziel</small></div>
    </div>
    ${todayXp() >= DAILY_GOAL ? `<p class="good-text">Tagesziel erreicht.</p>` : ""}
  </article>
  <div class="actions">
    ${p.mode === "lesson" && nx && isUnlocked(nx) ? `<button class="btn ghost" id="toPath">Zum Lernpfad</button><button class="btn" id="goNext">Nächste Lektion</button>` : `<button class="btn" id="toPath">Fertig</button>`}
  </div></div>`;
  $("#toPath", m).addEventListener("click", () => { player = null; hooks.rerender(); });
  $("#goNext", m)?.addEventListener("click", () => startLesson(nx!.id));
  countUp($("#xpWon", m), p.xp + p.bonus, "+", " XP");
  setTimeout(() => void flushCelebrations(), 900);
}

export function renderReview(m: HTMLElement) {
  if (player) return renderPlayer(m);
  const ids = store.progress.review.filter(id => QUESTION_BY_ID[id]);
  const due = dueLessons();
  m.innerHTML = `<div class="section-title"><h2>Üben</h2><span class="eyebrow">Sprint, Auffrischen, Fehler</span></div>
    <div class="practice">
      <div id="sprintBox"></div>
      <div class="panel stack">
        <span class="eyebrow">Auffrischen</span>
        <h3>${due.length ? `${due.length} ${due.length === 1 ? "Lektion ist" : "Lektionen sind"} fällig` : "Gerade nichts fällig"}</h3>
        <p class="muted">Geschaffte Lektionen kommen nach 1, 3, 7, 14, 30 und 60 Tagen wieder, damit dein Wissen bleibt.</p>
        ${due.length ? `<div class="row-actions"><button class="btn" id="refreshNow">Jetzt auffrischen</button></div>` : ""}
      </div>
      <div class="panel stack">
        <span class="eyebrow">Fehler wiederholen</span>
        ${ids.length ? `<h3>${ids.length} offene ${ids.length === 1 ? "Frage" : "Fragen"}</h3>
          <p class="muted">Richtig beantwortete Fragen verschwinden aus der Liste. Pro Runde gibt es bis zu 8 Fragen.</p>
          <ul class="review-list">${ids.slice(0, 8).map(id => { const q = QUESTION_BY_ID[id]; return `<li><span>${esc(q.q)}</span><small>${esc(q.lesson.unit.title)}</small></li>`; }).join("")}</ul>
          <div class="actions"><button class="btn" id="startRev">Runde starten</button></div>`
        : `<h3>Keine offenen Fehler</h3><p class="muted">Jede Frage, die du falsch beantwortest, landet hier. So übst du gezielt deine Lücken.</p>`}
      </div>
    </div>`;
  $("#startRev", m)?.addEventListener("click", startReview);
  $("#refreshNow", m)?.addEventListener("click", startRefresh);
  mountSprint($("#sprintBox", m), learnedQuestionIds(), () => { hooks.stats(); hooks.rerender(); });
}
