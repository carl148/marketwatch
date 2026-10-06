import type { ApiBlock, ApiMessage, ChatRequest } from "../shared/protocol.ts";

// Prüft eine Anfrage der App. Der Verlauf stammt aus dem Browser und ist
// deshalb nicht vertrauenswürdig: Nur bekannte Blocktypen und begrenzte
// Größen sind erlaubt.

const USER_BLOCKS = new Set(["text", "image", "tool_result"]);
const ASSISTANT_BLOCKS = new Set(["text", "thinking", "redacted_thinking", "tool_use", "fallback"]);
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const LIMITS = {
  maxMessageChars: 4000,
  maxHistoryMessages: 200,
  maxImagesPerConversation: 4,
  maxImageBase64: 2_000_000, // ca. 1,5 MB Bild
};

export class ValidationError extends Error {}

function fail(msg: string): never { throw new ValidationError(msg); }

function checkBlock(b: unknown, role: "user" | "assistant"): ApiBlock {
  if (!b || typeof b !== "object" || Array.isArray(b)) fail("Ungültiger Block im Verlauf.");
  const block = b as ApiBlock;
  if (typeof block.type !== "string") fail("Block ohne Typ im Verlauf.");
  const allowed = role === "user" ? USER_BLOCKS : ASSISTANT_BLOCKS;
  if (!allowed.has(block.type)) fail(`Blocktyp "${block.type}" ist im Verlauf nicht erlaubt.`);
  if (block.type === "image") {
    const src = block.source as Record<string, unknown> | undefined;
    if (!src || src.type !== "base64" || !IMAGE_TYPES.has(String(src.media_type)) || typeof src.data !== "string") fail("Ungültiges Bild im Verlauf.");
    if ((src.data as string).length > LIMITS.maxImageBase64) fail("Ein Bild im Verlauf ist zu groß.");
  }
  return block;
}

export function validateChatRequest(body: unknown, maxTurns: number): ChatRequest {
  if (!body || typeof body !== "object") fail("Die Anfrage ist leer.");
  const b = body as Record<string, unknown>;

  const message = typeof b.message === "string" ? b.message.trim() : "";
  if (message.length > LIMITS.maxMessageChars) fail(`Die Nachricht ist zu lang (höchstens ${LIMITS.maxMessageChars} Zeichen).`);

  let image: ChatRequest["image"];
  if (b.image != null) {
    const img = b.image as Record<string, unknown>;
    if (typeof img.data !== "string" || !IMAGE_TYPES.has(String(img.mediaType))) fail("Das Bild muss JPEG, PNG oder WebP sein.");
    if ((img.data as string).length > LIMITS.maxImageBase64) fail("Das Bild ist zu groß.");
    if (!/^[A-Za-z0-9+/=]+$/.test(img.data as string)) fail("Das Bild ist beschädigt.");
    image = { mediaType: img.mediaType as "image/jpeg" | "image/png" | "image/webp", data: img.data as string };
  }
  if (!message && !image) fail("Die Nachricht ist leer.");

  if (!Array.isArray(b.history)) fail("Der Verlauf fehlt.");
  if (b.history.length > LIMITS.maxHistoryMessages) fail("Das Gespräch ist zu lang. Starte ein neues Gespräch.");
  let images = image ? 1 : 0;
  let userTurns = 0;
  const history: ApiMessage[] = b.history.map((m: unknown) => {
    if (!m || typeof m !== "object") fail("Ungültige Nachricht im Verlauf.");
    const msg = m as Record<string, unknown>;
    if (msg.role !== "user" && msg.role !== "assistant") fail("Ungültige Rolle im Verlauf.");
    const role = msg.role;
    let content: ApiMessage["content"];
    if (typeof msg.content === "string") content = msg.content;
    else if (Array.isArray(msg.content)) content = msg.content.map(x => checkBlock(x, role));
    else fail("Ungültiger Inhalt im Verlauf.");
    if (Array.isArray(content)) {
      images += content.filter(x => x.type === "image").length;
      if (role === "user" && content.some(x => x.type === "text")) userTurns++;
    } else if (role === "user") userTurns++;
    return { role, content };
  });
  if (images > LIMITS.maxImagesPerConversation) fail(`Höchstens ${LIMITS.maxImagesPerConversation} Bilder pro Gespräch. Starte ein neues Gespräch.`);
  if (maxTurns > 0 && userTurns >= maxTurns) fail("Dieses Gespräch ist sehr lang geworden. Starte ein neues Gespräch, dann antwortet der Coach wieder schneller.");
  if (history.length && history[0].role !== "user") fail("Der Verlauf muss mit einer Nutzernachricht beginnen.");

  let profile: Record<string, string> | undefined;
  if (b.profile && typeof b.profile === "object") {
    profile = {};
    for (const [k, v] of Object.entries(b.profile as Record<string, unknown>).slice(0, 20)) {
      if (typeof v === "string" || typeof v === "number") profile[k] = String(v).slice(0, 400);
    }
  }
  const mode = b.mode === "quick" ? "quick" : "deep";
  return { history, message, image, profile, mode };
}
