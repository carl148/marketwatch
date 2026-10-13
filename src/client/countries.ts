// Länder mit internationaler Vorwahl (ITU E.164) für die Anmeldung per Telefonnummer.
// Format je Eintrag: ISO-Code|Name|Vorwahl ohne "+". Länder, die sich eine Vorwahl
// teilen (z. B. +1 oder +7), stehen mit dem häufigsten Land zuerst.
// Karibische Länder im nordamerikanischen Nummernplan haben +1 plus Ortsvorwahl.

const RAW = `DE|Deutschland|49
AT|Österreich|43
CH|Schweiz|41
AF|Afghanistan|93
EG|Ägypten|20
AX|Ålandinseln|358
AL|Albanien|355
DZ|Algerien|213
AS|Amerikanisch-Samoa|1684
VI|Amerikanische Jungferninseln|1340
AD|Andorra|376
AO|Angola|244
AI|Anguilla|1264
AG|Antigua und Barbuda|1268
GQ|Äquatorialguinea|240
AR|Argentinien|54
AM|Armenien|374
AW|Aruba|297
AZ|Aserbaidschan|994
ET|Äthiopien|251
AU|Australien|61
BS|Bahamas|1242
BH|Bahrain|973
BD|Bangladesch|880
BB|Barbados|1246
BY|Belarus|375
BE|Belgien|32
BZ|Belize|501
BJ|Benin|229
BM|Bermuda|1441
BT|Bhutan|975
BO|Bolivien|591
BQ|Bonaire, Sint Eustatius und Saba|599
BA|Bosnien und Herzegowina|387
BW|Botsuana|267
BR|Brasilien|55
VG|Britische Jungferninseln|1284
IO|Britisches Territorium im Indischen Ozean|246
BN|Brunei|673
BG|Bulgarien|359
BF|Burkina Faso|226
BI|Burundi|257
CV|Cabo Verde|238
CL|Chile|56
CN|China|86
CK|Cookinseln|682
CR|Costa Rica|506
CI|Côte d’Ivoire|225
CW|Curaçao|599
DK|Dänemark|45
DM|Dominica|1767
DO|Dominikanische Republik|1809
DJ|Dschibuti|253
EC|Ecuador|593
SV|El Salvador|503
ER|Eritrea|291
EE|Estland|372
SZ|Eswatini|268
FK|Falklandinseln|500
FO|Färöer|298
FJ|Fidschi|679
FI|Finnland|358
FR|Frankreich|33
GF|Französisch-Guayana|594
PF|Französisch-Polynesien|689
GA|Gabun|241
GM|Gambia|220
GE|Georgien|995
GH|Ghana|233
GI|Gibraltar|350
GD|Grenada|1473
GR|Griechenland|30
GL|Grönland|299
GP|Guadeloupe|590
GU|Guam|1671
GT|Guatemala|502
GG|Guernsey|44
GN|Guinea|224
GW|Guinea-Bissau|245
GY|Guyana|592
HT|Haiti|509
HN|Honduras|504
HK|Hongkong|852
IN|Indien|91
ID|Indonesien|62
IQ|Irak|964
IR|Iran|98
IE|Irland|353
IS|Island|354
IM|Isle of Man|44
IL|Israel|972
IT|Italien|39
JM|Jamaika|1876
JP|Japan|81
YE|Jemen|967
JE|Jersey|44
JO|Jordanien|962
KY|Kaimaninseln|1345
KH|Kambodscha|855
CM|Kamerun|237
CA|Kanada|1
KZ|Kasachstan|7
QA|Katar|974
KE|Kenia|254
KG|Kirgisistan|996
KI|Kiribati|686
CO|Kolumbien|57
KM|Komoren|269
CG|Kongo|242
CD|Kongo, Demokratische Republik|243
XK|Kosovo|383
HR|Kroatien|385
CU|Kuba|53
KW|Kuwait|965
LA|Laos|856
LS|Lesotho|266
LV|Lettland|371
LB|Libanon|961
LR|Liberia|231
LY|Libyen|218
LI|Liechtenstein|423
LT|Litauen|370
LU|Luxemburg|352
MO|Macau|853
MG|Madagaskar|261
MW|Malawi|265
MY|Malaysia|60
MV|Malediven|960
ML|Mali|223
MT|Malta|356
MA|Marokko|212
MH|Marshallinseln|692
MQ|Martinique|596
MR|Mauretanien|222
MU|Mauritius|230
YT|Mayotte|262
MX|Mexiko|52
FM|Mikronesien|691
MD|Moldau|373
MC|Monaco|377
MN|Mongolei|976
ME|Montenegro|382
MS|Montserrat|1664
MZ|Mosambik|258
MM|Myanmar|95
NA|Namibia|264
NR|Nauru|674
NP|Nepal|977
NC|Neukaledonien|687
NZ|Neuseeland|64
NI|Nicaragua|505
NL|Niederlande|31
NE|Niger|227
NG|Nigeria|234
NU|Niue|683
KP|Nordkorea|850
MP|Nördliche Marianen|1670
MK|Nordmazedonien|389
NF|Norfolkinsel|672
NO|Norwegen|47
OM|Oman|968
TL|Osttimor|670
PK|Pakistan|92
PS|Palästinensische Gebiete|970
PW|Palau|680
PA|Panama|507
PG|Papua-Neuguinea|675
PY|Paraguay|595
PE|Peru|51
PH|Philippinen|63
PL|Polen|48
PT|Portugal|351
PR|Puerto Rico|1787
RE|Réunion|262
RW|Ruanda|250
RO|Rumänien|40
RU|Russland|7
SB|Salomonen|677
ZM|Sambia|260
WS|Samoa|685
SM|San Marino|378
ST|São Tomé und Príncipe|239
SA|Saudi-Arabien|966
SE|Schweden|46
SN|Senegal|221
RS|Serbien|381
SC|Seychellen|248
SL|Sierra Leone|232
ZW|Simbabwe|263
SG|Singapur|65
SX|Sint Maarten|1721
SK|Slowakei|421
SI|Slowenien|386
SO|Somalia|252
ES|Spanien|34
LK|Sri Lanka|94
BL|St. Barthélemy|590
SH|St. Helena|290
KN|St. Kitts und Nevis|1869
LC|St. Lucia|1758
MF|St. Martin|590
PM|St. Pierre und Miquelon|508
VC|St. Vincent und die Grenadinen|1784
ZA|Südafrika|27
SD|Sudan|249
KR|Südkorea|82
SS|Südsudan|211
SR|Suriname|597
SY|Syrien|963
TJ|Tadschikistan|992
TW|Taiwan|886
TZ|Tansania|255
TH|Thailand|66
TG|Togo|228
TK|Tokelau|690
TO|Tonga|676
TT|Trinidad und Tobago|1868
TD|Tschad|235
CZ|Tschechien|420
TN|Tunesien|216
TR|Türkei|90
TM|Turkmenistan|993
TC|Turks- und Caicosinseln|1649
TV|Tuvalu|688
UG|Uganda|256
UA|Ukraine|380
HU|Ungarn|36
UY|Uruguay|598
UZ|Usbekistan|998
VU|Vanuatu|678
VA|Vatikanstadt|39
VE|Venezuela|58
AE|Vereinigte Arabische Emirate|971
US|Vereinigte Staaten|1
GB|Vereinigtes Königreich|44
VN|Vietnam|84
WF|Wallis und Futuna|681
CX|Weihnachtsinsel|61
EH|Westsahara|212
CF|Zentralafrikanische Republik|236
CY|Zypern|357`;

