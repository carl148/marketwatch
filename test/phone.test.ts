import assert from "node:assert/strict";
import { test } from "node:test";
import { COUNTRIES, countryByIso, countryFromDigits, searchCountries } from "../src/client/countries.ts";
import { formatPhone, normalizePhone } from "../src/client/phone.ts";

const DE = countryByIso("DE")!;

test("Länderliste: vollständig, eindeutige ISO-Codes, gültige Vorwahlen", () => {
  assert.ok(COUNTRIES.length >= 230, `nur ${COUNTRIES.length} Länder`);
  assert.equal(new Set(COUNTRIES.map(c => c.iso)).size, COUNTRIES.length);
  for (const c of COUNTRIES) assert.match(c.dial, /^[1-9]\d{0,3}$/, c.iso);
});

test("Vorwahl erkennen, auch bei geteilten Vorwahlen", () => {
  assert.equal(countryFromDigits("491701234567")?.iso, "DE");
  assert.equal(countryFromDigits("4369912345678")?.iso, "AT");
  assert.equal(countryFromDigits("12125550100")?.iso, "US");
  assert.equal(countryFromDigits("18765551234")?.iso, "JM");
  assert.equal(countryFromDigits("447700900123")?.iso, "GB");
  assert.equal(countryFromDigits("79161234567")?.iso, "RU");
});

test("Nummer ins internationale Format bringen", () => {
  const de = normalizePhone("0170 1234567", DE);
  assert.ok(de.ok && de.e164 === "+491701234567");
  const at = normalizePhone("+43 699 123 45678", DE);
  assert.ok(at.ok && at.e164 === "+4369912345678" && at.country.iso === "AT");
  const ch = normalizePhone("0041 79 123 45 67", DE);
  assert.ok(ch.ok && ch.e164 === "+41791234567");
  const it = normalizePhone("06 1234 5678", countryByIso("IT")!);
  assert.ok(it.ok && it.e164 === "+390612345678", "Italien behält die 0");
});

test("Ungültige Eingaben werden abgelehnt", () => {
  assert.equal(normalizePhone("", DE).ok, false);
  assert.equal(normalizePhone("12", DE).ok, false);
  assert.equal(normalizePhone("0170 abc", DE).ok, false);
  assert.equal(normalizePhone("01701234567890123", DE).ok, false);
});

test("Suche nach Name und Vorwahl, Anzeige der Nummer", () => {
  assert.equal(searchCountries("+43")[0].iso, "AT");
  assert.equal(searchCountries("0041")[0].iso, "CH");
  assert.ok(searchCountries("österr").some(c => c.iso === "AT"));
  assert.equal(formatPhone("+491701234567"), "+49 170 123 4567");
});
