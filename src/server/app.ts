import express, { type Request, type Response } from "express";
import type { ChatEvent } from "../shared/protocol.ts";
import { describeError, runCoach, type StreamFn } from "./coach.ts";
import type { Config } from "./config.ts";
import { Limiter } from "./limits.ts";
import { ValidationError, validateChatRequest } from "./validate.ts";

export interface AppOptions {
  config: Config;
  /** null, wenn kein API-Schlüssel gesetzt ist. Die Lern-App funktioniert dann trotzdem. */
  stream: StreamFn | null;
  staticDir: string;
  now?: () => Date;
  log?: (entry: Record<string, unknown>) => void;
}

const CSP = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "style-src 'self'",
  // Breitenangaben in Balken (style="flex:…") brauchen Inline-Stilattribute.
  "style-src-attr 'unsafe-inline'",
  "script-src 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join("; ");

export function createApp(opts: AppOptions) {
  const { config } = opts;
  const log = opts.log ?? (e => console.log(JSON.stringify({ t: new Date().toISOString(), ...e })));
  const limiter = new Limiter(
    { device: config.dailyLimitPerDevice, ip: config.dailyLimitPerIp, global: config.dailyLimitGlobal },
    opts.now,
  );
  const app = express();
  app.disable("x-powered-by");
  if (config.trustProxy) app.set("trust proxy", config.trustProxy);

  app.use((_req, res, next) => {
    res.setHeader("Content-Security-Policy", CSP);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });

  const deviceOf = (req: Request) => {
    const d = req.get("x-device-id") ?? "";
    return /^[A-Za-z0-9-]{8,64}$/.test(d) ? d : "ip:" + (req.ip ?? "unbekannt");
  };
  const accessOk = (req: Request) => !config.accessCodes.length || config.accessCodes.includes(req.get("x-access-code") ?? "");

  app.get("/api/health", (_req, res) => { res.json({ ok: true }); });

  app.get("/api/status", (req, res) => {
    const decision = limiter.check(deviceOf(req), req.ip ?? "");
    res.json({
      coach: opts.stream !== null,
      accessRequired: config.accessCodes.length > 0,
      accessOk: accessOk(req),
      remaining: decision.remaining,
      dailyLimit: config.dailyLimitPerDevice || null,
    });
  });

  app.post("/api/chat", express.json({ limit: "12mb" }), async (req: Request, res: Response) => {
    if (!opts.stream) { res.status(503).json({ code: "config", message: "Der Coach ist auf diesem Server noch nicht eingerichtet (API-Schlüssel fehlt)." }); return; }
    if (!accessOk(req)) { res.status(401).json({ code: "access", message: "Für die Testphase brauchst du einen Zugangscode." }); return; }

    let chat;
    try { chat = validateChatRequest(req.body, config.maxTurnsPerConversation); }
    catch (err) {
      if (err instanceof ValidationError) { res.status(400).json({ code: "invalid", message: err.message }); return; }
      throw err;
    }

    const device = deviceOf(req);
    const ip = req.ip ?? "";
    const decision = limiter.check(device, ip);
    if (!decision.ok) {
      const message = decision.reason === "global"
        ? "Der Coach hat heute sein Tageslimit erreicht. Morgen geht es weiter."
        : "Du hast heute alle Coach-Fragen verbraucht. Morgen geht es weiter, und Lektionen und Rechner kannst du weiter nutzen.";
      res.status(429).json({ code: "limit", message });
      return;
    }
    const remaining = limiter.consume(device, ip);

    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });
    const ctl = new AbortController();
    res.on("close", () => { if (!res.writableFinished) ctl.abort(); });
    const emit = (e: ChatEvent) => { if (!res.writableEnded) res.write(`data: ${JSON.stringify(e)}\n\n`); };

    try {
      await runCoach({ stream: opts.stream, model: config.model, req: chat, emit, signal: ctl.signal, now: opts.now?.(), log });
      emit({ type: "done", remaining });
    } catch (err) {
      if (!ctl.signal.aborted) {
        const d = describeError(err);
        log({ error: d.code, detail: err instanceof Error ? err.message.slice(0, 500) : String(err) });
        emit({ type: "error", code: d.code, message: d.message });
        emit({ type: "done", remaining });
      }
    }
    res.end();
  });

  app.use(express.static(opts.staticDir, {
    extensions: ["html"],
    setHeaders(res, path) {
      if (path.endsWith("sw.js") || path.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
    },
  }));

  return app;
}