export interface Country { iso: string; name: string; dial: string }

export const COUNTRIES: Country[] = RAW.split("\n").map(line => {
  const [iso, name, dial] = line.split("|");
  return { iso, name, dial };
});

/** Bevorzugtes Land, wenn sich mehrere eine Vorwahl teilen. */
const PREFERRED: Record<string, string> = { "1": "US", "7": "RU", "44": "GB", "39": "IT", "61": "AU", "212": "MA", "262": "RE", "358": "FI", "590": "GP", "599": "CW" };

export const countryByIso = (iso: string) => COUNTRIES.find(c => c.iso === iso);

/** Flagge als Emoji aus dem ISO-Code (Regional Indicator Symbols). */
export const flag = (iso: string) => String.fromCodePoint(...[...iso.toUpperCase()].map(ch => 0x1f1e6 + ch.charCodeAt(0) - 65));

/** "+1 876" statt "+1876" bei Ländern mit Ortsvorwahl im nordamerikanischen Nummernplan. */
export const dialLabel = (c: Country) => (c.dial.length === 4 && c.dial.startsWith("1") ? `+1 ${c.dial.slice(1)}` : `+${c.dial}`);

/** Findet das Land zu einer internationalen Nummer (nur Ziffern, ohne "+"), längste Vorwahl zuerst. */
export function countryFromDigits(digits: string): Country | undefined {
  for (let len = 4; len >= 1; len--) {
    const dial = digits.slice(0, len);
    const hits = COUNTRIES.filter(c => c.dial === dial);
    if (hits.length) return hits.find(c => c.iso === PREFERRED[dial]) ?? hits[0];
  }
  return undefined;
}

/** Suche nach Name, ISO-Code oder Vorwahl ("+43", "0043", "43", "österr"). */
export function searchCountries(q: string): Country[] {
  const t = q.trim().toLowerCase().replace(/^(\+|00)/, "").replace(/\s/g, "");
  if (!t) return COUNTRIES;
  if (/^\d+$/.test(t)) return COUNTRIES.filter(c => c.dial.startsWith(t)).sort((a, b) => a.dial.length - b.dial.length);
  return COUNTRIES.filter(c => c.name.toLowerCase().includes(t) || c.iso.toLowerCase() === t);
}
