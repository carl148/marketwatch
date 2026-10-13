import { celebrate, flushCelebrations } from "./celebrate.ts";
import { redrawCharts } from "./chart.ts";
import { closePlayer, initLearn, inPlayer, openChallenges, readyChallenges, renderLearn, renderReview } from "./learn.ts";
import { renderLexicon } from "./lexicon-view.ts";
import { needsLogin, renderLogin } from "./login.ts";
import { needsOnboarding, renderOnboarding } from "./onboarding.ts";
import { initPremium, renderPremium } from "./premium.ts";
import { initProfile, renderProfile } from "./profile-view.ts";
import { stopSprint } from "./sprint.ts";
import { applyLook, dueLessons, grantWeeklyFreeze, isPremium, liveStreak, onLevelUp, onNotify, store, today } from "./store.ts";
import { renderTools } from "./tools-view.ts";
import { $, $$, toast } from "./ui.ts";

const TABS = ["learn", "review", "tools", "lexicon", "profile", "premium"] as const;
type Tab = (typeof TABS)[number];
let tab: Tab = "learn";

let shown = { coins: -1 };

/** Kurzer Impuls an einer Anzeige in der Kopfzeile, wenn der Wert steigt. */
function pulse(id: string) {
  const el = $(id);
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function renderStats() {
  const p = store.progress;
  if (shown.coins >= 0 && (p.coins ?? 0) > shown.coins) pulse("#coinStat");
  shown = { coins: p.coins ?? 0 };
  const name = p.profile.name || "Fintelify";
  $("#helloName").textContent = name;
  $("#avatarBtn").textContent = name.charAt(0).toUpperCase();
  $("#streakNum").textContent = String(liveStreak());
  $("#streakStat").classList.toggle("off", p.lastDay !== today());
  $("#coinNum").textContent = String(p.coins ?? 0);
  // Glocke: Punkt, wenn eine Challenge abholbereit ist oder Lektionen zum Auffrischen fällig sind.
  $("#bellDot").hidden = !(readyChallenges() || dueLessons().length);
  const n = p.review.length;
  const badge = $("#reviewBadge");
  badge.hidden = !n;
  badge.textContent = String(n);
}

function render() {
  const m0 = $("#main");
  document.body.classList.toggle("login-active", needsLogin());
  if (needsLogin()) { renderLogin(m0, () => { document.body.classList.remove("login-active"); render(); window.scrollTo(0, 0); }); return; }
  document.body.classList.toggle("onboarding-active", needsOnboarding());
  if (needsOnboarding()) { renderOnboarding(m0, () => { document.body.classList.remove("onboarding-active"); go("learn"); }); return; }
  document.body.classList.toggle("premium", isPremium());
  document.body.classList.toggle("in-player", inPlayer());
  renderStats();
  $$("[data-tab]").forEach(b => b.setAttribute("aria-current", String(b.dataset.tab === tab)));
  const m = $("#main");
  m.dataset.tab = tab;
  if (tab === "learn") renderLearn(m);
  else if (tab === "tools") renderTools(m);
  else if (tab === "review") renderReview(m);
  else if (tab === "lexicon") renderLexicon(m);
  else if (tab === "premium") renderPremium(m);
  else renderProfile(m);
  // Feiern nie mitten in einer Lektion zeigen; dort übernimmt das Ergebnis.
  if (!inPlayer()) setTimeout(() => void flushCelebrations(), 300);
}

function go(t: string) {
  const next = t === "more" ? "profile" : (TABS as readonly string[]).includes(t) ? (t as Tab) : "learn";
  if (inPlayer() && next !== tab) closePlayer();
  if (next !== tab) stopSprint();
  tab = next;
  store.settings.tab = tab;
  store.saveSettings();
  render();
  window.scrollTo(0, 0);
}

onNotify(toast);
onLevelUp(level => celebrate({ kind: "level", level }));
initLearn({ rerender: render, stats: renderStats });
initProfile({ rerender: render, stats: renderStats, wiped: () => go("learn") });
initPremium({ rerender: render, stats: renderStats });
applyLook();
if (grantWeeklyFreeze()) setTimeout(() => toast("Premium: Dein wöchentlicher Serienschutz ist da"), 800);

$$("[data-tab]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); location.hash = b.dataset.tab!; }));
$("#bell").addEventListener("click", e => {
  e.preventDefault();
  openChallenges();
  if (tab !== "learn") location.hash = "learn";
  requestAnimationFrame(() => $("#challenges")?.scrollIntoView({ behavior: "smooth", block: "start" }));
});
window.addEventListener("hashchange", () => go(location.hash.slice(1)));
window.addEventListener("resize", () => redrawCharts());
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => redrawCharts());

go(location.hash.slice(1) || store.settings.tab || "learn");

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => { /* App funktioniert auch ohne */ });
}
