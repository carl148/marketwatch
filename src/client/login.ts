import { COUNTRIES, countryByIso, countryFromDigits, dialLabel, flag, searchCountries, type Country } from "./countries.ts";
import { formatPhone, normalizePhone } from "./phone.ts";
import { store } from "./store.ts";
import { $, $$, esc } from "./ui.ts";

// Startbildschirm mit App-Namen und Anmeldung per Telefonnummer.
//
// SMS-VERSAND: Für eine echte Anmeldung muss ein Dienst den Bestätigungscode per
// SMS verschicken und prüfen, z. B. Firebase Authentication, Twilio Verify oder
// ein eigener Server. Dafür sind `sendCode()` und `verifyCode()` die einzigen
// Stellen, die angepasst werden müssen. Bis dahin gibt es einen Testmodus mit
// festem Code. Vor einer Veröffentlichung AUTH_TEST_MODE auf false setzen.

export const AUTH_TEST_MODE = true;
const TEST_CODE = "123456";

/** Hier den SMS-Versand anbinden. Gibt true zurück, wenn der Code verschickt wurde. */
async function sendCode(_e164: string): Promise<boolean> {
  return AUTH_TEST_MODE;
}

/** Hier die Prüfung des Codes anbinden. */
async function verifyCode(_e164: string, code: string): Promise<boolean> {
  return AUTH_TEST_MODE && code === TEST_CODE;
}

export const needsLogin = () => !store.progress.profile.phone;

const LOGO = `<svg viewBox="0 0 512 512" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b57bff"/><stop offset="1" stop-color="#5b25c0"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#lg)"/><rect x="112" y="276" width="76" height="124" rx="22" fill="#fff"/><rect x="218" y="196" width="76" height="204" rx="22" fill="#fff"/><rect x="324" y="112" width="76" height="288" rx="22" fill="#fff"/></svg>`;

const state = {
  step: "phone" as "phone" | "code",
  country: countryByIso("DE")!,
  number: "",
  e164: "",
  error: "",
  busy: false,
};

/** Einblende-Animation nur beim ersten Anzeigen, nicht bei jedem Neuzeichnen. */
let intro = true;

export function renderLogin(m: HTMLElement, done: () => void) {
  const s = state;
  setTimeout(() => { intro = false; }, 0);
  const brand = `<div class="login-brand"><span class="login-logo">${LOGO}</span><h1>Fintelify</h1><p>Finanzwissen in nur 3 Minuten am Tag</p></div>`;
  const card = s.step === "phone" ? `
    <form class="login-card" id="loginForm" novalidate>
      <h2>Anmelden</h2>
      <p class="muted">Gib deine Handynummer ein. Wir schicken dir einen Bestätigungscode per SMS.</p>
      <label class="login-label" for="phoneInput">Telefonnummer</label>
      <div class="phone-row">
        <button type="button" class="dial-btn" id="dialBtn" aria-haspopup="dialog" aria-label="Ländervorwahl: ${esc(s.country.name)} ${dialLabel(s.country)}">
          <span class="flag" aria-hidden="true">${flag(s.country.iso)}</span><span class="num">${dialLabel(s.country)}</span><span class="caret" aria-hidden="true">▾</span>
        </button>
        <input id="phoneInput" class="phone-input" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="170 1234567" value="${esc(s.number)}" maxlength="22">
      </div>
      <p class="ob-error" id="loginErr" role="alert">${esc(s.error)}</p>
      <button class="btn purple wide" id="loginNext" ${s.busy ? "disabled" : ""}>Weiter</button>
      <p class="muted small">Du kannst die Vorwahl auch direkt eintippen, z. B. +43 oder 0041.</p>
    </form>` : `
    <form class="login-card" id="codeForm" novalidate>
      <h2>Code eingeben</h2>
      <p class="muted">Wir haben einen 6-stelligen Code an <b class="num">${esc(formatPhone(s.e164))}</b> geschickt.</p>
      <label class="login-label" for="codeInput">Bestätigungscode</label>
      <input id="codeInput" class="code-input num" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••">
      <p class="ob-error" id="loginErr" role="alert">${esc(s.error)}</p>
      <button class="btn purple wide" id="codeNext" ${s.busy ? "disabled" : ""}>Bestätigen</button>
      <div class="row-actions center"><button type="button" class="linkbtn" id="changeNum">Nummer ändern</button><button type="button" class="linkbtn" id="resend">Code erneut senden</button></div>
    </form>`;
  const test = AUTH_TEST_MODE ? `<p class="login-test">Testmodus: Es wird noch keine SMS verschickt. Der Code lautet ${TEST_CODE}.</p>` : "";
  m.innerHTML = `<section class="login${intro ? " intro" : ""}">${brand}${card}${test}
    <p class="login-legal muted small">Mit der Anmeldung akzeptierst du die <a href="nutzungsbedingungen.html">Nutzungsbedingungen</a>. Infos zum Umgang mit deiner Nummer findest du in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p></section>`;

  const err = (msg: string) => { s.error = msg; $("#loginErr", m).textContent = msg; };

  if (s.step === "phone") {
    const input = $<HTMLInputElement>("#phoneInput", m);
    input.focus();
    input.addEventListener("input", () => {
      s.number = input.value;
      err("");
      // Vorwahl direkt eingetippt: Land automatisch erkennen.
      const v = input.value.trim();
      if (v.startsWith("+") || v.startsWith("00")) {
        const found = countryFromDigits(v.replace(/\D/g, "").replace(/^00/, ""));
        if (found && found.iso !== s.country.iso) { s.country = found; updateDial(m); }
      }
    });
    $("#dialBtn", m).addEventListener("click", () => openPicker(m, c => {
      s.country = c;
      // Steht schon eine Vorwahl in der Nummer, durch die neue ersetzen.
      if (/^(\+|00)/.test(s.number.trim())) s.number = "";
      renderLogin(m, done);
    }));
    $("#loginForm", m).addEventListener("submit", async e => {
      e.preventDefault();
      const r = normalizePhone(input.value, s.country);
      if (!r.ok) { err(r.error); input.focus(); return; }
      s.busy = true; s.error = "";
      const sent = await sendCode(r.e164);
      s.busy = false;
      if (!sent) { err("Der Code konnte nicht verschickt werden. Bitte versuche es später noch einmal."); return; }
      s.e164 = r.e164; s.country = r.country; s.step = "code";
      renderLogin(m, done);
    });
  } else {
    const input = $<HTMLInputElement>("#codeInput", m);
    input.focus();
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 6);
      err("");
      if (input.value.length === 6) $<HTMLFormElement>("#codeForm", m).requestSubmit();
    });
    $("#codeForm", m).addEventListener("submit", async e => {
      e.preventDefault();
      if (input.value.length !== 6) { err("Der Code hat 6 Ziffern."); return; }
      s.busy = true;
      const ok = await verifyCode(s.e164, input.value);
      s.busy = false;
      if (!ok) { err("Der Code stimmt nicht. Bitte prüfe ihn noch einmal."); input.select(); return; }
      store.progress.profile.phone = s.e164;
      store.saveProgress();
      Object.assign(s, { step: "phone", number: "", e164: "", error: "" });
      done();
    });
    $("#changeNum", m).addEventListener("click", () => { s.step = "phone"; s.error = ""; renderLogin(m, done); });
    $("#resend", m).addEventListener("click", async () => {
      err((await sendCode(s.e164)) ? "" : "Der Code konnte nicht verschickt werden.");
      if (!s.error) { $("#loginErr", m).textContent = "Neuer Code verschickt."; }
    });
  }
}

