// Symbole für die Knöpfe im Lernpfad: jede Lektion bekommt ein Bild, das zu ihrem Thema passt.
// Einfache Linien-Symbole (24 × 24), die mit currentColor gezeichnet werden.

const P: Record<string, string> = {
  wallet: `<path d="M3 7a2 2 0 0 1 2-2h12v2"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16.5 13.5h.01"/>`,
  percent: `<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>`,
  bank: `<path d="M3 9.5 12 4l9 5.5M4.5 20h15M6.5 11v6M10.5 11v6M13.5 11v6M17.5 11v6"/>`,
  repeat: `<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>`,
  warning: `<path d="M12 3.5 21.5 20h-19z"/><path d="M12 10v4.5M12 17.5h.01"/>`,
  book: `<path d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5 1.5 1.5 0 0 0 5.5 21H20"/><path d="M8 7h8M8 11h6"/>`,
  cash: `<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v5M18 9.5v5"/>`,
  umbrella: `<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>`,
  trendUp: `<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>`,
  target: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12h.01"/>`,
  coins: `<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.7-2.7-3-6-3"/>`,
  briefcase: `<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>`,
  key: `<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l2 2"/>`,
  receipt: `<path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 7.5h6M9 11.5h6M9 15.5h4"/>`,
  plug: `<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>`,
  plane: `<path d="M22 16v-2l-8.5-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8.5-2.5V18L8 20v1.5l4-1 4 1V20l-2.5-2v-4.5z"/>`,
  tag: `<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><path d="M7.5 7.5h.01"/>`,
  doc: `<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4M9 11h6M9 15h6"/>`,
  lifebuoy: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>`,
  house: `<path d="M3 11 12 3.5 21 11"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>`,
  gauge: `<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 15l4-5"/><path d="M12 15h.01"/>`,
  card: `<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>`,
  smile: `<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 10h.01M15 10h.01"/>`,
  diamond: `<path d="M6 3.5h12l3 5.5-9 12-9-12z"/><path d="M3 9h18M12 21 8.5 9 12 3.5 15.5 9z"/>`,
  grid: `<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>`,
  anchor: `<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 11h8M4 13a8 8 0 0 0 16 0"/>`,
  sprout: `<path d="M12 21v-9"/><path d="M12 12C12 7 8 4 3.5 4 3.5 9 7 12 12 12z"/><path d="M12 14c0-4 3-7 8.5-7 0 5-3.5 7-8.5 7z"/>`,
  hourglass: `<path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/>`,
  triangle: `<path d="M12 6.5 18 17.5H6z"/><circle cx="12" cy="4.5" r="2.2"/><circle cx="4.5" cy="19" r="2.2"/><circle cx="19.5" cy="19" r="2.2"/>`,
  calculator: `<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8.5 6.5h7v3h-7zM8.5 13.5h.01M12 13.5h.01M15.5 13.5h.01M8.5 17h.01M12 17h.01M15.5 17h.01"/>`,
  scale: `<path d="M12 3v18M7 21h10M4 7h16"/><path d="M4 7l-2.5 6h5zM20 7l-2.5 6h5z"/>`,
  chartLine: `<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>`,
  basket: `<path d="M3 10h18l-2 10H5z"/><path d="M8 10l4-6 4 6M9 14v3M12 14v3M15 14v3"/>`,
  pie: `<path d="M11 3.5a8.5 8.5 0 1 0 9.5 9.5H11z"/><path d="M14 2.5A7.5 7.5 0 0 1 21.5 10H14z"/>`,
  split: `<path d="M12 21v-8L5 6M12 13l7-7"/><path d="M5 11V6h5M19 11V6h-5"/>`,
  folder: `<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M8 16l3-3 2 2 3-3"/>`,
  heart: `<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>`,
  gold: `<path d="M2.5 20l2-6h6l2 6zM11.5 20l2-6h6l2 6zM7 12l2-6h6l2 6z"/>`,
  search: `<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>`,
  gift: `<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8C9 8 7 4 9.5 4S12 8 12 8zM12 8c3 0 5-4 2.5-4S12 8 12 8z"/>`,
  swap: `<path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5"/>`,
  copy: `<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>`,
  checklist: `<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5"/>`,
  rebalance: `<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 20v-5h-5"/>`,
  shield: `<path d="M12 2.5 20 5.5v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6z"/>`,
  shieldCheck: `<path d="M12 2.5 20 5.5v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>`,
  pencil: `<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>`,
  columns: `<path d="M3 21h18M4 7.5h16L12 3zM6 7.5V18M12 7.5V18M18 7.5V18M4.5 18h15"/>`,
  factory: `<path d="M3 21V10l6 4v-4l6 4V5h6v16z"/><path d="M7 17.5h2M12 17.5h2"/>`,
  medical: `<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 7.5v9M7.5 12h9"/>`,
  sunset: `<path d="M3 18h18M6 21h12"/><path d="M7 18a5 5 0 0 1 10 0"/><path d="M12 9V5M5.5 11.5 4 10M18.5 11.5 20 10"/>`,
  car: `<path d="M3 16v-4l2.5-5.5h13L21 12v4z"/><path d="M3 12h18"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>`,
  suitcase: `<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M8 7v13M16 7v13"/>`,
  gradcap: `<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>`,
  users: `<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5.5"/>`,
  wrench: `<path d="M15 3.5a5 5 0 0 0-5.6 6.6L3 16.5V21h4.5l6.4-6.4A5 5 0 0 0 20.5 9l-3 1-3.5-3.5 1-3z"/>`,
  tv: `<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 2.5l4 3.5 4-3.5"/>`,
  store: `<path d="M4 10v10h16V10"/><path d="M3 4h18l-1 5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0z"/><path d="M10 20v-5h4v5"/>`,
  safe: `<rect x="3" y="4" width="18" height="15" rx="2"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8v1M6 19v2M18 19v2"/>`,
  baby: `<circle cx="12" cy="9" r="5.5"/><path d="M10 8.5h.01M14 8.5h.01M10.5 11a2 2 0 0 0 3 0M7 21a5 5 0 0 1 10 0"/>`,
  scroll: `<path d="M7 3h11a2 2 0 0 1 2 2v2h-4"/><path d="M16 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2h11v2a2 2 0 0 0 2 2"/><path d="M8 8h5M8 12h5"/>`,
  folderPlus: `<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M12 10.5v6M9 13.5h6"/>`,
  building: `<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10.5 21v-3h3v3"/>`,
  wave: `<path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0c1.2-3 3-4 5-3"/>`,
  currency: `<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/><path d="M12 3.5l2 2-2 2M12 20.5l-2-2 2-2"/>`,
  cart: `<path d="M2.5 3h3l2.4 12h11l2-8H6.5"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>`,
  bolt: `<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>`,
  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>`,
  leaf: `<path d="M5 19C5 10 10 4 20 4c0 10-6 15-15 15z"/><path d="M5 19l8-8"/>`,
  hook: `<path d="M14 5v9a5 5 0 0 1-10 0v-3l3 3"/><circle cx="14" cy="3.5" r="1.5"/>`,
  crypto: `<circle cx="12" cy="12" r="9"/><path d="M9.5 7.5h4a2 2 0 0 1 0 4h-4zM9.5 11.5h4.5a2 2 0 0 1 0 4H9.5zM9.5 7.5v8M11 6v1.5M11 15.5V17"/>`,
  megaphone: `<path d="M3 10v4h3l8 5V5L6 10z"/><path d="M17.5 9a4 4 0 0 1 0 6M6 14l1 6h2.5l-.5-5"/>`,
  lock: `<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>`,
  idcard: `<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5 16a3.5 3.5 0 0 1 7 0M14.5 10h4M14.5 14h4"/>`,
  bars: `<path d="M6 20v-6M12 20V9M18 20V4"/>`,
};

