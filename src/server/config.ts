// Einstellungen aus Umgebungsvariablen. Siehe .env.example.

const int = (v: string | undefined, d: number) => {
  const n = v ? parseInt(v, 10) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : d;
};

export interface Config {
  port: number;
  model: string;
  /** Tageslimit an Coach-Fragen pro Gerät. 0 = unbegrenzt. */
  dailyLimitPerDevice: number;
  /** Tageslimit pro IP-Adresse (mehrere Geräte im selben Netz). 0 = unbegrenzt. */
  dailyLimitPerIp: number;
  /** Tageslimit für alle Nutzer zusammen, schützt vor unerwarteten Kosten. 0 = unbegrenzt. */
  dailyLimitGlobal: number;
  /** Optionale Zugangscodes für eine geschlossene Testphase. Leer = offen für alle. */
  accessCodes: string[];
  /** Anzahl Proxys vor der App (für die richtige Client-IP), z. B. 1 bei Render/Fly. */
  trustProxy: number;
  maxTurnsPerConversation: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return {
    port: int(env.PORT, 3000),
    model: env.CLAUDE_MODEL?.trim() || "claude-opus-5-5",
    dailyLimitPerDevice: int(env.DAILY_LIMIT_PER_DEVICE, 30),
    dailyLimitPerIp: int(env.DAILY_LIMIT_PER_IP, 100),
    dailyLimitGlobal: int(env.DAILY_LIMIT_GLOBAL, 2000),
    accessCodes: (env.ACCESS_CODES ?? "").split(",").map(s => s.trim()).filter(Boolean),
    trustProxy: int(env.TRUST_PROXY, 0),
    maxTurnsPerConversation: int(env.MAX_TURNS_PER_CONVERSATION, 30),
  };
}

/** Welche API-Funktionen ein Modell unterstützt. Unbekannte Modelle bekommen die sichere Grundausstattung. */
export function modelFeatures(model: string) {
  const adaptive = /^claude-(opus-5|opus-4-[678]|sonnet-5|sonnet-4-6|fable-5|mythos-5)/.test(model);
  const fallbacks = /^claude-(opus-5-5|opus-5$|fable-5-1|sonnet-5-5)/.test(model);
  // Modelle mit "preserved thinking": Denk-Blöcke sind an den Gesprächsverlauf gebunden.
  const blockBinding = /^claude-(opus-5-5|fable-5-1|sonnet-5-5)/.test(model);
  return { adaptive, effort: adaptive, fallbacks, blockBinding };
}
