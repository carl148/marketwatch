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
    { id: "b3", title: "Das richtige Girokonto", mins: 3, cards: [
      { h: "Gebühren vergleichen", p: "Girokonten unterscheiden sich stark bei den Kosten: Kontoführung, Girocard, Kreditkarte, Bargeld am Automaten fremder Banken. Über ein Jahr können so leicht über 100 € zusammenkommen. Ein Vergleich lohnt sich." },
      { h: "Recht auf ein Konto", p: "Jeder Mensch mit Wohnsitz in der EU hat in Deutschland Anspruch auf ein Basiskonto, auch ohne Einkommen oder mit negativer Schufa. Banken dürfen dafür nur angemessene Gebühren verlangen." },
      { h: "Wechseln ist einfach", p: "Beim Kontowechsel muss die neue Bank helfen: Sie informiert auf Wunsch Arbeitgeber und Zahlungspartner und überträgt Daueraufträge. So musst du nicht alles selbst umstellen.", f: "Kontowechselhilfe: gesetzlich vorgeschrieben seit 2016" },
    ], qs: [
      { q: "Wer hat Anspruch auf ein Basiskonto?", a: ["Nur Menschen mit festem Job", "Jeder mit Wohnsitz in der EU", "Nur Studierende", "Nur Menschen mit guter Schufa"], c: 1, e: "Das Basiskonto steht allen Verbrauchern mit Wohnsitz in der EU zu, unabhängig vom Einkommen." },
      { q: "Wer hilft dir beim Kontowechsel?", a: ["Niemand, das musst du allein machen", "Die neue Bank, sie ist dazu verpflichtet", "Das Finanzamt", "Die Schufa"], c: 1, e: "Die gesetzliche Kontowechselhilfe verpflichtet die neue Bank zur Unterstützung." },
      { q: "Welche Kosten solltest du beim Kontovergleich beachten?", a: ["Nur die Farbe der Karte", "Kontoführung, Karten und Bargeldabhebungen", "Nur den Dispozins", "Gar keine, Konten kosten nie etwas"], c: 1, e: "Alle laufenden Gebühren zusammen ergeben die echten Kosten des Kontos." },
    ]},
    { id: "b4", title: "Abos & Fixkosten senken", mins: 3, cards: [
      { h: "Kleine Beträge, große Summe", p: "Streaming, Fitnessstudio, Apps, Zeitschriften: Jedes Abo wirkt günstig, zusammen kosten sie oft über 50 € im Monat. Schreib einmal alle Abos auf und rechne den Jahresbetrag aus." },
      { h: "Kündigen ist leichter geworden", p: "Online abgeschlossene Verträge müssen sich über einen Kündigungsbutton auf der Website kündigen lassen. Nach der ersten Mindestlaufzeit verlängern sich neue Verträge nur noch auf unbestimmte Zeit und sind dann monatlich kündbar.", f: "Kündigungsbutton Pflicht seit Juli 2022" },
      { h: "Fixkosten regelmäßig prüfen", p: "Strom, Gas, Handy und Versicherungen lassen sich oft günstiger bekommen. Ein jährlicher Vergleich spart häufig mehr als jede Sparaktion beim Einkaufen." },
    ], qs: [
      { q: "Wie kannst du einen online abgeschlossenen Vertrag kündigen?", a: ["Nur per Brief mit Unterschrift", "Über den Kündigungsbutton auf der Website", "Gar nicht", "Nur persönlich im Laden"], c: 1, e: "Seit Juli 2022 müssen Anbieter einen Kündigungsbutton anbieten." },
      { q: "Was gilt für neue Verträge nach der ersten Mindestlaufzeit?", a: ["Sie verlängern sich um zwei Jahre", "Sie sind monatlich kündbar", "Sie laufen für immer", "Sie enden automatisch"], c: 1, e: "Nach der Mindestlaufzeit dürfen sie sich nur noch unbefristet mit einem Monat Kündigungsfrist verlängern." },
      { q: "Ein Abo kostet 12,99 € im Monat. Wie viel ist das im Jahr ungefähr?", a: ["50 €", "100 €", "156 €", "300 €"], c: 2, e: "12,99 € × 12 = 155,88 €. Der Jahresbetrag zeigt, was ein Abo wirklich kostet." },
    ]},
    { id: "b5", title: "Konsumfallen erkennen", mins: 3, cards: [
      { h: "Jetzt kaufen, später zahlen", p: "Beim Bezahlen auf Rechnung oder in Raten bekommst du die Ware sofort, das Geld fehlt aber später. Wer mehrere solcher Käufe gleichzeitig laufen hat, verliert schnell den Überblick. Verpasste Termine kosten Mahngebühren und können der Schufa gemeldet werden." },
      { h: "Tricks im Laden und online", p: "Countdowns, „nur noch 2 verfügbar“, Rabatte auf Mondpreise und Gratis-Versand ab einem Mindestbetrag sollen dich zu schnellen Käufen bringen. Wer das kennt, fällt seltener darauf herein." },
      { h: "Die 24-Stunden-Regel", p: "Bei Käufen, die nicht geplant waren, hilft eine Nacht Bedenkzeit. Willst du die Sache am nächsten Tag immer noch, kauf sie. Oft hat sich der Wunsch dann erledigt." },
    ], qs: [
      { q: "Was ist das Risiko bei vielen Käufen auf Raten oder Rechnung?", a: ["Es gibt keins", "Man verliert den Überblick über spätere Zahlungen", "Die Ware wird teurer geliefert", "Man darf nicht zurückgeben"], c: 1, e: "Viele kleine offene Zahlungen summieren sich und belasten spätere Monate." },
      { q: "Was soll ein Countdown beim Online-Shopping bewirken?", a: ["Dass du in Ruhe vergleichst", "Dass du schnell und ohne Nachdenken kaufst", "Dass die Lieferung schneller ist", "Nichts, er ist nur Deko"], c: 1, e: "Zeitdruck ist ein klassischer Verkaufstrick." },
      { q: "Wobei hilft die 24-Stunden-Regel?", a: ["Bei Spontankäufen", "Bei der Steuererklärung", "Beim Kontowechsel", "Bei der Rente"], c: 0, e: "Eine Nacht Abstand trennt echte Wünsche von Impulskäufen." },
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
    { id: "s3", title: "Tagesgeld oder Festgeld?", mins: 3, cards: [
      { h: "Tagesgeld: flexibel", p: "Auf einem Tagesgeldkonto kommst du jeden Tag an dein Geld. Der Zins kann sich aber jederzeit ändern. Ideal für den Notgroschen." },
      { h: "Festgeld: fester Zins", p: "Beim Festgeld legst du Geld für eine feste Zeit an, zum Beispiel ein oder zwei Jahre, zu einem festen Zins. Vorher kommst du in der Regel nicht heran. Dafür ist der Zins oft etwas höher." },
      { h: "Beides ist abgesichert", p: "Tages- und Festgeld fallen unter die gesetzliche Einlagensicherung bis 100.000 € pro Person und Bank. Achte bei ausländischen Banken darauf, aus welchem EU-Land die Sicherung kommt.", f: "Faustregel: Notgroschen aufs Tagesgeld, Geld für feste Pläne in 1 bis 3 Jahren aufs Festgeld" },
    ], qs: [
      { q: "Was ist der Hauptvorteil von Tagesgeld?", a: ["Garantierter Zins für 10 Jahre", "Du kommst jeden Tag an dein Geld", "Es ist steuerfrei", "Es gibt keine Einlagensicherung"], c: 1, e: "Tagesgeld ist täglich verfügbar, der Zins ist aber variabel." },
      { q: "Was gilt für Festgeld?", a: ["Der Zins schwankt täglich", "Das Geld ist für eine feste Zeit gebunden", "Es ist nicht abgesichert", "Man kann jederzeit abheben"], c: 1, e: "Für den festen Zins verzichtest du während der Laufzeit auf den Zugriff." },
      { q: "Wohin gehört der Notgroschen am besten?", a: ["Festgeld mit 5 Jahren Laufzeit", "Tagesgeld", "Aktien", "Kryptowährungen"], c: 1, e: "Der Notgroschen muss jederzeit verfügbar sein." },
    ]},
    { id: "s4", title: "Sparziele, die funktionieren", mins: 3, cards: [
      { h: "Konkret statt vage", p: "„Mehr sparen“ klappt selten. „1.200 € für den Urlaub bis Juli“ schon eher. Ein gutes Ziel hat einen Betrag, ein Datum und einen Grund." },
      { h: "Ziel in Monatsraten", p: "Teile den Betrag durch die Monate bis zum Termin. So weißt du, wie viel du jeden Monat zurücklegen musst, und kannst es per Dauerauftrag automatisieren.", f: "1.200 € in 8 Monaten = 150 € pro Monat" },
      { h: "Töpfe trennen", p: "Viele Banken bieten Unterkonten oder Spartöpfe an. Wenn Urlaub, Auto und Notgroschen getrennt liegen, siehst du jederzeit, wofür das Geld gedacht ist, und greifst nicht aus Versehen auf den Notgroschen zu." },
    ], qs: [
      { q: "Welches Sparziel ist am besten formuliert?", a: ["Irgendwann mehr Geld haben", "Mehr sparen als letztes Jahr", "900 € für ein neues Fahrrad bis September", "Reich werden"], c: 2, e: "Betrag, Termin und Zweck machen ein Ziel planbar." },
      { q: "Du willst 600 € in 6 Monaten sparen. Wie viel pro Monat?", a: ["60 €", "100 €", "120 €", "150 €"], c: 1, e: "600 € ÷ 6 Monate = 100 € pro Monat." },
      { q: "Warum helfen getrennte Spartöpfe?", a: ["Sie bringen immer mehr Zinsen", "Man sieht, wofür das Geld gedacht ist", "Sie sind steuerfrei", "Sie verhindern Inflation"], c: 1, e: "Getrennte Töpfe schützen vor dem Griff in das falsche Geld." },
    ]},
  ]},
  { id: "alltag", title: "Geld im Alltag", sub: "Job, Wohnung, Verträge", lessons: [
    { id: "a1", title: "Minijob und erstes Gehalt", mins: 3, cards: [
      { h: "Der Minijob", p: "In einem Minijob darfst du 2026 bis zu 603 € im Monat verdienen. Für dich fallen dann in der Regel keine Steuern an, und du bist bis auf die Rentenversicherung abgabenfrei. Aus der Rentenversicherung kannst du dich befreien lassen.", f: "Mindestlohn 2026: 13,90 € pro Stunde · Minijob-Grenze: 603 € im Monat" },
      { h: "Der Mindestlohn", p: "Für fast alle Beschäftigten ab 18 gilt der gesetzliche Mindestlohn. Ausnahmen gibt es etwa für Azubis, für die eine eigene Mindestvergütung gilt, und für bestimmte Praktika." },
      { h: "Das erste Gehalt", p: "Ein guter Start: Lege vom ersten richtigen Gehalt gleich einen Dauerauftrag fürs Sparen an. Wer von Anfang an mit etwas weniger auskommt, vermisst es später nicht." },
    ], qs: [
      { q: "Wie viel darfst du 2026 in einem Minijob monatlich verdienen?", a: ["450 €", "520 €", "603 €", "1.000 €"], c: 2, e: "Die Minijob-Grenze steigt mit dem Mindestlohn und liegt 2026 bei 603 €." },
      { q: "Wie hoch ist der Mindestlohn 2026?", a: ["9,82 €", "12,41 €", "13,90 €", "15,00 €"], c: 2, e: "Seit dem 1. Januar 2026 beträgt er 13,90 € pro Stunde." },
      { q: "Was ist ein guter Start mit dem ersten Gehalt?", a: ["Alles für Kleidung ausgeben", "Sofort einen Spar-Dauerauftrag einrichten", "Einen Kredit aufnehmen", "Das Konto überziehen"], c: 1, e: "Wer früh automatisch spart, gewöhnt sich gar nicht erst an das volle Gehalt." },
    ]},
    { id: "a2", title: "Die erste Wohnung", mins: 3, cards: [
      { h: "Was die Miete wirklich kostet", p: "Zur Kaltmiete kommen Nebenkosten wie Heizung, Wasser und Müll. Dazu Strom, Internet und Rundfunkbeitrag. Als Faustregel sollte die Warmmiete nicht mehr als ein Drittel deines Nettoeinkommens ausmachen." },
      { h: "Die Mietkaution", p: "Die Kaution darf höchstens drei Nettokaltmieten betragen. Du darfst sie in drei Monatsraten zahlen. Der Vermieter muss sie getrennt von seinem Vermögen anlegen und beim Auszug mit Zinsen zurückzahlen.", f: "Kaution: maximal 3 Nettokaltmieten, zahlbar in 3 Raten" },
      { h: "Nebenkostenabrechnung prüfen", p: "Einmal im Jahr kommt die Nebenkostenabrechnung. Sie kann zu einer Nachzahlung führen. Prüf sie in Ruhe, du hast das Recht, die Belege einzusehen." },
    ], qs: [
      { q: "Wie hoch darf die Mietkaution höchstens sein?", a: ["Eine Monatsmiete", "Drei Nettokaltmieten", "Sechs Warmmieten", "Unbegrenzt"], c: 1, e: "Das Gesetz begrenzt die Kaution auf drei Nettokaltmieten." },
      { q: "Wie darfst du die Kaution bezahlen?", a: ["Nur sofort und komplett", "In drei Monatsraten", "Gar nicht", "Erst beim Auszug"], c: 1, e: "Mieter haben das Recht auf Zahlung in drei Raten." },
      { q: "Welche Faustregel gilt für die Warmmiete?", a: ["Höchstens ein Drittel des Nettoeinkommens", "Mindestens die Hälfte", "Genau 10 %", "Es gibt keine"], c: 0, e: "So bleibt genug Geld für alles andere." },
    ]},
    { id: "a3", title: "Deine Rechte beim Einkaufen", mins: 3, cards: [
      { h: "14 Tage Widerrufsrecht", p: "Bei Käufen im Internet, per Telefon oder an der Haustür kannst du den Vertrag in der Regel innerhalb von 14 Tagen ohne Begründung widerrufen. Die Frist beginnt meist mit Erhalt der Ware. Im Laden gibt es dieses Recht nicht." },
      { h: "Gewährleistung", p: "Ist eine neue Ware mangelhaft, hast du zwei Jahre lang gesetzliche Gewährleistungsrechte gegenüber dem Händler, zum Beispiel auf Reparatur oder Ersatz. Das gilt immer, unabhängig von einer Garantie." },
      { h: "Garantie ist freiwillig", p: "Eine Garantie ist ein zusätzliches Versprechen des Herstellers oder Händlers. Ihre Bedingungen kann er selbst festlegen. Sie ersetzt die gesetzliche Gewährleistung nicht.", f: "Gewährleistung: Gesetz, 2 Jahre · Garantie: freiwillig" },
    ], qs: [
      { q: "Wie lange kannst du einen Online-Kauf in der Regel widerrufen?", a: ["3 Tage", "14 Tage", "30 Tage", "Gar nicht"], c: 1, e: "Bei Fernabsatzverträgen gilt ein 14-tägiges Widerrufsrecht." },
      { q: "Gilt das Widerrufsrecht auch beim Kauf im Laden?", a: ["Ja, immer", "Nein, im Laden gibt es kein gesetzliches Widerrufsrecht", "Nur samstags", "Nur bei Elektronik"], c: 1, e: "Umtausch im Laden ist eine freiwillige Kulanz des Händlers." },
      { q: "Wie lange gilt die gesetzliche Gewährleistung bei Neuware?", a: ["6 Monate", "1 Jahr", "2 Jahre", "10 Jahre"], c: 2, e: "Die Gewährleistung gilt zwei Jahre und ist gesetzlich vorgeschrieben." },
    ]},
    { id: "a4", title: "Handy, Strom & Co.", mins: 3, cards: [
      { h: "Laufzeit beachten", p: "Viele Handy- und Stromverträge haben eine Mindestlaufzeit von bis zu 24 Monaten. Danach sind sie monatlich kündbar. Notier dir das Ende der Laufzeit, um rechtzeitig zu wechseln." },
      { h: "Das Handy im Vertrag", p: "Ein „Handy für 1 €“ ist nicht geschenkt: Der Preis steckt in einer höheren Monatsgebühr. Rechne die Gesamtkosten über die Laufzeit aus und vergleiche mit Gerät und günstigem Tarif getrennt." },
      { h: "Wechseln spart", p: "Bei Strom und Gas sind Neukundenangebote oft günstiger als der Tarif, in dem man seit Jahren steckt. Wer regelmäßig vergleicht, spart oft über 100 € im Jahr.", f: "Gesamtkosten = Monatspreis × Laufzeit + Einmalkosten" },
    ], qs: [
      { q: "Wie lang darf die erste Mindestlaufzeit eines Handyvertrags höchstens sein?", a: ["6 Monate", "24 Monate", "5 Jahre", "Unbegrenzt"], c: 1, e: "Bis zu 24 Monate sind erlaubt, danach ist der Vertrag monatlich kündbar." },
      { q: "Wie vergleichst du ein „Handy für 1 €“ fair?", a: ["Gar nicht, es ist geschenkt", "Gesamtkosten über die Laufzeit ausrechnen", "Nur den Gerätepreis ansehen", "Nach der Farbe"], c: 1, e: "Der Gerätepreis ist in der Monatsgebühr versteckt." },
      { q: "Warum lohnt sich ein Strom-Vergleich?", a: ["Strom ist immer gleich teuer", "Alte Tarife sind oft teurer als Neukundenangebote", "Er ist gesetzlich Pflicht", "Man bekommt Strom geschenkt"], c: 1, e: "Treue wird bei Energieverträgen selten belohnt." },
    ]},
  ]},
  { id: "kredit", title: "Kredite & Schulden", sub: "Leihen mit Verstand", lessons: [
    { id: "k1", title: "Einen Kredit verstehen", mins: 3, cards: [
      { h: "Rate, Zins, Laufzeit", p: "Bei einem Ratenkredit zahlst du jeden Monat dieselbe Rate. Sie enthält Zinsen und Tilgung. Je länger die Laufzeit, desto kleiner die Rate, aber desto mehr Zinsen zahlst du insgesamt." },
      { h: "Teure Extras", p: "Banken bieten zum Kredit oft eine Restschuldversicherung an. Sie ist freiwillig und häufig teuer. Lies genau nach, ob sie wirklich nötig ist." },
      { h: "Früher zurückzahlen", p: "Einen Verbraucherkredit darfst du jederzeit vorzeitig zurückzahlen. Die Bank darf dafür höchstens 1 % des zurückgezahlten Betrags verlangen, bei weniger als einem Jahr Restlaufzeit höchstens 0,5 %.", f: "Probier es im Rechner-Tab: Laufzeit verlängern senkt die Rate, erhöht aber die Zinskosten" },
    ], qs: [
      { q: "Was passiert, wenn du die Laufzeit verlängerst?", a: ["Rate sinkt, Gesamtzinsen steigen", "Rate steigt, Zinsen sinken", "Nichts ändert sich", "Der Kredit wird kostenlos"], c: 0, e: "Längere Laufzeit heißt kleinere Raten, aber mehr Zinsen insgesamt." },
      { q: "Ist eine Restschuldversicherung Pflicht?", a: ["Ja, immer", "Nein, sie ist freiwillig", "Nur für Studierende", "Nur bei Autokrediten"], c: 1, e: "Sie ist ein freiwilliges und oft teures Zusatzprodukt." },
      { q: "Wie viel darf die Bank bei vorzeitiger Rückzahlung höchstens verlangen?", a: ["Nichts", "1 % des Betrags (0,5 % bei unter einem Jahr Restlaufzeit)", "10 %", "Alle restlichen Zinsen"], c: 1, e: "Die Vorfälligkeitsentschädigung ist bei Verbraucherkrediten gesetzlich begrenzt." },
    ]},
    { id: "k2", title: "Raus aus der Schuldenfalle", mins: 3, cards: [
      { h: "Warnsignale", p: "Wenn das Konto dauerhaft im Dispo steht, Rechnungen liegen bleiben oder neue Kredite alte bezahlen, wird es ernst. Je früher du handelst, desto leichter ist der Weg zurück." },
      { h: "Teuerste Schulden zuerst", p: "Verschaff dir einen Überblick über alle Schulden mit Zinssatz. Zahle zuerst die teuersten ab, etwa den Dispo, und bei allen anderen nur die Mindestrate." },
      { h: "Hilfe ist kostenlos", p: "Schuldnerberatungen der Verbraucherzentralen, der Caritas, der Diakonie oder der Kommunen helfen kostenlos und vertraulich. Ein Pfändungsschutzkonto (P-Konto) schützt außerdem einen Grundbetrag auf dem Konto vor Pfändung.", f: "Vorsicht vor kostenpflichtigen „Schuldenregulierern“ aus dem Internet" },
    ], qs: [
      { q: "Welche Schulden solltest du zuerst abbauen?", a: ["Die mit dem niedrigsten Zins", "Die mit dem höchsten Zins", "Die kleinsten ohne Zins", "Egal welche"], c: 1, e: "Hohe Zinsen kosten am meisten, deshalb zuerst dort tilgen." },
      { q: "Was schützt ein P-Konto?", a: ["Einen Grundbetrag vor Pfändung", "Vor allen Schulden", "Vor Inflation", "Vor Steuern"], c: 0, e: "Das Pfändungsschutzkonto sichert einen Freibetrag für den Lebensunterhalt." },
      { q: "Wo bekommst du kostenlose Hilfe bei Schulden?", a: ["Bei seriösen Schuldnerberatungen wie der Verbraucherzentrale", "Nur bei teuren Online-Anbietern", "Nirgends", "Beim Inkassobüro"], c: 0, e: "Gemeinnützige Schuldnerberatungen helfen kostenlos." },
    ]},
    { id: "k3", title: "Grundlagen der Baufinanzierung", mins: 4, cards: [
      { h: "Eigenkapital und Nebenkosten", p: "Beim Immobilienkauf kommen zum Kaufpreis Nebenkosten: Grunderwerbsteuer je nach Bundesland zwischen 3,5 und 6,5 %, Notar und Grundbuch rund 2 %, oft noch ein Makler. Diese Kosten solltest du aus Eigenkapital zahlen können." },
      { h: "Tilgung und Zinsbindung", p: "Die Tilgung bestimmt, wie schnell du schuldenfrei wirst. Bei 1 % Tilgung dauert es oft über 40 Jahre. Die Zinsbindung legt fest, wie lange der Zins fest bleibt, häufig 10 bis 15 Jahre." },
      { h: "Mieten oder kaufen?", p: "Kaufen ist nicht automatisch besser. Eine Immobilie bindet viel Geld an einem Ort, und Instandhaltung kostet zusätzlich. Wer mietet und die Differenz konsequent anlegt, kann ebenfalls Vermögen aufbauen.", f: "Nebenkosten beim Kauf: oft 10 bis 15 % des Kaufpreises" },
    ], qs: [
      { q: "Welche Nebenkosten fallen beim Immobilienkauf an?", a: ["Keine", "Grunderwerbsteuer, Notar, Grundbuch, oft Makler", "Nur die Umzugsfirma", "Nur die Kfz-Steuer"], c: 1, e: "Diese Kaufnebenkosten machen oft 10 bis 15 % des Preises aus." },
      { q: "Was legt die Zinsbindung fest?", a: ["Wie lange der Zins fest bleibt", "Die Höhe der Grunderwerbsteuer", "Die Größe der Wohnung", "Die Mietkaution"], c: 0, e: "Nach Ablauf der Zinsbindung wird der Zins neu verhandelt." },
      { q: "Was gilt beim Vergleich von Mieten und Kaufen?", a: ["Kaufen ist immer besser", "Mieten ist immer besser", "Es kommt auf die Situation an", "Mieten ist verboten"], c: 2, e: "Beide Wege können sinnvoll sein. Entscheidend sind Kosten, Flexibilität und Disziplin beim Sparen." },
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
    { id: "z3", title: "Das magische Dreieck", mins: 3, cards: [
      { h: "Drei Ziele, ein Problem", p: "Jede Geldanlage lässt sich an drei Zielen messen: Rendite (wie viel bringt sie), Sicherheit (wie stark schwankt sie) und Verfügbarkeit (wie schnell komme ich ran). Keine Anlage erfüllt alle drei perfekt." },
      { h: "Beispiele", p: "Tagesgeld ist sicher und verfügbar, bringt aber wenig Rendite. Aktien-ETFs bieten langfristig mehr Rendite, schwanken aber stark. Festgeld ist sicher und bringt etwas mehr, ist aber gebunden." },
      { h: "Was heißt das für dich?", p: "Wähle die Anlage nach dem Zweck des Geldes. Was du bald brauchst, gehört nicht in schwankende Anlagen. Was 10 Jahre und länger liegen kann, darf schwanken.", f: "Rendite · Sicherheit · Verfügbarkeit: Wähle zwei" },
    ], qs: [
      { q: "Welche drei Ziele bilden das magische Dreieck?", a: ["Rendite, Sicherheit, Verfügbarkeit", "Zins, Steuer, Inflation", "Aktie, Anleihe, Fonds", "Kosten, Gebühren, Provision"], c: 0, e: "Diese drei Ziele stehen in Konkurrenz zueinander." },
      { q: "Welche Anlage ist sicher und verfügbar, aber renditeschwach?", a: ["Aktien-ETF", "Tagesgeld", "Einzelaktie", "Kryptowährung"], c: 1, e: "Tagesgeld schwankt nicht und ist täglich verfügbar, bringt aber meist wenig." },
      { q: "Für Geld, das du erst in 15 Jahren brauchst, eignet sich eher ...", a: ["nur Bargeld", "eine schwankende, renditestarke Anlage wie ein breiter ETF", "ein Girokonto", "gar keine Anlage"], c: 1, e: "Über lange Zeiträume gleichen sich Schwankungen eher aus." },
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
    { id: "i3", title: "Streuung und Klumpenrisiko", mins: 3, cards: [
      { h: "Nicht alles auf eine Karte", p: "Wer sein Geld in eine einzige Aktie steckt, ist vom Schicksal eines Unternehmens abhängig. Geht es pleite, ist das Geld weg. Dieses Risiko heißt Klumpenrisiko." },
      { h: "Breit streuen", p: "Je mehr Unternehmen, Branchen und Länder in einem Depot stecken, desto geringer wirkt sich der Absturz eines einzelnen aus. Ein Welt-ETF streut über Hunderte Firmen auf einmal." },
      { h: "Der Arbeitgeber-Effekt", p: "Viele investieren in das Unternehmen, in dem sie arbeiten, oder nur in ihr Heimatland. Geht es der Firma schlecht, sind dann Job und Ersparnisse gleichzeitig in Gefahr.", f: "Der DAX enthält 40 Unternehmen, ein MSCI-World-ETF weit über 1.000" },
    ], qs: [
      { q: "Was ist ein Klumpenrisiko?", a: ["Zu viel Bargeld zu Hause", "Zu viel Geld in einer einzelnen Anlage", "Zu viele verschiedene ETFs", "Zu niedrige Zinsen"], c: 1, e: "Konzentration auf wenige Werte macht das Depot verwundbar." },
      { q: "Wie senkst du das Risiko einzelner Pleiten?", a: ["Durch breite Streuung", "Durch mehr Einzelaktien derselben Firma", "Durch häufiges Kaufen und Verkaufen", "Gar nicht"], c: 0, e: "Streuung ist der wichtigste Schutz vor Einzelrisiken." },
      { q: "Wie viele Unternehmen enthält der DAX?", a: ["10", "30", "40", "500"], c: 2, e: "Seit 2021 umfasst der DAX 40 Unternehmen." },
    ]},
    { id: "i4", title: "Ausschüttend oder thesaurierend?", mins: 3, cards: [
      { h: "Zwei Arten von ETFs", p: "Unternehmen zahlen Dividenden. Ein ausschüttender ETF überweist sie dir aufs Konto. Ein thesaurierender ETF legt sie automatisch wieder an." },
      { h: "Was passt zu dir?", p: "Wer Vermögen aufbauen will, spart sich mit thesaurierenden ETFs das Wiederanlegen und nutzt den Zinseszins automatisch. Wer regelmäßige Einnahmen möchte, etwa im Ruhestand, nimmt eher ausschüttende." },
      { h: "Steuern gibt es bei beiden", p: "Auch thesaurierende ETFs werden jedes Jahr besteuert, über die sogenannte Vorabpauschale. Mit einem Freistellungsauftrag bleibt das bis zum Sparerpauschbetrag steuerfrei." },
    ], qs: [
      { q: "Was macht ein thesaurierender ETF mit Dividenden?", a: ["Er zahlt sie aus", "Er legt sie automatisch wieder an", "Er spendet sie", "Er behält sie als Gebühr"], c: 1, e: "Thesaurieren heißt: Erträge bleiben im Fonds und werden reinvestiert." },
      { q: "Für wen sind ausschüttende ETFs oft interessant?", a: ["Für Menschen, die regelmäßige Einnahmen wollen", "Nur für Banken", "Für niemanden", "Nur für Kinder"], c: 0, e: "Ausschüttungen bringen regelmäßig Geld aufs Konto." },
      { q: "Werden thesaurierende ETFs besteuert?", a: ["Nie", "Ja, unter anderem über die Vorabpauschale", "Nur in Österreich", "Nur beim Kauf"], c: 1, e: "Die Vorabpauschale sorgt dafür, dass auch thesaurierende Fonds jährlich besteuert werden." },
    ]},
    { id: "i5", title: "Depot und Sparplan einrichten", mins: 4, cards: [
      { h: "Was ist ein Depot?", p: "In einem Depot werden Wertpapiere wie Aktien und ETFs verwahrt. Du eröffnest es bei einer Bank oder einem Online-Broker. Die Wertpapiere gehören dir und sind bei einer Pleite des Anbieters Sondervermögen." },
      { h: "Auf Kosten achten", p: "Wichtige Kosten sind Depotgebühren, Ordergebühren pro Kauf und die Kosten für Sparpläne. Online-Broker sind meist deutlich günstiger als die klassische Filialbank. Dazu kommen die laufenden Kosten der ETFs selbst." },
      { h: "Der Sparplan", p: "Mit einem Sparplan kaufst du automatisch jeden Monat für einen festen Betrag Anteile, oft schon ab wenigen Euro. Du kannst ihn jederzeit pausieren, ändern oder stoppen.", f: "Wertpapiere im Depot sind Sondervermögen: Sie gehören dir, nicht der Bank" },
    ], qs: [
      { q: "Was passiert mit deinen ETF-Anteilen, wenn der Broker pleitegeht?", a: ["Sie sind verloren", "Sie bleiben dein Eigentum (Sondervermögen)", "Sie gehen an den Staat", "Sie werden halbiert"], c: 1, e: "Wertpapiere im Depot gehören nicht zum Vermögen des Anbieters." },
      { q: "Welche Kosten fallen beim Depot typischerweise an?", a: ["Depot-, Order- und Sparplangebühren", "Nur die Kfz-Steuer", "Gar keine", "Nur Mahngebühren"], c: 0, e: "Diese Gebühren unterscheiden sich stark je nach Anbieter." },
      { q: "Kannst du einen Sparplan pausieren?", a: ["Nein, er läuft mindestens 10 Jahre", "Ja, jederzeit", "Nur mit Anwalt", "Nur einmal im Leben"], c: 1, e: "Sparpläne sind flexibel und lassen sich anpassen oder stoppen." },
    ]},
    { id: "i6", title: "Gefühle an der Börse", mins: 3, cards: [
      { h: "Verluste tun doppelt weh", p: "Studien zeigen: Ein Verlust fühlt sich ungefähr doppelt so schlimm an, wie sich ein gleich großer Gewinn gut anfühlt. Deshalb verkaufen viele in Krisen aus Angst, oft zum schlechtesten Zeitpunkt." },
      { h: "Herdentrieb und FOMO", p: "Wenn alle über eine Aktie reden, wollen viele schnell noch einsteigen, aus Angst, etwas zu verpassen. Häufig ist der Preis dann schon stark gestiegen." },
      { h: "Ein Plan schützt", p: "Wer vorher festlegt, wie viel er monatlich anlegt und wie lange, lässt sich von Schlagzeilen weniger leiten. Weniger ins Depot schauen hilft oft auch." },
    ], qs: [
      { q: "Was beschreibt die Verlustaversion?", a: ["Verluste fühlen sich stärker an als gleich große Gewinne", "Man liebt Verluste", "Man vermeidet jede Geldanlage", "Ein Gesetz gegen Verluste"], c: 0, e: "Diese Neigung verleitet oft zu Panikverkäufen." },
      { q: "Wofür steht FOMO?", a: ["Fear of missing out, die Angst, etwas zu verpassen", "Ein ETF-Typ", "Eine Steuerart", "Ein Börsenindex"], c: 0, e: "FOMO treibt viele dazu, teuer einzusteigen." },
      { q: "Was hilft gegen emotionale Entscheidungen?", a: ["Täglich alle Nachrichten lesen", "Ein vorher festgelegter Plan", "Bei jedem Kursrutsch verkaufen", "Freunden alles nachmachen"], c: 1, e: "Ein klarer Plan macht dich unabhängiger von Stimmungen." },
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
    { id: "t3", title: "Die Lohnabrechnung verstehen", mins: 4, cards: [
      { h: "Von Brutto zu Netto", p: "Brutto ist das vereinbarte Gehalt. Davon gehen Lohnsteuer, gegebenenfalls Kirchensteuer und die Beiträge zur Sozialversicherung ab. Was übrig bleibt, ist dein Netto." },
      { h: "Die Sozialversicherung", p: "Renten-, Kranken-, Pflege- und Arbeitslosenversicherung teilen sich Arbeitnehmer und Arbeitgeber grob zur Hälfte. Dein Anteil liegt zusammen bei rund einem Fünftel des Bruttos.", f: "Rentenversicherung: 18,6 % vom Brutto, je zur Hälfte von dir und deinem Arbeitgeber" },
      { h: "Die Steuerklasse", p: "Die Steuerklasse bestimmt, wie viel Lohnsteuer jeden Monat einbehalten wird. Ledige haben meist Klasse I, Alleinerziehende Klasse II, für einen Zweitjob gilt Klasse VI. Zu viel gezahlte Steuer bekommst du über die Steuererklärung zurück." },
    ], qs: [
      { q: "Was ist das Netto-Gehalt?", a: ["Das Gehalt vor Abzügen", "Das Gehalt nach Steuern und Sozialabgaben", "Der Arbeitgeberanteil", "Das Urlaubsgeld"], c: 1, e: "Netto ist, was nach allen Abzügen auf dem Konto landet." },
      { q: "Wer bezahlt die Rentenversicherung?", a: ["Nur der Arbeitnehmer", "Nur der Arbeitgeber", "Beide je zur Hälfte", "Der Staat allein"], c: 2, e: "Der Beitrag von 18,6 % wird zwischen Arbeitnehmer und Arbeitgeber geteilt." },
      { q: "Welche Steuerklasse gilt für einen Zweitjob?", a: ["I", "III", "V", "VI"], c: 3, e: "Für ein zweites Arbeitsverhältnis gilt Steuerklasse VI." },
    ]},
    { id: "t4", title: "Freistellungsauftrag & Vorabpauschale", mins: 3, cards: [
      { h: "Freistellungsauftrag nutzen", p: "Ohne Freistellungsauftrag zieht die Bank sofort Abgeltungsteuer ab. Mit Freistellungsauftrag bleiben deine Erträge bis zum Sparerpauschbetrag steuerfrei. Er lässt sich im Online-Banking in wenigen Minuten erteilen." },
      { h: "Die Vorabpauschale", p: "Bei Fonds und ETFs wird jedes Jahr Anfang Januar eine Vorabpauschale berechnet. Sie richtet sich nach einem staatlich festgelegten Basiszins. Ist der Freibetrag aufgebraucht, zieht die Bank darauf Steuer ab." },
      { h: "Keine doppelte Steuer", p: "Die bereits versteuerten Vorabpauschalen werden beim späteren Verkauf angerechnet. Du zahlst also nicht doppelt, sondern nur früher. Achte darauf, dass etwas Geld auf dem Verrechnungskonto liegt.", f: "Vorabpauschale: Steuer heute, Anrechnung beim Verkauf" },
    ], qs: [
      { q: "Was passiert ohne Freistellungsauftrag?", a: ["Gar nichts", "Die Bank zieht sofort Abgeltungsteuer ab", "Das Konto wird gesperrt", "Die Zinsen verfallen"], c: 1, e: "Den Freibetrag nutzt die Bank nur, wenn du ihn ihr zuweist." },
      { q: "Wann wird die Vorabpauschale berechnet?", a: ["Jeden Monat", "Jährlich Anfang Januar", "Nur beim Verkauf", "Nie"], c: 1, e: "Sie wird für das Vorjahr zu Jahresbeginn ermittelt." },
      { q: "Zahlst du durch die Vorabpauschale doppelt Steuern?", a: ["Ja, immer", "Nein, sie wird beim Verkauf angerechnet", "Nur bei Aktien", "Nur Rentner"], c: 1, e: "Bereits versteuerte Beträge mindern den späteren Gewinn." },
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
    { id: "v3", title: "Die Betriebsrente", mins: 3, cards: [
      { h: "Sparen über den Arbeitgeber", p: "Bei der betrieblichen Altersvorsorge wird ein Teil deines Bruttogehalts direkt in einen Vorsorgevertrag eingezahlt. Das nennt man Entgeltumwandlung. Darauf hast du als Arbeitnehmer einen Rechtsanspruch." },
      { h: "Der Arbeitgeber zahlt mit", p: "Spart dein Arbeitgeber durch die Entgeltumwandlung Sozialabgaben, muss er in der Regel mindestens 15 % deines umgewandelten Betrags dazugeben. Viele Firmen zahlen freiwillig mehr.", f: "Mindestens 15 % Zuschuss vom Arbeitgeber bei Entgeltumwandlung" },
      { h: "Genau hinschauen", p: "In der Ansparphase sparst du Steuern und Sozialabgaben, im Alter wird die Betriebsrente versteuert. Kosten und Bedingungen der Verträge unterscheiden sich stark. Frag nach den Kosten und dem Zuschuss, bevor du unterschreibst." },
    ], qs: [
      { q: "Was ist Entgeltumwandlung?", a: ["Ein Teil des Bruttogehalts fließt in die Altersvorsorge", "Ein Kredit vom Arbeitgeber", "Eine Gehaltserhöhung", "Eine Steuerstrafe"], c: 0, e: "Gehalt wird vor Steuern in eine Betriebsrente umgewandelt." },
      { q: "Wie viel Zuschuss muss der Arbeitgeber in der Regel mindestens zahlen?", a: ["0 %", "5 %", "15 %", "50 %"], c: 2, e: "Wenn er Sozialabgaben spart, muss er mindestens 15 % dazugeben." },
      { q: "Wann wird die Betriebsrente besteuert?", a: ["Beim Einzahlen", "In der Auszahlungsphase im Alter", "Nie", "Nur bei Kündigung"], c: 1, e: "Die Steuer verschiebt sich in die Rentenzeit." },
    ]},
    { id: "v4", title: "Berufsunfähigkeit absichern", mins: 3, cards: [
      { h: "Dein Einkommen ist dein Kapital", p: "Wer mit 25 anfängt zu arbeiten, verdient bis zur Rente oft weit über eine Million Euro. Wird man krank und kann nicht mehr arbeiten, fällt dieses Einkommen weg. Die staatliche Erwerbsminderungsrente ist meist gering." },
      { h: "Was eine BU leistet", p: "Eine Berufsunfähigkeitsversicherung zahlt eine monatliche Rente, wenn du deinen Beruf aus gesundheitlichen Gründen voraussichtlich längere Zeit nicht mehr ausüben kannst, meist ab einer Einschränkung von 50 %." },
      { h: "Früh und ehrlich", p: "Je jünger und gesünder du beim Abschluss bist, desto günstiger ist der Beitrag. Die Gesundheitsfragen musst du vollständig und wahr beantworten, sonst kann die Versicherung im Ernstfall die Zahlung verweigern." },
    ], qs: [
      { q: "Was zahlt eine Berufsunfähigkeitsversicherung?", a: ["Eine monatliche Rente bei Berufsunfähigkeit", "Den Urlaub", "Reparaturen am Auto", "Arztrechnungen bei Erkältung"], c: 0, e: "Sie ersetzt einen Teil des Einkommens, wenn du nicht mehr arbeiten kannst." },
      { q: "Warum lohnt sich ein früher Abschluss?", a: ["Er ist gesetzlich vorgeschrieben", "Jung und gesund ist der Beitrag niedriger", "Später gibt es keine Versicherungen mehr", "Die Rente ist dann steuerfrei"], c: 1, e: "Alter und Vorerkrankungen erhöhen den Beitrag." },
      { q: "Was passiert bei falschen Angaben zur Gesundheit?", a: ["Nichts", "Die Versicherung kann im Ernstfall die Zahlung verweigern", "Der Beitrag sinkt", "Man bekommt mehr Geld"], c: 1, e: "Ehrliche Angaben sind entscheidend für den Schutz." },
    ]},
  ]},
  { id: "wirtschaft", title: "Wirtschaft verstehen", sub: "Zinsen, Preise, Konjunktur", lessons: [
    { id: "w1", title: "Der Leitzins", mins: 3, cards: [
      { h: "Was die EZB steuert", p: "Die Europäische Zentralbank legt die Leitzinsen für den Euroraum fest. Zu diesen Zinsen können sich Banken Geld bei der Zentralbank leihen oder dort parken. Damit beeinflusst sie, wie teuer Geld in der ganzen Wirtschaft ist." },
      { h: "Steigende Zinsen bremsen", p: "Hebt die EZB die Leitzinsen an, werden Kredite teurer und Sparen lohnt sich mehr. Menschen und Firmen geben weniger aus, die Nachfrage sinkt und die Preise steigen langsamer. So bekämpft die EZB eine hohe Inflation." },
      { h: "Was das für dich bedeutet", p: "Steigt der Leitzins, steigen meist auch die Zinsen für Tagesgeld, Baukredite und Dispo. Sinkt er, wird Sparen weniger attraktiv und Kredite werden günstiger.", f: "Leitzins hoch: Tagesgeld bringt mehr, Kredite kosten mehr" },
    ], qs: [
      { q: "Wer legt die Leitzinsen für den Euroraum fest?", a: ["Die Bundesregierung", "Die Europäische Zentralbank", "Die Sparkassen", "Die BaFin"], c: 1, e: "Die EZB in Frankfurt bestimmt die Geldpolitik für alle Euro-Länder." },
      { q: "Was will die EZB meist erreichen, wenn sie die Leitzinsen erhöht?", a: ["Mehr Inflation", "Die Inflation senken", "Aktienkurse steigern", "Steuern senken"], c: 1, e: "Höhere Zinsen dämpfen die Nachfrage und damit den Preisanstieg." },
      { q: "Was passiert oft mit den Tagesgeldzinsen, wenn der Leitzins steigt?", a: ["Sie sinken", "Sie steigen", "Sie bleiben immer gleich", "Tagesgeld wird abgeschafft"], c: 1, e: "Banken geben höhere Leitzinsen meist teilweise an Sparer weiter." },
    ]},
    { id: "w2", title: "Angebot, Nachfrage & Konjunktur", mins: 3, cards: [
      { h: "Wie Preise entstehen", p: "Wollen viele Menschen etwas kaufen, das knapp ist, steigt der Preis. Gibt es mehr Angebot als Nachfrage, fällt er. Dieses Zusammenspiel bestimmt Preise auf Märkten, von Konzerttickets bis zu Aktien." },
      { h: "Das Bruttoinlandsprodukt", p: "Das BIP misst den Wert aller Waren und Dienstleistungen, die in einem Land in einem Zeitraum hergestellt werden. Wächst es, spricht man von Wirtschaftswachstum." },
      { h: "Auf und Ab der Wirtschaft", p: "Die Wirtschaft entwickelt sich in Wellen, der sogenannten Konjunktur. Schrumpft das BIP zwei Quartale hintereinander, spricht man meist von einer Rezession. Dann steigt oft die Arbeitslosigkeit, und Aktienkurse fallen.", f: "Für langfristige Anleger gehören Rezessionen dazu. Ein Notgroschen hilft, sie ohne Notverkäufe zu überstehen." },
    ], qs: [
      { q: "Ein Produkt ist knapp und sehr gefragt. Was passiert meist mit dem Preis?", a: ["Er sinkt", "Er steigt", "Er bleibt gleich", "Der Staat legt ihn fest"], c: 1, e: "Hohe Nachfrage bei knappem Angebot treibt den Preis nach oben." },
      { q: "Was misst das Bruttoinlandsprodukt (BIP)?", a: ["Die Staatsschulden", "Den Wert aller hergestellten Waren und Dienstleistungen", "Die Inflation", "Die Zahl der Arbeitslosen"], c: 1, e: "Das BIP ist das wichtigste Maß für die Wirtschaftsleistung eines Landes." },
      { q: "Wann spricht man meist von einer Rezession?", a: ["Wenn die Börse an einem Tag fällt", "Wenn das BIP zwei Quartale in Folge schrumpft", "Wenn die Inflation bei 2 % liegt", "Wenn der Leitzins sinkt"], c: 1, e: "Zwei Quartale mit sinkendem BIP gelten als gängige Faustregel für eine Rezession." },
    ]},
    { id: "w3", title: "Börse und Indizes", mins: 3, cards: [
      { h: "Was ist ein Index?", p: "Ein Index fasst die Kurse vieler Aktien zu einer Zahl zusammen und zeigt, wie sich ein Markt entwickelt. Bekannte Beispiele sind der DAX für Deutschland, der S&P 500 für die USA und der MSCI World für Industrieländer weltweit." },
      { h: "Gewichtung nach Größe", p: "In den meisten Indizes zählen große Unternehmen stärker. Im MSCI World machen US-Firmen deshalb weit über die Hälfte aus. Wer „die Welt“ kauft, kauft vor allem Amerika." },
      { h: "Langfristig nach oben", p: "Breite Aktienindizes sind über Jahrzehnte trotz Krisen deutlich gestiegen. Dazwischen gab es Einbrüche von 30 bis 50 %. Eine Garantie für die Zukunft ist das nicht.", f: "DAX: 40 Unternehmen · S&P 500: 500 große US-Unternehmen" },
    ], qs: [
      { q: "Was zeigt ein Aktienindex?", a: ["Die Entwicklung einer Gruppe von Aktien", "Den Leitzins", "Die Inflation", "Die Arbeitslosenquote"], c: 0, e: "Ein Index bündelt viele Kurse zu einem Wert." },
      { q: "Welches Land hat im MSCI World den größten Anteil?", a: ["Deutschland", "Japan", "USA", "Frankreich"], c: 2, e: "US-Unternehmen sind die größten und stellen den Großteil des Index." },
      { q: "Was gilt für breite Aktienindizes langfristig?", a: ["Sie steigen jedes Jahr garantiert", "Sie sind trotz Einbrüchen über Jahrzehnte gestiegen", "Sie fallen immer", "Sie bewegen sich nie"], c: 1, e: "Die Vergangenheit zeigt Wachstum mit zwischenzeitlichen Krisen, ohne Garantie." },
    ]},
    { id: "w4", title: "Wechselkurse und Währungen", mins: 3, cards: [
      { h: "Was ein Wechselkurs ist", p: "Der Wechselkurs sagt, wie viel eine Währung in einer anderen wert ist. Steigt der Euro gegenüber dem Dollar, bekommst du im Urlaub in den USA mehr für dein Geld." },
      { h: "Währungsrisiko bei Anlagen", p: "Kaufst du Aktien aus den USA, hängt dein Ergebnis in Euro auch vom Dollarkurs ab. Fällt der Dollar, verlierst du in Euro gerechnet, selbst wenn die Aktie in Dollar gleich bleibt." },
      { h: "Langfristig gleicht es sich oft aus", p: "Bei breit gestreuten Welt-ETFs verteilt sich das Währungsrisiko auf viele Währungen. Über lange Zeiträume spielt es meist eine kleinere Rolle als die Entwicklung der Unternehmen selbst." },
    ], qs: [
      { q: "Der Euro steigt gegenüber dem Dollar. Was bedeutet das für deinen USA-Urlaub?", a: ["Er wird teurer", "Er wird günstiger", "Nichts", "Du darfst nicht mehr einreisen"], c: 1, e: "Für einen Euro bekommst du dann mehr Dollar." },
      { q: "Was ist das Währungsrisiko bei US-Aktien?", a: ["Der Dollarkurs beeinflusst dein Ergebnis in Euro", "Die Aktie ist verboten", "Man zahlt doppelt Steuern", "Es gibt keins"], c: 0, e: "Kursbewegungen der Währung wirken sich auf deinen Gewinn in Euro aus." },
      { q: "Wie wirkt Streuung auf das Währungsrisiko?", a: ["Sie verdoppelt es", "Sie verteilt es auf viele Währungen", "Sie hat keinen Einfluss", "Sie verbietet Fremdwährungen"], c: 1, e: "Viele Länder bedeuten viele Währungen, die sich teilweise ausgleichen." },
    ]},
  ]},
  { id: "sicher", title: "Betrug & Krypto", sub: "Sicher bleiben", lessons: [
    { id: "f1", title: "Phishing und Betrugsmaschen", mins: 3, cards: [
      { h: "Gefälschte Nachrichten", p: "Betrüger verschicken E-Mails und SMS, die wie von deiner Bank oder einem Paketdienst aussehen. Ein Link führt auf eine gefälschte Seite, die deine Zugangsdaten abgreifen will." },
      { h: "Die goldene Regel", p: "Deine Bank fragt dich nie per E-Mail, SMS oder Telefon nach PIN, TAN oder Passwort. Gib solche Daten nie heraus und bestätige nie eine Freigabe in der Banking-App, die du nicht selbst ausgelöst hast." },
      { h: "Bekannte Maschen", p: "Beim „Hallo Mama“-Trick schreibt jemand mit neuer Nummer und bittet dringend um Geld. Beim falschen Bankmitarbeiter ruft jemand an und will eine Überweisung „stornieren“. Im Zweifel: auflegen und selbst die bekannte Nummer anrufen.", f: "PIN und TAN gehören nur dir, niemals am Telefon nennen" },
    ], qs: [
      { q: "Deine Bank fragt per SMS nach deiner TAN. Was tust du?", a: ["Sofort antworten", "Nicht reagieren, das ist Betrug", "Den Link öffnen und prüfen", "Die TAN halb verraten"], c: 1, e: "Seriöse Banken fragen niemals auf diesem Weg nach TANs." },
      { q: "Was ist der „Hallo Mama“-Trick?", a: ["Ein Sparplan für Familien", "Betrüger geben sich als Kind mit neuer Nummer aus und wollen Geld", "Ein Bankprodukt", "Eine Steuerregel"], c: 1, e: "Ruf das Kind auf der bekannten Nummer an, bevor du Geld überweist." },
      { q: "Ein angeblicher Bankmitarbeiter ruft an und drängt dich. Was ist richtig?", a: ["Alles tun, was er sagt", "Auflegen und die Bank über die bekannte Nummer anrufen", "Ihm deine PIN nennen", "Eine Freigabe in der App bestätigen"], c: 1, e: "Druck und Eile sind typische Zeichen für Betrug." },
    ]},
    { id: "f2", title: "Kryptowährungen", mins: 4, cards: [
      { h: "Was Krypto ist", p: "Kryptowährungen wie Bitcoin sind digitale Werte ohne Zentralbank. Ihr Preis entsteht allein aus Angebot und Nachfrage und kann innerhalb von Tagen um 20 % und mehr schwanken." },
      { h: "Die Risiken", p: "Es gibt keine Einlagensicherung. Bei Pleiten von Handelsplattformen, Hackerangriffen oder verlorenen Zugangsdaten kann das Geld komplett weg sein. Viele kleine Kryptowährungen sind wertlos geworden." },
      { h: "Steuern in Deutschland", p: "Gewinne aus dem Verkauf von Kryptowährungen sind nach mehr als einem Jahr Haltedauer steuerfrei. Innerhalb eines Jahres sind sie steuerpflichtig, wenn alle privaten Veräußerungsgewinne zusammen 1.000 € im Jahr erreichen.", f: "Nur Geld anlegen, dessen Totalverlust du verkraften kannst" },
    ], qs: [
      { q: "Gibt es für Kryptowährungen eine Einlagensicherung?", a: ["Ja, bis 100.000 €", "Nein", "Nur für Bitcoin", "Nur am Wochenende"], c: 1, e: "Krypto-Guthaben sind nicht wie Bankeinlagen geschützt." },
      { q: "Wann sind Krypto-Gewinne in Deutschland steuerfrei?", a: ["Immer", "Nach mehr als einem Jahr Haltedauer", "Nie", "Nach einer Woche"], c: 1, e: "Nach Ablauf der einjährigen Spekulationsfrist sind Gewinne steuerfrei." },
      { q: "Wie viel Geld solltest du in sehr riskante Anlagen stecken?", a: ["Alles", "Nur so viel, dass ein Totalverlust verkraftbar ist", "Den Notgroschen", "Einen Kredit aufnehmen"], c: 1, e: "Bei hochriskanten Anlagen musst du mit einem Totalverlust rechnen." },
    ]},
    { id: "f3", title: "Finfluencer und zu gute Angebote", mins: 3, cards: [
      { h: "Tipps aus Social Media", p: "Auf Instagram, TikTok und YouTube geben viele Menschen Geldtipps. Manche erklären gut, andere verdienen an Provisionen für bestimmte Produkte. Frag dich immer: Woran verdient diese Person?" },
      { h: "Warnzeichen", p: "Garantierte hohe Renditen, Druck zur schnellen Entscheidung, Kontakt nur über Messenger, Gewinne „ohne Risiko“ oder die Bitte, Freunde anzuwerben: Das sind typische Zeichen für unseriöse Angebote oder Schneeballsysteme." },
      { h: "Prüfen bei der BaFin", p: "Die Finanzaufsicht BaFin führt eine Unternehmensdatenbank und veröffentlicht Warnungen vor unseriösen Anbietern. Wer Finanzgeschäfte in Deutschland anbietet, braucht meist eine Erlaubnis.", f: "Zu gut, um wahr zu sein? Dann ist es das meistens auch nicht." },
    ], qs: [
      { q: "Welche Frage solltest du dir bei Finfluencern stellen?", a: ["Wie viele Follower hat die Person?", "Woran verdient diese Person?", "Wie teuer ist ihr Auto?", "Welche Musik nutzt sie?"], c: 1, e: "Provisionen und Werbeverträge können Empfehlungen beeinflussen." },
      { q: "Was ist ein Warnzeichen für Betrug?", a: ["Garantierte hohe Rendite ohne Risiko", "Ein Hinweis auf Schwankungen", "Ein Impressum", "Eine BaFin-Erlaubnis"], c: 0, e: "Hohe Rendite ohne Risiko gibt es nicht." },
      { q: "Wo kannst du prüfen, ob ein Anbieter eine Erlaubnis hat?", a: ["In der Unternehmensdatenbank der BaFin", "Im Kommentarbereich", "Beim Anbieter selbst auf Instagram", "Nirgends"], c: 0, e: "Die BaFin listet zugelassene Unternehmen und warnt vor unseriösen." },
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
  { id: "challenge1", name: "Erste Tages-Challenge" },
  { id: "freeze", name: "Serie gerettet" },
  { id: "profile", name: "Profil eingerichtet" },
  { id: "all", name: "Alle Lektionen" },
] as const;
export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

export const DAILY_GOAL = 30;
