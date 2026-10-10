import assert from "node:assert/strict";
import { test } from "node:test";
import { applyStreak, challengeValue, challengesFor, dayDiff, freshDaily, visibleStreak } from "../src/client/rules.ts";

const base = { streak: 4, lastDay: "2026-10-05", freezes: 0, best: 4 };

test("dayDiff zählt Kalendertage, auch über Monatsgrenzen", () => {
  assert.equal(dayDiff("2026-10-05", "2026-10-06"), 1);
  assert.equal(dayDiff("2026-09-30", "2026-10-01"), 1);
  assert.equal(dayDiff("2026-12-31", "2027-01-02"), 2);
  assert.equal(dayDiff("2026-03-28", "2026-03-30"), 2); // Zeitumstellung
});

test("Serie: am selben Tag unverändert, am Folgetag +1", () => {
  assert.equal(applyStreak(base, "2026-10-05").streak, 4);
  const s = applyStreak(base, "2026-10-06");
  assert.deepEqual([s.streak, s.best, s.usedFreezes], [5, 5, 0]);
});

test("Serie: ohne Serienschutz beginnt sie nach einer Lücke neu", () => {
  const s = applyStreak(base, "2026-10-07");
  assert.equal(s.streak, 1);
  assert.equal(s.best, 4);
});

test("Serie: Serienschutz überbrückt verpasste Tage", () => {
  const one = applyStreak({ ...base, freezes: 1 }, "2026-10-07");
  assert.deepEqual([one.streak, one.freezes, one.usedFreezes], [5, 0, 1]);
  const two = applyStreak({ ...base, freezes: 2 }, "2026-10-08");
  assert.deepEqual([two.streak, two.freezes, two.usedFreezes], [5, 0, 2]);
  const notEnough = applyStreak({ ...base, freezes: 1 }, "2026-10-08");
  assert.deepEqual([notEnough.streak, notEnough.freezes], [1, 1]);
});

test("Erster Lerntag startet die Serie bei 1", () => {
  assert.equal(applyStreak({ streak: 0, lastDay: null, freezes: 0, best: 0 }, "2026-10-05").streak, 1);
});

test("Angezeigte Serie bleibt sichtbar, solange sie zu retten ist", () => {
  assert.equal(visibleStreak(base, "2026-10-06"), 4);
  assert.equal(visibleStreak(base, "2026-10-07"), 0);
  assert.equal(visibleStreak({ ...base, freezes: 1 }, "2026-10-07"), 4);
  assert.equal(visibleStreak({ ...base, lastDay: null }, "2026-10-07"), 0);
});

test("Challenges: drei pro Tag, stabil, mit verschiedenen Messgrößen", () => {
  for (const day of ["2026-10-08", "2026-10-09", "2026-11-01", "2027-02-14"]) {
    const a = challengesFor(day);
    assert.equal(a.length, 3);
    assert.deepEqual(a, challengesFor(day));
    assert.equal(new Set(a.map(c => c.metric)).size, 3);
  }
  const days = Array.from({ length: 14 }, (_, i) => `2026-10-${String(i + 1).padStart(2, "0")}`);
  assert.ok(new Set(days.map(d => challengesFor(d).map(c => c.id).join())).size > 3, "Challenges wechseln von Tag zu Tag");
});

test("Challenge-Fortschritt liest Tageszähler und Tages-XP", () => {
  const d = { ...freshDaily("2026-10-08"), correct: 7 };
  assert.equal(challengeValue({ id: "c", text: "", metric: "correct", target: 5, coins: 1 }, d, 0), 7);
  assert.equal(challengeValue({ id: "g", text: "", metric: "xp", target: 30, coins: 1 }, d, 42), 42);
});

test("Auffrischen: Abstände wachsen, Fehler setzen zurück", async () => {
  const { addDays, nextRefresh, REFRESH_DAYS } = await import("../src/client/rules.ts");
  assert.equal(addDays("2026-12-30", 3), "2027-01-02");
  assert.equal(addDays("2026-03-28", 2), "2026-03-30");
  assert.deepEqual(nextRefresh(-1, true, "2026-10-08"), { stage: 0, due: "2026-10-09" });
  assert.deepEqual(nextRefresh(0, true, "2026-10-09"), { stage: 1, due: "2026-10-12" });
  assert.deepEqual(nextRefresh(3, false, "2026-10-09"), { stage: 0, due: "2026-10-10" });
  const last = REFRESH_DAYS.length - 1;
  assert.equal(nextRefresh(last, true, "2026-10-09").stage, last);
});

test("Sterne, Prüfung und Sprint-Challenge", async () => {
  const { starsFor, examPassed, challengesFor, rankOf } = await import("../src/client/rules.ts");
  assert.deepEqual([0, 1, 2, 3].map(c => starsFor(c, 3)), [0, 1, 2, 3]);
  assert.equal(examPassed(8, 10), true);
  assert.equal(examPassed(7, 10), false);
  assert.equal(examPassed(0, 0), false);
  for (let i = 1; i <= 28; i++) {
    const day = `2026-02-${String(i).padStart(2, "0")}`;
    assert.ok(challengesFor(day).every(c => c.metric !== "sprint"), "ohne Freigabe kein Sprint");
  }
  assert.equal(rankOf(1), "Einsteiger");
  assert.equal(rankOf(5), "Finanzkenner");
  assert.equal(rankOf(40), "Geldgenie");
});
