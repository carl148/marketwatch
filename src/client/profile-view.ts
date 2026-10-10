import { ACHIEVEMENTS, ALL_LESSONS } from "./content.ts";
import { ACCENTS, FREEZE_PRICE, GOAL_OPTIONS, LEVELS_OF_KNOWLEDGE, dayDiff, rankOf, usernameError, type AccentId } from "./rules.ts";
import { addCoins, applyLook, exportCode, importCode, isPremium, levelOf, liveStreak, maxFreezes, store, today, unlock } from "./store.ts";
import { $, $$, esc, toast } from "./ui.ts";

// Profil: Konto, Premium, Statistik, Aktivitätskalender, Shop, Einstellungen, Daten.

const CROWN = `<svg class="name-crown" viewBox="0 0 24 24" fill="currentColor" aria-label="Premium"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;


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
    <section class="profile-card ${isPremium() ? "is-premium" : ""}">
      <div class="avatar" aria-hidden="true">${esc(initials(prof.name))}</div>
      <div class="pc-main">
        <label class="sr-only" for="pName">Benutzername</label>
        <div class="name-row"><input id="pName" class="name-input" maxlength="20" placeholder="Benutzername" value="${esc(prof.name)}" autocomplete="nickname">${isPremium() ? CROWN : ""}</div>
        <p class="name-err" id="nameErr" role="alert"></p>
        <p class="muted">Level ${lvl} · ${rankOf(lvl)}${isPremium() ? " · Premium" : ""}</p>
      </div>
      <div class="pc-coins"><span class="coin-sm" aria-hidden="true"></span><b class="num">${p.coins}</b><small>Münzen</small></div>
    </section>

    <a class="premium-banner ${isPremium() ? "on" : ""}" href="#premium">
      <span class="pb-crown" aria-hidden="true">${CROWN}</span>
      <span><b>${isPremium() ? "Premium ist aktiv" : "Fintelify Premium"}</b><small>${isPremium() ? "Alle Lektionen offen, wöchentlicher Serienschutz, Premium-Name" : "Alle Lektionen sofort, Serienschutz jede Woche, Premium-Name"}</small></span>
      <span aria-hidden="true">›</span>
    </a>

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
      ${tile("Kronen", String(Object.values(p.exams ?? {}).filter(e => e.passed).length))}
      ${tile("Sprint-Bestwert", String(p.sprintBest ?? 0))}
    </div>

    <div class="section-title"><h2>Aktivität</h2><span class="eyebrow">Letzte 12 Wochen</span></div>
    <div class="panel">${calendar()}</div>

    <div class="section-title"><h2>Shop</h2><span class="eyebrow">${p.coins} Münzen</span></div>
    <div class="shop">
      <div class="shop-item">
        <div><b>Serienschutz</b><p class="muted small">Rettet deine Lernserie, wenn du einen Tag verpasst. Du hast ${p.freezes} von ${maxFreezes()}.${isPremium() ? " Premium: jede Woche einer gratis." : ""}</p></div>
        <button class="btn small" id="buyFreeze" ${p.freezes >= maxFreezes() || p.coins < FREEZE_PRICE ? "disabled" : ""}>${p.freezes >= maxFreezes() ? "Voll" : `${FREEZE_PRICE} Münzen`}</button>
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

    <div class="section-title"><h2>Einstellungen</h2></div>
    <div class="panel settings">
      <div class="set-row"><span><b>Tagesziel</b><small class="muted">XP pro Tag</small></span>
        <div class="seg" role="group" aria-label="Tagesziel">${GOAL_OPTIONS.map(g => `<button data-goal-set="${g.xp}" aria-pressed="${prof.dailyGoal === g.xp}">${g.name} · ${g.xp}</button>`).join("")}</div></div>
      <div class="set-row"><span><b>Wissensstand</b><small class="muted">bestimmt den empfohlenen Start</small></span>
        <div class="seg" role="group" aria-label="Wissensstand">${LEVELS_OF_KNOWLEDGE.map(k => `<button data-know-set="${k}" aria-pressed="${prof.knowledge === k}">${k}</button>`).join("")}</div></div>
      <div class="set-row"><span><b>Darstellung</b></span>
        <div class="seg" role="group" aria-label="Farbschema">${(["system", "light", "dark"] as const).map(t => `<button data-theme-set="${t}" aria-pressed="${prof.theme === t}">${{ system: "Wie Gerät", light: "Hell", dark: "Dunkel" }[t]}</button>`).join("")}</div></div>
    </div>

    <div class="section-title"><h2>Deine Daten</h2></div>
    <div class="panel stack">
      <p class="muted">Fintelify speichert alles nur auf diesem Gerät, ohne Cookies und ohne Tracking. Mit einem Sicherungscode nimmst du deinen Fortschritt auf ein anderes Gerät mit.</p>
      <div class="row-actions"><button class="btn ghost" id="exportBtn">Sicherungscode anzeigen</button><button class="btn ghost" id="importBtn">Fortschritt übertragen</button></div>
      <div id="exportBox" hidden class="stack">
        <label for="exportCode" class="small muted">Dein Sicherungscode. Kopiere ihn und füge ihn auf dem neuen Gerät unter „Fortschritt übertragen“ ein.</label>
        <textarea id="exportCode" class="code-box" rows="4" readonly></textarea>
        <div class="row-actions"><button class="btn small" id="copyCode">Kopieren</button></div>
      </div>
      <div id="importBox" hidden class="stack">
        <label for="importCode" class="small muted">Sicherungscode einfügen. Der Fortschritt auf diesem Gerät wird dabei ersetzt.</label>
        <textarea id="importCode" class="code-box" rows="4"></textarea>
        <p class="name-err" id="importErr" role="alert"></p>
        <div class="row-actions"><button class="btn small" id="importGo">Übertragen</button></div>
      </div>
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
    const err = usernameError(nameInput.value);
    $("#nameErr", m).textContent = err ?? "";
    if (err) return;
    prof.name = nameInput.value.trim();
    store.saveProgress();
    $(".avatar", m).textContent = initials(prof.name);
  });
  nameInput.addEventListener("change", () => { nameInput.value = prof.name; $("#nameErr", m).textContent = ""; if (prof.name) unlock("profile"); });

  $$("[data-goal-set]", m).forEach(b => b.addEventListener("click", () => { prof.dailyGoal = Number(b.dataset.goalSet); store.saveProgress(); hooks.stats(); hooks.rerender(); }));
  $$("[data-know-set]", m).forEach(b => b.addEventListener("click", () => { prof.knowledge = b.dataset.knowSet!; store.saveProgress(); hooks.rerender(); }));

  $("#exportBtn", m).addEventListener("click", () => {
    $("#importBox", m).hidden = true;
    $("#exportBox", m).hidden = false;
    ($("#exportCode", m) as HTMLTextAreaElement).value = exportCode();
  });
  $("#copyCode", m).addEventListener("click", async () => {
    const ta = $("#exportCode", m) as HTMLTextAreaElement;
    try { await navigator.clipboard.writeText(ta.value); toast("Code kopiert"); }
    catch { ta.focus(); ta.select(); toast("Code markiert. Jetzt kopieren."); }
  });
  $("#importBtn", m).addEventListener("click", () => { $("#exportBox", m).hidden = true; $("#importBox", m).hidden = false; });
  $("#importGo", m).addEventListener("click", () => {
    try {
      importCode(($("#importCode", m) as HTMLTextAreaElement).value);
      applyLook();
      toast("Fortschritt übertragen");
      hooks.stats();
      hooks.rerender();
    } catch (e) { $("#importErr", m).textContent = (e as Error).message; }
  });

  $("#buyFreeze", m).addEventListener("click", () => {
    if (p.coins < FREEZE_PRICE || p.freezes >= maxFreezes()) return;
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
