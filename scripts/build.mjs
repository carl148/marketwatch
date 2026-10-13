// Baut die App nach public/app.js. Danach ist public/ eine fertige statische Website.
import { build, context } from "esbuild";

const options = {
  entryPoints: ["src/client/main.ts"],
  bundle: true,
  format: "esm",
  target: "es2022",
  outfile: "public/app.js",
  sourcemap: true,
  minify: true,
  logLevel: "info",
};

if (process.argv.includes("--serve")) {
  // Entwicklung: baut bei jeder Änderung neu und liefert public/ aus.
  const ctx = await context({ ...options, minify: false });
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: "public", port: 3000 });
  console.log(`Fintelify läuft auf http://localhost:${port}`);
} else {
  await build(options);
}
