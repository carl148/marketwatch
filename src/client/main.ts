import { redrawCharts } from "./chart.ts";
import { initCoach, renderCoach } from "./coach-view.ts";
import { DAILY_GOAL } from "./content.ts";
import { closePlayer, initLearn, inPlayer, renderLearn, renderReview } from "./learn.ts";
import { liveStreak, onNotify, store, today, todayXp } from "./store.ts";
import { renderTools } from "./tools-view.ts";
import { $, $$, toast } from "./ui.ts";

const TABS = ["learn", "tools", "review", "coach", "more"] as const;
type Tab = (typeof TABS)[number];
let tab: Tab = "learn";
let coachPrefill: string | undefined;

function renderStats() {
  const p = store.progress;
  $("#streakNum").textContent = String(liveStreak());
  $("#streakStat").classList.toggle("off", p.lastDay !== today());
  $("#xpNum").textContent = p.xp.toLocaleString("de-DE");
  const tx = todayXp();
  ($("#goalFill") as HTMLElement).style.width = `${Math.min(100, (tx / DAILY_GOAL) * 100)}%`;
  $("#goalNum").textContent = `${Math.min(tx, DAILY_GOAL)}/${DAILY_GOAL}`;
  const n = p.review.length;
  const badge = $("#reviewBadge");
  badge.hidden = !n;
  badge.textContent = String(n);
}

function render() {
  renderStats();
  $$("[data-tab]").forEach(b => b.setAttribute("aria-current", String(b.dataset.tab === tab)));
  const m = $("#main");
  m.dataset.tab = tab;
  if (tab === "learn") renderLearn(m);
  else if (tab === "tools") renderTools(m);
  else if (tab === "review") renderReview(m);
  else if (tab === "coach") { renderCoach(m, coachPrefill); coachPrefill = undefined; }
  else renderMore(m);
}

function go(t: string) {
  const next = (TABS as readonly string[]).includes(t) ? (t as Tab) : "learn";
  if (inPlayer() && next !== tab) closePlayer();
  tab = next;
  store.settings.tab = tab;
  store.saveSettings();
  render();
  window.scrollTo(0, 0);
}

function renderMore(m: HTMLElement) {
  m.innerHTML = `
    <div class="section-title"><h2>Mehr</h2></div>
    <div class="panel stack">
      <h3>Deine Daten</h3>
      <p class="muted">Lernfortschritt, Profil und Gespräche speichert Groschen nur auf diesem Gerät. Fragen an den Coach werden über unseren Server an Claude (Anthropic) gesendet. Unser Server speichert die Inhalte nicht. Details stehen in der Datenschutzerklärung.</p>
      <div class="row-actions"><button class="btn ghost" id="wipe">Alle Daten auf diesem Gerät löschen</button></div>
      <div id="wipeConfirm" hidden class="confirm">
        <p>Wirklich alles löschen? Lernfortschritt, Profil und Gespräche sind danach weg.</p>
        <div class="row-actions"><button class="btn danger" id="wipeYes">Ja, löschen</button><button class="btn ghost" id="wipeNo">Abbrechen</button></div>
      </div>
    </div>
    <div class="panel stack">
      <h3>Über Groschen</h3>
      <p class="muted">Groschen vermittelt Finanzwissen für Deutschland. Inhalte und Coach dienen der allgemeinen Information und ersetzen keine individuelle Anlage-, Steuer- oder Rechtsberatung.</p>
      <p><a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/nutzungsbedingungen">Nutzungsbedingungen</a></p>
    </div>`;
  $("#wipe", m).addEventListener("click", () => { $("#wipeConfirm", m).hidden = false; });
  $("#wipeNo", m).addEventListener("click", () => { $("#wipeConfirm", m).hidden = true; });
  $("#wipeYes", m).addEventListener("click", () => { store.wipe(); toast("Alle Daten gelöscht"); go("learn"); });
}

onNotify(toast);
initLearn({
  rerender: render,
  stats: renderStats,
  askCoach: q => { coachPrefill = q; location.hash = "coach"; },
});
initCoach(renderStats);

$$("[data-tab]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); location.hash = b.dataset.tab!; }));
window.addEventListener("hashchange", () => go(location.hash.slice(1)));
window.addEventListener("resize", () => redrawCharts());
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => redrawCharts());

go(location.hash.slice(1) || store.settings.tab || "learn");

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("/sw.js").catch(() => { /* App funktioniert auch ohne */ });
}
