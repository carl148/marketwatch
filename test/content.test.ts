import assert from "node:assert/strict";
import { test } from "node:test";
import { ACHIEVEMENTS, ALL_LESSONS, UNITS } from "../src/client/content.ts";

test("100 Lektionen mit eindeutigen IDs", () => {
  assert.equal(ALL_LESSONS.length, 100);
  const ids = ALL_LESSONS.map(l => l.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(UNITS.map(u => u.id)).size, UNITS.length);
});

test("Jede Lektion hat Lernkarten und gültige Quizfragen", () => {
  for (const l of ALL_LESSONS) {
    assert.ok(l.cards.length >= 2, `${l.id}: zu wenige Karten`);
    assert.ok(l.qs.length >= 2, `${l.id}: zu wenige Fragen`);
    for (const q of l.qs) {
      assert.ok(q.a.length >= 2, `${l.id}: zu wenige Antworten`);
      assert.ok(Number.isInteger(q.c) && q.c >= 0 && q.c < q.a.length, `${l.id}: richtige Antwort fehlt bei "${q.q}"`);
      assert.equal(new Set(q.a).size, q.a.length, `${l.id}: doppelte Antwort bei "${q.q}"`);
      assert.ok(q.e.trim(), `${l.id}: Erklärung fehlt`);
    }
  }
});

test("Erfolge haben eindeutige IDs", () => {
  assert.equal(new Set(ACHIEVEMENTS.map(a => a.id)).size, ACHIEVEMENTS.length);
});

test("Lexikon: eindeutige Begriffe und gültige Verweise auf Lektionen", async () => {
  const { GLOSSARY } = await import("../src/client/glossary.ts");
  assert.ok(GLOSSARY.length >= 50);
  assert.equal(new Set(GLOSSARY.map(g => g.t)).size, GLOSSARY.length);
  const ids = new Set(ALL_LESSONS.map(l => l.id));
  for (const g of GLOSSARY) if (g.l) assert.ok(ids.has(g.l), `${g.t}: Lektion ${g.l} fehlt`);
});
