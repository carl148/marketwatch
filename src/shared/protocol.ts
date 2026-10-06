// Vertrag zwischen App und Server für POST /api/chat.
//
// Die App speichert den Gesprächsverlauf genau so, wie der Server ihn an Claude
// geschickt hat, und schickt ihn unverändert zurück. Nur so bleiben die
// Denk-Blöcke des Modells gültig und der Prompt-Cache greift.

export type ApiBlock = Record<string, unknown> & { type: string };
export interface ApiMessage { role: "user" | "assistant"; content: string | ApiBlock[] }

export interface ChatRequest {
  history: ApiMessage[];
  message: string;
  image?: { mediaType: "image/jpeg" | "image/png" | "image/webp"; data: string };
  profile?: Record<string, string>;
  mode?: "deep" | "quick";
}

export type ChatEvent =
  /** Eine fertige Nachricht, die die App unverändert an den Verlauf anhängt. */
  | { type: "turn"; message: ApiMessage }
  /** Neuer Text der laufenden Antwort. */
  | { type: "text"; delta: string }
  /** Der Coach nutzt gerade ein Werkzeug. */
  | { type: "status"; text: string }
  | { type: "error"; code: string; message: string }
  | { type: "done"; remaining: number | null };

export const COACH_TOOL_NAMES = [
  "sparplan_rechnen",
  "kredit_rechnen",
  "kapitalertragsteuer_rechnen",
  "inflation_rechnen",
  "budget_rechnen",
  "quiz_zeigen",
] as const;
export type CoachToolName = (typeof COACH_TOOL_NAMES)[number];

/** Markiert den Kontextblock, den der Server jeder Nutzernachricht voranstellt. */
export const CONTEXT_TAG = "kontext";
