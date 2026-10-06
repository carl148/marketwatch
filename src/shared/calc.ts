// Finanzrechner, die Server (als Werkzeuge für den Coach) und App (für Karten
// und den Rechner-Tab) gemeinsam nutzen. Alle Eingaben kommen potenziell vom
// Modell oder aus Formularen und werden deshalb hier begrenzt.

export function num(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  // "1.500,50" (deutsch) und "1500.5" (Formularfeld) sollen beide funktionieren.
  const s = v.includes(",") ? v.replace(/\./g, "").replace(",", ".") : v;
  const n = parseFloat(s.trim());
  return Number.isFinite(n) ? n : null;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const round2 = (v: number) => Math.round(v * 100) / 100;

export interface SparplanInput {
  startbetrag: number;
  monatsrate: number;
  rendite_prozent: number;
  jahre: number;
  kosten_prozent: number;
  inflation_prozent: number;
}
export interface SparplanResult {
  input: SparplanInput;
  endwert: number;
  eingezahlt: number;
  ertrag: number;
  kaufkraft_heute: number;
  kosten_verlust: number;
  series: { v: number; paid: number }[];
}

export function sparplan(raw: Record<string, unknown>): SparplanResult {
  const input: SparplanInput = {
    startbetrag: clamp(num(raw.startbetrag) ?? 0, 0, 1e9),
    monatsrate: clamp(num(raw.monatsrate) ?? 0, 0, 1e7),
    rendite_prozent: clamp(num(raw.rendite_prozent) ?? 6, -20, 30),
    jahre: Math.round(clamp(num(raw.jahre) ?? 20, 1, 60)),
    kosten_prozent: clamp(num(raw.kosten_prozent) ?? 0, 0, 5),
    inflation_prozent: clamp(num(raw.inflation_prozent) ?? 2, 0, 15),
  };
  const run = (ret: number) => {
    const rm = Math.pow(1 + ret / 100, 1 / 12) - 1;
    let v = input.startbetrag;
    let paid = input.startbetrag;
    const s = [{ v, paid }];
    for (let y = 1; y <= input.jahre; y++) {
      for (let m = 0; m < 12; m++) {
        v = v * (1 + rm) + input.monatsrate;
        paid += input.monatsrate;
      }
      s.push({ v, paid });
    }
    return s;
  };
  const series = run(input.rendite_prozent - input.kosten_prozent);
  const noCost = run(input.rendite_prozent)[input.jahre].v;
  const end = series[input.jahre];
  return {
    input,
    endwert: Math.round(end.v),
    eingezahlt: Math.round(end.paid),
    ertrag: Math.round(end.v - end.paid),
    kaufkraft_heute: Math.round(end.v / Math.pow(1 + input.inflation_prozent / 100, input.jahre)),
    kosten_verlust: Math.round(noCost - end.v),
    series,
  };
}

export interface KreditInput { betrag: number; effektivzins_prozent: number; laufzeit_monate: number }
export interface KreditResult { input: KreditInput; monatsrate: number; gesamt_zurueck: number; zinskosten: number }

export function kredit(raw: Record<string, unknown>): KreditResult {
  const input: KreditInput = {
    betrag: clamp(num(raw.betrag) ?? 0, 0, 1e8),
    effektivzins_prozent: clamp(num(raw.effektivzins_prozent) ?? 0, 0, 40),
    laufzeit_monate: Math.round(clamp(num(raw.laufzeit_monate) ?? 12, 1, 480)),
  };
  const r = Math.pow(1 + input.effektivzins_prozent / 100, 1 / 12) - 1;
  const n = input.laufzeit_monate;
  const rate = r === 0 ? input.betrag / n : (input.betrag * r) / (1 - Math.pow(1 + r, -n));
  return {
    input,
    monatsrate: round2(rate),
    gesamt_zurueck: Math.round(rate * n),
    zinskosten: Math.round(rate * n - input.betrag),
  };
}

export interface SteuerInput {
  kapitalertraege: number;
  zusammen_veranlagt: boolean;
  freibetrag_bereits_genutzt: number;
  aktien_etf_teilfreistellung: boolean;
  kirchensteuer_prozent: number;
}
export interface SteuerResult {
  input: SteuerInput;
  sparerpauschbetrag: number;
  teilfreistellung_abzug: number;
  steuerpflichtig: number;
  abgeltungsteuer: number;
  soli: number;
  kirchensteuer: number;
  steuer_gesamt: number;
  netto_ertrag: number;
}

/** Abgeltungsteuer auf Kapitalerträge, Stand 2026, vereinfacht (ohne Vorabpauschale und Verlustverrechnung). */
export function kapitalertragsteuer(raw: Record<string, unknown>): SteuerResult {
  const married = raw.zusammen_veranlagt === true;
  const frei = married ? 2000 : 1000;
  const kist = num(raw.kirchensteuer_prozent);
  const input: SteuerInput = {
    kapitalertraege: clamp(num(raw.kapitalertraege) ?? 0, 0, 1e9),
    zusammen_veranlagt: married,
    freibetrag_bereits_genutzt: clamp(num(raw.freibetrag_bereits_genutzt) ?? 0, 0, frei),
    aktien_etf_teilfreistellung: raw.aktien_etf_teilfreistellung === true,
    kirchensteuer_prozent: kist === 8 || kist === 9 ? kist : 0,
  };
  const tf = input.aktien_etf_teilfreistellung ? 0.3 : 0;
  const k = input.kirchensteuer_prozent / 100;
  const taxable = Math.max(0, input.kapitalertraege * (1 - tf) - (frei - input.freibetrag_bereits_genutzt));
  // Bei Kirchensteuer mindert diese die Bemessungsgrundlage: KapESt = e / (4 + k).
  const kapest = taxable / (4 + k);
  const soli = kapest * 0.055;
  const kirche = kapest * k;
  const total = kapest + soli + kirche;
  return {
    input,
    sparerpauschbetrag: frei,
    teilfreistellung_abzug: round2(input.kapitalertraege * tf),
    steuerpflichtig: round2(taxable),
    abgeltungsteuer: round2(kapest),
    soli: round2(soli),
    kirchensteuer: round2(kirche),
    steuer_gesamt: round2(total),
    netto_ertrag: round2(input.kapitalertraege - total),
  };
}

export interface InflationInput { betrag: number; jahre: number; inflation_prozent: number }
export interface InflationResult { input: InflationInput; kaufkraft_spaeter: number; preis_spaeter: number; kaufkraftverlust_prozent: number }

export function inflation(raw: Record<string, unknown>): InflationResult {
  const input: InflationInput = {
    betrag: clamp(num(raw.betrag) ?? 0, 0, 1e9),
    jahre: Math.round(clamp(num(raw.jahre) ?? 10, 1, 60)),
    inflation_prozent: clamp(num(raw.inflation_prozent) ?? 2, 0, 30),
  };
  const f = Math.pow(1 + input.inflation_prozent / 100, input.jahre);
  return {
    input,
    kaufkraft_spaeter: Math.round(input.betrag / f),
    preis_spaeter: Math.round(input.betrag * f),
    kaufkraftverlust_prozent: Math.round((1 - 1 / f) * 1000) / 10,
  };
}

export interface BudgetInput { netto: number; ist_bedarf: number | null; ist_wuensche: number | null; ist_sparen: number | null }
export interface BudgetResult { input: BudgetInput; soll_bedarf: number; soll_wuensche: number; soll_sparen: number }

export function budget(raw: Record<string, unknown>): BudgetResult {
  const opt = (v: unknown) => { const n = num(v); return n === null ? null : clamp(n, 0, 1e7); };
  const input: BudgetInput = {
    netto: clamp(num(raw.netto) ?? 0, 0, 1e7),
    ist_bedarf: opt(raw.ist_bedarf),
    ist_wuensche: opt(raw.ist_wuensche),
    ist_sparen: opt(raw.ist_sparen),
  };
  return {
    input,
    soll_bedarf: Math.round(input.netto * 0.5),
    soll_wuensche: Math.round(input.netto * 0.3),
    soll_sparen: Math.round(input.netto * 0.2),
  };
}

export interface NotgroschenResult { ziel: number; monate_bis_ziel: number | null }

export function notgroschen(ausgaben: number, monate: number, vorhanden: number, sparrate: number): NotgroschenResult {
  const ziel = Math.max(0, ausgaben) * clamp(monate, 1, 12);
  const fehlt = Math.max(0, ziel - Math.max(0, vorhanden));
  return { ziel: Math.round(ziel), monate_bis_ziel: sparrate > 0 ? Math.ceil(fehlt / sparrate) : null };
}

// ---- Quiz (vom Coach erzeugt) ----
export interface QuizFrage { frage: string; antworten: string[]; richtig: number; erklaerung: string }
export interface Quiz { thema: string; fragen: QuizFrage[] }

/** Prüft und kürzt ein vom Modell geliefertes Quiz. Gibt null zurück, wenn keine gültige Frage übrig bleibt. */
export function sanitizeQuiz(raw: Record<string, unknown>): Quiz | null {
  const list = Array.isArray(raw.fragen) ? raw.fragen : [];
  const fragen: QuizFrage[] = [];
  for (const q of list.slice(0, 6)) {
    if (!q || typeof q !== "object") continue;
    const o = q as Record<string, unknown>;
    const antworten = Array.isArray(o.antworten) ? o.antworten.slice(0, 5).map(a => String(a).slice(0, 200)) : [];
    const richtig = typeof o.richtig === "number" ? o.richtig : num(o.richtig);
    if (antworten.length < 2 || richtig === null || !Number.isInteger(richtig) || richtig < 0 || richtig >= antworten.length) continue;
    fragen.push({ frage: String(o.frage ?? "").slice(0, 300), antworten, richtig, erklaerung: String(o.erklaerung ?? "").slice(0, 400) });
  }
  if (!fragen.length) return null;
  return { thema: String(raw.thema ?? "Quiz").slice(0, 80), fragen };
}

// ---- Formatierung ----
export const eur = (v: number, d = 0) =>
  (Number.isFinite(v) ? v : 0).toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d }) + " €";
export const pct = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 2 }) + " %";
