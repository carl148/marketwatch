import assert from "node:assert/strict";
import { test } from "node:test";
import { budget, inflation, kapitalertragsteuer, kredit, notgroschen, num, sanitizeQuiz, sparplan } from "../src/shared/calc.ts";

test("num liest deutsche und Formular-Schreibweise", () => {
  assert.equal(num("1.500,50"), 1500.5);
  assert.equal(num("0.2"), 0.2);
  assert.equal(num("0,2"), 0.2);
  assert.equal(num(7), 7);
  assert.equal(num("abc"), null);
  assert.equal(num(NaN), null);
  assert.equal(num(undefined), null);
});

test("Sparplan: 150 € monatlich, 7 %, 30 Jahre, 0,2 % Kosten", () => {
  const r = sparplan({ monatsrate: 150, rendite_prozent: 7, jahre: 30, kosten_prozent: 0.2 });
  assert.equal(r.eingezahlt, 54000);
  assert.equal(r.endwert, 169084);
  assert.equal(r.ertrag, r.endwert - r.eingezahlt);
  assert.equal(r.kosten_verlust, 6334);
  assert.equal(r.series.length, 31);
});

test("Sparplan begrenzt unsinnige Eingaben", () => {
  const r = sparplan({ monatsrate: -50, rendite_prozent: 500, jahre: 1000 });
  assert.equal(r.input.monatsrate, 0);
  assert.equal(r.input.rendite_prozent, 30);
  assert.equal(r.input.jahre, 60);
});

test("Sparplan ohne Rendite ergibt die Einzahlungen", () => {
  const r = sparplan({ startbetrag: 1000, monatsrate: 100, rendite_prozent: 0, jahre: 10, inflation_prozent: 0 });
  assert.equal(r.endwert, 13000);
  assert.equal(r.kaufkraft_heute, 13000);
});

test("Kredit: 2.400 € zu 7 % über 24 Monate", () => {
  const r = kredit({ betrag: 2400, effektivzins_prozent: 7, laufzeit_monate: 24 });
  assert.equal(r.monatsrate, 107.22);
  assert.equal(r.zinskosten, 173);
});

test("Kredit ohne Zinsen teilt den Betrag gleichmäßig", () => {
  assert.equal(kredit({ betrag: 1200, effektivzins_prozent: 0, laufzeit_monate: 12 }).monatsrate, 100);
});

test("Steuer: 1.800 € aus Aktien-ETF mit Teilfreistellung", () => {
  const r = kapitalertragsteuer({ kapitalertraege: 1800, aktien_etf_teilfreistellung: true });
  assert.equal(r.teilfreistellung_abzug, 540);
  assert.equal(r.steuerpflichtig, 260);
  assert.equal(r.abgeltungsteuer, 65);
  assert.equal(r.steuer_gesamt, 68.58);
});

test("Steuer: 26,375 % ohne Kirchensteuer über dem Freibetrag", () => {
  const r = kapitalertragsteuer({ kapitalertraege: 2000 });
  assert.equal(r.steuerpflichtig, 1000);
  assert.equal(r.steuer_gesamt, 263.75);
});

test("Steuer: Kirchensteuer 9 % senkt die Abgeltungsteuer", () => {
  const r = kapitalertragsteuer({ kapitalertraege: 2000, kirchensteuer_prozent: 9 });
  assert.equal(r.abgeltungsteuer, 244.5);
  assert.equal(r.kirchensteuer, 22);
  assert.equal(r.steuer_gesamt, 279.95);
});

test("Steuer: Paare haben 2.000 € Freibetrag, ungültige Kirchensteuer zählt als 0", () => {
  const r = kapitalertragsteuer({ kapitalertraege: 1500, zusammen_veranlagt: true, kirchensteuer_prozent: 50 });
  assert.equal(r.sparerpauschbetrag, 2000);
  assert.equal(r.steuer_gesamt, 0);
  assert.equal(r.input.kirchensteuer_prozent, 0);
});

test("Inflation und Budget", () => {
  const i = inflation({ betrag: 1000, jahre: 10, inflation_prozent: 2 });
  assert.equal(i.kaufkraft_spaeter, 820);
  assert.equal(i.preis_spaeter, 1219);
  const b = budget({ netto: 2000 });
  assert.deepEqual([b.soll_bedarf, b.soll_wuensche, b.soll_sparen], [1000, 600, 400]);
});

test("Notgroschen", () => {
  assert.deepEqual(notgroschen(1500, 4, 1000, 500), { ziel: 6000, monate_bis_ziel: 10 });
  assert.deepEqual(notgroschen(1500, 3, 9000, 500), { ziel: 4500, monate_bis_ziel: 0 });
  assert.equal(notgroschen(1500, 3, 0, 0).monate_bis_ziel, null);
});

test("Quiz: ungültige Fragen werden aussortiert", () => {
  const q = sanitizeQuiz({
    thema: "Test",
    fragen: [
      { frage: "Gut", antworten: ["a", "b", "c"], richtig: 1, erklaerung: "weil" },
      { frage: "Index zu groß", antworten: ["a", "b"], richtig: 5 },
      { frage: "Zu wenig Antworten", antworten: ["a"], richtig: 0 },
      "kein Objekt",
    ],
  });
  assert.equal(q?.fragen.length, 1);
  assert.equal(q?.fragen[0].frage, "Gut");
  assert.equal(sanitizeQuiz({ fragen: [] }), null);
});
