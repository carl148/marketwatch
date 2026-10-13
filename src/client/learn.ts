import { ALL_LESSONS, QUESTION_BY_ID, UNITS, type Card, type LessonWithUnit, type Question } from "./content.ts";
import { celebrate, countUp, flushCelebrations } from "./celebrate.ts";
import { EXAM_QUESTIONS, NEW_LESSONS_PER_DAY, SPRINT_MIN_QUESTIONS, challengeValue, challengesFor, examPassed, nextRefresh, rankOf, starsFor } from "./rules.ts";
import { addCoins, addXp, bump, daily, dailyGoal, dueLessons, isPremium, levelOf, levelStart, liveStreak, recordAnswer, store, today, todayXp, unlock } from "./store.ts";
import { lessonIcon } from "./icons.ts";
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
const newLeft = () => (isPremium() ? Infinity : Math.max(0, NEW_LESSONS_PER_DAY - daily().newLessons));
/** Spielbar: schon geschafft (Wiederholen geht immer) oder Weg frei und heute noch neue Lektionen übrig. */
const isUnlocked = (l: LessonWithUnit) => !!store.progress.done[l.id] || isPremium() || (pathOpen(l) && newLeft() > 0);
/** Empfohlener Einstieg je Wissensstand: Wer Grundlagen kennt, startet beim Zinseszins, Fortgeschrittene beim Investieren. */
const START_UNIT: Record<string, string> = { Grundlagen: "zins", Fortgeschritten: "invest" };
const nextLesson = () => {
  const start = START_UNIT[store.progress.profile.knowledge];
  const fromStart = start ? ALL_LESSONS.find(l => l.unit.id === start && !store.progress.done[l.id] && pathOpen(l)) : undefined;
  return fromStart ?? ALL_LESSONS.find(l => !store.progress.done[l.id] && pathOpen(l));
};

const STAR = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z"/></svg>`;
const CROWN = `<svg class="crown-ic" viewBox="0 0 24 24" fill="currentColor" aria-label="Krone"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;
const miniStars = (n: number) => `<span class="mini-stars" aria-label="${n} von 3 Sternen">${"★".repeat(n)}<span class="off">${"★".repeat(3 - n)}</span></span>`;

/** Fragen aus allen bereits geschafften Lektionen (für den Sprint). */
export const learnedQuestionIds = () => ALL_LESSONS.filter(l => store.progress.done[l.id]).flatMap(l => l.qs.map((_, i) => `${l.id}-${i}`));
const sprintOpen = () => learnedQuestionIds().length >= SPRINT_MIN_QUESTIONS;
const unitDone = (unitId: string) => UNITS.find(u => u.id === unitId)!.lessons.every(l => store.progress.done[l.id]);

/** Nur beim ersten Öffnen des Lernpfads zur aktuellen Lektion scrollen. */
let scrolledToNext = false;

const ICON_CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const ICON_LOCK = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>`;
const ICON_CROWN = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;
const ICON_TARGET = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm0 3.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5z"/></svg>`;
const ICON_BACK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;
/** Zickzack des Lernpfads: seitlicher Versatz je Knoten. */
const ZIGZAG = [0, 1, 2, 1, 0, -1, -2, -1];

/** Challenges, deren Belohnung abgeholt werden kann (für die Glocke). */
export function readyChallenges(): number {
  const d = daily();
  return challengesFor(today(), { sprint: sprintOpen() }).filter(c => !d.claimed.includes(c.id) && challengeValue(c, d, todayXp()) >= targetOf(c)).length;
}

function lessonNote(l: LessonWithUnit): string {
  const done = store.progress.done[l.id];
  if (done) return `${starsFor(done.score, l.qs.length)} von 3 Sternen · ${l.qs.length} Fragen`;
  if (isUnlocked(l)) return `${l.mins} Min · ${l.qs.length} Fragen`;
  return pathOpen(l) ? `Heute schon ${NEW_LESSONS_PER_DAY} neue Lektionen geschafft. Morgen geht es weiter.` : "Schließe zuerst die vorherige Lektion ab.";
}