function updateDial(m: HTMLElement) {
  const b = $("#dialBtn", m);
  b.querySelector(".flag")!.textContent = flag(state.country.iso);
  b.querySelector(".num")!.textContent = dialLabel(state.country);
  b.setAttribute("aria-label", `Ländervorwahl: ${state.country.name} ${dialLabel(state.country)}`);
}

/** Auswahlfenster mit allen Ländern; Suche nach Name oder Vorwahl. */
function openPicker(m: HTMLElement, pick: (c: Country) => void) {
  const sheet = document.createElement("div");
  sheet.className = "picker";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-label", "Land und Vorwahl wählen");
  sheet.innerHTML = `<div class="picker-card">
      <div class="picker-head"><h2>Vorwahl wählen</h2><button class="x" id="pickClose" aria-label="Schließen">×</button></div>
      <input class="lex-search" id="pickSearch" type="search" placeholder="Land oder Vorwahl, z. B. +43" autocomplete="off" aria-label="Land oder Vorwahl suchen">
      <ul class="picker-list" id="pickList"></ul>
    </div>`;
  document.body.append(sheet);
  const list = $("#pickList", sheet), search = $<HTMLInputElement>("#pickSearch", sheet);
  const close = () => { sheet.remove(); document.removeEventListener("keydown", onKey); $("#dialBtn", m)?.focus(); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  const draw = () => {
    const hits = searchCountries(search.value);
    list.innerHTML = hits.length ? hits.map(c => `<li><button data-iso="${c.iso}" class="${c.iso === state.country.iso ? "sel" : ""}"><span class="flag" aria-hidden="true">${flag(c.iso)}</span><span class="pname">${esc(c.name)}</span><span class="num muted">${dialLabel(c)}</span></button></li>`).join("")
      : `<li class="muted picker-empty">Kein Land gefunden.</li>`;
    $$("[data-iso]", list).forEach(b => b.addEventListener("click", () => { const c = countryByIso(b.dataset.iso!)!; close(); pick(c); }));
  };
  search.addEventListener("input", draw);
  search.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); $<HTMLButtonElement>("[data-iso]", list)?.click(); } });
  sheet.addEventListener("click", e => { if (e.target === sheet) close(); });
  $("#pickClose", sheet).addEventListener("click", close);
  document.addEventListener("keydown", onKey);
  draw();
  search.focus();
}

export const countryCount = COUNTRIES.length;
