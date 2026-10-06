// Baut App (public/app.js) und Server (dist/server.js) mit esbuild.
import { build } from "esbuild";
import { pathToFileURL } from "node:url";

export const clientOptions = {
  entryPoints: ["src/client/main.ts"],
  bundle: true,
  format: "esm",
  target: "es2022",
  outfile: "public/app.js",
  sourcemap: true,
  minify: true,
  logLevel: "info",
};

export const serverOptions = {
  entryPoints: ["src/server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  outfile: "dist/server.js",
  sourcemap: true,
  logLevel: "info",
};

// Nur bauen, wenn die Datei direkt ausgeführt wird (nicht beim Import aus dev.mjs).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await build(clientOptions);
  await build(serverOptions);
}
