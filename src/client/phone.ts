import { countryFromDigits, type Country } from "./countries.ts";

// Telefonnummern prüfen und ins internationale Format (E.164, z. B. +491701234567) bringen.

export type PhoneResult = { ok: true; e164: string; country: Country } | { ok: false; error: string };

/**
 * Nimmt die Eingabe und das gewählte Land. Beginnt die Eingabe mit "+" oder "00",
 * gilt die darin enthaltene Vorwahl. Eine führende 0 der Inlandsnummer fällt weg.
 */
export function normalizePhone(input: string, selected: Country): PhoneResult {
  const raw = input.trim();
  if (!raw) return { ok: false, error: "Bitte gib deine Telefonnummer ein." };
  if (/[^\d\s()\-./+]/.test(raw)) return { ok: false, error: "Die Nummer darf nur Ziffern enthalten." };
  let digits = raw.replace(/\D/g, "");
  let country = selected;
  if (raw.startsWith("+") || digits.startsWith("00")) {
    if (digits.startsWith("00")) digits = digits.slice(2);
    const found = countryFromDigits(digits);
    if (!found) return { ok: false, error: "Diese Ländervorwahl kennen wir nicht." };
    country = found;
    digits = digits.slice(found.dial.length);
  } else if (country.dial !== "39" && country.dial !== "378" && country.dial !== "379") {
    // Italien, San Marino und Vatikan behalten die 0 der Inlandsnummer.
    digits = digits.replace(/^0+/, "");
  }
  const total = country.dial.length + digits.length;
  if (digits.length < 4) return { ok: false, error: "Die Nummer ist zu kurz." };
  if (total > 15) return { ok: false, error: "Die Nummer ist zu lang." };
  return { ok: true, e164: `+${country.dial}${digits}`, country };
}

/** Für die Anzeige: Vorwahl und Nummer in Dreiergruppen, z. B. "+49 170 123 4567". */
export function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const c = countryFromDigits(digits);
  if (!c) return e164;
  const rest = digits.slice(c.dial.length).replace(/(\d{3})(?=\d{4})/g, "$1 ");
  return `+${c.dial} ${rest}`;
}
