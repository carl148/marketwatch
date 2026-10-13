import { budget, eur, kapitalertragsteuer, kredit, notgroschen, num, pct, sparplan } from "../shared/calc.ts";
import { drawSparplan } from "./chart.ts";
import { bump, store, unlock } from "./store.ts";
import { $, $$, esc } from "./ui.ts";

// Rechner-Tab: Finanzrechner mit eigenen Zahlen.

const DEFAULTS: Record<string, number> = {
  start: 1000, rate: 100, ret: 7, years: 30, ter: 0.2,
  net: 2200, exp: 1500, months: 4, have: 1000,
  loan: 5000, eff: 7.5, term: 48,
  gains: 1800, etf: 1, church: 0,
};
const v = (k: string) => store.calc[k] ?? DEFAULTS[k];

const field = (k: string, label: string, step: number) =>
  `<div class="field"><label for="c-${k}">${esc(label)}</label><input id="c-${k}" type="number" inputmode="decimal" step="${step}" value="${v(k)}" data-k="${k}"></div>`;

export function renderTools(m: HTMLElement) {
  m.innerHTML = `
    <div class="section-title"><h2>Rechner</h2><span class="eyebrow">Mit deinen eigenen Zahlen</span></div>
    <div class="tools">
      <section class="tool">
        <h3>Sparplan & Zinseszins</h3>
        <p class="muted">Was aus einem monatlichen Sparplan werden kann. Die Rendite ist eine Annahme, keine Garantie.</p>
        <div class="fields">${field("start", "Startbetrag (€)", 100)}${field("rate", "Monatliche Rate (€)", 10)}${field("ret", "Rendite p. a. (%)", 0.5)}${field("years", "Laufzeit (Jahre)", 1)}${field("ter", "Kosten TER (%)", 0.1)}</div>
        <div class="out" id="sparOut"></div>
      </section>
      <section class="tool">
        <h3>50/30/20-Budget</h3>
        <p class="muted">So teilst du dein Nettoeinkommen nach der Faustregel auf.</p>
        <div class="fields">${field("net", "Netto pro Monat (€)", 50)}</div>
        <div class="out" id="budgetOut"></div>
      </section>
      <section class="tool">
        <h3>Notgroschen</h3>
        <p class="muted">Wie groß dein Sicherheitspolster sein sollte und wann du es erreichst.</p>
        <div class="fields">${field("exp", "Ausgaben pro Monat (€)", 50)}${field("months", "Monate Puffer (3 bis 6)", 1)}${field("have", "Schon gespart (€)", 100)}</div>
        <div class="out" id="notOut"></div>
      </section>
      <section class="tool">
        <h3>Kredit</h3>
        <p class="muted">Monatsrate und Zinskosten eines Ratenkredits.</p>
        <div class="fields">${field("loan", "Kreditbetrag (€)", 500)}${field("eff", "Effektivzins (%)", 0.1)}${field("term", "Laufzeit (Monate)", 6)}</div>
        <div class="out" id="loanOut"></div>
      </section>
      <section class="tool">
        <h3>Steuer auf Kapitalerträge</h3>
        <p class="muted">Abgeltungsteuer, Soli und Sparerpauschbetrag. Vereinfacht, Stand 2026.</p>
        <div class="fields">${field("gains", "Erträge pro Jahr (€)", 100)}
          <div class="field"><label for="c-etf">Art der Erträge</label><select id="c-etf" data-k="etf"><option value="1">Aktien-ETF (30 % steuerfrei)</option><option value="0">Zinsen, Dividenden, Sonstiges</option></select></div>
          <div class="field"><label for="c-church">Kirchensteuer</label><select id="c-church" data-k="church"><option value="0">keine</option><option value="8">8 % (BY, BW)</option><option value="9">9 %</option></select></div>
        </div>
        <div class="out" id="taxOut"></div>
      </section>
    </div>`;
  ($("#c-etf", m) as HTMLSelectElement).value = String(v("etf"));
  ($("#c-church", m) as HTMLSelectElement).value = String(v("church"));
  $$<HTMLInputElement>("[data-k]", m).forEach(inp => inp.addEventListener("input", () => {
    const n = num(inp.value);
    if (n === null) return;
    store.calc[inp.dataset.k!] = n;
    store.saveCalc();
    unlock("calc");
    bump("calc");
    update(m);
  }));
  update(m);
}

