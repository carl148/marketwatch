import { ACHIEVEMENTS, type AchievementId } from "./content.ts";

// Alle Daten bleiben auf dem Gerät (localStorage). Es gibt keinen Server.

export interface Progress {
  xp: number;
  streak: number;
  lastDay: string | null;
  day: string | null;
  dayXp: number;
  done: Record<string, { score: number; at: string }>;
  review: string[];
  /** Richtige Antworten insgesamt. */
  correct: number;
  ach: Partial<Record<AchievementId, string>>;
}
export interface Settings { tab: string }

const KEYS = { progress: "fintelify.progress", settings: "fintelify.settings", calc: "fintelify.calc" };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch { return fallback; }
}
function write(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

const freshProgress = (): Progress => ({ xp: 0, streak: 0, lastDay: null, day: null, dayXp: 0, done: {}, review: [], correct: 0, ach: {} });

export const store = {
  progress: read<Progress>(KEYS.progress, freshProgress()),
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
const pad = (n: number) => String(n).padStart(2, "0");
const dayStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => dayStr(new Date());
export const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };

export const liveStreak = () => { const p = store.progress; return p.lastDay === today() || p.lastDay === yesterday() ? p.streak : 0; };
export const todayXp = () => (store.progress.day === today() ? store.progress.dayXp : 0);
export const levelOf = (xp: number) => { let n = 1; while (xp >= 50 * n * (n + 1)) n++; return n; };
export const levelStart = (n: number) => 50 * (n - 1) * n;

type Listener = (msg: string) => void;
let notify: Listener = () => {};
export function onNotify(fn: Listener) { notify = fn; }

export function addXp(n: number) {
  const p = store.progress;
  const t = today();
  if (p.lastDay !== t) { p.streak = p.lastDay === yesterday() ? p.streak + 1 : 1; p.lastDay = t; }
  if (p.day !== t) { p.day = t; p.dayXp = 0; }
  const before = levelOf(p.xp);
  p.xp += n;
  p.dayXp += n;
  if (p.streak >= 3) unlock("streak3");
  if (p.streak >= 7) unlock("streak7");
  if (p.xp >= 500) unlock("xp500");
  if (levelOf(p.xp) > before) notify(`Level ${levelOf(p.xp)} erreicht`);
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
