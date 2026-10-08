// Spielregeln ohne Browser-Abhängigkeiten, damit sie sich testen lassen:
// Lernserie mit Serienschutz und die täglichen Challenges.

/** Tage zwischen zwei Daten im Format JJJJ-MM-TT (b minus a). */
export function dayDiff(a: string, b: string): number {
  const t = (s: string) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
  return Math.round((t(b) - t(a)) / 86_400_000);
}

export interface StreakState { streak: number; lastDay: string | null; freezes: number; best: number }

/**
 * Wendet einen Lerntag auf die Serie an. Fehlende Tage werden mit Serienschutz
 * überbrückt, solange genug davon da ist; sonst beginnt die Serie neu.
 */
export function applyStreak(s: StreakState, today: string): StreakState & { usedFreezes: number } {
  if (s.lastDay === today) return { ...s, usedFreezes: 0 };
  const gap = s.lastDay ? dayDiff(s.lastDay, today) : Infinity;
  let { streak, freezes } = s;
  let usedFreezes = 0;
  if (gap === 1) streak += 1;
  else if (gap > 1 && gap - 1 <= freezes) { usedFreezes = gap - 1; freezes -= usedFreezes; streak += 1; }
  else streak = 1;
  return { streak, lastDay: today, freezes, best: Math.max(s.best, streak), usedFreezes };
}

/** Serie, wie sie heute angezeigt wird: noch zu retten, solange der Serienschutz die Lücke deckt. */
export function visibleStreak(s: StreakState, today: string): number {
  if (!s.lastDay) return 0;
  const gap = dayDiff(s.lastDay, today);
  if (gap <= 1) return s.streak;
  return gap - 1 <= s.freezes ? s.streak : 0;
}

// ---- Tages-Challenges ----

export interface DailyCounters {
  day: string;
  lessons: number;
  correct: number;
  perfect: number;
  combo: number;
  comboNow: number;
  calc: number;
  claimed: string[];
}
export const freshDaily = (day: string): DailyCounters => ({ day, lessons: 0, correct: 0, perfect: 0, combo: 0, comboNow: 0, calc: 0, claimed: [] });

type Metric = "lessons" | "correct" | "perfect" | "combo" | "calc" | "xp";
export interface Challenge { id: string; text: string; metric: Metric; target: number; coins: number }

export const CHALLENGE_POOL: Challenge[] = [
  { id: "lesson1", text: "Schließe eine Lektion ab", metric: "lessons", target: 1, coins: 10 },
  { id: "lesson2", text: "Schließe zwei Lektionen ab", metric: "lessons", target: 2, coins: 20 },
  { id: "correct5", text: "Beantworte 5 Fragen richtig", metric: "correct", target: 5, coins: 10 },
  { id: "correct10", text: "Beantworte 10 Fragen richtig", metric: "correct", target: 10, coins: 15 },
  { id: "goal", text: "Erreiche dein Tagesziel von 30 XP", metric: "xp", target: 30, coins: 15 },
  { id: "perfect", text: "Schließe eine Lektion ohne Fehler ab", metric: "perfect", target: 1, coins: 20 },
  { id: "combo3", text: "Beantworte 3 Fragen hintereinander richtig", metric: "combo", target: 3, coins: 10 },
  { id: "calc", text: "Rechne etwas mit einem der Rechner aus", metric: "calc", target: 1, coins: 5 },
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** Drei Challenges pro Tag, für alle Nutzer am selben Tag gleich. Nie zwei mit derselben Messgröße. */
export function challengesFor(day: string): Challenge[] {
  const order = CHALLENGE_POOL.map(c => ({ c, k: hash(day + c.id) })).sort((a, b) => a.k - b.k).map(x => x.c);
  const out: Challenge[] = [];
  for (const c of order) {
    if (out.some(x => x.metric === c.metric)) continue;
    out.push(c);
    if (out.length === 3) break;
  }
  return out;
}

export function challengeValue(c: Challenge, d: DailyCounters, dayXp: number): number {
  return c.metric === "xp" ? dayXp : d[c.metric];
}

// ---- Shop ----
export const FREEZE_PRICE = 30;
export const MAX_FREEZES = 2;
export const ACCENTS = [
  { id: "gruen", name: "Grün", price: 0 },
  { id: "blau", name: "Blau", price: 40 },
  { id: "violett", name: "Violett", price: 40 },
  { id: "orange", name: "Orange", price: 40 },
] as const;
export type AccentId = (typeof ACCENTS)[number]["id"];