const kpi = (label: string, value: string, main = false) => `<div class="kpi${main ? " main" : ""}"><small>${esc(label)}</small><b>${value}</b></div>`;

function sparplanCard(raw: Record<string, unknown>, chartId: string): string {
  const r = sparplan(raw);
  const d = r.input;
  return `<div class="kcard flat">
    <div class="kpis">${kpi("Endwert", eur(r.endwert), true)}${kpi("Eingezahlt", eur(r.eingezahlt))}${kpi("Ertrag", eur(r.ertrag))}${kpi(`Kaufkraft heute (${pct(d.inflation_prozent)} Inflation)`, eur(r.kaufkraft_heute))}</div>
    <canvas class="chart" id="${esc(chartId)}" data-sparplan="${esc(JSON.stringify(d))}" role="img" aria-label="Wachstum des Sparplans über ${d.jahre} Jahre bis ${eur(r.endwert)}"></canvas>
    <div class="legend"><span><i class="sw-a"></i>Eingezahlt</span><span><i class="sw-b"></i>Ertrag</span>${d.kosten_prozent ? `<span>Kosten von ${pct(d.kosten_prozent)} p. a. kosten rund ${eur(r.kosten_verlust)}</span>` : ""}</div></div>`;
}

function update(m: HTMLElement) {
  const sp = { startbetrag: v("start"), monatsrate: v("rate"), rendite_prozent: v("ret"), jahre: v("years"), kosten_prozent: v("ter") };
  const r = sparplan(sp);
  $("#sparOut", m).innerHTML = sparplanCard(sp, "chart-tool")
    + `<p class="hint">Vor Steuern gerechnet, über ${r.input.jahre} Jahre.</p>`;
  const cv = $("#chart-tool", m) as HTMLCanvasElement | null;
  if (cv) requestAnimationFrame(() => drawSparplan(cv));

  const b = budget({ netto: v("net") });
  $("#budgetOut", m).innerHTML = `<div class="split"><div class="seg-ink" style="flex:.5">Bedarf 50 %</div><div class="seg-coin" style="flex:.3">Wünsche 30 %</div><div class="seg-accent" style="flex:.2">Sparen 20 %</div></div>
    <div class="kpis">${kpi("Bedarf", eur(b.soll_bedarf))}${kpi("Wünsche", eur(b.soll_wuensche))}${kpi("Sparen", eur(b.soll_sparen), true)}</div>`;

  const ng = notgroschen(v("exp"), v("months"), v("have"), b.soll_sparen);
  $("#notOut", m).innerHTML = `<div class="kpis">${kpi("Dein Ziel", eur(ng.ziel), true)}${kpi("Fehlt noch", eur(Math.max(0, ng.ziel - v("have"))))}${kpi("Bei 20 % Sparquote erreicht in", ng.monate_bis_ziel === null ? "–" : ng.monate_bis_ziel === 0 ? "schon erreicht" : `${ng.monate_bis_ziel} Monaten`)}</div>`;

  const k = kredit({ betrag: v("loan"), effektivzins_prozent: v("eff"), laufzeit_monate: v("term") });
  $("#loanOut", m).innerHTML = `<div class="kpis">${kpi("Monatsrate", eur(k.monatsrate, 2), true)}${kpi("Zinskosten", eur(k.zinskosten))}${kpi("Insgesamt zurück", eur(k.gesamt_zurueck))}</div>`;

  const t = kapitalertragsteuer({ kapitalertraege: v("gains"), aktien_etf_teilfreistellung: v("etf") === 1, kirchensteuer_prozent: v("church") });
  $("#taxOut", m).innerHTML = `<div class="kpis">${kpi("Steuer gesamt", eur(t.steuer_gesamt, 2), true)}${kpi("Steuerpflichtig", eur(t.steuerpflichtig, 2))}${kpi("Dir bleiben", eur(t.netto_ertrag, 2))}</div>
    <p class="hint">Mit Freistellungsauftrag über ${eur(t.sparerpauschbetrag)}. Vorabpauschale und Verlustverrechnung sind nicht berücksichtigt.</p>`;
}
