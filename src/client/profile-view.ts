import { ACHIEVEMENTS, ALL_LESSONS } from "./content.ts";
import { ACCENTS, FREEZE_PRICE, MAX_FREEZES, dayDiff, type AccentId } from "./rules.ts";
import { addCoins, applyLook, levelOf, liveStreak, store, today, unlock } from "./store.ts";
import { $, $$, esc, toast } from "./ui.ts";

// Profil: Name und Aussehen, Statistik, Aktivitätskalender, Shop, Daten.

const RANKS: [number, string][] = [[1, "Einsteiger"], [3, "Sparfuchs"], [5, "Finanzkenner"], [8, "Börsenprofi"], [12, "Finanzmeister"]];
export const rankOf = (level: number) => RANKS.filter(([l]) => level >= l).at(-1)![1];

const initials = (name: string) => name.trim().split(/\s+/).map(w => w[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";

let hooks = { rerender: () => {}, stats: () => {}, wiped: () => {} };
export function initProfile(h: typeof hooks) { hooks = h; }

export function renderProfile(m: HTMLElement) {
  const p = store.progress;
  const prof = p.profile;
  const lvl = levelOf(p.xp);
  const done = ALL_LESSONS.filter(l => p.done[l.id]).length;
  const rate = p.answered ? Math.round((p.correct / p.answered) * 100) : null;

  m.innerHTML = `
    <section class="profile-card">
      <div class="avatar" aria-hidden="true">${esc(initials(prof.name))}</div>
      <div class="pc-main">
        <label class="sr-only" for="pName">Dein Name</label>
        <input id="pName" class="name-input" maxlength="20" placeholder="Wie heißt du?" value="${esc(prof.name)}" autocomplete="nickname">
        <p class="muted">Level ${lvl} · ${rankOf(lvl)}</p>
      </div>
      <div class="pc-coins"><span class="coin-sm" aria-hidden="true"></span><b class="num">${p.coins}</b><small>Münzen</small></div>
    </section>

    <div class="section-title"><h2>Statistik</h2></div>
    <div class="stat-grid">
      ${tile("Lektionen", `${done}/${ALL_LESSONS.length}`)}
      ${tile("Richtige Antworten", String(p.correct ?? 0))}
      ${tile("Trefferquote", rate === null ? "–" : `${rate} %`)}
      ${tile("Lernserie", `${liveStreak()} Tage`)}
      ${tile("Längste Serie", `${Math.max(p.best ?? 0, p.streak)} Tage`)}
      ${tile("Challenges", String(p.challengesDone ?? 0))}
      ${tile("Erfolge", `${ACHIEVEMENTS.filter(x => p.ach[x.id]).length}/${ACHIEVEMENTS.length}`)}
      ${tile("XP gesamt", p.xp.toLocaleString("de-DE"))}
    </div>

    <div class="section-title"><h2>Aktivität</h2><span class="eyebrow">Letzte 12 Wochen</span></div>
    <div class="panel">${calendar()}</div>

    <div class="section-title"><h2>Shop</h2><span class="eyebrow">${p.coins} Münzen</span></div>
    <div class="shop">
      <div class="shop-item">
        <div><b>Serienschutz</b><p class="muted small">Rettet deine Lernserie, wenn du einen Tag verpasst. Du hast ${p.freezes} von ${MAX_FREEZES}.</p></div>
        <button class="btn small" id="buyFreeze" ${p.freezes >= MAX_FREEZES || p.coins < FREEZE_PRICE ? "disabled" : ""}>${p.freezes >= MAX_FREEZES ? "Voll" : `${FREEZE_PRICE} Münzen`}</button>
      </div>
      <div class="shop-item">
        <div><b>Akzentfarbe</b><p class="muted small">Gib der App deine Farbe.</p></div>
        <div class="swatches">${ACCENTS.map(a => {
          const owned = prof.unlocked.includes(a.id), active = prof.accent === a.id;
          return `<button class="swatch sw-${a.id} ${active ? "active" : ""}" data-accent="${a.id}" aria-pressed="${active}" ${!owned && p.coins < a.price ? "disabled" : ""}>
            <span class="dotc" aria-hidden="true"></span>${a.name}${owned ? "" : ` · ${a.price}`}</button>`;
        }).join("")}</div>
      </div>
    </div>

    <div class="section-title"><h2>Darstellung</h2></div>
    <div class="panel"><div class="seg" role="group" aria-label="Farbschema">
      ${(["system", "light", "dark"] as const).map(t => `<button data-theme-set="${t}" aria-pressed="${prof.theme === t}">${{ system: "Wie Gerät", light: "Hell", dark: "Dunkel" }[t]}</button>`).join("")}
    </div></div>

    <div class="section-title"><h2>Deine Daten</h2></div>
    <div class="panel stack">
      <p class="muted">Fintelify speichert alles nur auf diesem Gerät. Es gibt keine Anmeldung, keine Cookies und kein Tracking.</p>
      <div class="row-actions"><button class="btn ghost" id="wipe">Alle Daten auf diesem Gerät löschen</button></div>
      <div id="wipeConfirm" hidden class="confirm">
        <p>Wirklich alles löschen? Fortschritt, Münzen und Profil sind danach weg.</p>
        <div class="row-actions"><button class="btn danger" id="wipeYes">Ja, löschen</button><button class="btn ghost" id="wipeNo">Abbrechen</button></div>
      </div>
      <p class="muted small">Fintelify vermittelt allgemeines Finanzwissen und ersetzt keine Anlage-, Steuer- oder Rechtsberatung.</p>
      <p><a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Datenschutz</a> · <a href="nutzungsbedingungen.html">Nutzungsbedingungen</a></p>
    </div>`;

  const nameInput = $("#pName", m) as HTMLInputElement;
  nameInput.addEventListener("input", () => {
    prof.name = nameInput.value.slice(0, 20);
    store.saveProgress();
    $(".avatar", m).textContent = initials(prof.name);
  });
  nameInput.addEventListener("change", () => { if (prof.name.trim()) unlock("profile"); });

  $("#buyFreeze", m).addEventListener("click", () => {
    if (p.coins < FREEZE_PRICE || p.freezes >= MAX_FREEZES) return;
    addCoins(-FREEZE_PRICE);
    p.freezes++;
    store.saveProgress();
    toast("Serienschutz gekauft");
    hooks.stats();
    hooks.rerender();
  });

  $$("[data-accent]", m).forEach(b => b.addEventListener("click", () => {
    const id = b.dataset.accent as AccentId;
    const a = ACCENTS.find(x => x.id === id)!;
    if (!prof.unlocked.includes(id)) {
      if (p.coins < a.price) return;
      addCoins(-a.price);
      prof.unlocked.push(id);
      toast(`${a.name} freigeschaltet`);
    }
    prof.accent = id;
    store.saveProgress();
    applyLook();
    hooks.stats();
    hooks.rerender();
  }));

  $$("[data-theme-set]", m).forEach(b => b.addEventListener("click", () => {
    prof.theme = b.dataset.themeSet as typeof prof.theme;
    store.saveProgress();
    applyLook();
    hooks.rerender();
  }));

  $("#wipe", m).addEventListener("click", () => { $("#wipeConfirm", m).hidden = false; });
  $("#wipeNo", m).addEventListener("click", () => { $("#wipeConfirm", m).hidden = true; });
  $("#wipeYes", m).addEventListener("click", () => { store.wipe(); applyLook(); toast("Alle Daten gelöscht"); hooks.wiped(); });
}

const tile = (label: string, value: string) => `<div class="tile"><small>${esc(label)}</small><b class="num">${esc(value)}</b></div>`;

/** Kalender der letzten 12 Wochen, Spalten = Wochen (Mo bis So). */
function calendar(): string {
  const t = today();
  const now = new Date();
  const weekday = (now.getDay() + 6) % 7; // Montag = 0
  const start = new Date(now);
  start.setDate(now.getDate() - weekday - 7 * 11);
  const pad = (n: number) => String(n).padStart(2, "0");
  const cells: string[] = [];
  let active = 0;
  for (let i = 0; i < 84; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const future = dayDiff(t, key) > 0;
    const xp = store.progress.history[key] ?? 0;
    if (xp) active++;
    const lvl = future ? "f" : xp === 0 ? 0 : xp < 20 ? 1 : xp < 50 ? 2 : 3;
    const label = d.toLocaleDateString("de-DE", { day: "numeric", month: "short" });
    cells.push(`<i class="c${lvl}" title="${label}: ${xp} XP"></i>`);
  }
  return `<div class="cal" role="img" aria-label="An ${active} der letzten 84 Tage gelernt">${cells.join("")}</div>
    <div class="cal-legend"><span>Mo bis So, älteste Woche links</span><span class="cal-scale">weniger <i class="c0"></i><i class="c1"></i><i class="c2"></i><i class="c3"></i> mehr</span></div>`;
}
