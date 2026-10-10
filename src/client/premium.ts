import { celebrate } from "./celebrate.ts";
import { PREMIUM_PERKS } from "./rules.ts";
import { grantWeeklyFreeze, isPremium, setPremium, store } from "./store.ts";
import { $, esc, toast } from "./ui.ts";

// Premium-Seite. Die Vorteile entsprechen dem Original.
//
// BEZAHLUNG: Eine echte Zahlung braucht einen Anbieter, z. B. In-App-Käufe im
// App Store (bei einer verpackten App) oder Stripe im Web. Dafür ist
// `purchase()` die einzige Stelle, die angepasst werden muss. Bis dahin gibt es
// einen Testmodus, mit dem sich Premium ohne Bezahlung ausprobieren lässt.
// Vor einer Veröffentlichung TEST_MODE auf false setzen.

export const TEST_MODE = true;

/** Hier den echten Kauf anbinden. Gibt true zurück, wenn der Kauf erfolgreich war. */
async function purchase(): Promise<boolean> {
  return false;
}

let hooks = { rerender: () => {}, stats: () => {} };
export function initPremium(h: typeof hooks) { hooks = h; }

const CROWN = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5z"/></svg>`;

export function renderPremium(m: HTMLElement) {
  const on = isPremium();
  const since = store.progress.profile.premiumSince;
  m.innerHTML = `
    <section class="premium-hero">
      <span class="premium-crown">${CROWN}</span>
      <span class="eyebrow on-dark">Fintelify Premium</span>
      <h2>${on ? "Du bist Premium" : "Lerne ohne Grenzen"}</h2>
      <p>${on ? `Seit ${since ? new Date(since).toLocaleDateString("de-DE") : "heute"} aktiv. Danke für deine Unterstützung!` : "Alle Lektionen sofort, eine Lernserie, die leichter hält, und ein Benutzername, der auffällt."}</p>
    </section>
    <ul class="perks">${PREMIUM_PERKS.map(x => `<li class="perk"><span class="perk-check" aria-hidden="true">✓</span><div><b>${esc(x.title)}</b><p class="muted">${esc(x.text)}</p></div></li>`).join("")}</ul>
    <div class="panel stack">
      ${on ? `<p class="muted">Premium ist auf diesem Gerät aktiv.</p>`
        : `<button class="btn" id="buy">Premium holen</button>
           <p class="muted small" id="buyNote">Preis und Bezahlung werden bei der Veröffentlichung über den App Store oder einen Zahlungsanbieter festgelegt.</p>`}
    </div>
    ${TEST_MODE ? `<div class="panel stack test-mode">
      <span class="eyebrow">Testmodus</span>
      <p class="muted">Nur zum Ausprobieren, ohne Bezahlung. Vor der Veröffentlichung wird dieser Bereich abgeschaltet.</p>
      <div class="row-actions"><button class="btn ghost" id="testToggle">${on ? "Premium deaktivieren" : "Premium testweise aktivieren"}</button></div>
    </div>` : ""}
    <p><a href="#profile">Zurück zum Profil</a></p>`;

  $("#buy", m)?.addEventListener("click", async () => {
    if (await purchase()) activate();
    else $("#buyNote", m).textContent = "Die Bezahlung ist in dieser Version noch nicht angebunden." + (TEST_MODE ? " Im Testmodus unten kannst du Premium ausprobieren." : "");
  });
  $("#testToggle", m)?.addEventListener("click", () => {
    if (isPremium()) { setPremium(false); toast("Premium deaktiviert"); hooks.stats(); hooks.rerender(); }
    else activate();
  });
}

function activate() {
  setPremium(true);
  grantWeeklyFreeze();
  celebrate({ kind: "premium" });
  hooks.stats();
  hooks.rerender();
}