export function renderLearn(m: HTMLElement) {
  if (player) return renderPlayer(m);
  const p = store.progress;
  const lvl = levelOf(p.xp), a = levelStart(lvl), b = levelStart(lvl + 1);
  const nx = nextLesson();
  const left = newLeft();
  const due = dueLessons();
  const tx = todayXp(), goal = dailyGoal();
  const statusText = !nx ? "Alle Lektionen geschafft. Halte dein Wissen mit Auffrischen und Üben frisch."
    : left > 0 ? `Weiter mit <b>${esc(nx.title)}</b>`
    : `Für heute alle neuen Lektionen geschafft. Morgen warten ${NEW_LESSONS_PER_DAY} neue.`;
  let k = 0;
  m.innerHTML = `
    <section class="status">
      <div class="lvl-badge" aria-hidden="true"><b class="num">${lvl}</b></div>
      <div class="status-main">
        <span class="status-rank"><b>Level ${lvl}</b> · ${rankOf(lvl)}</span>
        <div class="lvl-bar"><i style="width:${((p.xp - a) / (b - a)) * 100}%"></i></div>
        <span class="small muted num">${p.xp - a} / ${b - a} XP</span>
      </div>
      <div class="goal-ring" style="--p:${Math.min(100, (tx / goal) * 100)}" title="Tagesziel: ${Math.min(tx, goal)} von ${goal} XP"><span class="num">${Math.min(tx, goal)}</span><small>/${goal}</small></div>
      ${due.length || (nx && left === 0 && !isPremium()) || !nx ? `<p class="status-text">${statusText}</p>
      <div class="row-actions">
        ${due.length ? `<button class="btn" id="refreshBtn">${due.length} ${due.length === 1 ? "Lektion" : "Lektionen"} auffrischen</button>` : ""}
        ${nx && left === 0 && !isPremium() ? `<a class="btn purple" href="#premium">Mit Premium weiterlernen</a>` : ""}
      </div>` : ""}
    </section>
    ${challengesHtml()}
    <div class="path">${UNITS.map((u, ui) => {
      const d = u.lessons.filter(l => p.done[l.id]).length;
      const passed = !!p.exams?.[u.id]?.passed;
      const lessons = u.lessons.map(l0 => {
        const l = ALL_LESSONS.find(x => x.id === l0.id)!;
        const done = p.done[l.id], isNext = nx?.id === l.id;
        const state = isNext && isUnlocked(l) ? "next" : done ? "done" : isUnlocked(l) ? "open" : "locked";
        return `<div class="node-row" style="--off:${ZIGZAG[k++ % ZIGZAG.length]}">
          ${state === "next" ? `<span class="start-tip">Start</span>` : ""}
          <button class="node ${state}" data-node="${l.id}" aria-label="${esc(l.title)}${state === "done" ? " (geschafft)" : state === "locked" ? " (gesperrt)" : ""}">${lessonIcon(l.id)}${state === "done" ? `<span class="node-badge">${ICON_CHECK}</span>` : state === "locked" ? `<span class="node-badge lock">${ICON_LOCK}</span>` : ""}</button>
          ${done ? miniStars(starsFor(done.score, l.qs.length)) : ""}
        </div>`;
      }).join("");
      const examState = passed ? "gold" : d === u.lessons.length ? "open" : "locked";
      const exam = `<div class="node-row" style="--off:${ZIGZAG[k++ % ZIGZAG.length]}"><button class="node exam ${examState}" data-exam-node="${u.id}" aria-label="Kapitelprüfung ${esc(u.title)}">${ICON_CROWN}</button></div>`;
      return `<section class="unit-path" data-unit="${u.id}">
        <div class="path-divider"><span>${esc(u.title)}${passed ? CROWN : ""}</span></div>
        <p class="path-sub">Kapitel ${ui + 1} · ${esc(u.sub)} · <span class="num">${d}/${u.lessons.length}</span></p>
        ${lessons}${exam}
      </section>`;
    }).join("")}</div>`;
  $("#refreshBtn", m)?.addEventListener("click", startRefresh);
  $$("[data-claim]", m).forEach(b => b.addEventListener("click", () => claim(b.dataset.claim!)));
  $<HTMLDetailsElement>("#challenges", m).addEventListener("toggle", e => { challengesOpen = (e.target as HTMLDetailsElement).open; });
  $$("[data-node]", m).forEach(b => b.addEventListener("click", () => lessonPop(b)));
  $$("[data-exam-node]", m).forEach(b => b.addEventListener("click", () => examPop(b)));
  if (!scrolledToNext) {
    scrolledToNext = true;
    const n = $(".node.next", m);
    if (n && Object.keys(p.done).length) requestAnimationFrame(() => n.scrollIntoView({ block: "center" }));
  }
}

