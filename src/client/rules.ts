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
  /** Erstmals abgeschlossene Lektionen heute (für das Tageslimit). */
  newLessons: number;
  correct: number;
  perfect: number;
  combo: number;
  comboNow: number;
  calc: number;
  sprint: number;
  claimed: string[];
}
export const freshDaily = (day: string): DailyCounters => ({ day, lessons: 0, newLessons: 0, correct: 0, perfect: 0, combo: 0, comboNow: 0, calc: 0, sprint: 0, claimed: [] });

type Metric = "lessons" | "correct" | "perfect" | "combo" | "calc" | "sprint" | "xp";
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
  { id: "sprint", text: "Spiele einen Wissens-Sprint", metric: "sprint", target: 1, coins: 10 },
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/**
 * Drei Challenges pro Tag, für alle Nutzer am selben Tag gleich. Nie zwei mit derselben Messgröße.
 * Den Sprint gibt es erst, wenn genug Lektionen für Sprint-Fragen geschafft sind.
 */
export function challengesFor(day: string, opts: { sprint?: boolean } = {}): Challenge[] {
  const pool = CHALLENGE_POOL.filter(c => opts.sprint || c.metric !== "sprint");
  const order = pool.map(c => ({ c, k: hash(day + c.id) })).sort((a, b) => a.k - b.k).map(x => x.c);
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

// ---- Lerntempo und Auffrischen ----

/** Neue Lektionen pro Tag. Wiederholen, Auffrischen und Üben sind unbegrenzt. */
export const NEW_LESSONS_PER_DAY = 3;

/** Abstände in Tagen, nach denen eine Lektion wieder zum Auffrischen kommt. */
export const REFRESH_DAYS = [1, 3, 7, 14, 30, 60];

export function addDays(day: string, n: number): string {
  const d = new Date(Date.UTC(+day.slice(0, 4), +day.slice(5, 7) - 1, +day.slice(8, 10) + n));
  return d.toISOString().slice(0, 10);
}

/** Nächste Stufe nach dem Auffrischen: bestanden geht es weiter, sonst beginnt der Abstand von vorn. */
export function nextRefresh(stage: number, passed: boolean, today: string): { stage: number; due: string } {
  const next = passed ? Math.min(stage + 1, REFRESH_DAYS.length - 1) : 0;
  return { stage: next, due: addDays(today, REFRESH_DAYS[next]) };
}

// ---- Ränge, Prüfungen, Sprint ----

export const RANKS: [number, string][] = [[1, "Einsteiger"], [3, "Sparfuchs"], [5, "Finanzkenner"], [8, "Börsenprofi"], [12, "Finanzmeister"], [16, "Geldgenie"]];
export const rankOf = (level: number) => RANKS.filter(([l]) => level >= l).at(-1)![1];

/** Münzen als Belohnung je erreichtem Level. */
export const LEVEL_UP_COINS = 20;

/** Kapitelprüfung: Zahl der Fragen und Anteil zum Bestehen. */
export const EXAM_QUESTIONS = 10;
export const EXAM_PASS = 0.8;
export const examPassed = (correct: number, total: number) => total > 0 && correct / total >= EXAM_PASS;

/** Sterne für eine Lektion: Anteil richtiger Antworten auf 0 bis 3 Sterne. */
export const starsFor = (correct: number, total: number) => (total ? Math.round((correct / total) * 3) : 0);

export const SPRINT_SECONDS = 60;
/** Mindestzahl gelernter Fragen, damit ein Sprint Sinn ergibt. */
export const SPRINT_MIN_QUESTIONS = 6;

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
