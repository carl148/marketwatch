// Entwicklung: baut die App bei jeder Änderung neu und startet den Server mit tsx.
import { context } from "esbuild";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { clientOptions } from "./build.mjs";

// .env einlesen (einfaches KEY=VALUE-Format), ohne bestehende Variablen zu überschreiben.
const env = { ...process.env };
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const ctx = await context({ ...clientOptions, minify: false });
await ctx.watch();
const server = spawn("npx", ["tsx", "watch", "src/server/index.ts"], { stdio: "inherit", env });
const stop = () => { server.kill(); ctx.dispose().then(() => process.exit(0)); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