/** Sprechblase unter einem Knoten, wie im Original. Ein zweiter Tipp schließt sie. */
function showPop(node: HTMLElement, cls: string, html: string): HTMLElement | null {
  const row = node.closest(".node-row") as HTMLElement;
  const open = $(".node-pop");
  const same = open?.previousElementSibling === row;
  open?.remove();
  if (same) return null;
  const pop = document.createElement("div");
  pop.className = `node-pop ${cls}`;
  pop.style.setProperty("--off", row.style.getPropertyValue("--off"));
  pop.innerHTML = html;
  row.after(pop);
  pop.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return pop;
}

function lessonPop(node: HTMLElement) {
  const l = ALL_LESSONS.find(x => x.id === node.dataset.node)!;
  const done = store.progress.done[l.id], playable = isUnlocked(l);
  const limit = !playable && pathOpen(l) && !isPremium();
  const pop = showPop(node, playable ? "" : "locked", `
    <small>${esc(l.unit.title)}</small>
    <b>${esc(l.title)}</b>
    <p>${lessonNote(l)}</p>
    ${playable ? `<button class="btn light" data-go>${done ? "Wiederholen +5 XP" : "Starten +20 XP"}</button>`
      : limit ? `<a class="btn purple" href="#premium">Mit Premium sofort weiter</a>` : `<button class="btn" disabled>Gesperrt</button>`}`);
  if (pop) $("[data-go]", pop)?.addEventListener("click", () => startLesson(l.id));
}

