// Lerninhalte. Zahlen und Regeln: Stand 2026, Deutschland.
// Vor einer Veröffentlichung fachlich gegenlesen lassen.

export interface Card { h: string; p: string; f?: string }
export interface Question { q: string; a: string[]; c: number; e: string }
export interface Lesson { id: string; title: string; mins: number; cards: Card[]; qs: Question[] }
export interface Unit { id: string; title: string; sub: string; lessons: Lesson[] }

export const UNITS: Unit[] = [
  { id: "budget", title: "Budget & Konto", sub: "Den Überblick behalten", lessons: [
    { id: "b1", title: "Wohin geht dein Geld?", mins: 3, cards: [
      { h: "Erst messen, dann planen", p: "Wer einen Monat lang alle Ausgaben notiert, findet fast immer Posten, die niemand vermisst: alte Abos, Lieferdienste, Gebühren. Ein Budget beginnt mit diesem ehrlichen Blick auf das Girokonto." },
      { h: "Die 50/30/20-Regel", p: "Eine einfache Faustregel für dein Nettoeinkommen: 50 % für Fixkosten wie Miete, Strom und Versicherungen, 30 % für Wünsche wie Freizeit und Restaurant, 20 % zum Sparen und Schuldenabbau.", f: "Bei 2.000 € netto: 1.000 € Bedarf · 600 € Wünsche · 400 € Sparen" },
      { h: "Zahl dich zuerst selbst", p: "Richte zum Gehaltseingang einen Dauerauftrag auf ein Sparkonto ein. Was am Monatsanfang weg ist, gibst du nicht aus. Das funktioniert besser, als zu sparen, was am Monatsende übrig bleibt." },
    ], qs: [
      { q: "Nach der 50/30/20-Regel: Wie viel solltest du bei 1.800 € netto sparen?", a: ["180 €", "360 €", "540 €", "900 €"], c: 1, e: "20 % von 1.800 € sind 360 €." },
      { q: "Zu welcher Kategorie gehört die Kaltmiete?", a: ["Wünsche", "Sparen", "Fixkosten (Bedarf)", "Gar keiner"], c: 2, e: "Miete ist ein fester, notwendiger Posten und gehört zu den 50 % Bedarf." },
      { q: "Wann sparst du am zuverlässigsten?", a: ["Was am Monatsende übrig bleibt", "Per Dauerauftrag direkt nach Gehaltseingang", "Nur bei Bonuszahlungen", "Einmal im Jahr"], c: 1, e: "Automatisch und zuerst sparen: So konkurriert das Sparen nicht mit spontanen Ausgaben." },
    ]},
    { id: "b2", title: "Dispo, Kredite & Schufa", mins: 3, cards: [
      { h: "Der Dispo ist teuer", p: "Der Dispositionskredit erlaubt dir, dein Girokonto zu überziehen. Banken verlangen dafür oft über 10 % Zinsen im Jahr. Für dauerhafte Lücken ist er eine der teuersten Geldquellen." },
      { h: "Ratenkredit statt Dauer-Dispo", p: "Wer länger im Minus steht, kann den Dispo mit einem günstigeren Ratenkredit ablösen. Entscheidend ist der effektive Jahreszins: Er enthält alle Kosten und macht Angebote vergleichbar." },
      { h: "Was die Schufa speichert", p: "Die Schufa sammelt Daten zu Konten, Krediten und Handyverträgen und berechnet daraus einen Score. Pünktlich bezahlte Rechnungen schaden nicht. Viele Kreditanfragen in kurzer Zeit können den Score aber drücken.", f: "Mindestens einmal pro Jahr hast du Anspruch auf eine kostenlose Datenkopie nach Art. 15 DSGVO." },
    ], qs: [
      { q: "Welcher Zins macht Kreditangebote wirklich vergleichbar?", a: ["Sollzins", "Effektiver Jahreszins", "Leitzins", "Dispozins"], c: 1, e: "Der effektive Jahreszins enthält alle Kosten des Kredits, der Sollzins nur einen Teil." },
      { q: "Wofür ist der Dispo gedacht?", a: ["Für dauerhafte Finanzierung", "Für kurze Engpässe", "Zum Investieren", "Für den Autokauf"], c: 1, e: "Wegen der hohen Zinsen eignet er sich höchstens für kurze Überbrückungen." },
      { q: "Wie oft kannst du deine Schufa-Daten kostenlos anfordern?", a: ["Nie", "Alle 5 Jahre", "Mindestens einmal pro Jahr", "Nur mit Anwalt"], c: 2, e: "Die DSGVO-Datenkopie ist kostenlos und mindestens jährlich möglich." },
    ]},
  ]},
  { id: "sparen", title: "Sparen", sub: "Sicherheit zuerst", lessons: [
    { id: "s1", title: "Der Notgroschen", mins: 3, cards: [
      { h: "Dein finanzielles Polster", p: "Eine kaputte Waschmaschine oder eine Autoreparatur sollten dich nicht in den Dispo treiben. Dafür gibt es den Notgroschen: Geld, das schnell verfügbar ist und nicht schwankt." },
      { h: "Wie viel?", p: "Als Faustregel gelten drei bis sechs Monatsausgaben. Selbstständige oder Menschen mit unsicherem Job planen eher mehr ein.", f: "Monatsausgaben 1.500 € × 3 bis 6 = 4.500 bis 9.000 €" },
      { h: "Wo parken?", p: "Auf einem Tagesgeldkonto: täglich verfügbar, verzinst und durch die gesetzliche Einlagensicherung bis 100.000 € pro Person und Bank geschützt. Aktien sind für den Notgroschen ungeeignet, weil sie genau dann im Minus stehen können, wenn du das Geld brauchst." },
    ], qs: [
      { q: "Wie groß sollte ein Notgroschen ungefähr sein?", a: ["Ein Wochenlohn", "3 bis 6 Monatsausgaben", "Ein Jahresgehalt", "So viel wie möglich"], c: 1, e: "3 bis 6 Monatsausgaben decken die meisten Notfälle ab, ohne zu viel Geld schlecht verzinst liegen zu lassen." },
      { q: "Bis zu welcher Summe sind Einlagen pro Bank gesetzlich geschützt?", a: ["10.000 €", "50.000 €", "100.000 €", "Unbegrenzt"], c: 2, e: "Die EU-weite Einlagensicherung schützt 100.000 € pro Kunde und Bank." },
      { q: "Warum gehört der Notgroschen nicht in Aktien?", a: ["Aktien sind verboten", "Kurse können im Notfall gerade niedrig sein", "Aktien bringen keine Rendite", "Man kann Aktien nicht verkaufen"], c: 1, e: "Wer im Crash verkaufen muss, realisiert Verluste. Der Notgroschen muss jederzeit voll verfügbar sein." },
    ]},
    { id: "s2", title: "Inflation verstehen", mins: 3, cards: [
      { h: "Geld verliert an Wert", p: "Inflation bedeutet steigende Preise. Beträgt die Inflation 2 %, bekommst du für 100 € nach einem Jahr nur noch Waren im Wert von etwa 98 €." },
      { h: "Realzins = Zins minus Inflation", p: "Bringt dein Tagesgeld 2 % Zinsen bei 3 % Inflation, verlierst du real etwa 1 % Kaufkraft pro Jahr. Nur der Realzins sagt dir, ob dein Vermögen wirklich wächst.", f: "Zins 2 % − Inflation 3 % = Realzins −1 %" },
      { h: "Das Ziel der EZB", p: "Die Europäische Zentralbank strebt mittelfristig eine Inflation von 2 % an. Über 30 Jahre senkt selbst diese moderate Rate die Kaufkraft um fast die Hälfte." },
    ], qs: [
      { q: "Dein Konto bringt 1,5 %, die Inflation liegt bei 2,5 %. Wie hoch ist dein Realzins?", a: ["+4 %", "+1 %", "−1 %", "0 %"], c: 2, e: "1,5 % − 2,5 % = −1 %. Deine Kaufkraft sinkt." },
      { q: "Welche Inflationsrate strebt die EZB an?", a: ["0 %", "2 %", "5 %", "10 %"], c: 1, e: "Die EZB zielt mittelfristig auf 2 %." },
      { q: "Was passiert mit Bargeld unter dem Kopfkissen bei Inflation?", a: ["Es wird mehr wert", "Es bleibt gleich viel wert", "Es verliert Kaufkraft", "Es wird verzinst"], c: 2, e: "Der Nennwert bleibt, aber du kannst dir weniger dafür kaufen." },
    ]},
  ]},
  { id: "zins", title: "Zinseszins", sub: "Die stärkste Kraft im Depot", lessons: [
    { id: "z1", title: "Zinsen auf Zinsen", mins: 3, cards: [
      { h: "Der Schneeballeffekt", p: "Beim Zinseszins werden Erträge wieder angelegt und bringen selbst Erträge. Am Anfang wirkt das unscheinbar, nach Jahrzehnten dominiert es das Ergebnis." },
      { h: "Ein Beispiel", p: "10.000 € wachsen mit 6 % pro Jahr. Ohne Zinseszins hättest du nach 30 Jahren 28.000 €. Mit Zinseszins sind es rund 57.400 €.", f: "10.000 € × 1,06 hoch 30 ≈ 57.435 €" },
      { h: "Die 72er-Regel", p: "Teile 72 durch die jährliche Rendite in Prozent, und du erhältst ungefähr die Jahre, bis sich dein Geld verdoppelt. Bei 6 % sind es etwa 12 Jahre." },
    ], qs: [
      { q: "Nach der 72er-Regel: Wie lange dauert die Verdopplung bei 8 % Rendite?", a: ["6 Jahre", "9 Jahre", "12 Jahre", "18 Jahre"], c: 1, e: "72 ÷ 8 = 9 Jahre." },
      { q: "Was ist Zinseszins?", a: ["Ein Zins auf Kredite", "Zinsen auf bereits erhaltene Zinsen", "Eine Steuer", "Doppelter Leitzins"], c: 1, e: "Erträge werden wieder angelegt und bringen selbst Erträge." },
      { q: "Wann wirkt der Zinseszins am stärksten?", a: ["In den ersten Monaten", "Über sehr lange Zeiträume", "Nur bei Kursrückgängen", "Er wirkt immer gleich"], c: 1, e: "Das Wachstum ist exponentiell: Je länger, desto größer der Effekt." },
    ]},
    { id: "z2", title: "Zeit schlägt Timing", mins: 3, cards: [
      { h: "Früh anfangen lohnt sich", p: "Anna legt von 25 bis 35 jeden Monat 100 € an und hört dann auf. Ben beginnt mit 35 und spart 30 Jahre lang 100 € monatlich. Bei 7 % Rendite liegen beide mit 65 fast gleichauf, obwohl Anna nur ein Drittel eingezahlt hat." },
      { h: "Den perfekten Moment gibt es nicht", p: "Niemand kann Kursbewegungen zuverlässig vorhersagen. Wer die besten Börsentage verpasst, verliert einen großen Teil der Rendite. Regelmäßig investieren ist für die meisten der robustere Weg." },
      { h: "Cost-Average-Effekt", p: "Mit einem Sparplan kaufst du bei niedrigen Kursen automatisch mehr Anteile und bei hohen weniger. Das nimmt Druck raus, garantiert aber keinen Gewinn." },
    ], qs: [
      { q: "Warum hat Anna trotz kleinerer Einzahlung fast gleich viel wie Ben?", a: ["Sie hatte Glück", "Ihr Geld hatte mehr Zeit zum Wachsen", "Sie zahlte weniger Steuern", "Ben hatte höhere Gebühren"], c: 1, e: "Annas Geld wuchs 40 Jahre lang mit Zinseszins." },
      { q: "Was macht ein Sparplan bei fallenden Kursen?", a: ["Er pausiert automatisch", "Er kauft mehr Anteile für dasselbe Geld", "Er verkauft alles", "Er kauft weniger Anteile"], c: 1, e: "Gleicher Betrag, niedrigerer Preis: mehr Anteile." },
      { q: "Was gilt für Market-Timing?", a: ["Es funktioniert meistens", "Wer die besten Tage verpasst, verliert viel Rendite", "Es ist gesetzlich verboten", "Es bringt garantiert Gewinn"], c: 1, e: "Die stärksten Tage liegen oft mitten in Krisen. Wer draußen ist, verpasst sie." },
    ]},
  ]},
  { id: "invest", title: "Investieren", sub: "Aktien, Anleihen, ETFs", lessons: [
    { id: "i1", title: "Aktien & Anleihen", mins: 3, cards: [
      { h: "Aktie: ein Stück Firma", p: "Mit einer Aktie bist du Miteigentümer eines Unternehmens. Du profitierst von Kurssteigerungen und Dividenden, trägst aber auch das Risiko, wenn es schlecht läuft." },
      { h: "Anleihe: ein Kredit", p: "Mit einer Anleihe leihst du einem Staat oder Unternehmen Geld und bekommst dafür Zinsen. Anleihen schwanken meist weniger als Aktien, bringen langfristig aber auch weniger Rendite." },
      { h: "Rendite und Risiko gehören zusammen", p: "Höhere erwartete Rendite gibt es nur gegen höhere Schwankungen. Wer etwas anderes verspricht, verdient Misstrauen." },
    ], qs: [
      { q: "Was kaufst du mit einer Aktie?", a: ["Einen Kredit an die Firma", "Einen Anteil am Unternehmen", "Eine Versicherung", "Ein Sparbuch"], c: 1, e: "Aktionäre sind Miteigentümer." },
      { q: "Was ist eine Anleihe?", a: ["Ein Unternehmensanteil", "Ein verzinster Kredit an den Herausgeber", "Eine Kryptowährung", "Ein Girokonto"], c: 1, e: "Der Herausgeber leiht sich Geld von dir und zahlt Zinsen." },
      { q: "Jemand verspricht 15 % Rendite ohne Risiko. Was solltest du tun?", a: ["Sofort investieren", "Skeptisch sein: Das passt nicht zusammen", "Freunde einladen", "Einen Kredit aufnehmen"], c: 1, e: "Hohe Rendite ohne Risiko ist ein typisches Warnsignal für Betrug." },
    ]},
    { id: "i2", title: "ETFs einfach erklärt", mins: 4, cards: [
      { h: "Ein Korb voller Aktien", p: "Ein ETF ist ein börsengehandelter Fonds, der einen Index nachbildet. Ein ETF auf den MSCI World enthält zum Beispiel weit über tausend Unternehmen aus 23 Industrieländern." },
      { h: "Streuung senkt das Risiko", p: "Geht ein einzelnes Unternehmen pleite, fällt es im ETF kaum ins Gewicht. Diese Streuung (Diversifikation) ist der wichtigste Schutz für Privatanleger." },
      { h: "Auf die Kosten achten", p: "Die laufenden Kosten eines ETFs stehen in der TER (Total Expense Ratio). Breite Welt-ETFs kosten oft 0,1 bis 0,3 % im Jahr, aktiv gemanagte Fonds häufig über 1,5 %.", f: "Probier es im Rechner-Tab aus: Kosten von 1,5 % statt 0,2 % kosten über 30 Jahre einen großen Teil des Ertrags." },
    ], qs: [
      { q: "Was bildet ein ETF typischerweise ab?", a: ["Eine einzelne Aktie", "Einen Index", "Immer den Goldpreis", "Ein Tagesgeldkonto"], c: 1, e: "ETFs bilden einen Index wie den MSCI World oder den DAX nach." },
      { q: "Wofür steht die TER?", a: ["Steuerquote", "Laufende Gesamtkosten pro Jahr", "Rendite", "Risikoklasse"], c: 1, e: "Total Expense Ratio: die jährlichen laufenden Kosten." },
      { q: "Was ist der Hauptvorteil breiter ETFs?", a: ["Garantierte Gewinne", "Breite Streuung zu geringen Kosten", "Keine Schwankungen", "Steuerfreiheit"], c: 1, e: "Viele Unternehmen in einem Produkt, günstig und einfach." },
    ]},
  ]},
  { id: "steuern", title: "Steuern", sub: "Was dir zusteht", lessons: [
    { id: "t1", title: "Sparerpauschbetrag", mins: 3, cards: [
      { h: "1.000 € steuerfrei", p: "Kapitalerträge wie Zinsen und Dividenden sind bis 1.000 € im Jahr steuerfrei (2.000 € bei zusammen veranlagten Paaren). Dafür erteilst du deiner Bank einen Freistellungsauftrag." },
      { h: "Abgeltungsteuer", p: "Was darüber liegt, wird pauschal mit 25 % Abgeltungsteuer plus Solidaritätszuschlag besteuert, gegebenenfalls plus Kirchensteuer.", f: "25 % + 5,5 % Soli darauf = 26,375 %" },
      { h: "Freistellungsauftrag aufteilen", p: "Hast du mehrere Banken, kannst du die 1.000 € beliebig aufteilen. Insgesamt darfst du den Betrag aber nicht überschreiten." },
    ], qs: [
      { q: "Wie hoch ist der Sparerpauschbetrag für Singles?", a: ["801 €", "1.000 €", "1.230 €", "2.000 €"], c: 1, e: "Seit 2023 sind es 1.000 € (vorher 801 €)." },
      { q: "Was brauchst du, damit die Bank keine Steuer abzieht?", a: ["Einen Steuerberater", "Einen Freistellungsauftrag", "Eine Schufa-Auskunft", "Nichts"], c: 1, e: "Ohne Freistellungsauftrag führt die Bank Steuer ab, auch unter 1.000 €." },
      { q: "Wie hoch ist die Abgeltungsteuer inklusive Soli (ohne Kirchensteuer)?", a: ["19 %", "25 %", "26,375 %", "42 %"], c: 2, e: "25 % plus 5,5 % Soli auf die Steuer ergibt 26,375 %." },
    ]},
    { id: "t2", title: "Steuererklärung lohnt sich", mins: 3, cards: [
      { h: "Geld zurückholen", p: "Viele Arbeitnehmer bekommen Geld zurück, wenn sie eine Steuererklärung machen. Für viele ist sie freiwillig. Rückwirkend geht das bis zu vier Jahre." },
      { h: "Werbungskosten", p: "Fahrtkosten, Arbeitsmittel und Fortbildungen sind Werbungskosten. Die Pauschale von 1.230 € gibt es automatisch. Liegst du darüber, lohnt sich das Belegen." },
      { h: "Die Pendlerpauschale", p: "Für jeden Arbeitstag zählt die einfache Strecke zur Arbeit. Seit 2026 gelten 38 Cent pro Kilometer ab dem ersten Kilometer." },
    ], qs: [
      { q: "Wie hoch ist die Werbungskostenpauschale?", a: ["500 €", "1.000 €", "1.230 €", "2.000 €"], c: 2, e: "1.230 € werden automatisch berücksichtigt." },
      { q: "Wie weit rückwirkend kannst du eine freiwillige Steuererklärung abgeben?", a: ["1 Jahr", "4 Jahre", "10 Jahre", "Gar nicht"], c: 1, e: "Bei der freiwilligen Veranlagung gilt eine Frist von vier Jahren." },
      { q: "Welche Strecke zählt bei der Pendlerpauschale?", a: ["Hin und zurück", "Nur die einfache Strecke", "Nur die Rückfahrt", "Die gefahrene Umwegstrecke"], c: 1, e: "Es zählt die kürzeste einfache Entfernung zwischen Wohnung und Arbeit." },
    ]},
  ]},
  { id: "vorsorge", title: "Vorsorge", sub: "Rente & Versicherungen", lessons: [
    { id: "v1", title: "Die drei Säulen der Rente", mins: 3, cards: [
      { h: "Gesetzlich, betrieblich, privat", p: "Die Altersvorsorge in Deutschland ruht auf drei Säulen: der gesetzlichen Rente, der betrieblichen Altersvorsorge und der privaten Vorsorge, etwa mit einem ETF-Sparplan." },
      { h: "Die Rentenlücke", p: "Die gesetzliche Rente ersetzt nur einen Teil des letzten Einkommens. Das Rentenniveau liegt bei etwa 48 % des Durchschnittslohns, vor Steuern und Sozialabgaben. Die Differenz zum gewohnten Lebensstandard heißt Rentenlücke." },
      { h: "Die Renteninformation", p: "Ab 27 schickt dir die Deutsche Rentenversicherung jährlich eine Renteninformation, wenn du mindestens fünf Beitragsjahre hast. Sie zeigt, mit welcher Rente du rechnen kannst." },
    ], qs: [
      { q: "Welche ist keine der drei Säulen?", a: ["Gesetzliche Rente", "Betriebliche Vorsorge", "Private Vorsorge", "Lottogewinn"], c: 3, e: "Die drei Säulen sind gesetzlich, betrieblich und privat." },
      { q: "Ungefähr wie hoch ist das Rentenniveau?", a: ["Rund 25 %", "Rund 48 %", "Rund 75 %", "100 %"], c: 1, e: "Das Rentenniveau liegt bei etwa 48 % vor Steuern." },
      { q: "Ab welchem Alter bekommst du jährlich eine Renteninformation?", a: ["18", "27", "40", "Erst mit Rentenbeginn"], c: 1, e: "Ab 27, wenn du mindestens fünf Beitragsjahre hast." },
    ]},
    { id: "v2", title: "Welche Versicherungen wirklich zählen", mins: 3, cards: [
      { h: "Existenzbedrohende Risiken zuerst", p: "Versichere vor allem, was dich finanziell ruinieren könnte. Eine kaputte Brille kannst du selbst bezahlen, einen Personenschaden in Millionenhöhe nicht." },
      { h: "Die Must-haves", p: "Eine Krankenversicherung ist Pflicht. Eine private Haftpflicht kostet oft unter 100 € im Jahr und schützt vor Schäden, die du anderen zufügst. Wer vom Einkommen lebt, sollte über eine Berufsunfähigkeitsversicherung nachdenken." },
      { h: "Oft überflüssig", p: "Handy-, Brillen- oder Reisegepäckversicherungen decken meist kleine Schäden zu hohen Preisen ab. Das Geld ist im Notgroschen oft besser aufgehoben." },
    ], qs: [
      { q: "Nach welchem Prinzip wählst du Versicherungen?", a: ["Möglichst viele abschließen", "Existenzbedrohende Risiken zuerst", "Nur was der Vertreter empfiehlt", "Die billigsten zuerst"], c: 1, e: "Versichere, was du nicht selbst bezahlen könntest." },
      { q: "Welche Versicherung gilt als besonders wichtig und günstig?", a: ["Handyversicherung", "Private Haftpflicht", "Reisegepäckversicherung", "Brillenversicherung"], c: 1, e: "Die Haftpflicht schützt vor Millionenschäden für wenig Geld." },
      { q: "Welche Versicherung ist in Deutschland Pflicht?", a: ["Krankenversicherung", "Hausratversicherung", "Berufsunfähigkeitsversicherung", "Rechtsschutz"], c: 0, e: "Eine Krankenversicherung ist für alle in Deutschland verpflichtend." },
    ]},
  ]},
];

export const ALL_LESSONS = UNITS.flatMap(u => u.lessons.map(l => ({ ...l, unit: u })));
export type LessonWithUnit = (typeof ALL_LESSONS)[number];

export const QUESTION_BY_ID: Record<string, Question & { id: string; lesson: LessonWithUnit }> = {};
for (const l of ALL_LESSONS) l.qs.forEach((q, i) => { QUESTION_BY_ID[`${l.id}-${i}`] = { ...q, id: `${l.id}-${i}`, lesson: l }; });

export const ACHIEVEMENTS = [
  { id: "first", name: "Erste Lektion" },
  { id: "perfect", name: "Fehlerfrei" },
  { id: "streak3", name: "3 Tage am Stück" },
  { id: "streak7", name: "7 Tage am Stück" },
  { id: "unit", name: "Kapitel geschafft" },
  { id: "xp500", name: "500 XP" },
  { id: "calc", name: "Selbst gerechnet" },
  { id: "review", name: "Fehler ausgebügelt" },
  { id: "correct50", name: "50 richtige Antworten" },
  { id: "all", name: "Alle Lektionen" },
] as const;
export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

export const DAILY_GOAL = 30;
