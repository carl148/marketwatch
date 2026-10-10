# Fintelify

> **Hinweis zum Namen:** Fintelify ist der Name der App von Mattia Freund. Diese Version ist als Vorschlag für ihn gedacht und darf unter diesem Namen erst veröffentlicht werden, wenn er zugestimmt hat. Die automatische Veröffentlichung ist deshalb abgeschaltet.

Eine spielerische Finanz-Lern-App für Deutschland: kurze Lektionen mit Quiz, Lernserien und XP, ein Übungsstapel für falsche Antworten und fünf Finanzrechner.

Die App ist eine reine Website ohne Server, ohne Anmeldung und ohne KI. Sie kostet im Betrieb nichts, funktioniert offline und lässt sich auf dem Handy wie eine App auf den Startbildschirm legen (Progressive Web App).

## Was drin ist

| Bereich | Funktionen |
|---|---|
| **Lernen** | 20 Kapitel mit 100 Lektionen, von Budget, Sparen und Alltag über Investieren, Steuern, Versicherungen und Vorsorge bis zu Familie, Immobilien, Wirtschaft, Nachhaltigkeit und Betrug. Lernkarten, Quiz mit gemischten Antworten, XP, Level und Ränge, Tagesziel |
| **Lerntempo** | 3 neue Lektionen pro Tag (einstellbar in `src/client/rules.ts`). Bereits geschaffte Lektionen lassen sich jederzeit wiederholen. So reichen die Inhalte für mehr als einen Monat |
| **Auffrischen** | Fertige Lektionen kommen nach 1, 3, 7, 14, 30 und 60 Tagen zum Auffrischen wieder. Wer Fehler macht, beginnt die Abstände von vorn |
| **Tages-Challenges** | Jeden Tag drei neue Aufgaben (z. B. „Beantworte 10 Fragen richtig“), die Münzen bringen |
| **Lernserie** | Zählt die Tage am Stück. Mit Serienschutz aus dem Shop übersteht sie auch einen verpassten Tag |
| **Münzen und Shop** | Münzen für Lektionen, Wiederholungen und Challenges. Im Shop gibt es Serienschutz und Akzentfarben |
| **Profil** | Name, Avatar, Akzentfarbe, Hell- oder Dunkelmodus, Statistik (Trefferquote, längste Serie usw.) und ein Aktivitätskalender der letzten 12 Wochen |
| **Kapitelprüfungen** | Nach jedem Kapitel eine Prüfung mit 10 gemischten Fragen. Ab 80 % gibt es eine Krone |
| **Wissens-Sprint** | 60 Sekunden, so viele richtige Antworten wie möglich, nur aus bereits gelernten Lektionen, mit Bestwert |
| **Finanzlexikon** | Über 60 Begriffe von Abgeltungsteuer bis Zinsbindung, mit Suche und Verweis auf die passende Lektion |
| **Animationen** | Feier-Fenster bei Level-Aufstieg, Kapitel-Abschluss und Krone (mit Münzregen), Sterne pro Lektion, hochzählende XP, sanftes Feedback bei Antworten. Bei „Bewegung reduzieren“ im Betriebssystem werden sie abgeschaltet |
| **Erfolge** | 20 Erfolge zum Freischalten |
| **Rechner** | Sparplan mit Diagramm (inkl. Kosten und Inflation), 50/30/20-Budget, Notgroschen, Kredit, Steuer auf Kapitalerträge |
| **Üben** | Wissens-Sprint, fällige Lektionen auffrischen und falsch beantwortete Fragen wiederholen |

Alles ist kostenlos und ohne Werbung. Ein Premium-Abo wie im Original gibt es bewusst nicht, weil dafür Bezahlsysteme und Nutzerkonten nötig wären.

Datenschutz: Der Fortschritt bleibt im Browser des Geräts. Keine Cookies, kein Tracking, keine externen Schriftarten oder Skripte.

## Ausprobieren

