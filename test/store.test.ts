import assert from "node:assert/strict";
import { test } from "node:test";
import { exportCode, grantWeeklyFreeze, importCode, setPremium, store } from "../src/client/store.ts";

test("Sicherungscode: Export und Import ergeben denselben Fortschritt", () => {
  store.progress.xp = 1234;
  store.progress.profile.name = "Jörg_Test";
  store.progress.done.b1 = { score: 3, at: "2026-10-01", stage: 1, due: "2026-10-04" };
  const code = exportCode();
  store.progress.xp = 0;
  store.progress.profile.name = "";
  importCode(code);
  assert.equal(store.progress.xp, 1234);
  assert.equal(store.progress.profile.name, "Jörg_Test");
  assert.equal(store.progress.done.b1.stage, 1);
  assert.throws(() => importCode("kein code"), /ungültig/);
  assert.throws(() => importCode(btoa(JSON.stringify({ app: "andere" }))), /kein Sicherungscode/);
});

test("Premium: wöchentlicher Serienschutz einmal pro Woche, Grenze beim Deaktivieren", () => {
  store.progress.freezes = 0;
  setPremium(true);
  store.progress.profile.premiumFreezeWeek = undefined;
  assert.equal(grantWeeklyFreeze(), true);
  assert.equal(grantWeeklyFreeze(), false, "nur einmal pro Woche");
  assert.equal(store.progress.freezes, 1);
  store.progress.freezes = 3;
  setPremium(false);
  assert.equal(store.progress.freezes, 2, "ohne Premium höchstens 2");
  assert.equal(grantWeeklyFreeze(), false);
});
