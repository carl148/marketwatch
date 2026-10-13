import { sparplan } from "../shared/calc.ts";

// Gestapeltes Flächendiagramm (Eingezahlt + Ertrag) auf einem Canvas.
// Farben kommen aus den CSS-Variablen, damit es in hellem und dunklem Modus passt.

function niceStep(raw: number) {
  const p = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const n = raw / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}
function shortEur(v: number) {
  if (v >= 1e6) return (v / 1e6).toLocaleString("de-DE", { maximumFractionDigits: 1 }) + " Mio";
  if (v >= 1000) return (v / 1000).toLocaleString("de-DE", { maximumFractionDigits: 0 }) + " Tsd";
  return String(Math.round(v));
}

export function drawSparplan(cv: HTMLCanvasElement) {
  let input: Record<string, unknown>;
  try { input = JSON.parse(cv.dataset.sparplan ?? "{}"); } catch { return; }
  const pts = sparplan(input).series;
  const css = getComputedStyle(document.documentElement);
  const col = (n: string) => css.getPropertyValue(n).trim();
  const dpr = window.devicePixelRatio || 1;
  const W = cv.clientWidth, H = cv.clientHeight;
  if (!W || !H) return;
  cv.width = W * dpr;
  cv.height = H * dpr;
  const g = cv.getContext("2d");
  if (!g) return;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, W, H);
  const L = 58, R = 10, T = 8, B = 24, yrs = pts.length - 1;
  const max = Math.max(...pts.map(p => p.v), 1);
  const step = niceStep(max / 4);
  const top = Math.ceil(max / step) * step;
  const x = (i: number) => L + ((W - L - R) * i) / yrs;
  const y = (v: number) => T + (H - T - B) * (1 - v / top);
  g.font = `11px ${col("--mono")}`;
  g.fillStyle = col("--muted");
  g.strokeStyle = col("--line");
  g.lineWidth = 1;
  g.textAlign = "right";
  g.textBaseline = "middle";
  for (let v = 0; v <= top + 1e-6; v += step) {
    g.beginPath(); g.moveTo(L, y(v)); g.lineTo(W - R, y(v)); g.stroke();
    g.fillText(shortEur(v), L - 6, y(v));
  }
  g.textAlign = "center";
  g.textBaseline = "top";
  const ys = yrs <= 10 ? 1 : yrs <= 30 ? 5 : 10;
  for (let i = 0; i <= yrs; i += ys) {
    const label = `${i} J`;
    const half = g.measureText(label).width / 2;
    g.fillText(label, Math.min(x(i), W - half - 1), H - B + 7);
  }
  const area = (get: (p: { v: number; paid: number }) => number, fill: string) => {
    g.beginPath();
    g.moveTo(x(0), y(0));
    pts.forEach((p, i) => g.lineTo(x(i), y(get(p))));
    g.lineTo(x(yrs), y(0));
    g.closePath();
    g.fillStyle = fill;
    g.fill();
  };
  area(p => p.v, col("--chart-b"));
  area(p => Math.min(p.paid, p.v), col("--chart-a"));
  g.beginPath();
  g.arc(x(yrs), y(pts[yrs].v), 4, 0, Math.PI * 2);
  g.fillStyle = col("--ink");
  g.fill();
}

export function redrawCharts(root: ParentNode = document) {
  root.querySelectorAll<HTMLCanvasElement>("canvas[data-sparplan]").forEach(drawSparplan);
}
