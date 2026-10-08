import { ACHIEVEMENTS, type AchievementId } from "./content.ts";
import { addDays, applyStreak, dayDiff, freshDaily, visibleStreak, type AccentId, type DailyCounters } from "./rules.ts";

// Alle Daten bleiben auf dem Gerät (localStorage). Es gibt keinen Server.

export interface Profile {
  name: string;
  accent: AccentId;
  theme: "system" | "light" | "dark";
  unlocked: AccentId[];
}

export interface Progress {
  xp: number;
  streak: number;
  best: number;
  lastDay: string | null;
  day: string | null;
  dayXp: number;
  /** Abgeschlossene Lektionen mit Stufe und Termin fürs Auffrischen. */
  done: Record<string, { score: number; at: string; stage?: number; due?: string }>;
  review: string[];
  /** Richtige Antworten insgesamt. */
  correct: number;
  /** Beantwortete Fragen insgesamt (für die Trefferquote). */
  answered: number;
  coins: number;
  freezes: number;
  challengesDone: number;
  /** XP pro Tag für den Aktivitätskalender. */
  history: Record<string, number>;
  daily: DailyCounters;
  profile: Profile;
  ach: Partial<Record<AchievementId, string>>;
}
export interface Settings { tab: string }

const KEYS = { progress: "fintelify.progress", settings: "fintelify.settings", calc: "fintelify.calc" };

const pad = (n: number) => String(n).padStart(2, "0");
const dayStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => dayStr(new Date());

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch { return fallback; }
}
function write(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

const freshProfile = (): Profile => ({ name: "", accent: "gruen", theme: "system", unlocked: ["gruen"] });
const freshProgress = (): Progress => ({
  xp: 0, streak: 0, best: 0, lastDay: null, day: null, dayXp: 0, done: {}, review: [], correct: 0, answered: 0,
  coins: 0, freezes: 0, challengesDone: 0, history: {}, daily: freshDaily(today()), profile: freshProfile(), ach: {},
});

function loadProgress(): Progress {
  const p = read<Progress>(KEYS.progress, freshProgress());
  p.profile = { ...freshProfile(), ...p.profile };
  p.daily = { ...freshDaily(today()), ...p.daily };
  return p;
}

export const store = {
  progress: loadProgress(),
  settings: read<Settings>(KEYS.settings, { tab: "learn" }),
  calc: read<Record<string, number>>(KEYS.calc, {}),

  saveProgress() { write(KEYS.progress, this.progress); },
  saveSettings() { write(KEYS.settings, this.settings); },
  saveCalc() { write(KEYS.calc, this.calc); },

  /** Löscht alle Daten der App auf diesem Gerät. */
  wipe() {
    for (const k of Object.values(KEYS)) { try { localStorage.removeItem(k); } catch { /* egal */ } }
    this.progress = freshProgress();
    this.settings = { tab: "learn" };
    this.calc = {};
  },
};

// ---- Lernfortschritt ----

export const liveStreak = () => visibleStreak(store.progress, today());
export const todayXp = () => (store.progress.day === today() ? store.progress.dayXp : 0);
export const levelOf = (xp: number) => { let n = 1; while (xp >= 50 * n * (n + 1)) n++; return n; };
export const levelStart = (n: number) => 50 * (n - 1) * n;

type Listener = (msg: string) => void;
let notify: Listener = () => {};
export function onNotify(fn: Listener) { notify = fn; }

/** Tageszähler für die Challenges; beginnt jeden Tag neu. */
export function daily(): DailyCounters {
  const p = store.progress;
  if (p.daily.day !== today()) p.daily = freshDaily(today());
  return p.daily;
}

export function bump(key: "lessons" | "correct" | "perfect" | "calc", n = 1) {
  daily()[key] += n;
  store.saveProgress();
}

/** Zählt eine beantwortete Frage für Trefferquote und Serie richtiger Antworten. */
export function recordAnswer(right: boolean) {
  const p = store.progress, d = daily();
  p.answered = (p.answered ?? 0) + 1;
  if (right) {
    p.correct = (p.correct ?? 0) + 1;
    d.correct++;
    d.comboNow++;
    d.combo = Math.max(d.combo, d.comboNow);
    if (p.correct >= 50) unlock("correct50");
  } else d.comboNow = 0;
  store.saveProgress();
}

export function addXp(n: number) {
  const p = store.progress;
  const t = today();
  const s = applyStreak(p, t);
  if (s.usedFreezes) { notify(`Serienschutz eingesetzt: Deine Lernserie von ${s.streak - 1} Tagen bleibt erhalten`); unlock("freeze"); }
  Object.assign(p, { streak: s.streak, lastDay: s.lastDay, freezes: s.freezes, best: s.best });
  if (p.day !== t) { p.day = t; p.dayXp = 0; }
  const before = levelOf(p.xp);
  p.xp += n;
  p.dayXp += n;
  p.history[t] = (p.history[t] ?? 0) + n;
  const days = Object.keys(p.history).sort();
  for (const old of days.slice(0, Math.max(0, days.length - 140))) delete p.history[old];
  if (p.streak >= 3) unlock("streak3");
  if (p.streak >= 7) unlock("streak7");
  if (p.xp >= 500) unlock("xp500");
  if (levelOf(p.xp) > before) notify(`Level ${levelOf(p.xp)} erreicht`);
  store.saveProgress();
}

export function addCoins(n: number) {
  store.progress.coins = (store.progress.coins ?? 0) + n;
  store.saveProgress();
}

export function unlock(id: AchievementId) {
  const p = store.progress;
  if (p.ach[id]) return;
  p.ach[id] = today();
  store.saveProgress();
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (a) setTimeout(() => notify(`Erfolg freigeschaltet: ${a.name}`), 500);
}

/** Setzt Farbschema und Akzentfarbe am Dokument. */
export function applyLook() {
  const { theme, accent } = store.progress.profile;
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme; else root.dataset.theme = theme;
  root.dataset.accent = accent;
}

/** Lektionen, die heute zum Auffrischen dran sind, die ältesten zuerst. */
export function dueLessons(): string[] {
  const t = today();
  return Object.entries(store.progress.done)
    .map(([id, d]) => ({ id, due: d.due ?? addDays(d.at, 1) }))
    .filter(x => dayDiff(x.due, t) >= 0)
    .sort((a, b) => a.due.localeCompare(b.due))
    .map(x => x.id);
}
