# Groschen

Eine Finanz-Lern-App für Deutschland: kurze Lektionen mit Quiz, Lernserien und XP, ein Wiederholen-Stapel für falsche Antworten, fünf Finanzrechner und ein KI-Coach, der mit Claude von Anthropic arbeitet.

Die App läuft im Browser und lässt sich auf dem Handy wie eine App auf den Startbildschirm legen (Progressive Web App).

## Was drin ist

| Bereich | Funktionen |
|---|---|
| **Lernen** | 6 Kapitel, 12 Lektionen mit Lernkarten und Quiz, XP, Level, Lernserie, Tagesziel, 10 Erfolge |
| **Rechner** | Sparplan mit Diagramm (inkl. Kosten und Inflation), 50/30/20-Budget, Notgroschen, Kredit, Steuer auf Kapitalerträge |
| **Üben** | Falsch beantwortete Fragen kommen in einen Stapel, bis sie sitzen |
| **Coach** | Chat mit Claude: erklärt, rechnet mit denselben Rechnern (Ergebnis als Karte), stellt Quizfragen im Chat, liest Fotos von Dokumenten, nutzt ein freiwilliges Profil, schlägt Folgefragen vor. Bewusst eine Lernhilfe ohne persönliche Anlageempfehlungen |
| **Datenschutz** | Fortschritt, Profil und Gespräche bleiben auf dem Gerät. Der Server speichert keine Inhalte. Keine Cookies, kein Tracking, keine externen Schriftarten. Alle Daten lassen sich unter „Mehr“ löschen |

## Schnellstart

