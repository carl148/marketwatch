import { redrawCharts } from "./chart.ts";
import { DAILY_GOAL } from "./content.ts";
import { closePlayer, initLearn, inPlayer, renderLearn, renderReview } from "./learn.ts";
import { initProfile, renderProfile } from "./profile-view.ts";
import { applyLook, liveStreak, onNotify, store, today, todayXp } from "./store.ts";
import { renderTools } from "./tools-view.ts";
import { $, $$, toast } from "./ui.ts";

const TABS = ["learn", "tools", "review", "profile"] as const;
type Tab = (typeof TABS)[number];
let tab: Tab = "learn";

function renderStats() {
  const p = store.progress;
  $("#streakNum").textContent = String(liveStreak());
  $("#streakStat").classList.toggle("off", p.lastDay !== today());
  $("#xpNum").textContent = p.xp.toLocaleString("de-DE");
  $("#coinNum").textContent = String(p.coins ?? 0);
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
  else renderProfile(m);
}

function go(t: string) {
  const next = t === "more" ? "profile" : (TABS as readonly string[]).includes(t) ? (t as Tab) : "learn";
  if (inPlayer() && next !== tab) closePlayer();
  tab = next;
  store.settings.tab = tab;
  store.saveSettings();
  render();
  window.scrollTo(0, 0);
}

onNotify(toast);
initLearn({ rerender: render, stats: renderStats });
initProfile({ rerender: render, stats: renderStats, wiped: () => go("learn") });
applyLook();

$$("[data-tab]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); location.hash = b.dataset.tab!; }));
window.addEventListener("hashchange", () => go(location.hash.slice(1)));
window.addEventListener("resize", () => redrawCharts());
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => redrawCharts());

go(location.hash.slice(1) || store.settings.tab || "learn");

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => { /* App funktioniert auch ohne */ });
}
