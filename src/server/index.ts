import Anthropic from "@anthropic-ai/sdk";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.ts";
import { anthropicStream } from "./coach.ts";
import { loadConfig } from "./config.ts";

const config = loadConfig();
const hasKey = Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
const here = path.dirname(fileURLToPath(import.meta.url));
// dist/server.js und src/server/index.ts liegen unterschiedlich tief.
const root = path.basename(here) === "dist" ? path.resolve(here, "..") : path.resolve(here, "../..");

const app = createApp({
  config,
  stream: hasKey ? anthropicStream(new Anthropic()) : null,
  staticDir: path.join(root, "public"),
});

app.listen(config.port, () => {
  console.log(`Groschen läuft auf http://localhost:${config.port}`);
  console.log(hasKey ? `Coach aktiv mit Modell ${config.model}` : "Kein ANTHROPIC_API_KEY gesetzt: Lern-App läuft, der Coach ist deaktiviert.");
});
