// Einfache Tageslimits im Arbeitsspeicher. Reicht für eine einzelne
// Server-Instanz; bei mehreren Instanzen auf Redis o. Ä. umstellen.

export class DailyCounter {
  private day = "";
  private counts = new Map<string, number>();

  constructor(private now: () => Date = () => new Date()) {}

  private roll() {
    const d = this.now().toISOString().slice(0, 10);
    if (d !== this.day) { this.day = d; this.counts.clear(); }
  }

  get(key: string): number { this.roll(); return this.counts.get(key) ?? 0; }

  increment(key: string): number {
    this.roll();
    const n = (this.counts.get(key) ?? 0) + 1;
    this.counts.set(key, n);
    return n;
  }
}

export interface LimitDecision { ok: boolean; remaining: number | null; reason?: "device" | "ip" | "global" }

export class Limiter {
  private counter: DailyCounter;
  constructor(private limits: { device: number; ip: number; global: number }, now?: () => Date) {
    this.counter = new DailyCounter(now);
  }

  check(device: string, ip: string): LimitDecision {
    const { device: dl, ip: il, global: gl } = this.limits;
    if (gl && this.counter.get("g") >= gl) return { ok: false, remaining: 0, reason: "global" };
    if (il && this.counter.get("i:" + ip) >= il) return { ok: false, remaining: 0, reason: "ip" };
    if (dl && this.counter.get("d:" + device) >= dl) return { ok: false, remaining: 0, reason: "device" };
    return { ok: true, remaining: dl ? dl - this.counter.get("d:" + device) : null };
  }

  /** Zählt eine Anfrage und gibt die verbleibenden Fragen des Geräts zurück. */
  consume(device: string, ip: string): number | null {
    this.counter.increment("g");
    this.counter.increment("i:" + ip);
    const used = this.counter.increment("d:" + device);
    return this.limits.device ? Math.max(0, this.limits.device - used) : null;
  }
}