Du brauchst [Node.js](https://nodejs.org) ab Version 20.

```bash
npm install
npm run dev        # öffnet sich unter http://localhost:3000
```

## Befehle

| Befehl | Was er tut |
|---|---|
| `npm run dev` | Entwicklungsmodus, baut bei jeder Änderung neu |
| `npm run build` | Baut `public/app.js`. Danach ist der Ordner `public/` die fertige Website |
| `npm test` | Prüft Rechner und Spielregeln |
| `npm run check` | Typen, Tests und Build in einem |
| `npm run icons` | Erzeugt die PNG-Icons neu |

## Veröffentlichen

Weil die App nur aus Dateien besteht, kann sie kostenlos gehostet werden.

**GitHub Pages (eingerichtet):**

1. Im Repository auf GitHub unter **Settings → Pages** bei „Source“ **GitHub Actions** wählen.
2. Unter **Actions → Veröffentlichen → Run workflow** den Workflow von Hand starten. Er prüft und baut die App und stellt sie online. Erst machen, wenn Mattia dem Namen zugestimmt hat.
3. Die Adresse steht danach unter Settings → Pages, meist `https://<benutzername>.github.io/<repository>/`.

**Andere Anbieter** (Netlify, Cloudflare Pages und ähnliche): Build-Befehl `npm run build`, Ausgabeordner `public`.

Für Nutzer in Deutschland kann ein Anbieter mit Rechenzentrum in der EU die Datenschutzerklärung einfacher machen.

### Auf das Handy bringen

- **Sofort:** Seite im Handy-Browser öffnen und „Zum Startbildschirm hinzufügen“ wählen.
- **App Store und Google Play:** Die Website kann mit [Capacitor](https://capacitorjs.com) als App verpackt werden. Dafür brauchst du ein Apple-Entwicklerkonto (99 $ im Jahr) und ein Google-Play-Konto (einmalig 25 $).

## Inhalte ändern

- **Lektionen und Quizfragen:** `src/client/content.ts`. Jede Lektion hat Lernkarten (`cards`) und Fragen (`qs`, mit Index der richtigen Antwort `c` und Erklärung `e`).
- **Erfolge und Tagesziel:** ebenfalls in `src/client/content.ts`.
- **Rechner:** `src/shared/calc.ts`, Tests in `test/calc.test.ts`.
- Nach Änderungen an Dateien in `public/` die Versionsnummer in `public/sw.js` erhöhen, damit installierte Apps das Update laden.

## Vor dem Start mit echten Nutzern

Keine Rechtsberatung, sondern eine Erinnerungsliste. Lass die Punkte prüfen, zum Beispiel über die Gründungsberatung der IHK.

- [ ] Impressum, Datenschutzerklärung und Nutzungsbedingungen ausfüllen (`public/*.html`, alle Stellen in eckigen Klammern).
- [ ] Lerninhalte fachlich gegenlesen lassen. Steuer- und Rentenwerte haben den Stand 2026.
- [ ] Gewerbe anmelden, sobald du Geld verlangst oder Werbung zeigst. Als Minderjährige oder Minderjähriger brauchst du dafür die Zustimmung der Eltern und des Familiengerichts.

## Projektaufbau

```
src/
  shared/calc.ts      Finanzrechner
  client/main.ts      Startpunkt, Navigation, Bereich "Mehr"
  client/content.ts   Lektionen, Quizfragen, Erfolge
  client/learn.ts     Lernpfad, Lektionen, Üben
  client/tools-view.ts Rechner-Bereich
  client/chart.ts     Sparplan-Diagramm
  client/store.ts     Speicher im Browser, XP, Münzen, Erfolge
  client/rules.ts     Spielregeln: Lernserie, Serienschutz, Tages-Challenges, Lerntempo, Auffrischen, Shop
  client/profile-view.ts Profil, Statistik, Kalender, Shop
  client/celebrate.ts Feier-Fenster und Animationen
  client/sprint.ts    Wissens-Sprint
  client/glossary.ts  Begriffe des Finanzlexikons
  client/lexicon-view.ts Lexikon mit Suche
  client/ui.ts        Hilfsfunktionen
public/               HTML, CSS, Icons, Manifest, Service Worker, Rechtstexte
scripts/              Build und Icon-Erzeugung
test/                 Tests der Rechner und Spielregeln
```
