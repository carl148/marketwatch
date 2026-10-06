import { budget, eur, inflation, kapitalertragsteuer, kredit, pct, sparplan, type Quiz } from "../shared/calc.ts";
import { esc } from "./ui.ts";

// Ergebniskarten für die Werkzeuge des Coaches. Die Werte werden in der App aus
// den Eingaben neu berechnet; so stimmen Karte und Antwort des Servers überein.

export const CARD_LABEL: Record<string, string> = {
  sparplan_rechnen: "Sparplan", kredit_rechnen: "Kredit", kapitalertragsteuer_rechnen: "Steuer",
  inflation_rechnen: "Inflation", budget_rechnen: "Budget", quiz_zeigen: "Quiz",
};

const kpi = (label: string, value: string, main = false) => `<div class="kpi${main ? " main" : ""}"><small>${esc(label)}</small><b>${value}</b></div>`;

export function sparplanCard(raw: Record<string, unknown>, chartId: string): string {
  const r = sparplan(raw);
  const d = r.input;
  return `<div class="kcard"><h4>Sparplan<small>${eur(d.monatsrate)} / Monat · ${pct(d.rendite_prozent)} p. a. · ${d.jahre} Jahre${d.startbetrag ? " · Start " + eur(d.startbetrag) : ""}</small></h4>
    <div class="kpis">${kpi("Endwert", eur(r.endwert), true)}${kpi("Eingezahlt", eur(r.eingezahlt))}${kpi("Ertrag", eur(r.ertrag))}${kpi(`Kaufkraft heute (${pct(d.inflation_prozent)} Inflation)`, eur(r.kaufkraft_heute))}</div>
    <canvas class="chart" id="${esc(chartId)}" data-sparplan="${esc(JSON.stringify(d))}" role="img" aria-label="Wachstum des Sparplans über ${d.jahre} Jahre bis ${eur(r.endwert)}"></canvas>
    <div class="legend"><span><i class="sw-a"></i>Eingezahlt</span><span><i class="sw-b"></i>Ertrag</span>${d.kosten_prozent ? `<span>Kosten von ${pct(d.kosten_prozent)} p. a. kosten rund ${eur(r.kosten_verlust)}</span>` : ""}</div></div>`;
}

export function toolCard(name: string, input: Record<string, unknown>, key: string, quizAnswers?: (number | null)[]): string {
  switch (name) {
    case "sparplan_rechnen": return sparplanCard(input, "chart-" + key);
    case "kredit_rechnen": {
      const r = kredit(input), d = r.input;
      const total = Math.max(1, d.betrag + Math.max(0, r.zinskosten));
      return `<div class="kcard"><h4>Kredit<small>${eur(d.betrag)} · ${pct(d.effektivzins_prozent)} effektiv · ${d.laufzeit_monate} Monate</small></h4>
        <div class="kpis">${kpi("Monatsrate", eur(r.monatsrate, 2), true)}${kpi("Zinskosten", eur(r.zinskosten))}${kpi("Insgesamt zurück", eur(r.gesamt_zurueck))}</div>
        <div class="split"><div class="seg-a" style="flex:${d.betrag / total}">Kredit</div><div class="seg-bad" style="flex:${Math.max(0.001, r.zinskosten / total)}">Zinsen</div></div></div>`;
    }
    case "kapitalertragsteuer_rechnen": {
      const r = kapitalertragsteuer(input), d = r.input;
      return `<div class="kcard"><h4>Steuer auf Kapitalerträge<small>${eur(d.kapitalertraege)} Erträge${d.aktien_etf_teilfreistellung ? " · Aktien-ETF" : ""}${d.zusammen_veranlagt ? " · zusammen veranlagt" : ""}</small></h4>
        <div class="kpis">${kpi("Steuer gesamt", eur(r.steuer_gesamt, 2), true)}${kpi("Steuerpflichtig", eur(r.steuerpflichtig, 2))}${kpi("Dir bleiben", eur(r.netto_ertrag, 2))}</div>
        <p class="hint">Pauschbetrag ${eur(r.sparerpauschbetrag)}${r.teilfreistellung_abzug ? ", Teilfreistellung " + eur(r.teilfreistellung_abzug, 2) : ""}. Abgeltungsteuer ${eur(r.abgeltungsteuer, 2)} + Soli ${eur(r.soli, 2)}${r.kirchensteuer ? " + Kirchensteuer " + eur(r.kirchensteuer, 2) : ""}. Vereinfacht, Stand 2026.</p></div>`;
    }
    case "inflation_rechnen": {
      const r = inflation(input), d = r.input;
      return `<div class="kcard"><h4>Inflation<small>${eur(d.betrag)} · ${d.jahre} Jahre · ${pct(d.inflation_prozent)} p. a.</small></h4>
        <div class="kpis">${kpi(`Kaufkraft in ${d.jahre} Jahren`, eur(r.kaufkraft_spaeter), true)}${kpi("Heutiger Einkauf kostet dann", eur(r.preis_spaeter))}${kpi("Kaufkraftverlust", pct(r.kaufkraftverlust_prozent))}</div></div>`;
    }
    case "budget_rechnen": {
      const r = budget(input), d = r.input;
      const rows: [string, number, number | null, string, number][] = [
        ["Bedarf", r.soll_bedarf, d.ist_bedarf, "seg-ink", 0.5], ["Wünsche", r.soll_wuensche, d.ist_wuensche, "seg-coin", 0.3], ["Sparen", r.soll_sparen, d.ist_sparen, "seg-accent", 0.2],
      ];
      return `<div class="kcard"><h4>50/30/20-Budget<small>${eur(d.netto)} netto</small></h4>
        <div class="split">${rows.map(([n, , , cls, f]) => `<div class="${cls}" style="flex:${f}">${n}</div>`).join("")}</div>
        <div class="kpis">${rows.map(([n, soll, ist], i) => kpi(n + (ist != null ? " · ist " + eur(ist) : ""), eur(soll), i === 2)).join("")}</div></div>`;
    }
    case "quiz_zeigen": return "";
    default: return "";
  }
}

export function quizCard(quiz: Quiz, key: string, answers: (number | null)[]): string {
  const done = answers.filter(a => a !== null && a !== undefined).length;
  const right = quiz.fragen.filter((q, i) => answers[i] === q.richtig).length;
  return `<div class="kcard"><h4>Quiz: ${esc(quiz.thema)}<small>${done}/${quiz.fragen.length} beantwortet</small></h4>
    ${quiz.fragen.map((q, qi) => {
      const chosen = answers[qi] ?? null;
      return `<div class="q"><b>${qi + 1}. ${esc(q.frage)}</b><div class="opts">${q.antworten.map((a, ai) => {
        let cls = "";
        if (chosen !== null) { if (ai === q.richtig) cls = "right"; else if (ai === chosen) cls = "wrong"; }
        return `<button class="opt ${cls}" data-quiz="${esc(key)}" data-q="${qi}" data-a="${ai}" ${chosen !== null ? "disabled" : ""}>${esc(a)}</button>`;
      }).join("")}</div>${chosen !== null ? `<span class="expl">${chosen === q.richtig ? "Richtig. " : "Nicht ganz. "}${esc(q.erklaerung)}</span>` : ""}</div>`;
    }).join("")}
    ${done === quiz.fragen.length ? `<div class="score"><span>${right} von ${quiz.fragen.length} richtig</span><button class="btn small" data-quizsend="${esc(key)}">Mit dem Coach besprechen</button></div>` : ""}</div>`;
}
