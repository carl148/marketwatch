import type Anthropic from "@anthropic-ai/sdk";
import { budget, inflation, kapitalertragsteuer, kredit, sanitizeQuiz, sparplan } from "../shared/calc.ts";
import type { CoachToolName } from "../shared/protocol.ts";

type Tool = Anthropic.Beta.BetaTool;

// Die Reihenfolge und der Inhalt dieser Liste dürfen sich innerhalb eines
// Gesprächs nicht ändern (Prompt-Cache, Denk-Blöcke). Neue Werkzeuge nur mit
// einem neuen App-Release hinzufügen.
const TOOL_DEFS: Tool[] = [
  {
    name: "sparplan_rechnen",
    description: "Berechnet den Endwert eines Sparplans mit Zinseszins (monatlich), laufenden Kosten (TER) und Inflation. Die App zeigt eine Karte mit Diagramm. Nutze dies für jede Frage zu Vermögensaufbau, Sparrate oder Rendite.",
    input_schema: {
      type: "object",
      properties: {
        startbetrag: { type: "number", description: "Einmalbetrag zu Beginn in Euro" },
        monatsrate: { type: "number", description: "Monatliche Sparrate in Euro" },
        rendite_prozent: { type: "number", description: "Angenommene Rendite p. a. vor Kosten, z. B. 6 bis 7 für breite Aktien-ETFs langfristig (keine Garantie), 2 bis 3 für Tagesgeld" },
        jahre: { type: "number" },
        kosten_prozent: { type: "number", description: "Laufende Kosten p. a., z. B. 0,2 für einen ETF" },
        inflation_prozent: { type: "number", description: "Standard 2" },
      },
      required: ["monatsrate", "rendite_prozent", "jahre"],
    },
  },
  {
    name: "kredit_rechnen",
    description: "Berechnet Monatsrate und Zinskosten eines Annuitätenkredits, etwa Ratenkredit, Autokredit oder Dispo-Ablösung. Die App zeigt eine Karte.",
    input_schema: {
      type: "object",
      properties: {
        betrag: { type: "number" },
        effektivzins_prozent: { type: "number" },
        laufzeit_monate: { type: "number" },
      },
      required: ["betrag", "effektivzins_prozent", "laufzeit_monate"],
    },
  },
  {
    name: "kapitalertragsteuer_rechnen",
    description: "Berechnet die Steuer auf Kapitalerträge in Deutschland: Abgeltungsteuer 25 %, Soli, optional Kirchensteuer, Sparerpauschbetrag 1.000 € (2.000 € bei Zusammenveranlagung), Teilfreistellung 30 % bei Aktien-ETFs. Die App zeigt eine Karte.",
    input_schema: {
      type: "object",
      properties: {
        kapitalertraege: { type: "number", description: "Jährliche Erträge in Euro" },
        zusammen_veranlagt: { type: "boolean" },
        freibetrag_bereits_genutzt: { type: "number" },
        aktien_etf_teilfreistellung: { type: "boolean" },
        kirchensteuer_prozent: { type: "number", description: "0, 8 (Bayern, Baden-Württemberg) oder 9" },
      },
      required: ["kapitalertraege"],
    },
  },
  {
    name: "inflation_rechnen",
    description: "Zeigt, wie viel ein Betrag nach einigen Jahren Inflation noch wert ist und was heutige Preise dann kosten. Die App zeigt eine Karte.",
    input_schema: {
      type: "object",
      properties: {
        betrag: { type: "number" },
        jahre: { type: "number" },
        inflation_prozent: { type: "number" },
      },
      required: ["betrag", "jahre"],
    },
  },
  {
    name: "budget_rechnen",
    description: "Teilt ein Nettoeinkommen nach der 50/30/20-Regel auf und vergleicht optional mit den tatsächlichen Ausgaben. Die App zeigt eine Karte.",
    input_schema: {
      type: "object",
      properties: {
        netto: { type: "number" },
        ist_bedarf: { type: "number" },
        ist_wuensche: { type: "number" },
        ist_sparen: { type: "number" },
      },
      required: ["netto"],
    },
  },
  {
    name: "quiz_zeigen",
    description: "Zeigt ein interaktives Multiple-Choice-Quiz direkt im Chat. Nutze es, wenn jemand üben oder sein Verständnis prüfen möchte. 3 bis 5 Fragen, je 3 bis 4 Antworten, genau eine richtig.",
    input_schema: {
      type: "object",
      properties: {
        thema: { type: "string" },
        fragen: {
          type: "array",
          items: {
            type: "object",
            properties: {
              frage: { type: "string" },
              antworten: { type: "array", items: { type: "string" } },
              richtig: { type: "number", description: "Index der richtigen Antwort, beginnend bei 0" },
              erklaerung: { type: "string" },
            },
            required: ["frage", "antworten", "richtig", "erklaerung"],
          },
        },
      },
      required: ["thema", "fragen"],
    },
  },
];

// Werkzeug-Eingaben streamen, sobald sie entstehen. Die API prüft sie dann
// nicht mehr gegen das Schema; das übernehmen runTool und die Rechner.
export const TOOLS: Tool[] = TOOL_DEFS.map(t => ({ ...t, eager_input_streaming: true }));

export const TOOL_STATUS: Record<CoachToolName, string> = {
  sparplan_rechnen: "Rechnet den Sparplan",
  kredit_rechnen: "Rechnet den Kredit",
  kapitalertragsteuer_rechnen: "Rechnet die Steuer",
  inflation_rechnen: "Rechnet die Inflation",
  budget_rechnen: "Rechnet das Budget",
  quiz_zeigen: "Erstellt ein Quiz",
};

export interface ToolOutcome { content: string; isError: boolean }

/** Führt ein Werkzeug aus. Eingaben vom Modell gelten als unsicher und werden in den Rechnern begrenzt. */
export function runTool(name: string, input: unknown): ToolOutcome {
  const raw = input && typeof input === "object" && !Array.isArray(input) ? (input as Record<string, unknown>) : {};
  const ok = (v: unknown) => ({ content: JSON.stringify(v), isError: false });
  switch (name) {
    case "sparplan_rechnen": {
      const { series: _series, ...rest } = sparplan(raw);
      return ok({ ...rest, hinweis: "Monatliche Verzinsung, Kosten von der Rendite abgezogen, vor Steuern." });
    }
    case "kredit_rechnen":
      return ok(kredit(raw));
    case "kapitalertragsteuer_rechnen":
      return ok({ ...kapitalertragsteuer(raw), hinweis: "Vereinfacht; Vorabpauschale und Verlustverrechnung nicht berücksichtigt." });
    case "inflation_rechnen":
      return ok(inflation(raw));
    case "budget_rechnen":
      return ok(budget(raw));
    case "quiz_zeigen": {
      const quiz = sanitizeQuiz(raw);
      if (!quiz) return { content: "Keine gültigen Fragen. Jede Frage braucht 'antworten' (Liste) und 'richtig' (Index ab 0).", isError: true };
      return ok({ angezeigt: quiz.fragen.length, hinweis: "Das Quiz ist sichtbar. Verrate die Lösungen nicht im Text." });
    }
    default:
      return { content: `Unbekanntes Werkzeug: ${name}`, isError: true };
  }
}
