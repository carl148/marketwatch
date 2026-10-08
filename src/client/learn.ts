import { ACHIEVEMENTS, ALL_LESSONS, DAILY_GOAL, QUESTION_BY_ID, UNITS, type Card, type LessonWithUnit, type Question } from "./content.ts";
import { challengeValue, challengesFor } from "./rules.ts";
import { addCoins, addXp, bump, daily, levelOf, levelStart, liveStreak, recordAnswer, store, today, todayXp, unlock } from "./store.ts";
import { $, $$, esc } from "./ui.ts";

// Lernpfad, Lektionen mit Quiz und der Wiederholen-Stapel.

type Step = { type: "card"; c: Card } | { type: "q"; q: Question & { id: string; lesson: LessonWithUnit } };
interface Player {
  mode: "lesson" | "review";
  lesson?: LessonWithUnit;
  steps: Step[];
  i: number;
  correct: number;
  xp: number;
  bonus: number;
  coins: number;
  answered: number | null;
  finished: boolean;
}

let player: Player | null = null;
let hooks = { rerender: () => {}, stats: () => {} };
export function initLearn(h: typeof hooks) { hooks = h; }
export const inPlayer = () => player !== null;
export function closePlayer() { player = null; }

const isUnlocked = (l: LessonWithUnit) => {
  const idx = l.unit.lessons.findIndex(x => x.id === l.id);
  return idx === 0 || !!store.progress.done[l.unit.lessons[idx - 1].id];
};
const nextLesson = () => ALL_LESSONS.find(l => !store.progress.done[l.id] && isUnlocked(l));

export function renderLearn(m: HTMLElement) {
  if (player) return renderPlayer(m);
  const p = store.progress;
  const lvl = levelOf(p.xp), a = levelStart(lvl), b = levelStart(lvl + 1);
  const nx = nextLesson();
  const doneCount = Object.keys(p.done).length;
  m.innerHTML = `
    <section class="hero">
      <div>
        <span class="eyebrow on-dark">${doneCount} von ${ALL_LESSONS.length} Lektionen</span>
        <h2>${nx ? "Weiter mit: " + esc(nx.title) : "Alle Lektionen geschafft"}</h2>
        <p>${nx ? `${esc(nx.unit.title)} · etwa ${nx.mins} Minuten` : "Halte dein Wissen im Üben-Tab frisch oder probier die Rechner aus."}</p>
        ${nx ? `<button class="btn" id="continueBtn">Lektion starten</button>` : ""}
      </div>
      <div class="lvl"><span class="eyebrow on-dark">Level</span><b>${lvl}</b><span class="num small">${p.xp - a} / ${b - a} XP</span></div>
      <div class="lvl-bar"><i style="width:${((p.xp - a) / (b - a)) * 100}%"></i></div>
    </section>
    ${challengesHtml()}
    <div class="units">${UNITS.map((u, ui) => {
      const d = u.lessons.filter(l => p.done[l.id]).length;
      return `<section class="unit">
        <div class="unit-head"><div><span class="eyebrow">Kapitel ${ui + 1}</span><h3>${esc(u.title)}</h3></div><span>${esc(u.sub)} · ${d}/${u.lessons.length}</span></div>
        <div class="lessons">${u.lessons.map((l0, li) => {
          const l = ALL_LESSONS.find(x => x.id === l0.id)!;
          const done = p.done[l.id], open = isUnlocked(l), isNext = nx?.id === l.id;
          return `<button class="lesson ${done ? "done" : ""} ${isNext ? "next" : ""}" data-lesson="${l.id}" ${open ? "" : "disabled"}>
            <span class="dot">${done ? "✓" : li + 1}</span>
            <span><b>${esc(l.title)}</b><small>${done ? `${done.score}/${l.qs.length} richtig` : open ? `${l.mins} Min · ${l.qs.length} Fragen` : "Erst vorherige Lektion"}</small></span>
          </button>`;
        }).join("")}</div>
      </section>`;
    }).join("")}</div>
    <div class="section-title"><h2>Erfolge</h2><span class="eyebrow">${ACHIEVEMENTS.filter(x => p.ach[x.id]).length} / ${ACHIEVEMENTS.length}</span></div>
    <div class="ach">${ACHIEVEMENTS.map(x => `<span class="${p.ach[x.id] ? "got" : ""}">${esc(x.name)}</span>`).join("")}</div>`;
  $("#continueBtn", m)?.addEventListener("click", () => nx && startLesson(nx.id));
  $$("[data-claim]", m).forEach(b => b.addEventListener("click", () => claim(b.dataset.claim!)));
  $$("[data-lesson]", m).forEach(b => b.addEventListener("click", () => startLesson(b.dataset.lesson!)));
}

function challengesHtml(): string {
  const d = daily();
  const list = challengesFor(today());
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
  const c = challengesFor(today()).find(x => x.id === id);
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
    ...l.qs.map((_, i) => ({ type: "q" as const, q: QUESTION_BY_ID[`${l.id}-${i}`] })),
  ];
  player = { mode: "lesson", lesson: l, steps, i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false };
  hooks.rerender();
  window.scrollTo(0, 0);
}

