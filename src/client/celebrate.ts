import { LEVEL_UP_COINS, RANKS, rankOf } from "./rules.ts";
import { $, esc } from "./ui.ts";

// Kleine Feiern für besondere Momente: Level-Aufstieg, Kapitel geschafft,
// Krone in der Kapitelprüfung. Sie werden gesammelt und erst gezeigt, wenn
// keine Frage mehr offen ist, damit sie nie mitten in ein Quiz platzen.

export type Celebration =
  | { kind: "level"; level: number }
  | { kind: "chapter"; title: string; coins: number }
  | { kind: "crown"; title: string; coins: number }
  | { kind: "premium" };

const queue: Celebration[] = [];
let showing = false;

export function celebrate(c: Celebration) { queue.push(c); }

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Zeigt alle gesammelten Feiern nacheinander. */
export async function flushCelebrations() {
  if (showing) return;
  showing = true;
  // Mehrere Level-Aufstiege auf einmal als einen zeigen (den höchsten).
  const levels = queue.filter(c => c.kind === "level") as { kind: "level"; level: number }[];
  const rest = queue.filter(c => c.kind !== "level");
  queue.length = 0;
  const list: Celebration[] = [...rest];
  if (levels.length) list.push(levels.reduce((a, b) => (b.level > a.level ? b : a)));
  for (const c of list) await show(c);
  showing = false;
}

const CROWN = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;
const BOOK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h7M8 11h5"/></svg>`;

function levelText(level: number): string {
  if (rankOf(level) !== rankOf(level - 1)) return `Neuer Rang: ${rankOf(level)}. Stark!`;
  const next = RANKS.find(([l]) => l > level);
  return next ? `Weiter so! Ab Level ${next[0]} wirst du ${next[1]}.` : "Du hast den höchsten Rang erreicht. Weiter so!";
}

function content(c: Celebration): { eyebrow: string; title: string; text: string; badge: string; coins: number } {
  if (c.kind === "level") return {
    eyebrow: "Level-Aufstieg", title: `Level ${c.level}`, text: levelText(c.level),
    badge: `<span class="cel-num num">${c.level}</span>`, coins: LEVEL_UP_COINS,
  };
  if (c.kind === "chapter") return {
    eyebrow: "Kapitel geschafft", title: c.title, text: "Alle Lektionen erledigt. Die Kapitelprüfung ist jetzt freigeschaltet.",
    badge: `<span class="cel-icon">${BOOK}</span>`, coins: c.coins,
  };
  if (c.kind === "premium") return {
    eyebrow: "Willkommen bei Premium", title: "Premium ist aktiv", text: "Alle Lektionen sind offen, und jede Woche gibt es einen Serienschutz gratis.",
    badge: `<span class="cel-icon crown">${CROWN}</span>`, coins: 0,
  };
  return {
    eyebrow: "Kapitelprüfung bestanden", title: c.title, text: "Du hast dir die Krone für dieses Kapitel verdient.",
    badge: `<span class="cel-icon crown">${CROWN}</span>`, coins: c.coins,
  };
}

function show(c: Celebration): Promise<void> {
  return new Promise(resolve => {
    const k = content(c);
    const el = document.createElement("div");
    el.className = `celebrate cel-${c.kind}`;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "celTitle");
    const particles = reducedMotion() ? "" : Array.from({ length: 22 }, () => {
      const x = Math.round(Math.random() * 100);
      const d = (1.6 + Math.random() * 1.4).toFixed(2);
      const delay = (Math.random() * 0.6).toFixed(2);
      const r = Math.round(180 + Math.random() * 360);
      const s = (0.6 + Math.random() * 0.6).toFixed(2);
      return `<i style="--x:${x}%;--d:${d}s;--delay:${delay}s;--r:${r}deg;--s:${s}"></i>`;
    }).join("");
    el.innerHTML = `
      <div class="cel-particles" aria-hidden="true">${particles}</div>
      <div class="cel-card">
        <div class="cel-badge">
          <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="cel-track" cx="60" cy="60" r="52"/><circle class="cel-ring" cx="60" cy="60" r="52"/></svg>
          ${k.badge}
        </div>
        <span class="eyebrow">${esc(k.eyebrow)}</span>
        <h2 id="celTitle">${esc(k.title)}</h2>
        <p class="muted">${esc(k.text)}</p>
        ${k.coins ? `<p class="coins-won"><span class="coin-sm" aria-hidden="true"></span> +${k.coins} Münzen</p>` : ""}
        <button class="btn" id="celOk">Weiter</button>
      </div>`;
    document.body.appendChild(el);
    const before = document.activeElement as HTMLElement | null;
    const ok = $("#celOk", el);
    ok.focus();
    const close = () => {
      document.removeEventListener("keydown", onKey);
      el.classList.add("closing");
      setTimeout(() => { el.remove(); before?.focus?.(); resolve(); }, reducedMotion() ? 0 : 180);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter") { e.preventDefault(); close(); } };
    document.addEventListener("keydown", onKey);
    ok.addEventListener("click", close);
    el.addEventListener("click", e => { if (e.target === el) close(); });
  });
}

/** Zählt eine Zahl in einem Element sanft hoch. */
export function countUp(el: HTMLElement, to: number, prefix = "", suffix = "", ms = 700) {
  if (reducedMotion() || to <= 0) { el.textContent = `${prefix}${to}${suffix}`; return; }
  const start = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / ms);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
