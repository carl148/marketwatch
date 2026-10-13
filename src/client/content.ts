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
    { id: "b6", title: "Haushaltsbuch-Methoden", mins: 3, cards: [
      { h: "Warum aufschreiben hilft", p: "Wer seine Ausgaben notiert, gibt meist automatisch weniger aus. Schon das Hinschauen macht bewusster. Wichtig ist eine Methode, die du wirklich durchhältst." },
      { h: "Drei bewährte Wege", p: "Die App deiner Bank sortiert Ausgaben oft automatisch in Kategorien. Eine Tabelle gibt dir volle Kontrolle. Bei der Umschlagmethode steckst du für jede Kategorie Bargeld in einen Umschlag: Ist er leer, ist das Budget aufgebraucht." },
      { h: "Ein Monat reicht für den Start", p: "Notiere einen Monat lang wirklich alles, auch den Kaffee unterwegs. Danach weißt du, wo dein Geld hingeht, und kannst gezielt Ziele setzen.", f: "Umschlagmethode: Lebensmittel 250 € · Freizeit 100 € · Kleidung 50 €" },
    ], qs: [
      { q: "Wie funktioniert die Umschlagmethode?", a: ["Bargeld wird nach Kategorien in Umschläge aufgeteilt", "Man schickt Rechnungen per Post", "Man spart nur Münzen", "Man zahlt alles mit Kreditkarte"], c: 0, e: "Ist ein Umschlag leer, ist das Budget dieser Kategorie aufgebraucht." },
      { q: "Was bewirkt schon das Aufschreiben von Ausgaben oft?", a: ["Man gibt bewusster und meist weniger aus", "Man verdient mehr", "Die Bank zahlt Zinsen", "Nichts"], c: 0, e: "Bewusstsein ist der erste Schritt zum Sparen." },
      { q: "Wie lange solltest du zum Start alle Ausgaben notieren?", a: ["Einen Tag", "Etwa einen Monat", "Zehn Jahre", "Gar nicht"], c: 1, e: "Ein Monat zeigt die meisten wiederkehrenden Ausgaben." },
    ]},
    { id: "b7", title: "Bargeld oder Karte?", mins: 3, cards: [
      { h: "Bargeld fühlt sich teurer an", p: "Wer mit Scheinen bezahlt, merkt den Verlust stärker als beim Kartenzahlen. Studien zeigen, dass Menschen mit Karte oft mehr ausgeben. Für knappe Budgets kann Bargeld deshalb helfen." },
      { h: "Karte und Handy sind bequem", p: "Mit Girocard, Debitkarte oder Handy zahlst du schnell und hast alles im Kontoauszug. Das erleichtert den Überblick, wenn du regelmäßig reinschaust." },
      { h: "Gebühren kennen", p: "Bargeld am Automaten fremder Banken kann einige Euro kosten. Manche Konten erlauben nur eine bestimmte Zahl kostenloser Abhebungen. Ein Blick ins Preisverzeichnis spart Ärger." },
    ], qs: [
      { q: "Warum geben Menschen mit Karte oft mehr aus?", a: ["Der Verlust fühlt sich weniger echt an", "Karten sind teurer", "Läden geben Rabatt auf Bargeld", "Das stimmt nicht"], c: 0, e: "Bargeld macht Ausgaben greifbarer." },
      { q: "Welchen Vorteil hat Kartenzahlung für den Überblick?", a: ["Alle Ausgaben stehen im Kontoauszug", "Sie ist immer kostenlos", "Sie macht reich", "Sie verhindert Abos"], c: 0, e: "Digitale Zahlungen lassen sich leicht nachverfolgen." },
      { q: "Was kann am Automaten einer fremden Bank passieren?", a: ["Es fallen Gebühren an", "Man bekommt Zinsen", "Das Konto wird gelöscht", "Nichts, es ist immer gratis"], c: 0, e: "Fremdabhebungen kosten je nach Konto Gebühren." },
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
    { id: "s5", title: "Sparen mit wenig Geld", mins: 3, cards: [
      { h: "Jeder Euro zählt", p: "Auch 20 € im Monat ergeben nach einem Jahr 240 €. Wichtiger als die Höhe ist die Gewohnheit. Wer klein anfängt, erhöht später leichter." },
      { h: "Sparen bei Gehaltserhöhung", p: "Bekommst du mehr Geld, spare die Hälfte der Erhöhung gleich mit. Du lebst trotzdem etwas besser und dein Sparbetrag wächst automatisch." },
      { h: "Rundungs- und Restgeld-Tricks", p: "Manche Banken runden Kartenzahlungen auf und legen die Differenz zurück. Oder du überweist am Monatsende einfach den Rest vom Girokonto auf das Sparkonto.", f: "20 € pro Monat × 12 = 240 € im Jahr" },
    ], qs: [
      { q: "Was ist beim Sparen mit wenig Geld am wichtigsten?", a: ["Die Gewohnheit", "Ein hoher Betrag", "Ein Kredit", "Gar nicht sparen"], c: 0, e: "Regelmäßigkeit schlägt die Höhe am Anfang." },
      { q: "Was ist eine gute Strategie bei einer Gehaltserhöhung?", a: ["Alles ausgeben", "Einen Teil der Erhöhung direkt sparen", "Den Job kündigen", "Mehr Abos abschließen"], c: 1, e: "So wächst die Sparrate, ohne dass du verzichten musst." },
      { q: "Wie viel sind 25 € im Monat über ein Jahr?", a: ["150 €", "250 €", "300 €", "400 €"], c: 2, e: "25 € × 12 = 300 €." },
    ]},
    { id: "s6", title: "Vermögenswirksame Leistungen", mins: 3, cards: [
      { h: "Geld vom Arbeitgeber", p: "Viele Arbeitgeber zahlen vermögenswirksame Leistungen (VL), oft bis zu 40 € im Monat, je nach Tarif- oder Arbeitsvertrag. Das Geld fließt in einen Sparvertrag, zum Beispiel einen Fondssparplan." },
      { h: "Die Arbeitnehmersparzulage", p: "Bei geringerem Einkommen zahlt der Staat zusätzlich eine Arbeitnehmersparzulage. Für Fondssparpläne beträgt sie 20 % auf bis zu 470 € im Jahr, wenn das zu versteuernde Einkommen unter der Grenze liegt.", f: "Einkommensgrenze: 40.000 € (Paare 80.000 €) zu versteuerndes Einkommen" },
      { h: "Frag nach!", p: "Viele Beschäftigte wissen nicht, dass ihnen VL zustehen. Frag in der Personalabteilung nach. Sonst verschenkst du jedes Jahr Geld." },
    ], qs: [
      { q: "Wer zahlt vermögenswirksame Leistungen?", a: ["Der Arbeitgeber", "Die Krankenkasse", "Die Schufa", "Das Finanzamt"], c: 0, e: "VL sind eine Leistung des Arbeitgebers, oft per Tarifvertrag geregelt." },
      { q: "Was ist die Arbeitnehmersparzulage?", a: ["Ein staatlicher Zuschuss bei geringerem Einkommen", "Eine Steuer", "Ein Kredit", "Eine Strafe"], c: 0, e: "Der Staat fördert VL-Sparverträge bei Einkommen unter der Grenze." },
      { q: "Was solltest du tun, wenn du nicht weißt, ob dir VL zustehen?", a: ["Nichts", "In der Personalabteilung nachfragen", "Kündigen", "Die Bank wechseln"], c: 1, e: "Nachfragen kostet nichts und bringt oft Geld." },
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
    { id: "a5", title: "Geld auf Reisen", mins: 3, cards: [
      { h: "Mit Karte im Ausland", p: "In Ländern ohne Euro verlangen manche Karten eine Auslandseinsatzgebühr, oft 1 bis 2 % des Betrags. Es gibt Kreditkarten ohne diese Gebühr. Ein Vergleich vor der Reise lohnt sich." },
      { h: "Die Euro-Falle", p: "Fragt das Terminal oder der Automat, ob du in Euro oder in Landeswährung zahlen willst, wähle die Landeswährung. Beim Umrechnen in Euro vor Ort nutzt der Anbieter oft einen schlechten Kurs.", f: "Immer in Landeswährung bezahlen" },
      { h: "Bargeld und Notfall", p: "Nimm eine zweite Karte mit und bewahre sie getrennt auf. Notiere die Sperrnummer 116 116, um verlorene Karten sofort sperren zu lassen." },
    ], qs: [
      { q: "Der Automat im Ausland fragt: Euro oder Landeswährung?", a: ["Euro, das ist immer günstiger", "Landeswährung", "Egal", "Abbrechen und nie wieder abheben"], c: 1, e: "Die Umrechnung vor Ort in Euro ist meist teurer." },
      { q: "Welche Nummer hilft beim Sperren verlorener Karten?", a: ["110", "112", "116 116", "0800 123"], c: 2, e: "Der Sperr-Notruf 116 116 funktioniert für viele Karten." },
      { q: "Was ist eine Auslandseinsatzgebühr?", a: ["Gebühr für Zahlungen in Fremdwährung", "Ein Reisebonus", "Eine Steuer", "Ein Zins"], c: 0, e: "Sie fällt oft bei Zahlungen außerhalb des Euroraums an." },
    ]},
    { id: "a6", title: "Gebraucht kaufen und verkaufen", mins: 3, cards: [
      { h: "Gebraucht spart Geld", p: "Elektronik, Möbel, Kleidung und Bücher gibt es gebraucht oft für die Hälfte oder weniger. Das schont Geldbeutel und Umwelt." },
      { h: "Sicher handeln", p: "Bei Kleinanzeigen gilt: Ware möglichst persönlich ansehen und bar oder über sichere Bezahlsysteme zahlen. Vorsicht bei Käufern, die Links schicken oder einen Kurier vorschlagen." },
      { h: "Und das Finanzamt?", p: "Gelegentlicher Verkauf privater Gebrauchsgegenstände ist in der Regel steuerfrei. Plattformen melden Verkäufer aber ans Finanzamt, wenn sie im Jahr mindestens 30 Verkäufe oder 2.000 € Einnahmen haben. Wer regelmäßig Neuware verkauft, handelt gewerblich.", f: "Meldegrenze für Plattformen: 30 Verkäufe oder 2.000 € im Jahr" },
    ], qs: [
      { q: "Ein Käufer schickt dir einen Link, um „die Zahlung zu bestätigen“. Was tust du?", a: ["Link öffnen und Kartendaten eingeben", "Nicht darauf eingehen, das ist eine bekannte Betrugsmasche", "Ihm deine PIN schicken", "Die Ware sofort verschicken"], c: 1, e: "Gefälschte Bezahlseiten sind eine häufige Masche bei Kleinanzeigen." },
      { q: "Ab wann melden Plattformen Verkäufer an das Finanzamt?", a: ["Ab dem ersten Verkauf", "Ab 30 Verkäufen oder 2.000 € im Jahr", "Nie", "Ab 10.000 Verkäufen"], c: 1, e: "Diese Meldepflicht gilt seit 2023." },
      { q: "Ist der gelegentliche Verkauf privater Gebrauchsgegenstände steuerpflichtig?", a: ["In der Regel nicht", "Immer", "Nur am Sonntag", "Nur für Kleidung"], c: 0, e: "Privater Gelegenheitsverkauf ist meist steuerfrei." },
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
    { id: "k4", title: "Den Schufa-Score verstehen", mins: 3, cards: [
      { h: "Wofür der Score da ist", p: "Banken, Vermieter und Handyanbieter fragen die Schufa, wie zuverlässig du zahlst. Der Score fasst das in einer Zahl zusammen. Ein schlechter Score kann Kredite, Verträge oder Wohnungen erschweren." },
      { h: "Was hilft", p: "Rechnungen pünktlich zahlen, nicht zu viele Kredite und Konten gleichzeitig, und Kreditangebote als Konditionsanfrage einholen. Eine Konditionsanfrage beeinflusst den Score nicht." },
      { h: "Fehler korrigieren lassen", p: "Prüfe einmal im Jahr deine kostenlose Datenkopie. Falsche oder veraltete Einträge musst du nicht hinnehmen: Du kannst sie bei der Schufa berichtigen oder löschen lassen." },
    ], qs: [
      { q: "Welche Anfrage beeinflusst deinen Schufa-Score nicht?", a: ["Konditionsanfrage", "Ein abgeschlossener Kredit", "Eine nicht bezahlte Rechnung", "Ein Inkassoverfahren"], c: 0, e: "Konditionsanfragen sind neutral und dienen dem Vergleich." },
      { q: "Was hilft am meisten für einen guten Score?", a: ["Rechnungen pünktlich zahlen", "Viele Kredite gleichzeitig", "Häufig Konten eröffnen und schließen", "Gar kein Konto haben"], c: 0, e: "Zuverlässigkeit bei Zahlungen ist entscheidend." },
      { q: "Was tust du bei einem falschen Schufa-Eintrag?", a: ["Hinnehmen", "Berichtigung oder Löschung verlangen", "Neues Konto eröffnen", "Umziehen"], c: 1, e: "Du hast ein Recht auf korrekte Daten." },
    ]},
    { id: "k5", title: "Kreditkarten richtig nutzen", mins: 3, cards: [
      { h: "Verschiedene Arten", p: "Bei einer Debitkarte wird sofort vom Konto abgebucht. Bei einer klassischen Kreditkarte wird einmal im Monat alles auf einmal abgebucht. Bei einer Revolving-Karte zahlst du nur einen Teil zurück, der Rest wird zum Kredit." },
      { h: "Die Teilzahlungsfalle", p: "Bei Revolving-Karten fallen auf den offenen Betrag oft Zinsen von über 15 % im Jahr an. Wer nur die Mindestrate zahlt, schiebt Schulden lange vor sich her." },
      { h: "Gut genutzt", p: "Eine Kreditkarte ist praktisch für Reisen, Mietwagen und Onlinekäufe. Stelle die Rückzahlung, wenn möglich, auf 100 % ein, dann ist sie ein Zahlungsmittel und kein Kredit.", f: "Rückzahlung auf 100 % stellen" },
    ], qs: [
      { q: "Was passiert bei einer Revolving-Kreditkarte?", a: ["Nur ein Teil wird zurückgezahlt, der Rest wird teurer Kredit", "Alles ist kostenlos", "Man bekommt Zinsen", "Die Karte funktioniert nur offline"], c: 0, e: "Der offene Betrag wird mit hohen Zinsen belastet." },
      { q: "Wie nutzt du eine Kreditkarte am günstigsten?", a: ["Nur die Mindestrate zahlen", "Rückzahlung auf 100 % stellen", "Möglichst viel in Raten", "Gar nicht zurückzahlen"], c: 1, e: "Ohne offenen Saldo fallen keine Zinsen an." },
      { q: "Bei welcher Karte wird sofort vom Konto abgebucht?", a: ["Debitkarte", "Revolving-Kreditkarte", "Charge-Karte mit Monatsabrechnung", "Kundenkarte"], c: 0, e: "Debitkarten buchen direkt vom Girokonto ab." },
    ]},
  ]},
  { id: "psycho", title: "Psychologie des Geldes", sub: "Warum wir ticken, wie wir ticken", lessons: [
    { id: "p1", title: "Macht Geld glücklich?", mins: 3, cards: [
      { h: "Ein bisschen schon", p: "Studien zeigen: Mehr Geld macht zufriedener, vor allem wenn es Sorgen nimmt, etwa um Miete oder Rechnungen. Ab einem gewissen Wohlstand wächst das Glück aber deutlich langsamer." },
      { h: "Die Gewöhnungsfalle", p: "Ein neues Handy oder Auto freut eine Weile, dann gewöhnen wir uns daran und wollen das nächste. Psychologen nennen das die hedonische Tretmühle." },
      { h: "Wofür Geld sich lohnt", p: "Erlebnisse, Zeit mit anderen, Sicherheit und Freiheit machen oft länger glücklich als Dinge. Ein Notgroschen kauft zum Beispiel Gelassenheit." },
    ], qs: [
      { q: "Wann macht mehr Geld besonders zufriedener?", a: ["Wenn es Geldsorgen nimmt", "Nur bei Millionären", "Nie", "Nur am Wochenende"], c: 0, e: "Finanzielle Sicherheit senkt Stress spürbar." },
      { q: "Was beschreibt die hedonische Tretmühle?", a: ["Wir gewöhnen uns schnell an Neues und wollen mehr", "Ein Fitnessgerät", "Eine Sparmethode", "Eine Steuer"], c: 0, e: "Die Freude über Neues verfliegt durch Gewöhnung." },
      { q: "Was macht laut Forschung oft länger glücklich?", a: ["Erlebnisse und Zeit mit anderen", "Ständig neue Gegenstände", "Hohe Schulden", "Viele Abos"], c: 0, e: "Erlebnisse bleiben in Erinnerung, Dinge verlieren ihren Reiz." },
    ]},
    { id: "p2", title: "Lifestyle-Inflation", mins: 3, cards: [
      { h: "Mehr verdienen, mehr ausgeben", p: "Mit jeder Gehaltserhöhung steigen bei vielen auch die Ausgaben: größere Wohnung, besseres Auto, teurere Urlaube. Am Monatsende ist trotzdem nichts übrig." },
      { h: "Der Vergleich mit anderen", p: "Oft geben wir mehr aus, weil Freunde oder Social Media es vormachen. Was andere zeigen, ist aber oft nicht bezahlt, sondern finanziert." },
      { h: "Bewusst aufsteigen", p: "Gönn dir bei mehr Einkommen gezielt etwas, das dir wirklich wichtig ist, und spare den Rest. So wächst dein Lebensstandard und dein Vermögen." },
    ], qs: [
      { q: "Was ist Lifestyle-Inflation?", a: ["Ausgaben steigen mit dem Einkommen mit", "Preise im Supermarkt steigen", "Ein ETF-Typ", "Eine Steuerart"], c: 0, e: "Mehr Einkommen führt dann nicht zu mehr Vermögen." },
      { q: "Was steckt oft hinter teurem Konsum in Social Media?", a: ["Finanzierung auf Pump oder Werbung", "Immer echtes Vermögen", "Staatliche Förderung", "Lottogewinne"], c: 0, e: "Was gezeigt wird, sagt wenig über die Finanzen dahinter." },
      { q: "Wie gehst du klug mit einer Gehaltserhöhung um?", a: ["Gezielt etwas gönnen und den Rest sparen", "Alles sofort ausgeben", "Einen Kredit aufnehmen", "Weniger arbeiten"], c: 0, e: "So profitieren Gegenwart und Zukunft." },
    ]},
    { id: "p3", title: "Mentale Konten", mins: 3, cards: [
      { h: "Geld ist Geld", p: "Viele behandeln Geld unterschiedlich, je nachdem, woher es kommt. Ein Bonus oder Geldgeschenk wird schneller ausgegeben als normales Gehalt, obwohl jeder Euro gleich viel wert ist." },
      { h: "Sparen und Schulden gleichzeitig", p: "Manche haben 2.000 € auf dem Sparkonto für 1 % Zinsen und gleichzeitig 1.500 € im Dispo zu 12 %. Das kostet unnötig Geld, auch wenn es sich sicherer anfühlt." },
      { h: "Mentale Konten nutzen", p: "Richtig eingesetzt helfen getrennte Töpfe beim Sparen: Was im Topf „Urlaub“ liegt, wird nicht für Spontankäufe genutzt. Wichtig ist, dass die Aufteilung zu deinen Zielen passt." },
    ], qs: [
      { q: "Was ist mit „mentalen Konten“ gemeint?", a: ["Geld je nach Herkunft unterschiedlich zu behandeln", "Ein Online-Konto", "Ein Steuerformular", "Ein Kreditvertrag"], c: 0, e: "Wir sortieren Geld im Kopf in verschiedene Schubladen." },
      { q: "Was ist am Sparen bei gleichzeitigem Dispo problematisch?", a: ["Dispozinsen sind viel höher als Sparzinsen", "Nichts", "Man zahlt doppelte Steuern", "Es ist verboten"], c: 0, e: "Den Dispo mit Erspartem abzulösen spart meist Geld." },
      { q: "Wie können getrennte Töpfe helfen?", a: ["Sie schützen Sparziele vor Spontankäufen", "Sie bringen automatisch Rendite", "Sie senken die Miete", "Gar nicht"], c: 0, e: "Klare Zwecke machen es leichter, das Geld nicht anzutasten." },
    ]},
    { id: "p4", title: "Ankereffekt und Rabatte", mins: 3, cards: [
      { h: "Der erste Preis bleibt hängen", p: "Siehst du zuerst einen hohen Preis, wirkt jeder spätere günstiger. Ein durchgestrichener Preis von 199 € lässt 99 € wie ein Schnäppchen wirken, auch wenn das Produkt nie 199 € gekostet hat." },
      { h: "Preisvergleich statt Gefühl", p: "Prüfe Preise mit einem Vergleichsportal oder Preisverlauf. So erkennst du, ob ein Rabatt echt ist oder nur ein künstlich hoher Ausgangspreis." },
      { h: "Gespart ist nicht gekauft", p: "Wer etwas für 50 € statt 80 € kauft, hat nicht 30 € gespart, sondern 50 € ausgegeben. Das gilt besonders für Dinge, die du ohne Rabatt nicht gekauft hättest.", f: "Wer nichts kauft, spart 100 %" },
    ], qs: [
      { q: "Was ist der Ankereffekt?", a: ["Ein erster Preis beeinflusst, wie wir spätere bewerten", "Ein Bootsverleih", "Ein ETF", "Ein Kredit"], c: 0, e: "Hohe Ausgangspreise lassen Angebote günstiger wirken." },
      { q: "Wie prüfst du, ob ein Rabatt echt ist?", a: ["Mit Preisvergleich und Preisverlauf", "Nach Gefühl", "Am roten Schild", "Gar nicht"], c: 0, e: "Der Preisverlauf zeigt, was ein Produkt wirklich gekostet hat." },
      { q: "Du kaufst etwas für 50 € statt 80 €. Was ist passiert?", a: ["Du hast 50 € ausgegeben", "Du hast 30 € verdient", "Du hast 80 € gespart", "Nichts"], c: 0, e: "Ein Rabatt ist nur dann eine Ersparnis, wenn du den Kauf sowieso geplant hattest." },
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
    { id: "z4", title: "Prozent- und Zinsrechnung", mins: 3, cards: [
      { h: "Prozent heißt „von hundert“", p: "5 % von 200 € sind 10 €. Rechnung: 200 × 5 ÷ 100. Mit diesem Trick prüfst du Rabatte, Zinsen und Gebühren schnell selbst." },
      { h: "Einfache Zinsen", p: "Zinsen = Kapital × Zinssatz × Jahre. 1.000 € zu 3 % über ein Jahr bringen 30 €. Werden die Zinsen nicht wieder angelegt, bleibt es jedes Jahr bei 30 €.", f: "Zinsen = Kapital × Zinssatz × Zeit" },
      { h: "Prozent ist nicht Prozentpunkt", p: "Steigt ein Zins von 2 % auf 3 %, ist das ein Plus von einem Prozentpunkt, aber von 50 Prozent. Werbung und Nachrichten nutzen beide Angaben, je nachdem, was eindrucksvoller klingt." },
    ], qs: [
      { q: "Wie viel sind 15 % von 80 €?", a: ["8 €", "12 €", "15 €", "18 €"], c: 1, e: "80 × 15 ÷ 100 = 12 €." },
      { q: "Wie viel Zinsen bringen 2.000 € zu 2 % in einem Jahr?", a: ["2 €", "20 €", "40 €", "200 €"], c: 2, e: "2.000 × 0,02 = 40 €." },
      { q: "Ein Zins steigt von 2 % auf 3 %. Um wie viel ist er gestiegen?", a: ["Um 1 Prozentpunkt bzw. 50 Prozent", "Um 1 Prozent", "Um 3 Prozentpunkte", "Gar nicht"], c: 0, e: "Ein Prozentpunkt mehr entspricht hier einem relativen Anstieg von 50 %." },
    ]},
    { id: "z5", title: "Nominal und real", mins: 3, cards: [
      { h: "Was auf dem Papier steht", p: "Die nominale Rendite ist der Wert ohne Inflation. Ein Depot, das 6 % im Jahr wächst, wirkt gut. Was du dir davon kaufen kannst, zeigt aber erst die reale Rendite." },
      { h: "Real = nominal minus Inflation", p: "Bei 6 % Rendite und 2 % Inflation bleiben real rund 4 %. Bei 1 % Zins auf dem Sparbuch und 2 % Inflation verlierst du real etwa 1 % Kaufkraft pro Jahr.", f: "Probier es im Rechner-Tab: „Kaufkraft heute“ zeigt den realen Wert" },
      { h: "Lange Zeiträume", p: "Über 30 Jahre macht der Unterschied viel aus. Plane deshalb Ziele wie die Rente immer in heutiger Kaufkraft, sonst wirkt das Ergebnis größer, als es ist." },
    ], qs: [
      { q: "Ein Depot bringt 7 %, die Inflation liegt bei 2 %. Wie hoch ist die reale Rendite ungefähr?", a: ["9 %", "7 %", "5 %", "2 %"], c: 2, e: "7 % − 2 % ≈ 5 % real." },
      { q: "Was zeigt die reale Rendite?", a: ["Den Zuwachs an Kaufkraft", "Den Wert vor Inflation", "Die Steuer", "Die Gebühren"], c: 0, e: "Real heißt: inflationsbereinigt." },
      { q: "Wie solltest du langfristige Ziele planen?", a: ["In heutiger Kaufkraft", "Ohne Inflation", "In Dollar", "Gar nicht"], c: 0, e: "So weißt du, was das Geld in Zukunft wirklich wert ist." },
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
    { id: "i7", title: "Wie viel Risiko passt zu mir?", mins: 3, cards: [
      { h: "Anlagehorizont", p: "Wie lange kannst du das Geld liegen lassen? Für weniger als 5 Jahre sind Aktien riskant, weil Einbrüche in dieser Zeit oft nicht wieder aufgeholt werden. Bei 15 Jahren und mehr ist die Lage anders." },
      { h: "Risikotragfähigkeit und Schlaf", p: "Frag dich: Wie würde ich reagieren, wenn mein Depot 40 % verliert? Wer dann verkaufen würde, sollte weniger in Aktien anlegen. Die beste Strategie ist die, die du durchhältst." },
      { h: "Mischung aus sicher und riskant", p: "Viele teilen ihr Geld auf: einen sicheren Teil auf Tagesgeld oder in Anleihen und einen renditestarken Teil in Aktien-ETFs. Über das Verhältnis steuerst du das Risiko.", f: "Beispiel: 30 % sicher, 70 % Aktien-ETF" },
    ], qs: [
      { q: "Warum sind Aktien für sehr kurze Zeiträume riskant?", a: ["Einbrüche werden oft nicht rechtzeitig aufgeholt", "Sie sind verboten", "Sie bringen keine Dividenden", "Sie sind steuerfrei"], c: 0, e: "Kurze Zeiträume lassen wenig Zeit zur Erholung." },
      { q: "Wie steuerst du das Risiko deines Vermögens?", a: ["Über die Aufteilung zwischen sicheren und riskanten Anlagen", "Über die Farbe des Depots", "Gar nicht", "Nur über Kredite"], c: 0, e: "Die Mischung entscheidet über Schwankung und Rendite." },
      { q: "Welche Strategie ist die beste?", a: ["Die mit der höchsten Rendite der letzten Woche", "Die, die du auch in Krisen durchhältst", "Die von Freunden", "Die mit den meisten Trades"], c: 1, e: "Wer in Panik verkauft, verliert oft am meisten." },
    ]},
    { id: "i8", title: "Gold und Rohstoffe", mins: 3, cards: [
      { h: "Gold als Krisenschutz", p: "Gold gilt als Wertaufbewahrung in unsicheren Zeiten. Es bringt aber keine Zinsen oder Dividenden. Sein Preis schwankt ebenfalls stark." },
      { h: "Steuern auf Gold", p: "Gewinne aus physischem Gold sind in Deutschland nach mehr als einem Jahr Haltedauer steuerfrei. Beim Kauf von Münzen und Barren fallen aber Aufschläge an, und die sichere Aufbewahrung kostet." },
      { h: "Rohstoffe im Depot", p: "Rohstoffe wie Öl oder Weizen schwanken stark und bringen langfristig oft weniger als Aktien. Für die meisten Privatanleger sind sie höchstens eine kleine Beimischung." },
    ], qs: [
      { q: "Was bringt Gold nicht?", a: ["Zinsen oder Dividenden", "Preisschwankungen", "Einen Preis", "Glanz"], c: 0, e: "Gold wirft keine laufenden Erträge ab." },
      { q: "Wann sind Gewinne aus physischem Gold steuerfrei?", a: ["Nach mehr als einem Jahr Haltedauer", "Nie", "Sofort", "Nach 10 Jahren"], c: 0, e: "Für physisches Gold gilt die einjährige Spekulationsfrist." },
      { q: "Welche Rolle spielen Rohstoffe für die meisten Privatanleger?", a: ["Höchstens eine kleine Beimischung", "Den Hauptteil", "Ersatz für den Notgroschen", "Gar keine Rolle, sie sind verboten"], c: 0, e: "Rohstoffe schwanken stark und bringen keine laufenden Erträge." },
    ]},
  ]},
  { id: "aktien", title: "Aktien im Detail", sub: "Bewertung, Dividenden, Orders", lessons: [
    { id: "x1", title: "Ist eine Aktie teuer?", mins: 3, cards: [
      { h: "Preis ist nicht Wert", p: "Eine Aktie für 500 € ist nicht automatisch teurer als eine für 20 €. Entscheidend ist, wie viel Gewinn das Unternehmen pro Aktie erwirtschaftet." },
      { h: "Das Kurs-Gewinn-Verhältnis", p: "Das KGV teilt den Aktienkurs durch den Gewinn pro Aktie. Ein KGV von 20 heißt: Anleger zahlen das 20-Fache des jährlichen Gewinns. Ein hohes KGV zeigt hohe Erwartungen an das künftige Wachstum.", f: "KGV = Kurs ÷ Gewinn pro Aktie" },
      { h: "Kennzahlen haben Grenzen", p: "Zahlen allein sagen nicht, ob eine Aktie steigt. Märkte preisen Erwartungen ein. Für die meisten ist ein breiter ETF einfacher als die Suche nach der perfekten Einzelaktie." },
    ], qs: [
      { q: "Wie berechnet sich das KGV?", a: ["Kurs geteilt durch Gewinn pro Aktie", "Gewinn mal Kurs", "Dividende plus Kurs", "Umsatz minus Kosten"], c: 0, e: "Das KGV setzt Preis und Gewinn ins Verhältnis." },
      { q: "Was zeigt ein hohes KGV meist?", a: ["Hohe Erwartungen an künftiges Wachstum", "Dass die Firma pleite ist", "Eine hohe Dividende", "Nichts"], c: 0, e: "Anleger zahlen viel für erwartete künftige Gewinne." },
      { q: "Ist eine Aktie für 500 € automatisch teurer als eine für 20 €?", a: ["Nein, entscheidend ist das Verhältnis zum Gewinn", "Ja, immer", "Nur am Montag", "Nur in den USA"], c: 0, e: "Der absolute Preis sagt wenig über die Bewertung aus." },
    ]},
    { id: "x2", title: "Dividenden", mins: 3, cards: [
      { h: "Gewinnbeteiligung", p: "Viele Unternehmen schütten einen Teil ihres Gewinns als Dividende an die Aktionäre aus, oft einmal im Jahr. In Deutschland beschließt das die Hauptversammlung." },
      { h: "Keine Geldmaschine", p: "Nach der Ausschüttung fällt der Aktienkurs ungefähr um den Betrag der Dividende. Du bekommst also einen Teil deines Werts ausgezahlt, nicht zusätzliches Geld." },
      { h: "Steuern auf Dividenden", p: "Dividenden sind Kapitalerträge. Über dem Sparerpauschbetrag zieht die Bank Abgeltungsteuer ab. Bei ausländischen Aktien kann zusätzlich Quellensteuer anfallen." },
    ], qs: [
      { q: "Was ist eine Dividende?", a: ["Eine Gewinnausschüttung an Aktionäre", "Eine Gebühr", "Ein Kredit", "Eine Strafe"], c: 0, e: "Unternehmen beteiligen Aktionäre so am Gewinn." },
      { q: "Was passiert meist mit dem Kurs nach der Ausschüttung?", a: ["Er fällt etwa um die Dividende", "Er verdoppelt sich", "Er bleibt exakt gleich", "Die Aktie wird gelöscht"], c: 0, e: "Der ausgezahlte Wert fehlt danach im Unternehmen." },
      { q: "Sind Dividenden steuerpflichtig?", a: ["Ja, über dem Sparerpauschbetrag", "Nie", "Nur in Bayern", "Nur über 1 Million"], c: 0, e: "Dividenden zählen zu den Kapitalerträgen." },
    ]},
    { id: "x3", title: "Kaufen und verkaufen: Ordertypen", mins: 3, cards: [
      { h: "Market-Order", p: "Mit einer Market-Order kaufst du sofort zum nächsten verfügbaren Preis. Das ist einfach, bei wenig gehandelten Papieren kann der Preis aber unerwartet abweichen." },
      { h: "Limit-Order", p: "Mit einem Limit legst du fest, wie viel du höchstens zahlen oder wie viel du beim Verkauf mindestens bekommen willst. Wird das Limit nicht erreicht, wird die Order nicht ausgeführt." },
      { h: "Stop-Order", p: "Eine Stop-Loss-Order verkauft automatisch, wenn der Kurs unter eine Grenze fällt. Sie soll Verluste begrenzen, kann aber bei kurzen Schwankungen ungewollt auslösen.", f: "Limit = Preisgrenze · Stop = Auslöser" },
    ], qs: [
      { q: "Was macht eine Limit-Order?", a: ["Sie legt einen Höchst- oder Mindestpreis fest", "Sie kauft immer sofort", "Sie verbietet den Handel", "Sie zahlt Dividenden"], c: 0, e: "Die Order wird nur zum gewünschten Preis oder besser ausgeführt." },
      { q: "Welches Risiko hat eine Market-Order?", a: ["Der Preis kann vom erwarteten abweichen", "Sie wird nie ausgeführt", "Sie kostet immer 100 €", "Keines"], c: 0, e: "Bei wenig Handel kann der Ausführungspreis überraschen." },
      { q: "Wofür ist eine Stop-Loss-Order gedacht?", a: ["Verluste zu begrenzen", "Gewinne zu verdoppeln", "Steuern zu sparen", "Dividenden zu erhöhen"], c: 0, e: "Sie verkauft automatisch, wenn der Kurs eine Grenze unterschreitet." },
    ]},
    { id: "x4", title: "Anleihen genauer", mins: 3, cards: [
      { h: "Wer leiht sich Geld?", p: "Staaten und Unternehmen geben Anleihen aus. Ratingagenturen bewerten, wie sicher die Rückzahlung ist, von AAA für sehr sicher bis zu Stufen, die ein hohes Ausfallrisiko anzeigen." },
      { h: "Mehr Risiko, mehr Zins", p: "Unsichere Schuldner müssen höhere Zinsen bieten. Eine Anleihe mit sehr hohem Zins ist deshalb oft riskant." },
      { h: "Zinsänderungsrisiko", p: "Steigen die Marktzinsen, fallen die Kurse bestehender Anleihen, weil neue Anleihen mehr Zins bringen. Wer bis zum Laufzeitende hält, bekommt aber den Nennwert zurück, wenn der Schuldner zahlen kann." },
    ], qs: [
      { q: "Was zeigt ein Rating von AAA?", a: ["Sehr hohe Bonität", "Hohes Ausfallrisiko", "Einen hohen Zins", "Eine Aktie"], c: 0, e: "AAA ist die beste Bonitätsnote." },
      { q: "Warum bieten manche Anleihen sehr hohe Zinsen?", a: ["Weil der Schuldner als riskant gilt", "Weil sie staatlich garantiert sind", "Zufall", "Weil sie steuerfrei sind"], c: 0, e: "Hohe Zinsen gleichen ein höheres Ausfallrisiko aus." },
      { q: "Was passiert mit Anleihekursen, wenn die Marktzinsen steigen?", a: ["Sie fallen", "Sie steigen", "Sie bleiben gleich", "Die Anleihe wird gelöscht"], c: 0, e: "Alte Anleihen mit niedrigerem Zins werden weniger attraktiv." },
    ]},
  ]},
  { id: "fonds", title: "Fonds & ETFs vertieft", sub: "Auswahl und Aufbau", lessons: [
    { id: "g1", title: "Aktive Fonds oder ETF?", mins: 3, cards: [
      { h: "Mit oder ohne Manager", p: "Aktiv gemanagte Fonds versuchen, durch Auswahl den Markt zu schlagen. ETFs bilden einfach einen Index nach. Dafür sind ETFs deutlich günstiger." },
      { h: "Die Kosten fressen den Vorsprung", p: "Aktive Fonds kosten oft über 1,5 % im Jahr, dazu teils ein Ausgabeaufschlag von bis zu 5 %. Langfristig schlägt die Mehrheit aktiver Fonds ihren Vergleichsindex nach Kosten nicht." },
      { h: "Wann aktiv Sinn ergeben kann", p: "In kleinen oder schwer zugänglichen Märkten kann aktives Management Vorteile bieten. Für den breiten Vermögensaufbau sind günstige ETFs für die meisten die einfachere Wahl." },
    ], qs: [
      { q: "Was versucht ein aktiver Fonds?", a: ["Den Markt durch Auswahl zu schlagen", "Einen Index exakt nachzubilden", "Nur Bargeld zu halten", "Kredite zu vergeben"], c: 0, e: "Fondsmanager wählen gezielt einzelne Werte aus." },
      { q: "Was ist ein Ausgabeaufschlag?", a: ["Eine einmalige Gebühr beim Kauf", "Eine Dividende", "Ein Zins", "Eine Steuererstattung"], c: 0, e: "Bei vielen aktiven Fonds zahlst du beim Kauf einen Aufschlag." },
      { q: "Was zeigen langfristige Vergleiche?", a: ["Die Mehrheit aktiver Fonds schlägt den Index nach Kosten nicht", "Aktive Fonds gewinnen immer", "ETFs verlieren immer", "Es gibt keine Unterschiede"], c: 0, e: "Hohe Kosten sind ein dauerhafter Nachteil." },
    ]},
    { id: "g2", title: "Wie ETFs einen Index nachbilden", mins: 3, cards: [
      { h: "Physische Replikation", p: "Ein physisch replizierender ETF kauft die Aktien des Index tatsächlich, entweder alle oder eine repräsentative Auswahl." },
      { h: "Synthetische Replikation", p: "Ein synthetischer ETF bildet die Wertentwicklung über ein Tauschgeschäft (Swap) mit einer Bank nach. Das ist gesetzlich streng geregelt und kann bei manchen Märkten günstiger sein." },
      { h: "Wie gut trifft er den Index?", p: "Die Tracking Difference zeigt, wie stark ein ETF nach allen Kosten vom Index abweicht. Sie ist oft aussagekräftiger als die TER allein.", f: "Tracking Difference: tatsächliche Abweichung vom Index pro Jahr" },
    ], qs: [
      { q: "Was macht ein physisch replizierender ETF?", a: ["Er kauft die Aktien des Index tatsächlich", "Er nutzt nur Tauschgeschäfte", "Er kauft Gold", "Er hält nur Bargeld"], c: 0, e: "Physisch heißt: Die Wertpapiere liegen wirklich im Fonds." },
      { q: "Womit arbeitet ein synthetischer ETF?", a: ["Mit einem Swap-Geschäft", "Mit Immobilien", "Mit Krypto", "Mit Sparbüchern"], c: 0, e: "Der Swap liefert die Indexrendite." },
      { q: "Was zeigt die Tracking Difference?", a: ["Die tatsächliche Abweichung vom Index", "Den Ausgabeaufschlag", "Die Zahl der Aktien", "Die Dividende"], c: 0, e: "Sie fasst alle Kosten und Effekte zusammen." },
    ]},
    { id: "g3", title: "Einen ETF auswählen", mins: 4, cards: [
      { h: "Erst der Index", p: "Die wichtigste Entscheidung ist der Index: Welche Länder, Unternehmen und Branchen willst du abdecken? Breite Welt-Indizes streuen am stärksten." },
      { h: "Dann die Details", p: "Vergleiche bei ETFs auf denselben Index die Kosten (TER und Tracking Difference), das Fondsvolumen und ob er ausschüttet oder thesauriert. Sehr kleine Fonds werden häufiger geschlossen." },
      { h: "Nicht zu viel Auswahl", p: "Ein oder zwei breite ETFs reichen für viele Anleger. Viele ähnliche ETFs gleichzeitig erhöhen nur den Überblicksaufwand, nicht die Streuung." },
    ], qs: [
      { q: "Was ist die wichtigste Entscheidung bei der ETF-Auswahl?", a: ["Der Index", "Die Farbe des Logos", "Der Name des Anbieters", "Die Uhrzeit des Kaufs"], c: 0, e: "Der Index bestimmt, worin du investierst." },
      { q: "Warum ist das Fondsvolumen wichtig?", a: ["Sehr kleine Fonds werden häufiger geschlossen", "Größere Fonds sind immer teurer", "Es ist unwichtig", "Es bestimmt die Steuer"], c: 0, e: "Ein ausreichendes Volumen spricht für Stabilität." },
      { q: "Wie viele breite ETFs reichen vielen Anlegern?", a: ["Ein oder zwei", "Mindestens 20", "Genau 100", "Keiner"], c: 0, e: "Mehr ETFs auf dasselbe bringen kaum zusätzliche Streuung." },
    ]},
    { id: "g4", title: "Rebalancing", mins: 3, cards: [
      { h: "Die Mischung verschiebt sich", p: "Legst du 70 % in Aktien-ETFs und 30 % in sichere Anlagen an, verschiebt sich das mit der Zeit. Steigen die Aktien stark, sind es vielleicht 80 zu 20, und dein Risiko ist größer als geplant." },
      { h: "Zurück zur Ausgangslage", p: "Beim Rebalancing bringst du die Aufteilung wieder auf dein Ziel, etwa einmal im Jahr. Am einfachsten geht das, indem du neue Sparraten in den Teil lenkst, der zu klein geworden ist." },
      { h: "Steuern beachten", p: "Verkaufen zum Umschichten kann Steuern auslösen. Deshalb ist das Umlenken neuer Einzahlungen oft die günstigere Methode." },
    ], qs: [
      { q: "Was ist Rebalancing?", a: ["Die Aufteilung wieder auf das Ziel bringen", "Alle Anteile verkaufen", "Ein neues Konto eröffnen", "Die Steuer erklären"], c: 0, e: "So bleibt das Risiko so, wie du es geplant hast." },
      { q: "Warum verschiebt sich die Aufteilung mit der Zeit?", a: ["Weil sich Anlagen unterschiedlich entwickeln", "Weil die Bank sie ändert", "Wegen der Schufa", "Das passiert nie"], c: 0, e: "Was stärker steigt, nimmt mehr Raum ein." },
      { q: "Was ist oft die günstigste Methode fürs Rebalancing?", a: ["Neue Sparraten umlenken", "Alles verkaufen", "Einen Kredit aufnehmen", "Gar nichts tun"], c: 0, e: "Ohne Verkäufe fallen keine Steuern an." },
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
    { id: "t5", title: "Was du absetzen kannst", mins: 3, cards: [
      { h: "Homeoffice-Pauschale", p: "Für jeden Tag, an dem du überwiegend zu Hause arbeitest, kannst du 6 € absetzen, höchstens 1.260 € im Jahr. Sie zählt zu den Werbungskosten." },
      { h: "Weitere Werbungskosten", p: "Arbeitsmittel wie Laptop oder Fachbücher, Fortbildungen, Bewerbungskosten und Fahrten zur Arbeit mindern dein zu versteuerndes Einkommen. Belege aufheben lohnt sich." },
      { h: "Sonderausgaben und Co.", p: "Auch Spenden, Kirchensteuer, Beiträge zur Kranken- und Rentenversicherung und Handwerkerleistungen im Haushalt wirken steuermindernd.", f: "Homeoffice: 6 € pro Tag, maximal 1.260 € im Jahr" },
    ], qs: [
      { q: "Wie viel bringt die Homeoffice-Pauschale pro Tag?", a: ["1 €", "6 €", "20 €", "50 €"], c: 1, e: "6 € pro Homeoffice-Tag, bis zu 1.260 € im Jahr." },
      { q: "Was gehört typischerweise zu den Werbungskosten?", a: ["Arbeitsmittel und Fortbildungen", "Urlaubsreisen", "Lebensmittel", "Kinokarten"], c: 0, e: "Werbungskosten hängen mit dem Beruf zusammen." },
      { q: "Was solltest du für die Steuererklärung aufheben?", a: ["Belege für absetzbare Ausgaben", "Nur Kassenzettel vom Supermarkt", "Gar nichts", "Nur Werbeprospekte"], c: 0, e: "Ohne Nachweis kann das Finanzamt Ausgaben ablehnen." },
    ]},
    { id: "t6", title: "Steuererklärung Schritt für Schritt", mins: 4, cards: [
      { h: "Online mit ELSTER", p: "Die Steuererklärung kannst du kostenlos über das Portal ELSTER der Finanzverwaltung machen. Viele Daten wie Lohn und Versicherungsbeiträge sind dort schon vorausgefüllt abrufbar." },
      { h: "Fristen", p: "Wer zur Abgabe verpflichtet ist, muss die Erklärung in der Regel bis zum 31. Juli des Folgejahres abgeben, mit Steuerberatung später. Wer freiwillig abgibt, hat vier Jahre Zeit." },
      { h: "Hilfe holen", p: "Lohnsteuerhilfevereine helfen Arbeitnehmern gegen einen Jahresbeitrag. Auch Steuer-Apps führen Schritt für Schritt durch die Erklärung.", f: "Pflichtabgabe: 31. Juli des Folgejahres" },
    ], qs: [
      { q: "Wie heißt das kostenlose Steuerportal der Finanzverwaltung?", a: ["ELSTER", "SCHUFA", "BAFIN", "DATEV"], c: 0, e: "ELSTER ist das offizielle Online-Portal." },
      { q: "Bis wann musst du eine Pflicht-Steuererklärung ohne Berater abgeben?", a: ["31. März", "31. Juli des Folgejahres", "31. Dezember", "Nie"], c: 1, e: "Die reguläre Frist endet am 31. Juli des Folgejahres." },
      { q: "Wer hilft Arbeitnehmern günstig bei der Steuererklärung?", a: ["Lohnsteuerhilfevereine", "Inkassobüros", "Die Polizei", "Die Schufa"], c: 0, e: "Lohnsteuerhilfevereine beraten Mitglieder gegen einen Jahresbeitrag." },
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
    { id: "v5", title: "Riester und Rürup kurz erklärt", mins: 3, cards: [
      { h: "Riester-Rente", p: "Bei der Riester-Rente bekommst du staatliche Zulagen, derzeit 175 € Grundzulage im Jahr und Kinderzulagen, wenn du mindestens 4 % deines Vorjahreseinkommens einzahlst. Viele Verträge sind aber teuer und unflexibel." },
      { h: "Rürup-Rente", p: "Die Rürup- oder Basisrente ist vor allem für Selbstständige und Gutverdiener interessant. Beiträge sind steuerlich absetzbar, das Geld ist aber bis zur Rente gebunden und nicht vererbbar." },
      { h: "Reformen beachten", p: "Die staatlich geförderte Altersvorsorge wird regelmäßig reformiert. Prüfe vor einem Abschluss den aktuellen Stand und vergleiche die Kosten mit einem eigenen ETF-Sparplan." },
    ], qs: [
      { q: "Was bekommst du bei der Riester-Rente vom Staat?", a: ["Zulagen", "Einen Kredit", "Ein Haus", "Nichts"], c: 0, e: "Riester-Sparer erhalten Grund- und Kinderzulagen." },
      { q: "Für wen ist die Rürup-Rente vor allem interessant?", a: ["Selbstständige und Gutverdiener", "Schulkinder", "Rentner", "Niemanden"], c: 0, e: "Die steuerliche Absetzbarkeit lohnt sich besonders bei hohem Steuersatz." },
      { q: "Was gilt für die Rürup-Rente?", a: ["Das Geld ist bis zur Rente gebunden", "Man kann jederzeit alles abheben", "Sie ist steuerfrei vererbbar", "Sie zahlt sofort aus"], c: 0, e: "Basisrenten sind nicht kündbar und nicht vererbbar." },
    ]},
    { id: "v6", title: "Geld im Ruhestand entnehmen", mins: 3, cards: [
      { h: "Vom Sparen zum Entnehmen", p: "Im Ruhestand dreht sich alles um: Statt einzuzahlen, entnimmst du Geld aus deinem Vermögen. Ein Entnahmeplan verkauft regelmäßig Anteile und zahlt dir eine monatliche Summe aus." },
      { h: "Die 4-Prozent-Faustregel", p: "Eine bekannte Faustregel aus US-Studien besagt: Wer im ersten Jahr 4 % seines Depots entnimmt und den Betrag dann mit der Inflation anpasst, kam in der Vergangenheit meist 30 Jahre aus. Eine Garantie ist das nicht.", f: "Depot 300.000 € × 4 % = 12.000 € im Jahr, also 1.000 € im Monat" },
      { h: "Puffer für schlechte Jahre", p: "Viele halten im Ruhestand ein bis zwei Jahre Entnahmen auf dem Tagesgeld. So müssen sie in einem Börsencrash nicht zu niedrigen Kursen verkaufen." },
    ], qs: [
      { q: "Was macht ein Entnahmeplan?", a: ["Er verkauft regelmäßig Anteile und zahlt Geld aus", "Er kauft jeden Monat neue Anteile", "Er schließt das Depot", "Er zahlt Steuern zurück"], c: 0, e: "Ein Entnahmeplan ist das Gegenstück zum Sparplan." },
      { q: "Was besagt die 4-Prozent-Faustregel?", a: ["Im ersten Jahr 4 % entnehmen, dann mit Inflation anpassen", "Jedes Jahr 40 % entnehmen", "Nur 4 € pro Monat entnehmen", "Es ist eine garantierte Rente"], c: 0, e: "Sie beruht auf historischen Daten und ist keine Garantie." },
      { q: "Wozu dient ein Tagesgeld-Puffer im Ruhestand?", a: ["Um in Krisen nicht billig verkaufen zu müssen", "Um mehr Steuern zu zahlen", "Um Kredite zu bekommen", "Er ist unnötig"], c: 0, e: "Der Puffer überbrückt schlechte Börsenjahre." },
    ]},
  ]},
  { id: "versich", title: "Versicherungen kompakt", sub: "Was du wirklich brauchst", lessons: [
    { id: "y1", title: "Gesetzlich oder privat krankenversichert?", mins: 3, cards: [
      { h: "Die gesetzliche Krankenversicherung", p: "Die meisten Menschen in Deutschland sind gesetzlich versichert. Der Beitrag richtet sich nach dem Einkommen. Kinder und Ehepartner ohne eigenes Einkommen sind oft kostenlos mitversichert." },
      { h: "Die private Krankenversicherung", p: "Privat versichern können sich vor allem Selbstständige, Beamte und Angestellte mit Einkommen über einer bestimmten Grenze. Der Beitrag hängt von Alter und Gesundheit ab, nicht vom Einkommen." },
      { h: "Langfristig denken", p: "Private Beiträge können im Alter stark steigen, und eine Rückkehr in die gesetzliche Kasse ist oft schwer. Die Entscheidung sollte gut überlegt sein." },
    ], qs: [
      { q: "Wonach richtet sich der Beitrag der gesetzlichen Krankenversicherung?", a: ["Nach dem Einkommen", "Nach dem Alter", "Nach der Haarfarbe", "Nach dem Wohnort"], c: 0, e: "Gesetzlich Versicherte zahlen einen Prozentsatz ihres Einkommens." },
      { q: "Wer kann typischerweise in die private Krankenversicherung?", a: ["Selbstständige, Beamte und Gutverdiener", "Alle Schüler", "Nur Rentner", "Niemand"], c: 0, e: "Für Angestellte gilt eine Einkommensgrenze." },
      { q: "Was ist ein Risiko der privaten Krankenversicherung?", a: ["Beiträge können im Alter stark steigen", "Sie ist immer kostenlos", "Sie zahlt nie", "Sie ist verboten"], c: 0, e: "Die Rückkehr in die gesetzliche Kasse ist oft eingeschränkt." },
    ]},
    { id: "y2", title: "Haftpflicht und Hausrat", mins: 3, cards: [
      { h: "Die Privathaftpflicht", p: "Sie zahlt, wenn du anderen versehentlich einen Schaden zufügst, etwa wenn du das Handy eines Freundes fallen lässt oder einen Unfall mit dem Fahrrad verursachst. Achte auf eine Deckungssumme von mehreren Millionen Euro." },
      { h: "Die Hausratversicherung", p: "Sie ersetzt deine eigenen Sachen in der Wohnung bei Feuer, Leitungswasser, Sturm oder Einbruch. Sie lohnt sich vor allem, wenn du viele wertvolle Dinge hast." },
      { h: "Unterversicherung vermeiden", p: "Ist die Versicherungssumme in der Hausrat zu niedrig, zahlt die Versicherung im Schaden nur anteilig. Viele Tarife bieten einen Verzicht darauf, wenn du eine Pauschale pro Quadratmeter wählst." },
    ], qs: [
      { q: "Wann zahlt die Privathaftpflicht?", a: ["Wenn du anderen einen Schaden zufügst", "Wenn dein eigenes Handy kaputtgeht", "Bei Krankheit", "Bei Arbeitslosigkeit"], c: 0, e: "Sie schützt dich vor Forderungen anderer." },
      { q: "Was ersetzt die Hausratversicherung?", a: ["Deine Sachen in der Wohnung bei Feuer, Wasser, Sturm oder Einbruch", "Schäden an fremden Autos", "Arztkosten", "Mietschulden"], c: 0, e: "Sie deckt deinen eigenen Hausrat ab." },
      { q: "Was passiert bei Unterversicherung?", a: ["Die Versicherung zahlt nur anteilig", "Du bekommst mehr Geld", "Der Vertrag endet sofort", "Nichts"], c: 0, e: "Eine zu niedrige Versicherungssumme kürzt die Leistung." },
    ]},
    { id: "y3", title: "Die Kfz-Versicherung", mins: 3, cards: [
      { h: "Haftpflicht ist Pflicht", p: "Jedes zugelassene Auto braucht eine Kfz-Haftpflichtversicherung. Sie zahlt Schäden, die du mit dem Auto anderen zufügst." },
      { h: "Teilkasko und Vollkasko", p: "Die Teilkasko zahlt zum Beispiel bei Diebstahl, Glasbruch oder Sturm. Die Vollkasko zahlt zusätzlich Schäden am eigenen Auto, die du selbst verursacht hast. Für neue oder teure Autos ist sie oft sinnvoll." },
      { h: "Die Schadenfreiheitsklasse", p: "Je länger du unfallfrei fährst, desto höher deine Schadenfreiheitsklasse und desto niedriger der Beitrag. Kleine Schäden selbst zu zahlen kann sich deshalb lohnen." },
    ], qs: [
      { q: "Welche Kfz-Versicherung ist Pflicht?", a: ["Die Kfz-Haftpflicht", "Die Vollkasko", "Die Teilkasko", "Keine"], c: 0, e: "Ohne Haftpflicht darf kein Auto zugelassen werden." },
      { q: "Was zahlt die Vollkasko zusätzlich?", a: ["Selbst verursachte Schäden am eigenen Auto", "Strafzettel", "Benzin", "Die Kfz-Steuer"], c: 0, e: "Die Vollkasko deckt auch eigene Unfallschäden." },
      { q: "Wie sinkt der Beitrag mit der Zeit?", a: ["Durch unfallfreies Fahren (Schadenfreiheitsklasse)", "Durch schnelleres Fahren", "Durch mehr Unfälle", "Gar nicht"], c: 0, e: "Jedes schadenfreie Jahr verbessert die Einstufung." },
    ]},
    { id: "y4", title: "Versichert auf Reisen", mins: 3, cards: [
      { h: "Auslandskrankenversicherung", p: "Außerhalb der EU zahlt die gesetzliche Krankenkasse meist nicht, und auch in der EU deckt sie nicht alles. Ein Rücktransport kann Zehntausende Euro kosten. Eine Auslandsreisekrankenversicherung kostet oft nur wenige Euro im Jahr." },
      { h: "Reiserücktritt", p: "Eine Reiserücktrittsversicherung zahlt, wenn du eine teure Reise zum Beispiel wegen Krankheit nicht antreten kannst. Sie lohnt sich eher bei hohen Reisekosten." },
      { h: "Was oft unnötig ist", p: "Reisegepäckversicherungen haben viele Ausnahmen und decken Wertsachen oft nur eingeschränkt ab. Prüfe, was deine Hausrat schon unterwegs abdeckt.", f: "Wichtigste Reiseversicherung: Auslandskranken" },
    ], qs: [
      { q: "Welche Reiseversicherung gilt als besonders wichtig?", a: ["Die Auslandsreisekrankenversicherung", "Die Reisegepäckversicherung", "Die Sonnenbrillenversicherung", "Keine"], c: 0, e: "Krankheitskosten im Ausland können sehr hoch werden." },
      { q: "Wann lohnt sich eine Reiserücktrittsversicherung eher?", a: ["Bei teuren Reisen", "Bei Tagesausflügen", "Nie", "Nur bei Zugfahrten"], c: 0, e: "Je höher die Stornokosten, desto eher lohnt sie sich." },
      { q: "Was gilt oft für Reisegepäckversicherungen?", a: ["Viele Ausnahmen, oft wenig sinnvoll", "Sie sind Pflicht", "Sie zahlen alles", "Sie sind kostenlos"], c: 0, e: "Der Schutz ist häufig eingeschränkt." },
    ]},
  ]},
  { id: "studium", title: "Ausbildung & Studium", sub: "Geld in der Startphase", lessons: [
    { id: "u1", title: "BAföG", mins: 3, cards: [
      { h: "Unterstützung vom Staat", p: "BAföG unterstützt Studierende und Schüler bestimmter Schulen, wenn das eigene Einkommen und das der Eltern nicht reicht. Wie viel du bekommst, hängt von deiner Situation ab." },
      { h: "Halb geschenkt", p: "Beim Studium ist das BAföG zur Hälfte ein Zuschuss und zur Hälfte ein zinsloses Darlehen. Die Rückzahlung ist nach oben begrenzt und beginnt erst einige Jahre nach Ende der Förderung." },
      { h: "Einfach beantragen", p: "Viele verzichten auf einen Antrag, weil sie glauben, keinen Anspruch zu haben. Der Antrag geht online, und eine Prüfung kostet nichts. Rückwirkend gibt es BAföG nur für den Monat der Antragstellung." },
    ], qs: [
      { q: "Wie ist das Studien-BAföG aufgeteilt?", a: ["Halb Zuschuss, halb zinsloses Darlehen", "Komplett Kredit mit Zinsen", "Komplett geschenkt", "Nur Gutscheine"], c: 0, e: "Nur die Hälfte muss später zurückgezahlt werden." },
      { q: "Was gilt für die Rückzahlung des BAföG-Darlehens?", a: ["Sie ist nach oben begrenzt", "Sie ist unbegrenzt", "Sie beginnt sofort", "Sie enthält hohe Zinsen"], c: 0, e: "Die Rückzahlungssumme ist gedeckelt." },
      { q: "Warum solltest du den Antrag früh stellen?", a: ["BAföG gibt es frühestens ab dem Antragsmonat", "Er wird sonst teurer", "Nur die ersten 10 bekommen etwas", "Es ist egal"], c: 0, e: "Für Monate vor dem Antrag gibt es kein Geld." },
    ]},
    { id: "u2", title: "Kindergeld und Unterhalt", mins: 3, cards: [
      { h: "Kindergeld bis 25", p: "Kindergeld gibt es grundsätzlich bis 18. Während einer Ausbildung oder eines Studiums kann es bis zum 25. Geburtstag weiterlaufen. Es wird an die Eltern gezahlt." },
      { h: "Unterhalt von den Eltern", p: "Eltern sind verpflichtet, ihren Kindern eine erste Ausbildung zu finanzieren. Das Kindergeld wird dabei angerechnet. Wie viel Unterhalt angemessen ist, regeln Tabellen wie die Düsseldorfer Tabelle." },
      { h: "Das Gespräch suchen", p: "Viele Familien sprechen ungern über Geld. Kläre früh, wer was bezahlt, ob du das Kindergeld bekommst und was du selbst beitragen kannst." },
    ], qs: [
      { q: "Bis zu welchem Alter kann Kindergeld während einer Ausbildung gezahlt werden?", a: ["18", "21", "25", "30"], c: 2, e: "In Ausbildung oder Studium ist es bis zum 25. Geburtstag möglich." },
      { q: "Was müssen Eltern in der Regel finanzieren?", a: ["Eine erste Ausbildung", "Jedes Hobby", "Ein Auto", "Nichts"], c: 0, e: "Die Unterhaltspflicht umfasst eine angemessene erste Ausbildung." },
      { q: "Woran orientiert sich die Höhe des Unterhalts oft?", a: ["An der Düsseldorfer Tabelle", "Am DAX", "Am Leitzins", "Am Wetter"], c: 0, e: "Die Düsseldorfer Tabelle ist die gängige Richtlinie." },
    ]},
    { id: "u3", title: "Geld in der Ausbildung", mins: 3, cards: [
      { h: "Die Ausbildungsvergütung", p: "Azubis bekommen eine Vergütung, die mit jedem Ausbildungsjahr steigt. Für Ausbildungen ohne Tarifvertrag gilt eine gesetzliche Mindestvergütung." },
      { h: "Zusätzliche Hilfe", p: "Wohnst du wegen der Ausbildung nicht mehr bei den Eltern, kann die Berufsausbildungsbeihilfe der Arbeitsagentur helfen. Auch Wohngeld kann in Frage kommen." },
      { h: "Früh anfangen", p: "Auch mit einem Azubi-Gehalt lohnt sich ein kleiner Sparplan. Und frag nach vermögenswirksamen Leistungen, die stehen auch Azubis oft zu." },
    ], qs: [
      { q: "Was gilt für Ausbildungen ohne Tarifvertrag?", a: ["Eine gesetzliche Mindestvergütung", "Gar keine Bezahlung", "Nur Trinkgeld", "Die Eltern zahlen alles"], c: 0, e: "Die Mindestvergütung sichert ein Grundeinkommen." },
      { q: "Welche Hilfe gibt es, wenn du für die Ausbildung ausziehst?", a: ["Berufsausbildungsbeihilfe", "BAföG für Rentner", "Kindergeld für Haustiere", "Keine"], c: 0, e: "Die Arbeitsagentur zahlt unter Bedingungen Berufsausbildungsbeihilfe." },
      { q: "Stehen auch Azubis vermögenswirksame Leistungen zu?", a: ["Oft ja, je nach Vertrag", "Nie", "Nur ab 50", "Nur Beamten"], c: 0, e: "Viele Tarifverträge sehen VL auch für Azubis vor." },
    ]},
    { id: "u4", title: "WG, Rundfunkbeitrag & Studentenrabatte", mins: 3, cards: [
      { h: "Günstig wohnen", p: "WG-Zimmer und Wohnheime sind oft deutlich günstiger als eine eigene Wohnung. Kläre in der WG, wie Nebenkosten, Internet und Einkäufe geteilt werden." },
      { h: "Rundfunkbeitrag", p: "Pro Wohnung wird ein Rundfunkbeitrag fällig, in einer WG also nur einmal. Wer BAföG oder bestimmte Sozialleistungen bekommt, kann sich befreien lassen." },
      { h: "Rabatte nutzen", p: "Mit Studierenden- oder Azubi-Ausweis gibt es Rabatte bei Software, Abos, Museen, Bahn und Konten. Das spart über das Jahr schnell einen dreistelligen Betrag." },
    ], qs: [
      { q: "Wie oft zahlt eine WG den Rundfunkbeitrag?", a: ["Einmal pro Wohnung", "Einmal pro Person", "Gar nicht", "Einmal pro Zimmer"], c: 0, e: "Der Beitrag gilt pro Wohnung." },
      { q: "Wer kann sich vom Rundfunkbeitrag befreien lassen?", a: ["Zum Beispiel BAföG-Empfänger", "Alle unter 30", "Alle mit Handy", "Niemand"], c: 0, e: "Bestimmte Sozialleistungen berechtigen zur Befreiung." },
      { q: "Was sollte in einer WG geklärt werden?", a: ["Wie Nebenkosten und Einkäufe geteilt werden", "Wer die Steuer der anderen zahlt", "Nichts", "Wer die Schufa führt"], c: 0, e: "Klare Absprachen vermeiden Streit ums Geld." },
    ]},
  ]},
  { id: "selbst", title: "Nebenjob & Selbstständigkeit", sub: "Eigenes Geld verdienen", lessons: [
    { id: "n1", title: "Gewerbe oder Freiberuf?", mins: 3, cards: [
      { h: "Zwei Wege", p: "Wer selbstständig arbeitet, ist entweder Gewerbetreibender oder Freiberufler. Freie Berufe sind zum Beispiel Ärztinnen, Journalisten, Designerinnen oder Programmierer mit bestimmten Tätigkeiten. Fast alles andere ist ein Gewerbe." },
      { h: "Anmelden", p: "Ein Gewerbe meldest du beim Gewerbeamt deiner Stadt an. Freiberufler melden sich direkt beim Finanzamt. In beiden Fällen schickt dir das Finanzamt einen Fragebogen zur steuerlichen Erfassung." },
      { h: "Auch nebenbei", p: "Das gilt auch für kleine Nebenjobs, etwa regelmäßige Verkäufe selbstgemachter Produkte oder bezahlte Social-Media-Kooperationen. Minderjährige brauchen dafür die Zustimmung der Eltern und des Familiengerichts." },
    ], qs: [
      { q: "Wo meldest du ein Gewerbe an?", a: ["Beim Gewerbeamt", "Bei der Schufa", "Bei der Polizei", "Bei der Bank"], c: 0, e: "Die Gewerbeanmeldung erfolgt bei der Stadt oder Gemeinde." },
      { q: "Wo melden sich Freiberufler an?", a: ["Direkt beim Finanzamt", "Beim Gewerbeamt", "Beim Arbeitsamt", "Nirgends"], c: 0, e: "Freiberufler brauchen keine Gewerbeanmeldung." },
      { q: "Was brauchen Minderjährige für eine Selbstständigkeit?", a: ["Zustimmung der Eltern und des Familiengerichts", "Nichts", "Einen Kredit", "Ein Auto"], c: 0, e: "Beides ist rechtlich erforderlich." },
    ]},
    { id: "n2", title: "Die Kleinunternehmerregelung", mins: 3, cards: [
      { h: "Ohne Umsatzsteuer starten", p: "Kleine Unternehmen können sich von der Umsatzsteuer befreien lassen. Dann schreibst du keine Umsatzsteuer auf Rechnungen und musst keine Umsatzsteuer-Voranmeldungen abgeben." },
      { h: "Die Grenzen", p: "Seit 2025 gilt: Der Umsatz im Vorjahr darf höchstens 25.000 € betragen, im laufenden Jahr höchstens 100.000 €. Wird die zweite Grenze überschritten, endet die Befreiung sofort.", f: "Vorjahr ≤ 25.000 € · laufendes Jahr ≤ 100.000 €" },
      { h: "Einkommensteuer bleibt", p: "Die Kleinunternehmerregelung betrifft nur die Umsatzsteuer. Auf deinen Gewinn zahlst du trotzdem Einkommensteuer, wenn dein Gesamteinkommen über dem Grundfreibetrag liegt." },
    ], qs: [
      { q: "Wovon befreit die Kleinunternehmerregelung?", a: ["Von der Umsatzsteuer", "Von der Einkommensteuer", "Von allen Steuern", "Von der Krankenversicherung"], c: 0, e: "Sie betrifft ausschließlich die Umsatzsteuer." },
      { q: "Wie hoch darf der Vorjahresumsatz seit 2025 höchstens sein?", a: ["10.000 €", "25.000 €", "50.000 €", "250.000 €"], c: 1, e: "Die Grenze für das Vorjahr liegt bei 25.000 €." },
      { q: "Zahlen Kleinunternehmer Einkommensteuer?", a: ["Ja, auf ihren Gewinn, wenn das Einkommen hoch genug ist", "Nie", "Nur im ersten Jahr", "Nur Rentner"], c: 0, e: "Die Einkommensteuer gilt unabhängig von der Regelung." },
    ]},
    { id: "n3", title: "Rücklagen für die Steuer", mins: 3, cards: [
      { h: "Brutto ist nicht netto", p: "Als Selbstständiger zieht dir niemand die Steuer vom Honorar ab. Das ganze Geld landet auf dem Konto, ein Teil davon gehört aber dem Finanzamt." },
      { h: "Eine Faustregel", p: "Viele legen 25 bis 35 % ihres Gewinns direkt auf ein separates Steuerkonto. So bist du vorbereitet, wenn der Steuerbescheid oder Vorauszahlungen kommen." },
      { h: "Belege von Anfang an", p: "Sammle Rechnungen und Belege für Einnahmen und Ausgaben ordentlich, am besten digital. Betriebsausgaben mindern deinen Gewinn und damit die Steuer.", f: "Steuerkonto: 25 bis 35 % vom Gewinn zurücklegen" },
    ], qs: [
      { q: "Warum brauchen Selbstständige eine Steuerrücklage?", a: ["Weil niemand die Steuer vorher abzieht", "Weil sie keine Steuern zahlen", "Für Urlaub", "Für Kredite"], c: 0, e: "Die Steuer wird später fällig und muss bezahlt werden können." },
      { q: "Wie viel des Gewinns legen viele als Steuerrücklage zurück?", a: ["5 %", "25 bis 35 %", "90 %", "Nichts"], c: 1, e: "Diese Faustregel deckt die Steuer in den meisten Fällen." },
      { q: "Was mindert den steuerpflichtigen Gewinn?", a: ["Betriebsausgaben", "Private Urlaube", "Geschenke an Freunde", "Nichts"], c: 0, e: "Ausgaben für das Geschäft senken den Gewinn." },
    ]},
    { id: "n4", title: "Absicherung für Selbstständige", mins: 3, cards: [
      { h: "Selbst kümmern", p: "Selbstständige sind meist nicht automatisch rentenversichert und zahlen ihre Krankenversicherung komplett selbst. Einen Arbeitgeberanteil gibt es nicht." },
      { h: "Krankenversicherung", p: "Eine Krankenversicherung ist Pflicht, gesetzlich freiwillig oder privat. Der Beitrag kann einen großen Teil des Einkommens ausmachen und muss eingeplant werden." },
      { h: "Altersvorsorge und Einkommensausfall", p: "Ohne eigene Vorsorge droht im Alter eine kleine Rente. Viele kombinieren ETF-Sparpläne, Rürup-Rente oder freiwillige Rentenbeiträge. Auch Krankentagegeld und Berufsunfähigkeitsschutz sind wichtig." },
    ], qs: [
      { q: "Wer zahlt die Krankenversicherung von Selbstständigen?", a: ["Sie selbst, komplett", "Der Arbeitgeber zur Hälfte", "Der Staat", "Niemand"], c: 0, e: "Es gibt keinen Arbeitgeberanteil." },
      { q: "Sind die meisten Selbstständigen automatisch rentenversichert?", a: ["Nein, sie müssen selbst vorsorgen", "Ja, immer", "Nur im Sommer", "Nur mit Kredit"], c: 0, e: "Die meisten müssen sich um ihre Altersvorsorge selbst kümmern." },
      { q: "Was ersetzt Einkommen bei längerer Krankheit?", a: ["Krankentagegeld", "Kindergeld", "Wohngeld", "Nichts"], c: 0, e: "Krankentagegeld zahlt bei Arbeitsunfähigkeit." },
    ]},
  ]},
  { id: "familie", title: "Familie & Lebensphasen", sub: "Geld gemeinsam planen", lessons: [
    { id: "h1", title: "Finanzen als Paar", mins: 3, cards: [
      { h: "Offen reden", p: "Geld ist einer der häufigsten Streitpunkte in Beziehungen. Sprecht früh über Einkommen, Schulden, Sparziele und Ausgabegewohnheiten." },
      { h: "Das Drei-Konten-Modell", p: "Viele Paare haben ein gemeinsames Konto für Miete und Haushalt und jeweils ein eigenes Konto für persönliche Ausgaben. Jeder zahlt einen festgelegten Betrag oder einen Anteil seines Einkommens ein." },
      { h: "Fair statt gleich", p: "Verdienen beide unterschiedlich viel, kann eine Aufteilung nach Einkommen fairer sein als 50:50. Wichtig ist, dass beide damit zufrieden sind und eigenes Geld zur freien Verfügung haben." },
    ], qs: [
      { q: "Was ist das Drei-Konten-Modell?", a: ["Ein gemeinsames Konto plus je ein eigenes", "Drei Kredite", "Drei Sparbücher für Kinder", "Drei Depots"], c: 0, e: "Gemeinsame Kosten und persönliche Freiheit werden getrennt." },
      { q: "Was kann bei unterschiedlichen Einkommen fair sein?", a: ["Eine Aufteilung nach Einkommen", "Immer genau 50:50", "Einer zahlt alles", "Gar keine Absprache"], c: 0, e: "Ein Anteil am Einkommen belastet beide ähnlich stark." },
      { q: "Wann sollten Paare über Geld sprechen?", a: ["Früh und offen", "Nie", "Erst bei Streit", "Nur bei Heirat"], c: 0, e: "Frühe Gespräche vermeiden Missverständnisse." },
    ]},
    { id: "h2", title: "Geld rund ums Kind", mins: 3, cards: [
      { h: "Elterngeld", p: "Nach der Geburt ersetzt das Elterngeld einen Teil des wegfallenden Einkommens, meist 65 bis 67 % des Nettoeinkommens, mindestens 300 € und höchstens 1.800 € im Monat." },
      { h: "Kindergeld", p: "Für jedes Kind gibt es Kindergeld, das bei der Familienkasse beantragt wird. Bei höherem Einkommen prüft das Finanzamt automatisch, ob stattdessen der Kinderfreibetrag günstiger ist." },
      { h: "Für das Kind sparen", p: "Ein Sparplan auf den Namen des Kindes oder der Eltern kann früh starten. Auf den Namen des Kindes gehört das Geld rechtlich dem Kind, und es kann ab 18 frei darüber verfügen.", f: "Elterngeld: 65 bis 67 % des Nettos, 300 bis 1.800 € im Monat" },
    ], qs: [
      { q: "Wie viel Elterngeld gibt es höchstens im Monat?", a: ["300 €", "1.000 €", "1.800 €", "5.000 €"], c: 2, e: "Das Basiselterngeld ist auf 1.800 € im Monat begrenzt." },
      { q: "Wo wird Kindergeld beantragt?", a: ["Bei der Familienkasse", "Beim Gewerbeamt", "Bei der Schufa", "Bei der Bank"], c: 0, e: "Die Familienkasse der Bundesagentur für Arbeit ist zuständig." },
      { q: "Wem gehört Geld auf einem Sparplan im Namen des Kindes?", a: ["Dem Kind", "Den Großeltern", "Der Bank", "Dem Staat"], c: 0, e: "Ab 18 darf das Kind selbst darüber entscheiden." },
    ]},
    { id: "h3", title: "Erben und Testament", mins: 3, cards: [
      { h: "Gesetzliche Erbfolge", p: "Gibt es kein Testament, regelt das Gesetz, wer erbt: zuerst Ehepartner und Kinder, dann Eltern und Geschwister. Unverheiratete Partner erben ohne Testament nichts." },
      { h: "Freibeträge bei der Erbschaftsteuer", p: "Ehepartner können 500.000 € und Kinder 400.000 € steuerfrei erben, Enkel 200.000 €. Für andere Erben sind die Freibeträge deutlich niedriger." },
      { h: "Selbst bestimmen", p: "Mit einem Testament legst du fest, wer was bekommt. Ein handschriftliches Testament muss komplett von Hand geschrieben und unterschrieben sein. Ein notarielles Testament ist sicherer, kostet aber Gebühren.", f: "Freibeträge: Ehepartner 500.000 € · Kinder 400.000 € · Enkel 200.000 €" },
    ], qs: [
      { q: "Erben unverheiratete Partner ohne Testament?", a: ["Nein", "Ja, alles", "Ja, die Hälfte", "Nur das Auto"], c: 0, e: "Ohne Testament gehen unverheiratete Partner leer aus." },
      { q: "Wie hoch ist der Erbschaftsteuer-Freibetrag für Kinder?", a: ["20.000 €", "100.000 €", "400.000 €", "1 Million €"], c: 2, e: "Jedes Kind kann pro Elternteil 400.000 € steuerfrei erben." },
      { q: "Was gilt für ein handschriftliches Testament?", a: ["Komplett von Hand geschrieben und unterschrieben", "Am Computer getippt reicht", "Eine Sprachnachricht reicht", "Es ist ungültig"], c: 0, e: "Nur ein eigenhändig geschriebenes und unterschriebenes Testament ist gültig." },
    ]},
    { id: "h4", title: "Vollmachten und Notfallordner", mins: 3, cards: [
      { h: "Wenn du nicht entscheiden kannst", p: "Nach einem Unfall oder bei schwerer Krankheit dürfen selbst Ehepartner oder Eltern volljähriger Kinder nicht automatisch alles für dich regeln. Dafür braucht es Vollmachten." },
      { h: "Vorsorgevollmacht und Patientenverfügung", p: "Mit einer Vorsorgevollmacht bestimmst du, wer für dich handeln darf, etwa bei Bank und Behörden. In einer Patientenverfügung legst du fest, welche medizinischen Behandlungen du willst und welche nicht." },
      { h: "Der Notfallordner", p: "Sammle wichtige Unterlagen an einem Ort: Konten, Versicherungen, Verträge, Passwörter-Hinweise und Vollmachten. Sag einer Vertrauensperson, wo er liegt." },
    ], qs: [
      { q: "Dürfen Eltern automatisch für ihr volljähriges Kind entscheiden?", a: ["Nein, dafür braucht es eine Vollmacht", "Ja, immer", "Nur bei Geldfragen", "Nur am Wochenende"], c: 0, e: "Volljährige brauchen eine Vollmacht, damit andere für sie handeln dürfen." },
      { q: "Was regelt eine Patientenverfügung?", a: ["Gewünschte und abgelehnte medizinische Behandlungen", "Das Erbe", "Die Steuer", "Den Mietvertrag"], c: 0, e: "Sie hilft Ärzten und Angehörigen, deinen Willen umzusetzen." },
      { q: "Was gehört in einen Notfallordner?", a: ["Wichtige Unterlagen zu Konten, Versicherungen und Vollmachten", "Nur Fotos", "Werbeprospekte", "Nichts"], c: 0, e: "So finden Angehörige im Ernstfall alles Wichtige." },
    ]},
  ]},
  { id: "immo", title: "Wohnen & Immobilien", sub: "Mieten, kaufen, vermieten", lessons: [
    { id: "r1", title: "Wohngeld", mins: 3, cards: [
      { h: "Zuschuss zur Miete", p: "Wohngeld ist ein staatlicher Zuschuss zu den Wohnkosten für Haushalte mit geringem Einkommen. Auch Eigentümer können einen Zuschuss zu ihrer Belastung bekommen." },
      { h: "Wer Anspruch hat", p: "Ob und wie viel Wohngeld du bekommst, hängt von Haushaltsgröße, Einkommen, Miete und Wohnort ab. Viele Berechtigte stellen nie einen Antrag." },
      { h: "Beantragen", p: "Der Antrag geht an die Wohngeldstelle deiner Stadt oder Gemeinde. Online-Rechner geben eine erste Einschätzung. Wohngeld wird ab dem Antragsmonat gezahlt." },
    ], qs: [
      { q: "Was ist Wohngeld?", a: ["Ein staatlicher Zuschuss zu den Wohnkosten", "Ein Kredit für Häuser", "Eine Steuer auf Mieten", "Eine Versicherung"], c: 0, e: "Wohngeld entlastet Haushalte mit geringem Einkommen." },
      { q: "Wo beantragst du Wohngeld?", a: ["Bei der Wohngeldstelle der Stadt oder Gemeinde", "Beim Vermieter", "Bei der Schufa", "Beim Finanzamt"], c: 0, e: "Zuständig ist die örtliche Wohngeldstelle." },
      { q: "Ab wann wird Wohngeld gezahlt?", a: ["Ab dem Antragsmonat", "Rückwirkend für 10 Jahre", "Erst nach einem Jahr", "Nie"], c: 0, e: "Ein früher Antrag sichert die Leistung." },
    ]},
    { id: "r2", title: "Eigentumswohnung: laufende Kosten", mins: 3, cards: [
      { h: "Das Hausgeld", p: "Wer eine Eigentumswohnung besitzt, zahlt monatlich Hausgeld an die Eigentümergemeinschaft. Davon werden Verwaltung, Hausmeister, Versicherungen und Rücklagen bezahlt." },
      { h: "Instandhaltung", p: "Dach, Heizung und Fenster müssen irgendwann erneuert werden. Eine verbreitete Faustregel: Plane jedes Jahr rund 1 % des Kaufpreises für Instandhaltung ein." },
      { h: "Gemeinsam entscheiden", p: "Über größere Maßnahmen entscheidet die Eigentümerversammlung. Eine hohe Rücklage der Gemeinschaft ist ein gutes Zeichen, eine niedrige kann teure Sonderumlagen bedeuten.", f: "Instandhaltung: rund 1 % des Kaufpreises pro Jahr einplanen" },
    ], qs: [
      { q: "Wofür wird das Hausgeld verwendet?", a: ["Verwaltung, Hausmeister, Versicherungen und Rücklagen", "Für die Grunderwerbsteuer", "Für den Urlaub", "Für die Kfz-Steuer"], c: 0, e: "Das Hausgeld deckt gemeinschaftliche Kosten." },
      { q: "Wie viel sollte man jährlich für Instandhaltung einplanen?", a: ["Rund 1 % des Kaufpreises", "Nichts", "50 %", "Genau 100 €"], c: 0, e: "Diese Faustregel hilft, teure Überraschungen abzufedern." },
      { q: "Was kann eine niedrige Rücklage der Eigentümergemeinschaft bedeuten?", a: ["Teure Sonderumlagen", "Geld zurück", "Nichts", "Steuerfreiheit"], c: 0, e: "Fehlt Geld für Reparaturen, müssen Eigentümer nachzahlen." },
    ]},
    { id: "r3", title: "Immobilie als Geldanlage", mins: 3, cards: [
      { h: "Die Mietrendite", p: "Die Bruttomietrendite ist die Jahreskaltmiete geteilt durch den Kaufpreis. Davon gehen noch Kosten für Verwaltung, Instandhaltung und Leerstand ab." },
      { h: "Hebel durch Kredit", p: "Viele kaufen vermietete Immobilien mit viel Kredit. Das kann die Rendite auf das eingesetzte Eigenkapital erhöhen, aber auch Verluste vergrößern, wenn Mieter ausfallen oder Zinsen steigen." },
      { h: "Klumpenrisiko", p: "Eine einzelne Wohnung bindet viel Geld an einem Ort. Wer in Immobilien streuen will, kann auch über Immobilienfonds oder Aktien von Immobilienunternehmen investieren.", f: "Bruttomietrendite = Jahreskaltmiete ÷ Kaufpreis" },
    ], qs: [
      { q: "Wie berechnet sich die Bruttomietrendite?", a: ["Jahreskaltmiete geteilt durch Kaufpreis", "Kaufpreis mal Miete", "Miete plus Nebenkosten", "Zins minus Inflation"], c: 0, e: "Sie ist eine erste grobe Kennzahl." },
      { q: "Was bewirkt ein hoher Kreditanteil?", a: ["Er kann Gewinne und Verluste vergrößern", "Er macht die Anlage risikolos", "Er senkt immer die Kosten", "Nichts"], c: 0, e: "Fremdkapital wirkt wie ein Hebel in beide Richtungen." },
      { q: "Welches Risiko hat eine einzelne vermietete Wohnung?", a: ["Klumpenrisiko an einem Ort", "Keins", "Zu viel Streuung", "Zu wenig Steuern"], c: 0, e: "Viel Geld hängt an einem einzigen Objekt." },
    ]},
    { id: "r4", title: "Rechte als Mieter", mins: 3, cards: [
      { h: "Mieterhöhungen", p: "Vermieter dürfen die Miete nicht beliebig erhöhen. Bei der Anpassung an die ortsübliche Vergleichsmiete gilt eine Kappungsgrenze: höchstens 20 % in drei Jahren, in vielen Städten nur 15 %." },
      { h: "Mängel melden", p: "Funktioniert die Heizung nicht oder schimmelt es, meldest du den Mangel schriftlich. Bei erheblichen Mängeln kann die Miete gemindert werden. Lass dich dazu beraten, bevor du weniger zahlst." },
      { h: "Hilfe beim Mieterverein", p: "Mietervereine beraten ihre Mitglieder günstig bei Nebenkostenabrechnung, Mieterhöhung oder Kündigung und prüfen Unterlagen.", f: "Kappungsgrenze: 20 % in 3 Jahren, in angespannten Märkten 15 %" },
    ], qs: [
      { q: "Wie stark darf die Miete bis zur Vergleichsmiete in drei Jahren höchstens steigen?", a: ["Um 5 %", "Um 20 %, in vielen Städten nur 15 %", "Unbegrenzt", "Um 50 %"], c: 1, e: "Die Kappungsgrenze schützt vor sprunghaften Erhöhungen." },
      { q: "Was tust du zuerst bei einem Mangel in der Wohnung?", a: ["Den Mangel schriftlich melden", "Sofort keine Miete mehr zahlen", "Ausziehen", "Nichts"], c: 0, e: "Der Vermieter muss vom Mangel wissen, um ihn zu beheben." },
      { q: "Wer berät Mieter günstig?", a: ["Mietervereine", "Die Schufa", "Das Finanzamt", "Der Vermieter"], c: 0, e: "Mietervereine kennen das Mietrecht und helfen Mitgliedern." },
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
    { id: "w5", title: "Wie Inflation gemessen wird", mins: 3, cards: [
      { h: "Der Warenkorb", p: "Das Statistische Bundesamt misst die Inflation mit dem Verbraucherpreisindex. Dafür werden jeden Monat die Preise von rund 650 Güterarten erfasst, von Brot über Mieten bis zu Handyverträgen." },
      { h: "Gewichtet nach Bedeutung", p: "Nicht jeder Preis zählt gleich. Wohnen und Energie haben großes Gewicht, weil Haushalte dafür viel ausgeben. Deshalb trifft eine Energiekrise die Inflation besonders stark." },
      { h: "Deine eigene Inflation", p: "Der Durchschnitt passt nicht für alle. Wer viel Auto fährt oder viel für Lebensmittel ausgibt, spürt Preissteigerungen dort stärker als andere." },
    ], qs: [
      { q: "Wer misst die Inflation in Deutschland?", a: ["Das Statistische Bundesamt", "Die Schufa", "Die Sparkasse", "Die Polizei"], c: 0, e: "Destatis veröffentlicht monatlich den Verbraucherpreisindex." },
      { q: "Womit wird die Inflation gemessen?", a: ["Mit einem Warenkorb vieler Güter", "Mit dem Goldpreis", "Mit dem DAX", "Mit dem Leitzins"], c: 0, e: "Der Warenkorb bildet typische Ausgaben von Haushalten ab." },
      { q: "Warum kann deine persönliche Inflation anders sein?", a: ["Weil du anders einkaufst als der Durchschnitt", "Weil es einen Fehler gibt", "Weil Inflation erfunden ist", "Gar nicht"], c: 0, e: "Jeder Haushalt hat einen eigenen Warenkorb." },
    ]},
    { id: "w6", title: "Krisen an der Börse", mins: 3, cards: [
      { h: "Es gab schon viele", p: "Die Dotcom-Blase ab 2000, die Finanzkrise 2008 und der Corona-Crash 2020 ließen Aktienkurse stark fallen, teils um die Hälfte. Wer damals in Panik verkaufte, machte die Verluste endgültig." },
      { h: "Erholung braucht Zeit", p: "Breite Märkte haben sich nach jeder dieser Krisen wieder erholt, manchmal in Monaten, manchmal erst nach Jahren. Einzelne Aktien erholen sich dagegen nicht immer." },
      { h: "Vorbereitet sein", p: "Ein Notgroschen, ein langer Anlagehorizont und breite Streuung machen Krisen erträglich. Wer weiter per Sparplan investiert, kauft in Krisen günstig nach.", f: "Corona-Crash 2020: Kurse fielen in wenigen Wochen um rund ein Drittel" },
    ], qs: [
      { q: "Was passierte mit Anlegern, die im Crash in Panik verkauften?", a: ["Ihre Verluste wurden endgültig", "Sie verdoppelten ihr Geld", "Nichts", "Sie bekamen Zinsen"], c: 0, e: "Erst der Verkauf macht Buchverluste real." },
      { q: "Was gilt für breite Aktienmärkte nach bisherigen Krisen?", a: ["Sie haben sich wieder erholt", "Sie blieben für immer unten", "Sie wurden geschlossen", "Sie stiegen während der Krise"], c: 0, e: "Breite Märkte erholten sich historisch, ohne Garantie für die Zukunft." },
      { q: "Was hilft, Krisen gelassen zu überstehen?", a: ["Notgroschen, Zeit und Streuung", "Alles auf eine Aktie setzen", "Kredite für Aktien", "Jeden Tag den Kurs prüfen"], c: 0, e: "Diese drei Dinge machen ein Depot krisenfest." },
    ]},
  ]},
  { id: "politik", title: "Wirtschaft & Staat", sub: "Steuern, Schulden, Arbeit", lessons: [
    { id: "q1", title: "Wofür der Staat Geld ausgibt", mins: 3, cards: [
      { h: "Die Einnahmen", p: "Der Staat finanziert sich vor allem über Steuern wie Lohn- und Einkommensteuer und Umsatzsteuer sowie über Sozialbeiträge. Die Umsatzsteuer zahlst du bei fast jedem Einkauf." },
      { h: "Die Ausgaben", p: "Der größte Teil fließt in Soziales wie Rente, Gesundheit und Familien. Dazu kommen Bildung, Verteidigung, Verkehr, Verwaltung und Zinsen auf Staatsschulden." },
      { h: "Die Umsatzsteuer im Alltag", p: "Der reguläre Satz beträgt 19 %, der ermäßigte 7 %, etwa für viele Lebensmittel, Bücher und den Nahverkehr.", f: "Umsatzsteuer: 19 % regulär · 7 % ermäßigt" },
    ], qs: [
      { q: "Wie hoch ist der reguläre Umsatzsteuersatz?", a: ["7 %", "16 %", "19 %", "25 %"], c: 2, e: "Der Regelsatz liegt bei 19 %." },
      { q: "Wofür gibt der Staat den größten Teil aus?", a: ["Soziales wie Rente und Gesundheit", "Raumfahrt", "Sportvereine", "Werbung"], c: 0, e: "Sozialausgaben machen den größten Posten aus." },
      { q: "Wofür gilt oft der ermäßigte Satz von 7 %?", a: ["Viele Lebensmittel und Bücher", "Autos", "Schmuck", "Elektronik"], c: 0, e: "Güter des Grundbedarfs werden niedriger besteuert." },
    ]},
    { id: "q2", title: "Staatsschulden und Schuldenbremse", mins: 3, cards: [
      { h: "Wenn der Staat Kredite aufnimmt", p: "Reichen die Einnahmen nicht, leiht sich der Staat Geld über Anleihen. Deutsche Staatsanleihen gelten als sehr sicher. Die Zinsen dafür zahlen alle Steuerzahler." },
      { h: "Die Schuldenbremse", p: "Seit 2009 steht im Grundgesetz eine Schuldenbremse. Der Bund darf nur in engen Grenzen neue Schulden machen, in Notlagen sind Ausnahmen möglich. 2025 wurde sie für Verteidigung und ein Sondervermögen für Infrastruktur gelockert." },
      { h: "Die Debatte", p: "Befürworter wollen kommende Generationen vor hohen Schulden schützen. Kritiker sagen, dass notwendige Investitionen in Schulen, Brücken und Klimaschutz ausbleiben. Beide Seiten haben ökonomische Argumente." },
    ], qs: [
      { q: "Wie leiht sich der Staat Geld?", a: ["Über Staatsanleihen", "Über die Schufa", "Über Lotto", "Gar nicht"], c: 0, e: "Anleger kaufen Staatsanleihen und erhalten dafür Zinsen." },
      { q: "Wo ist die Schuldenbremse geregelt?", a: ["Im Grundgesetz", "Im Mietvertrag", "In der Straßenverkehrsordnung", "Nirgends"], c: 0, e: "Sie wurde 2009 ins Grundgesetz aufgenommen." },
      { q: "Was ist ein Argument der Kritiker der Schuldenbremse?", a: ["Notwendige Investitionen bleiben aus", "Sie erhöht die Inflation auf 50 %", "Sie verbietet Steuern", "Sie gilt nur für Kinder"], c: 0, e: "Kritiker sehen einen Investitionsstau." },
    ]},
    { id: "q3", title: "Arbeitslosengeld und Bürgergeld", mins: 3, cards: [
      { h: "Arbeitslosengeld I", p: "Wer arbeitslos wird und vorher lange genug versicherungspflichtig gearbeitet hat, bekommt Arbeitslosengeld I. Es beträgt 60 % des pauschalierten Nettolohns, mit Kind 67 %." },
      { h: "Früh melden", p: "Spätestens drei Monate vor dem Ende deines Jobs musst du dich bei der Arbeitsagentur arbeitssuchend melden. Erfährst du kurzfristiger davon, innerhalb von drei Tagen. Sonst droht eine Sperrzeit." },
      { h: "Die Grundsicherung", p: "Wer kein Arbeitslosengeld I bekommt oder zu wenig, kann Grundsicherung für Arbeitsuchende beantragen. Sie soll das Existenzminimum sichern. Die Regeln dafür werden immer wieder reformiert.", f: "ALG I: 60 % des pauschalierten Nettolohns, mit Kind 67 %" },
    ], qs: [
      { q: "Wie hoch ist das Arbeitslosengeld I ohne Kind?", a: ["30 %", "60 %", "80 %", "100 %"], c: 1, e: "Ohne Kind gibt es 60 % des pauschalierten Nettolohns." },
      { q: "Du erfährst zwei Wochen vor Jobende von deiner Kündigung. Wann meldest du dich arbeitssuchend?", a: ["Innerhalb von drei Tagen", "Nach einem Jahr", "Gar nicht", "Erst am letzten Arbeitstag"], c: 0, e: "Bei kurzfristiger Kenntnis gilt eine Frist von drei Tagen, sonst droht eine Sperrzeit." },
      { q: "Was soll die Grundsicherung absichern?", a: ["Das Existenzminimum", "Einen Urlaub", "Ein Auto", "Aktienkäufe"], c: 0, e: "Sie sichert den grundlegenden Lebensunterhalt." },
    ]},
    { id: "q4", title: "Globalisierung und Handel", mins: 3, cards: [
      { h: "Weltweit vernetzt", p: "Dein Handy wird mit Teilen aus vielen Ländern gebaut. Unternehmen produzieren dort, wo es am günstigsten oder besten geht, und verkaufen weltweit." },
      { h: "Deutschland als Exportland", p: "Deutschland verkauft viele Autos, Maschinen und Chemieprodukte ins Ausland. Deshalb treffen Handelskonflikte und Zölle die deutsche Wirtschaft besonders." },
      { h: "Was Zölle bewirken", p: "Zölle sind Abgaben auf importierte Waren. Sie sollen heimische Firmen schützen, machen Produkte aber oft für Verbraucher teurer und können Gegenzölle auslösen." },
    ], qs: [
      { q: "Was sind Zölle?", a: ["Abgaben auf importierte Waren", "Zinsen auf Kredite", "Eine Einkommensteuer", "Ein Sparvertrag"], c: 0, e: "Zölle verteuern Waren aus dem Ausland." },
      { q: "Warum treffen Handelskonflikte Deutschland besonders?", a: ["Weil Deutschland viel exportiert", "Weil Deutschland nichts exportiert", "Wegen des Wetters", "Gar nicht"], c: 0, e: "Exportabhängige Länder spüren Zölle stark." },
      { q: "Was ist eine häufige Folge von Zöllen für Verbraucher?", a: ["Höhere Preise", "Kostenlose Waren", "Höhere Zinsen auf Tagesgeld", "Nichts"], c: 0, e: "Importierte Produkte werden teurer." },
    ]},
  ]},
  { id: "gruen", title: "Geld & Nachhaltigkeit", sub: "Mit gutem Gewissen", lessons: [
    { id: "o1", title: "Nachhaltig anlegen", mins: 3, cards: [
      { h: "Was steckt dahinter?", p: "Nachhaltige Geldanlagen berücksichtigen Umwelt, Soziales und gute Unternehmensführung, abgekürzt ESG. Manche Fonds schließen Branchen wie Waffen, Kohle oder Tabak aus." },
      { h: "Rendite und Risiko", p: "Nachhaltige ETFs haben sich in der Vergangenheit ähnlich entwickelt wie klassische. Weil sie weniger Unternehmen enthalten, kann die Streuung etwas geringer sein." },
      { h: "Was du willst, entscheidest du", p: "Es gibt keine einheitliche Definition von „nachhaltig“. Schau dir an, welche Ausschlusskriterien ein Fonds hat und ob sie zu deinen Werten passen." },
    ], qs: [
      { q: "Wofür steht ESG?", a: ["Umwelt, Soziales und Unternehmensführung", "Euro, Steuer, Gold", "Ein Börsenindex", "Ein Kreditvertrag"], c: 0, e: "Environmental, Social, Governance." },
      { q: "Was machen viele nachhaltige Fonds?", a: ["Sie schließen bestimmte Branchen aus", "Sie kaufen nur Kohle", "Sie zahlen keine Steuern", "Sie halten nur Bargeld"], c: 0, e: "Ausschlusskriterien sind ein verbreiteter Ansatz." },
      { q: "Gibt es eine einheitliche Definition von „nachhaltig“?", a: ["Nein, man sollte die Kriterien prüfen", "Ja, für alle Fonds gleich", "Nur in den USA", "Ja, im Grundgesetz"], c: 0, e: "Was nachhaltig ist, legen Anbieter unterschiedlich aus." },
    ]},
    { id: "o2", title: "Greenwashing erkennen", mins: 3, cards: [
      { h: "Grün angestrichen", p: "Greenwashing heißt: Ein Produkt wird umweltfreundlicher dargestellt, als es ist. Grüne Bilder und Begriffe wie „klimafreundlich“ sagen allein wenig aus." },
      { h: "Genau hinschauen", p: "Prüfe bei Fonds die Liste der größten Positionen und die Ausschlusskriterien. Manche als nachhaltig beworbenen Fonds enthalten Unternehmen, die du dort nicht erwartest." },
      { h: "Konkrete Angaben zählen", p: "Seriöse Anbieter nennen messbare Kriterien und Nachweise. Vage Versprechen ohne Belege sind ein Warnsignal, bei Fonds genauso wie bei Produkten im Laden." },
    ], qs: [
      { q: "Was ist Greenwashing?", a: ["Etwas umweltfreundlicher darstellen, als es ist", "Ein Waschmittel", "Eine Steuer auf Benzin", "Eine Gartenarbeit"], c: 0, e: "Greenwashing täuscht über die echte Umweltwirkung." },
      { q: "Wie prüfst du einen nachhaltigen Fonds?", a: ["Größte Positionen und Ausschlusskriterien ansehen", "Nur auf das grüne Logo achten", "Gar nicht", "Nach dem Namen"], c: 0, e: "Die Inhalte zeigen, was wirklich im Fonds steckt." },
      { q: "Was ist ein Warnsignal?", a: ["Vage Versprechen ohne Belege", "Konkrete, messbare Kriterien", "Unabhängige Prüfungen", "Offene Listen der Positionen"], c: 0, e: "Nachprüfbare Angaben schaffen Vertrauen." },
    ]},
    { id: "o3", title: "Nachhaltig konsumieren spart Geld", mins: 3, cards: [
      { h: "Weniger ist mehr", p: "Was du nicht kaufst, kostet kein Geld und keine Ressourcen. Leihen, Teilen und Reparieren sparen oft mehr als jedes Sonderangebot." },
      { h: "Qualität rechnen", p: "Ein teureres Produkt, das doppelt so lange hält, kann günstiger sein. Rechne die Kosten pro Nutzung oder pro Jahr aus." },
      { h: "Energie sparen", p: "Weniger heizen, Stand-by vermeiden und sparsame Geräte senken Strom- und Heizkosten spürbar. Jedes Grad weniger Raumtemperatur spart grob 6 % Heizenergie.", f: "Kosten pro Nutzung = Preis ÷ Anzahl der Nutzungen" },
    ], qs: [
      { q: "Was spart Geld und Ressourcen zugleich?", a: ["Leihen, Teilen und Reparieren", "Ständig Neues kaufen", "Geräte auf Stand-by lassen", "Wegwerfprodukte"], c: 0, e: "So nutzt du Dinge länger oder gemeinsam." },
      { q: "Wie vergleichst du ein günstiges mit einem langlebigen Produkt?", a: ["Über die Kosten pro Nutzung", "Nur über den Preis", "Nach der Verpackung", "Gar nicht"], c: 0, e: "Langlebiges ist pro Nutzung oft günstiger." },
      { q: "Wie viel Heizenergie spart ein Grad weniger ungefähr?", a: ["0,1 %", "Rund 6 %", "50 %", "Nichts"], c: 1, e: "Ein Grad weniger spart grob 6 % Heizenergie." },
    ]},
    { id: "o4", title: "Spenden und Steuern", mins: 3, cards: [
      { h: "Gutes tun und absetzen", p: "Spenden an gemeinnützige Organisationen kannst du in der Steuererklärung als Sonderausgaben angeben. Das senkt dein zu versteuerndes Einkommen." },
      { h: "Nachweis", p: "Für Spenden bis 300 € reicht meist der Kontoauszug als Nachweis. Für höhere Beträge brauchst du eine Zuwendungsbestätigung der Organisation.", f: "Bis 300 € reicht der Kontoauszug" },
      { h: "Seriöse Organisationen finden", p: "Das DZI-Spendensiegel kennzeichnet Organisationen, die sorgsam mit Spenden umgehen. Vorsicht bei Drückerkolonnen an der Haustür und dubiosen Spendenaufrufen nach Katastrophen." },
    ], qs: [
      { q: "Wie wirken Spenden in der Steuererklärung?", a: ["Sie senken das zu versteuernde Einkommen", "Sie erhöhen die Steuer", "Gar nicht", "Sie werden doppelt besteuert"], c: 0, e: "Spenden sind als Sonderausgaben absetzbar." },
      { q: "Bis zu welchem Betrag reicht meist der Kontoauszug als Nachweis?", a: ["50 €", "300 €", "1.000 €", "10.000 €"], c: 1, e: "Bei Spenden bis 300 € gilt der vereinfachte Nachweis." },
      { q: "Woran erkennst du seriöse Spendenorganisationen?", a: ["Zum Beispiel am DZI-Spendensiegel", "An lauten Haustürbesuchen", "An Druck und Eile", "Gar nicht"], c: 0, e: "Das Siegel bescheinigt einen sorgfältigen Umgang mit Spenden." },
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
    { id: "f4", title: "Online-Banking sicher nutzen", mins: 3, cards: [
      { h: "Starke Zugänge", p: "Nutze für Bank und E-Mail lange, unterschiedliche Passwörter, am besten mit einem Passwortmanager. Aktiviere überall die Zwei-Faktor-Anmeldung." },
      { h: "Geräte aktuell halten", p: "Updates für Handy, Computer und Apps schließen Sicherheitslücken. Installiere Banking-Apps nur aus den offiziellen App-Stores." },
      { h: "Freigaben prüfen", p: "Lies jede Freigabe in der Banking-App genau: Betrag, Empfänger, Art des Auftrags. Betrüger versuchen oft, dich eine Zahlung oder eine neue Karte bestätigen zu lassen." },
    ], qs: [
      { q: "Was schützt dein Banking-Konto zusätzlich zum Passwort?", a: ["Zwei-Faktor-Anmeldung", "Ein kurzes Passwort", "Dasselbe Passwort überall", "Gar nichts"], c: 0, e: "Ein zweiter Faktor macht gestohlene Passwörter nutzlos." },
      { q: "Woher solltest du Banking-Apps installieren?", a: ["Nur aus den offiziellen App-Stores", "Über Links in SMS", "Von unbekannten Websites", "Per E-Mail-Anhang"], c: 0, e: "Gefälschte Apps sind ein bekannter Angriffsweg." },
      { q: "Was prüfst du vor jeder Freigabe in der App?", a: ["Betrag, Empfänger und Art des Auftrags", "Nur die Uhrzeit", "Nichts, einfach bestätigen", "Die Farbe der App"], c: 0, e: "Genaues Lesen verhindert, dass du Betrug selbst freigibst." },
    ]},
    { id: "f5", title: "Identitätsdiebstahl", mins: 3, cards: [
      { h: "Was dahintersteckt", p: "Mit gestohlenen Daten wie Name, Geburtsdatum, Adresse oder Ausweiskopie bestellen Betrüger Waren, eröffnen Konten oder schließen Verträge in deinem Namen." },
      { h: "Daten sparsam teilen", p: "Schick Ausweiskopien nur, wenn es nötig ist, und schwärze dabei nicht benötigte Angaben. Sei vorsichtig mit persönlichen Infos in sozialen Netzwerken." },
      { h: "Wenn es passiert ist", p: "Erstatte Anzeige bei der Polizei, informiere die betroffenen Firmen und widersprich Forderungen schriftlich. Prüfe deine Schufa-Auskunft auf fremde Einträge." },
    ], qs: [
      { q: "Was können Betrüger mit deinen Daten tun?", a: ["In deinem Namen bestellen und Verträge schließen", "Dir Geld schenken", "Deine Steuer machen", "Nichts"], c: 0, e: "Identitätsdiebstahl kann zu Forderungen gegen dich führen." },
      { q: "Wie gehst du mit Ausweiskopien um?", a: ["Nur wenn nötig senden und Unnötiges schwärzen", "An jeden schicken, der fragt", "Online veröffentlichen", "Immer ungeschwärzt mailen"], c: 0, e: "Weniger geteilte Daten bedeuten weniger Risiko." },
      { q: "Was tust du als Erstes bei Identitätsdiebstahl?", a: ["Anzeige bei der Polizei erstatten", "Alle Rechnungen bezahlen", "Abwarten", "Umziehen"], c: 0, e: "Die Anzeige hilft dir beim Widerspruch gegen falsche Forderungen." },
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
  { id: "refresh1", name: "Erste Auffrischung" },
  { id: "lessons25", name: "25 Lektionen" },
  { id: "lessons50", name: "50 Lektionen" },
  { id: "level5", name: "Level 5" },
  { id: "exam1", name: "Erste Krone" },
  { id: "crowns5", name: "5 Kronen" },
  { id: "sprint10", name: "Sprint-Profi" },
  { id: "all", name: "Alle Lektionen" },
] as const;
export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

export const DAILY_GOAL = 30;