function startReview() {
  const ids = store.progress.review.filter(id => QUESTION_BY_ID[id]).slice(0, 8);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  player = { mode: "review", steps: ids.map(id => ({ type: "q" as const, q: QUESTION_BY_ID[id] })), i: 0, correct: 0, xp: 0, bonus: 0, coins: 0, answered: null, finished: false };
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
    m.innerHTML = `<div class="player">${head}<article class="card"><span class="eyebrow">${esc(p.lesson!.title)}</span><h2>${esc(s.c.h)}</h2><p>${esc(s.c.p)}</p>${s.c.f ? `<div class="fact">${esc(s.c.f)}</div>` : ""}</article>
      <div class="actions"><button class="btn" id="next">Weiter</button></div></div>`;
    $("#next", m).addEventListener("click", () => { p.i++; hooks.rerender(); });
    $("#next", m).focus();
  } else {
    const q = s.q, ans = p.answered;
    m.innerHTML = `<div class="player">${head}<article class="card"><span class="eyebrow">${p.mode === "review" ? "Wiederholung · " + esc(q.lesson.title) : "Frage"}</span><h2>${esc(q.q)}</h2>
      <div class="opts">${q.a.map((t, i) => {
        let cls = "";
        if (ans !== null) { if (i === q.c) cls = "right"; else if (i === ans) cls = "wrong"; }
        return `<button class="opt ${cls}" data-i="${i}" ${ans !== null ? "disabled" : ""}>${esc(t)}</button>`;
      }).join("")}</div>
      ${ans !== null ? `<div class="feedback ${ans === q.c ? "good" : "bad"}"><b>${ans === q.c ? "Richtig! +10 XP" : "Nicht ganz."}</b>${esc(q.e)}${ans !== q.c ? "<br><small>Diese Frage landet in deiner Wiederholung.</small>" : ""}</div>` : ""}
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
  const prog = store.progress;
  recordAnswer(i === q.c);
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
      p.bonus = (prev ? 5 : 20) + (perfect ? 10 : 0);
      p.coins = (prev ? 3 : 10) + (perfect ? 5 : 0);
      bump("lessons");
      if (perfect) { unlock("perfect"); bump("perfect"); }
      prog.done[p.lesson.id] = { score: Math.max(p.correct, prev?.score ?? 0), at: new Date().toISOString().slice(0, 10) };
      unlock("first");
      if (p.lesson.unit.lessons.every(l => prog.done[l.id])) unlock("unit");
      if (ALL_LESSONS.every(l => prog.done[l.id])) unlock("all");
      addXp(p.bonus);
    } else if (p.correct > 0) { unlock("review"); p.coins = 5; }
    if (p.coins) addCoins(p.coins);
    hooks.stats();
  }
  const nx = nextLesson();
  m.innerHTML = `<div class="player"><article class="card result">
    <span class="eyebrow">${p.mode === "lesson" ? "Lektion abgeschlossen" : "Wiederholung beendet"}</span>
    <h2>${perfect ? "Fehlerfrei!" : p.correct >= qn / 2 ? "Gut gemacht!" : "Dranbleiben lohnt sich"}</h2>
    <div class="big num pop">+${p.xp + p.bonus} XP</div>
    ${p.coins ? `<p class="coins-won">+${p.coins} Münzen</p>` : ""}
    <div class="result-grid">
      <div><b>${p.correct}/${qn}</b><small>richtig</small></div>
      <div><b>${liveStreak()}</b><small>Tage Serie</small></div>
      <div><b>${Math.min(todayXp(), DAILY_GOAL)}/${DAILY_GOAL}</b><small>Tagesziel</small></div>
    </div>
    ${todayXp() >= DAILY_GOAL ? `<p class="good-text">Tagesziel erreicht.</p>` : ""}
  </article>
  <div class="actions">
    ${p.mode === "lesson" && nx ? `<button class="btn ghost" id="toPath">Zum Lernpfad</button><button class="btn" id="goNext">Nächste Lektion</button>` : `<button class="btn" id="toPath">Fertig</button>`}
  </div></div>`;
  $("#toPath", m).addEventListener("click", () => { player = null; hooks.rerender(); });
  $("#goNext", m)?.addEventListener("click", () => startLesson(nx!.id));
}

export function renderReview(m: HTMLElement) {
  if (player) return renderPlayer(m);
  const ids = store.progress.review.filter(id => QUESTION_BY_ID[id]);
  if (!ids.length) {
    m.innerHTML = `<div class="section-title"><h2>Wiederholen</h2></div><div class="empty"><h3>Nichts zu wiederholen</h3><p>Jede Frage, die du falsch beantwortest, landet hier. So übst du gezielt deine Lücken, bis sie sitzen.</p><button class="btn" id="toLearn">Zum Lernpfad</button></div>`;
    $("#toLearn", m).addEventListener("click", () => { location.hash = "learn"; });
    return;
  }
  m.innerHTML = `<div class="section-title"><h2>Wiederholen</h2><span class="eyebrow">${ids.length} offene Fragen</span></div>
    <div class="panel"><p class="muted">Richtig beantwortete Fragen verschwinden aus der Liste. Pro Runde gibt es bis zu 8 Fragen.</p>
    <ul class="review-list">${ids.slice(0, 8).map(id => { const q = QUESTION_BY_ID[id]; return `<li><span>${esc(q.q)}</span><small>${esc(q.lesson.unit.title)}</small></li>`; }).join("")}</ul>
    <div class="actions"><button class="btn" id="startRev">Runde starten</button></div></div>`;
  $("#startRev", m).addEventListener("click", startReview);
}