Du brauchst [Node.js](https://nodejs.org) ab Version 20 und für den Coach einen API-Schlüssel von [platform.claude.com](https://platform.claude.com).

```bash
npm install
cp .env.example .env        # dann ANTHROPIC_API_KEY in .env eintragen
npm run dev                 # startet die App auf http://localhost:3000
```

Ohne API-Schlüssel läuft alles außer dem Coach.

## Befehle

| Befehl | Was er tut |
|---|---|
| `npm run dev` | Entwicklungsmodus, baut bei Änderungen neu |
| `npm run build` | Baut App und Server nach `public/app.js` und `dist/server.js` |
| `npm start` | Startet den gebauten Server (für den Betrieb) |
| `npm test` | Führt die Tests aus |
| `npm run typecheck` | Prüft die Typen |
| `npm run check` | Typen, Tests und Build in einem |
| `npm run icons` | Erzeugt die PNG-Icons neu |

## Einstellungen

Alle Einstellungen stehen in `.env.example`. Die wichtigsten:

- `ANTHROPIC_API_KEY`: dein Schlüssel. Gehört nur auf den Server, niemals in die App oder ins Repository.
- `CLAUDE_MODEL`: Standard ist `claude-opus-5-5`. Günstiger sind `claude-sonnet-5-5` und `claude-haiku-4-5`.
- `DAILY_LIMIT_PER_DEVICE`, `DAILY_LIMIT_PER_IP`, `DAILY_LIMIT_GLOBAL`: Tageslimits, damit die Kosten planbar bleiben.
- `ACCESS_CODES`: Zugangscodes für eine geschlossene Testphase mit Freunden.

## Kosten

Jede Coach-Frage kostet API-Gebühren bei Anthropic. Grobe Größenordnung pro Frage: wenige Cent mit Opus, etwas weniger mit Sonnet, rund einen Cent mit Haiku. Wie viel genau, hängt von Gesprächslänge, Bildern und Werkzeugaufrufen ab. Der Server schreibt pro Antwort die verbrauchten Tokens ins Log (ohne Inhalte), damit du die echten Kosten siehst. Die Preise stehen auf [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing).

Prompt-Caching ist eingeschaltet: Die feste Anleitung des Coaches wird zwischengespeichert und kostet bei Folgefragen nur einen Bruchteil.

## Veröffentlichen

Die App ist ein normaler Node-Server. Jeder Anbieter, der Node oder Docker kann, funktioniert, zum Beispiel Render, Railway, Fly.io oder ein eigener Server. Für Nutzer in Deutschland ist ein Anbieter mit Rechenzentrum in der EU sinnvoll.

**Ohne Docker:**

1. Build-Befehl: `npm ci && npm run build`
2. Start-Befehl: `npm start`
3. Umgebungsvariablen aus `.env.example` im Dashboard des Anbieters setzen, mindestens `ANTHROPIC_API_KEY` und `TRUST_PROXY=1`.

**Mit Docker:**

```bash
docker build -t groschen .
docker run -p 3000:3000 --env-file .env groschen
```

Wichtig: Die App muss über **HTTPS** laufen, damit sie sich installieren lässt und offline funktioniert. Die genannten Anbieter erledigen das automatisch.

### Auf das Handy bringen

- **Sofort:** Seite im Handy-Browser öffnen und „Zum Startbildschirm hinzufügen“ wählen.
- **App Store und Google Play:** Die Web-App kann später mit [Capacitor](https://capacitorjs.com) verpackt werden. Dafür brauchst du ein Apple-Entwicklerkonto (99 $ im Jahr) und ein Google-Play-Konto (einmalig 25 $). Wenn der Coach Geld kosten soll, gelten die Abo-Regeln der Stores.

## Vor dem Start mit echten Nutzern

Die folgenden Punkte sind keine Rechtsberatung, sondern eine Erinnerungsliste. Lass sie von einer Fachperson prüfen, zum Beispiel über die Gründungsberatung der IHK.

- [ ] Impressum, Datenschutzerklärung und Nutzungsbedingungen ausfüllen (`public/*.html`, alle Stellen in eckigen Klammern).
- [ ] Gewerbe anmelden, sobald du Geld verlangst. Als Minderjährige oder Minderjähriger brauchst du dafür die Zustimmung der Eltern und des Familiengerichts.
- [ ] Vertrag zur Auftragsverarbeitung mit dem Hosting-Anbieter abschließen. Grundlage für die Übermittlung der Coach-Fragen an Anthropic in die USA prüfen.
- [ ] **Nutzungsrichtlinie von Anthropic klären.** Die [Usage Policy](https://www.anthropic.com/legal/aup) zählt Finanzen ("financial decisions, including investment advice") zu den Hochrisiko-Anwendungen. Wer Verbrauchern damit Ratschläge oder Empfehlungen gibt, muss die Inhalte vor der Weitergabe von einer Fachperson prüfen lassen und zu Beginn jeder Sitzung offenlegen, dass KI im Spiel ist. Groschen ist deshalb als Lern-App gebaut: Der Coach erklärt allgemeines Wissen und Faustregeln und gibt laut seiner Anleitung keine persönlichen Empfehlungen. Jedes Gespräch beginnt mit einem KI-Hinweis. Ob das für deinen Einsatz reicht, klärst du am besten vor dem Start direkt mit Anthropic.
- [ ] Testen, dass der Coach bei kritischen Fragen ("Soll ich Aktie X kaufen?", "Soll ich meinen Kredit kündigen?") wirklich keine persönliche Empfehlung gibt. Die Regeln dafür stehen in `src/server/prompt.ts`.
- [ ] Lerninhalte in `src/client/content.ts` fachlich gegenlesen lassen. Steuer- und Rentenwerte haben den Stand 2026.

## Projektaufbau

```
src/
  shared/calc.ts        Finanzrechner (App und Server nutzen dieselben)
  shared/protocol.ts    Datenformat zwischen App und Server
  server/index.ts       Startpunkt des Servers
  server/app.ts         HTTP-Routen, Sicherheits-Header, Limits
  server/coach.ts       Gesprächsablauf mit Claude inkl. Werkzeugaufrufen
  server/prompt.ts      Anleitung (Systemprompt) des Coaches
  server/tools.ts       Werkzeuge, die der Coach aufrufen darf
  server/validate.ts    Prüfung aller Anfragen aus dem Browser
  server/limits.ts      Tageslimits
  client/               App-Oberfläche (ohne Framework, mit esbuild gebündelt)
public/                 HTML, CSS, Icons, Manifest, Service Worker, Rechtstexte
test/                   Tests mit einer Attrappe der Claude-API
```

### Wie der Coach technisch arbeitet

- Der Browser schickt seine Frage und den bisherigen Verlauf an `POST /api/chat`. Der Server streamt die Antwort als Server-Sent Events zurück.
- Braucht der Coach eine Rechnung, ruft er ein Werkzeug auf (zum Beispiel `sparplan_rechnen`). Der Server rechnet und gibt das Ergebnis an Claude zurück, die App zeigt dazu eine Karte.
- Die App speichert jede Nachricht genau so, wie der Server sie an Claude geschickt hat, und schickt sie unverändert zurück. Die Anleitung des Coaches ist für alle Gespräche gleich, das Datum und das Profil stehen in der jeweiligen Nachricht. So bleiben Prompt-Cache und die Denk-Blöcke des Modells gültig.
- Lehnt das Modell eine harmlose Frage aus Sicherheitsgründen ab, beantwortet die API sie automatisch mit einem anderen Modell (`fallbacks: "default"`).
