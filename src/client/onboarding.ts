import { GOAL_OPTIONS, LEVELS_OF_KNOWLEDGE, usernameError } from "./rules.ts";
import { store, unlock } from "./store.ts";
import { $, $$, esc } from "./ui.ts";

// Konto einrichten beim ersten Start: Willkommen, Benutzername, Tagesziel, Wissensstand.
// Alles bleibt auf dem Gerät; über einen Sicherungscode lässt es sich übertragen.

let step = 0;
const draft = { name: "", goal: GOAL_OPTIONS[1].xp as number, knowledge: "Einsteiger" };

export function needsOnboarding() { return !store.progress.profile.onboarded; }

export function renderOnboarding(m: HTMLElement, done: () => void) {
  const dots = `<div class="ob-dots" aria-hidden="true">${[0, 1, 2, 3].map(i => `<i class="${i === step ? "on" : i < step ? "done" : ""}"></i>`).join("")}</div>`;
  const back = step > 0 ? `<button class="btn ghost" id="obBack">Zurück</button>` : "";
  let body = "";
  if (step === 0) body = `
    <span class="coin big-coin" aria-hidden="true">F</span>
    <h2>Willkommen bei Fintelify</h2>
    <p class="muted">Lerne in wenigen Minuten am Tag, wie Geld funktioniert: Budget, Sparen, Investieren, Steuern und mehr. Mit kurzen Texten, Quizfragen und täglichen Challenges.</p>
    <div class="row-actions center"><button class="btn" id="obNext">Konto einrichten</button></div>
    <p class="muted small">Schon ein Konto auf einem anderen Gerät? Im Profil kannst du deinen Fortschritt mit einem Sicherungscode übertragen.</p>`;
  else if (step === 1) body = `
    <h2>Wie sollen wir dich nennen?</h2>
    <p class="muted">Dein Benutzername erscheint in deinem Profil.</p>
    <label class="sr-only" for="obName">Benutzername</label>
    <input id="obName" class="ob-input" maxlength="20" autocomplete="nickname" placeholder="z. B. sparfuchs_23" value="${esc(draft.name)}">
    <p class="ob-error" id="obErr" role="alert"></p>
    <div class="row-actions center">${back}<button class="btn" id="obNext">Weiter</button></div>`;
  else if (step === 2) body = `
    <h2>Wähle dein Tagesziel</h2>
    <p class="muted">Du kannst es später im Profil jederzeit ändern.</p>
    <div class="ob-options" role="radiogroup" aria-label="Tagesziel">${GOAL_OPTIONS.map(g => `<button class="ob-opt ${draft.goal === g.xp ? "sel" : ""}" role="radio" aria-checked="${draft.goal === g.xp}" data-goal="${g.xp}"><b>${g.name}</b><span>${g.xp} XP am Tag · ${g.hint}</span></button>`).join("")}</div>
    <div class="row-actions center">${back}<button class="btn" id="obNext">Weiter</button></div>`;
  else body = `
    <h2>Wie viel weißt du schon über Geld?</h2>
    <p class="muted">So wissen wir, wo du am besten startest.</p>
    <div class="ob-options" role="radiogroup" aria-label="Wissensstand">${LEVELS_OF_KNOWLEDGE.map(k => `<button class="ob-opt ${draft.knowledge === k ? "sel" : ""}" role="radio" aria-checked="${draft.knowledge === k}" data-know="${k}"><b>${k}</b><span>${{ Einsteiger: "Ich fange bei null an", Grundlagen: "Budget und Sparen kenne ich", Fortgeschritten: "Ich investiere schon" }[k]}</span></button>`).join("")}</div>
    <div class="row-actions center">${back}<button class="btn" id="obNext">Los geht's</button></div>`;

  m.innerHTML = `<section class="onboarding">${dots}<div class="ob-card">${body}</div></section>`;

  $("#obBack", m)?.addEventListener("click", () => { step--; renderOnboarding(m, done); });
  $$("[data-goal]", m).forEach(b => b.addEventListener("click", () => { draft.goal = Number(b.dataset.goal); renderOnboarding(m, done); }));
  $$("[data-know]", m).forEach(b => b.addEventListener("click", () => { draft.knowledge = b.dataset.know!; renderOnboarding(m, done); }));
  const name = $("#obName", m) as HTMLInputElement | null;
  if (name) { name.focus(); name.addEventListener("input", () => { draft.name = name.value; $("#obErr", m).textContent = ""; }); name.addEventListener("keydown", e => { if (e.key === "Enter") $("#obNext", m).click(); }); }

  $("#obNext", m).addEventListener("click", () => {
    if (step === 1) {
      const err = usernameError(draft.name);
      if (err) { $("#obErr", m).textContent = err; name?.focus(); return; }
    }
    if (step < 3) { step++; renderOnboarding(m, done); return; }
    const prof = store.progress.profile;
    prof.name = draft.name.trim();
    prof.dailyGoal = draft.goal;
    prof.knowledge = draft.knowledge;
    prof.onboarded = true;
    store.saveProgress();
    unlock("profile");
    done();
  });
}