/** Welches Symbol zu welcher Lektion gehört. */
export const LESSON_ICON: Record<string, string> = {
  // Budget & Konto
  b1: "wallet", b2: "percent", b3: "bank", b4: "repeat", b5: "warning", b6: "book", b7: "cash",
  // Sparen
  s1: "umbrella", s2: "trendUp", s3: "calendar", s4: "target", s5: "coins", s6: "briefcase",
  // Geld im Alltag
  a1: "briefcase", a2: "key", a3: "receipt", a4: "plug", a5: "plane", a6: "tag",
  // Kredite & Schulden
  k1: "doc", k2: "lifebuoy", k3: "house", k4: "gauge", k5: "card",
  // Psychologie des Geldes
  p1: "smile", p2: "diamond", p3: "grid", p4: "anchor",
  // Zinseszins
  z1: "sprout", z2: "hourglass", z3: "triangle", z4: "calculator", z5: "scale",
  // Investieren
  i1: "chartLine", i2: "basket", i3: "pie", i4: "split", i5: "folder", i6: "heart", i7: "gauge", i8: "gold",
  // Aktien im Detail
  x1: "search", x2: "gift", x3: "swap", x4: "doc",
  // Fonds & ETFs vertieft
  g1: "scale", g2: "copy", g3: "checklist", g4: "rebalance",
  // Steuern
  t1: "shieldCheck", t2: "cash", t3: "receipt", t4: "doc", t5: "calculator", t6: "pencil",
  // Vorsorge
  v1: "columns", v2: "shield", v3: "factory", v4: "umbrella", v5: "doc", v6: "sunset",
  // Versicherungen kompakt
  y1: "medical", y2: "shield", y3: "car", y4: "suitcase",
  // Ausbildung & Studium
  u1: "gradcap", u2: "users", u3: "wrench", u4: "tv",
  // Nebenjob & Selbstständigkeit
  n1: "store", n2: "receipt", n3: "safe", n4: "shieldCheck",
  // Familie & Lebensphasen
  h1: "heart", h2: "baby", h3: "scroll", h4: "folderPlus",
  // Wohnen & Immobilien
  r1: "house", r2: "building", r3: "trendUp", r4: "key",
  // Wirtschaft verstehen
  w1: "percent", w2: "wave", w3: "chartLine", w4: "currency", w5: "cart", w6: "bolt",
  // Wirtschaft & Staat
  q1: "columns", q2: "scale", q3: "lifebuoy", q4: "globe",
  // Geld & Nachhaltigkeit
  o1: "leaf", o2: "search", o3: "repeat", o4: "heart",
  // Betrug & Krypto
  f1: "hook", f2: "crypto", f3: "megaphone", f4: "lock", f5: "idcard",
};

export const hasIcon = (name: string) => name in P;

/** SVG eines Symbols; unbekannte Namen fallen auf Balken zurück. */
export function icon(name: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] ?? P.bars}</svg>`;
}

export const lessonIcon = (lessonId: string) => icon(LESSON_ICON[lessonId] ?? "bars");
