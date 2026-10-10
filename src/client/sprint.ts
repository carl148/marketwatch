import { QUESTION_BY_ID } from "./content.ts";
import { SPRINT_MIN_QUESTIONS, SPRINT_SECONDS } from "./rules.ts";
import { addCoins, addXp, bump, recordAnswer, store, unlock } from "./store.ts";
import { $, $$, esc } from "./ui.ts";

// Wissens-Sprint: 60 Sekunden, Fragen aus bereits geschafften Lektionen,
// jede richtige Antwort ist ein Punkt. Der Bestwert wird gespeichert.

interface Run { pool: string[]; idx: number; score: number; answered: number; ends: number; timer: number; tick: number; lock: boolean }
let run: Run | null = null;
let box: HTMLElement | null = null;
let onChange = () => {};

export function stopSprint() {
  if (run) { clearTimeout(run.timer); clearInterval(run.tick); }
  run = null;
}

const shuffle = <T,>(a: T[]) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export function mountSprint(el: HTMLElement, learned: string[], changed: () => void) {
  box = el;
  onChange = changed;
  if (run) return renderQuestion();
  const best = store.progress.sprintBest ?? 0;
  if (learned.length < SPRINT_MIN_QUESTIONS) {
    el.innerHTML = `<div class="sprint-card"><span class="eyebrow">Wissens-Sprint</span><h3>${SPRINT_SECONDS} Sekunden, so viele richtige Antworten wie möglich</h3>
      <p class="muted">Schließe zuerst zwei Lektionen ab. Der Sprint fragt nur Wissen ab, das du schon gelernt hast.</p></div>`;
    return;
  }
  el.innerHTML = `<div class="sprint-card">
    <span class="eyebrow">Wissens-Sprint</span>
    <h3>${SPRINT_SECONDS} Sekunden, so viele richtige Antworten wie möglich</h3>
    <p class="muted">Fragen aus ${learned.length / 3} geschafften Lektionen. Jede richtige Antwort bringt einen Punkt und 3 XP.</p>
    <div class="row-actions"><button class="btn" id="sprintGo">Sprint starten</button><span class="muted small">Bestwert: <b class="num">${best}</b></span></div>
  </div>`;
  $("#sprintGo", el).addEventListener("click", () => start(learned));
}

function start(learned: string[]) {
  stopSprint();
  const ends = Date.now() + SPRINT_SECONDS * 1000;
  run = { pool: shuffle([...learned]), idx: 0, score: 0, answered: 0, ends, timer: 0, tick: 0, lock: false };
  run.timer = window.setTimeout(finish, SPRINT_SECONDS * 1000);
  run.tick = window.setInterval(updateClock, 250);
  bump("sprint");
  renderQuestion();
}

function secondsLeft() { return run ? Math.max(0, Math.ceil((run.ends - Date.now()) / 1000)) : 0; }

function updateClock() {
  if (!run || !box?.isConnected) return;
  const left = secondsLeft();
  const t = $("#sprintClock", box);
  if (t) t.textContent = `${left} s`;
  $(".sprint-time", box)?.classList.toggle("low", left <= 10);
}

function renderQuestion() {
  if (!run || !box) return;
  if (run.idx >= run.pool.length) { run.pool = shuffle(run.pool); run.idx = 0; }
  const q = QUESTION_BY_ID[run.pool[run.idx]];
  const order = shuffle(q.a.map((_, i) => i));
  const remainingMs = Math.max(0, run.ends - Date.now());
  box.innerHTML = `<div class="sprint-card" id="sprintCard">
    <div class="sprint-top"><span>Punkte <span class="sprint-score num" id="sprintScore">${run.score}</span></span><span class="num" id="sprintClock">${secondsLeft()} s</span></div>
    <div class="sprint-time"><i style="--t:${remainingMs}ms;--f:${(remainingMs / (SPRINT_SECONDS * 1000)).toFixed(3)}"></i></div>
    <p class="sprint-q">${esc(q.q)}</p>
    <div class="opts">${order.map(i => `<button class="opt" data-i="${i}">${esc(q.a[i])}</button>`).join("")}</div>
    <div class="row-actions"><button class="linkbtn" id="sprintStop">Sprint beenden</button></div>
  </div>`;
  updateClock();
  $$(".opt", box).forEach(b => b.addEventListener("click", () => answer(Number(b.dataset.i), q.c)));
  $("#sprintStop", box).addEventListener("click", finish);
}

function answer(i: number, correct: number) {
  if (!run || run.lock || !box) return;
  run.lock = true;
  const right = i === correct;
  run.answered++;
  recordAnswer(right);
  if (right) run.score++;
  const card = $("#sprintCard", box);
  card.classList.add(right ? "flash-good" : "flash-bad");
  $$(".opt", box).forEach(b => {
    const k = Number(b.dataset.i);
    if (k === correct) b.classList.add("right");
    else if (k === i) b.classList.add("wrong");
    (b as HTMLButtonElement).disabled = true;
  });
  $("#sprintScore", box).textContent = String(run.score);
  setTimeout(() => {
    if (!run) return;
    run.lock = false;
    run.idx++;
    renderQuestion();
  }, right ? 350 : 900);
}

function finish() {
  if (!run) return;
  const { score, answered } = run;
  stopSprint();
  const p = store.progress;
  const record = score > (p.sprintBest ?? 0);
  p.sprintBest = Math.max(p.sprintBest ?? 0, score);
  p.sprints = (p.sprints ?? 0) + 1;
  store.saveProgress();
  const xp = score * 3, coins = Math.floor(score / 2);
  if (xp) addXp(xp);
  if (coins) addCoins(coins);
  if (score >= 10) unlock("sprint10");
  onChange();
  if (!box?.isConnected) return;
  box.innerHTML = `<div class="sprint-card result">
    <span class="eyebrow">Sprint beendet</span>
    <div class="big-score num">${score}</div>
    <h3>${record && score > 0 ? "Neuer Bestwert!" : score >= 10 ? "Starke Runde!" : "Gut gemacht!"}</h3>
    <p class="muted">${score} von ${answered} richtig · +${xp} XP${coins ? ` · +${coins} Münzen` : ""}</p>
    <div class="row-actions"><button class="btn" id="sprintAgain">Nochmal</button><span class="muted small">Bestwert: <b class="num">${p.sprintBest}</b></span></div>
  </div>`;
  $("#sprintAgain", box).addEventListener("click", () => onChange());
}