function examPop(node: HTMLElement) {
  const unitId = node.dataset.examNode!;
  const u = UNITS.find(x => x.id === unitId)!;
  const e = store.progress.exams?.[unitId];
  const open = unitDone(unitId);
  const label = !open ? "Schließe alle Lektionen des Kapitels ab, um die Prüfung freizuschalten."
    : e?.passed ? `Krone erhalten · Bestwert ${e.best}/${e.total}` : e ? `Bestwert ${e.best}/${e.total} · 80 % zum Bestehen` : `${EXAM_QUESTIONS} gemischte Fragen · 80 % für die Krone`;
  const pop = showPop(node, open ? "gold" : "locked", `
    <small>Kapitelprüfung</small>
    <b>${esc(u.title)}</b>
    <p>${label}</p>
    ${open ? `<button class="btn light" data-go>${e?.passed ? "Nochmal" : e ? "Erneut versuchen" : "Prüfung starten"}</button>` : `<button class="btn" disabled>Gesperrt</button>`}`);
  if (pop) $("[data-go]", pop)?.addEventListener("click", () => startExam(unitId));
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

/** Das Tagesziel-Challenge richtet sich nach dem eigenen Tagesziel. */
const targetOf = (c: { metric: string; target: number }) => (c.metric === "xp" ? dailyGoal() : c.target);

function challengesHtml(): string {
  const d = daily();
  const list = challengesFor(today(), { sprint: sprintOpen() });
  const open = list.filter(c => !d.claimed.includes(c.id)).length;
  const ready = list.filter(c => !d.claimed.includes(c.id) && challengeValue(c, d, todayXp()) >= targetOf(c)).length;
  return `<details class="challenges" id="challenges" ${challengesOpen || ready ? "open" : ""}>
    <summary><span class="ch-ic" aria-hidden="true">${ICON_TARGET}</span><span><b>Tages-Challenges</b><small>${open ? `${list.length - open} von ${list.length} erledigt${ready ? ` · ${ready} abholbereit` : ""}` : "Alle geschafft. Morgen gibt es neue."}</small></span></summary>
    <div class="ch-list">${list.map(c => {
      const v = Math.min(challengeValue(c, d, todayXp()), targetOf(c));
      const claimed = d.claimed.includes(c.id), ready = v >= targetOf(c) && !claimed;
      return `<div class="ch ${claimed ? "claimed" : ready ? "ready" : ""}">
        <div class="ch-text"><b>${esc(c.text)}</b><div class="ch-bar"><i style="width:${(v / targetOf(c)) * 100}%"></i></div><small class="num">${v}/${targetOf(c)}</small></div>
        ${claimed ? `<span class="ch-done">Erledigt</span>` : `<button class="btn small" data-claim="${c.id}" ${ready ? "" : "disabled"}>+${c.coins}</button>`}
      </div>`;
    }).join("")}</div>
  </details>`;
}

/** Ob die Challenges aufgeklappt sind (die Glocke klappt sie auf). */
let challengesOpen = false;
export function openChallenges() { challengesOpen = true; const el = $<HTMLDetailsElement>("#challenges"); if (el) el.open = true; }

function claim(id: string) {
  const d = daily();
  const c = challengesFor(today(), { sprint: sprintOpen() }).find(x => x.id === id);
  if (!c || d.claimed.includes(id) || challengeValue(c, d, todayXp()) < targetOf(c)) return;
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
  const title = s.type === "card" ? "Lektion" : p.mode === "review" ? "Wiederholung" : p.mode === "refresh" ? "Auffrischen" : p.mode === "exam" ? "Prüfung" : "Quiz";
  const head = `<div class="quiz-top"><button class="back" id="quit" aria-label="Beenden">${ICON_BACK}</button><h2>${title}</h2><span class="num small muted">${p.i + 1}/${total}</span></div>`;
  const foot = (enabled: boolean) => `<div class="quiz-foot"><div class="pbar"><i style="width:${((p.i + (enabled ? 1 : 0)) / total) * 100}%"></i></div><button class="btn purple wide" id="next" ${enabled ? "" : "disabled"}>Weiter</button></div>`;
  if (s.type === "card") {
    m.innerHTML = `<div class="player">${head}<article class="learn-card enter"><span class="eyebrow">${esc(p.lesson!.title)}</span><h3>${esc(s.c.h)}</h3><p>${esc(s.c.p)}</p>${s.c.f ? `<div class="fact">${esc(s.c.f)}</div>` : ""}</article>${foot(true)}</div>`;
    $("#next", m).addEventListener("click", () => { p.i++; hooks.rerender(); });
    $("#next", m).focus();
  } else {
    const q = s.q, ans = p.answered;
    const just = p.justAnswered ? " just" : "";
    p.justAnswered = false;
    const qNum = p.steps.slice(0, p.i + 1).filter(x => x.type === "q").length;
    const label = p.mode === "review" || p.mode === "refresh" ? esc(q.lesson.title) : p.mode === "exam" ? esc(q.lesson.unit.title) : "";
    m.innerHTML = `<div class="player">${head}
      <div class="q-pill${ans === null ? " enter" : ""}"><span class="q-num num">${qNum}</span><div>${label ? `<small>${label}</small>` : ""}<h3>${esc(q.q)}</h3></div></div>
      <div class="opts">${s.order.map(i => {
        let cls = "";
        if (ans !== null) { if (i === q.c) cls = "right" + (i === ans ? just : ""); else if (i === ans) cls = "wrong" + just; }
        return `<button class="opt ${cls}" data-i="${i}" ${ans !== null ? "disabled" : ""}>${esc(q.a[i])}</button>`;
      }).join("")}</div>
      ${ans !== null ? `<div class="feedback ${ans === q.c ? "good" : "bad"}${just}"><b>${ans === q.c ? "Richtig! +10 XP" : "Nicht ganz."}</b>${esc(q.e)}${ans !== q.c ? "<br><small>Diese Frage landet in deiner Wiederholung.</small>" : ""}</div>` : ""}
      ${foot(ans !== null)}</div>`;
    $$(".opt", m).forEach(b => b.addEventListener("click", () => answer(Number(b.dataset.i))));
    const n = $("#next", m);
    if (ans !== null) { n.addEventListener("click", () => { p.answered = null; p.i++; hooks.rerender(); }); n.focus(); }
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
      <div><b>${Math.min(todayXp(), dailyGoal())}/${dailyGoal()}</b><small>Tagesziel</small></div>
    </div>
    ${todayXp() >= dailyGoal() ? `<p class="good-text">Tagesziel erreicht.</p>` : ""}
  </article>
  <div class="actions">
    ${p.mode === "lesson" && nx && isUnlocked(nx) ? `<button class="btn ghost" id="toPath">Zum Lernpfad</button><button class="btn purple" id="goNext">Nächste Lektion</button>` : `<button class="btn purple wide" id="toPath">Fertig</button>`}
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
