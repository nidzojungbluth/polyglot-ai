import type { AbcCourse } from './types';

// Modernes Griechisch – tatsächliche heutige Aussprache (nicht die altgriechische Schulaussprache).
export const abcEl: AbcCourse = {
  code: 'el', title: 'Griechisches Alphabet', forBeginners: true,
  intro: 'Das griechische Alphabet hat 24 Buchstaben. Viele kennst du aus Mathe oder Physik – aber Achtung: Im modernen Griechisch klingen einige anders, als man denkt. Wir lernen die heutige Aussprache, so wie in Thessaloniki gesprochen wird.',
  units: [
    {
      id: 'el-abc-1', title: 'Buchstaben 1: Α bis Ζ', kind: 'letters',
      intro: 'Die ersten sechs Buchstaben. Merke dir gleich die zwei wichtigsten Fallen: β ist KEIN b und δ ist KEIN d.',
      letters: [
        { up: 'Α', low: 'α', name: 'Άλφα (álfa)', sound: 'a', hint: 'kurzes, klares a wie in „Vater“.', ex: { t: 'αμάξι', tr: 'amáxi', de: 'Auto' } },
        { up: 'Β', low: 'β', name: 'Βήτα (víta)', sound: 'w (wie in Wasser)', hint: 'immer wie deutsches w – nie wie b.', ex: { t: 'βάρκα', tr: 'várka', de: 'Boot' }, trap: 'Sieht aus wie B, klingt aber wie w. Ein echtes b schreibt man μπ.' },
        { up: 'Γ', low: 'γ', name: 'Γάμα (gháma)', sound: 'gh / j', hint: 'vor a, o, u: weiches, gehauchtes g im Rachen (ohne Verschluss, ähnlich wie „g“ in berlinerisch „Wagen“). Vor e und i: wie j in „ja“.', ex: { t: 'γάλα', tr: 'ghála', de: 'Milch' }, trap: 'Kein hartes g wie in „Gabel“. Vor e/i klingt γ wie j: γεια = „ja“.' },
        { up: 'Δ', low: 'δ', name: 'Δέλτα (dhélta)', sound: 'dh (wie engl. this)', hint: 'Zungenspitze leicht zwischen die Zähne, summend – wie das „th“ im englischen „this“.', ex: { t: 'δέκα', tr: 'dhéka', de: 'zehn' }, trap: 'Kein d! Ein echtes d schreibt man ντ.' },
        { up: 'Ε', low: 'ε', name: 'Έψιλον (épsilon)', sound: 'e', hint: 'offenes e wie in „Bett“.', ex: { t: 'ένα', tr: 'éna', de: 'eins' } },
        { up: 'Ζ', low: 'ζ', name: 'Ζήτα (zíta)', sound: 's (stimmhaft, wie Sonne)', hint: 'summendes s wie in „Sonne“ oder „Rose“.', ex: { t: 'ζάχαρη', tr: 'záchari', de: 'Zucker' }, trap: 'Nicht wie das deutsche z („ts“)!' },
      ],
    },
    {
      id: 'el-abc-2', title: 'Buchstaben 2: Η bis Μ', kind: 'letters',
      intro: 'Hier steckt die größte Überraschung: η sieht aus wie ein n, klingt aber wie i.',
      letters: [
        { up: 'Η', low: 'η', name: 'Ήτα (íta)', sound: 'i', hint: 'i wie in „Igel“.', ex: { t: 'ήλιος', tr: 'ílios', de: 'Sonne' }, trap: 'Großes Η sieht aus wie H, kleines η wie n – beide klingen wie i!' },
        { up: 'Θ', low: 'θ', name: 'Θήτα (thíta)', sound: 'th (wie engl. think)', hint: 'Zungenspitze zwischen die Zähne, gehaucht, stimmlos – wie „th“ in „think“.', ex: { t: 'θάλασσα', tr: 'thálassa', de: 'Meer' }, trap: 'Nicht wie t! Und nicht verwechseln mit δ (summend, wie „this“).' },
        { up: 'Ι', low: 'ι', name: 'Γιώτα (jóta)', sound: 'i', hint: 'i wie in „Kino“. Vor einem Vokal oft wie kurzes j.', ex: { t: 'ιστορία', tr: 'istoría', de: 'Geschichte' } },
        { up: 'Κ', low: 'κ', name: 'Κάπα (kápa)', sound: 'k', hint: 'k, aber ohne den deutschen Hauch. Vor e/i etwas weicher (kj).', ex: { t: 'καφές', tr: 'kafés', de: 'Kaffee' } },
        { up: 'Λ', low: 'λ', name: 'Λάμδα (lámdha)', sound: 'l', hint: 'helles l wie in „Licht“.', ex: { t: 'λεμόνι', tr: 'lemóni', de: 'Zitrone' } },
        { up: 'Μ', low: 'μ', name: 'Μι (mi)', sound: 'm', hint: 'm wie im Deutschen.', ex: { t: 'μήλο', tr: 'mílo', de: 'Apfel' }, trap: 'Kleines μ hat einen Strich nach unten – nicht mit u verwechseln.' },
      ],
    },
    {
      id: 'el-abc-3', title: 'Buchstaben 3: Ν bis Σ', kind: 'letters',
      intro: 'Zwei weitere Fallen: ν sieht aus wie v, ρ sieht aus wie p.',
      letters: [
        { up: 'Ν', low: 'ν', name: 'Νι (ni)', sound: 'n', hint: 'n wie im Deutschen.', ex: { t: 'νερό', tr: 'neró', de: 'Wasser' }, trap: 'Kleines ν sieht aus wie v, ist aber ein n!' },
        { up: 'Ξ', low: 'ξ', name: 'Ξι (xi)', sound: 'ks', hint: 'ks wie das x in „Hexe“.', ex: { t: 'ξύλο', tr: 'xílo', de: 'Holz' } },
        { up: 'Ο', low: 'ο', name: 'Όμικρον (ómikron)', sound: 'o', hint: 'o wie in „Post“, eher kurz.', ex: { t: 'όνομα', tr: 'ónoma', de: 'Name' } },
        { up: 'Π', low: 'π', name: 'Πι (pi)', sound: 'p', hint: 'p ohne Hauch.', ex: { t: 'πόλη', tr: 'póli', de: 'Stadt' } },
        { up: 'Ρ', low: 'ρ', name: 'Ρο (ro)', sound: 'r (gerollt)', hint: 'mit der Zungenspitze getipptes oder gerolltes r, wie im Italienischen.', ex: { t: 'ρολόι', tr: 'rolói', de: 'Uhr' }, trap: 'Sieht aus wie P/p, ist aber ein r!' },
        { up: 'Σ', low: 'σ ς', name: 'Σίγμα (síghma)', sound: 's (scharf)', hint: 'scharfes s wie in „Haus“. Am Wortende schreibt man ς, sonst σ. Vor stimmhaften Lauten (μ, β, γ, δ) klingt es wie ein summendes s.', ex: { t: 'σπίτι', tr: 'spíti', de: 'Haus' }, trap: 'Zwei Kleinformen: σ in der Wortmitte, ς nur am Ende (z. B. καφές).' },
      ],
    },
    {
      id: 'el-abc-4', title: 'Buchstaben 4: Τ bis Ω', kind: 'letters',
      intro: 'Die letzten sechs. Achtung bei υ (klingt wie i) und χ (kein x!).',
      letters: [
        { up: 'Τ', low: 'τ', name: 'Ταυ (taf)', sound: 't', hint: 't ohne Hauch.', ex: { t: 'τυρί', tr: 'tirí', de: 'Käse' } },
        { up: 'Υ', low: 'υ', name: 'Ύψιλον (ípsilon)', sound: 'i', hint: 'einfach i wie in „Kino“.', ex: { t: 'ύπνος', tr: 'ípnos', de: 'Schlaf' }, trap: 'Sieht aus wie u oder y, klingt aber wie i. Es gibt im Griechischen DREI Buchstaben für i: η, ι, υ.' },
        { up: 'Φ', low: 'φ', name: 'Φι (fi)', sound: 'f', hint: 'f wie im Deutschen.', ex: { t: 'φίλος', tr: 'fílos', de: 'Freund' } },
        { up: 'Χ', low: 'χ', name: 'Χι (chi)', sound: 'ch (wie in Bach)', hint: 'vor a, o, u wie „ch“ in „Bach“, vor e und i wie „ch“ in „ich“.', ex: { t: 'χαρά', tr: 'chará', de: 'Freude' }, trap: 'Sieht aus wie X, ist aber ch!' },
        { up: 'Ψ', low: 'ψ', name: 'Ψι (psi)', sound: 'ps', hint: 'ps wie in „Gips“ – auch am Wortanfang gesprochen.', ex: { t: 'ψωμί', tr: 'psomí', de: 'Brot' } },
        { up: 'Ω', low: 'ω', name: 'Ωμέγα (oméga)', sound: 'o', hint: 'genau wie ο – im modernen Griechisch gibt es keinen langen o-Laut.', ex: { t: 'ώρα', tr: 'óra', de: 'Stunde' }, trap: 'Kleines ω sieht aus wie w, klingt aber wie o.' },
      ],
    },
    {
      id: 'el-abc-5', title: 'Vokal-Kombinationen', kind: 'combos',
      intro: 'Zwei Vokalbuchstaben ergeben oft EINEN Laut. Das ist der wichtigste Schlüssel zum Lesen.',
      combos: [
        { t: 'αι', sound: 'e', hint: 'αι klingt wie e (wie ε).', ex: { t: 'και', tr: 'ke', de: 'und' } },
        { t: 'ει', sound: 'i', hint: 'ει klingt wie i.', ex: { t: 'είμαι', tr: 'íme', de: 'ich bin' } },
        { t: 'οι', sound: 'i', hint: 'οι klingt ebenfalls wie i.', ex: { t: 'οικογένεια', tr: 'ikojénia', de: 'Familie' } },
        { t: 'ου', sound: 'u', hint: 'ου klingt wie u in „gut“. Das ist die einzige Art, im Griechischen ein u zu schreiben.', ex: { t: 'ουρανός', tr: 'uranós', de: 'Himmel' } },
        { t: 'αυ', sound: 'aw / af', hint: 'av vor Vokalen und stimmhaften Lauten, af vor θ, κ, ξ, π, σ, τ, φ, χ, ψ.', ex: { t: 'αύριο', tr: 'ávrio', de: 'morgen' } },
        { t: 'ευ', sound: 'ew / ef', hint: 'ev oder ef – nach derselben Regel wie αυ.', ex: { t: 'ευχαριστώ', tr: 'efcharistó', de: 'danke' } },
      ],
      explain: [
        { title: 'Faustregel für αυ / ευ', text: 'Folgt ein „harter“ Laut (θ κ ξ π σ τ φ χ ψ), sprich f: αυτό = aftó (das). Sonst v: αύριο = ávrio (morgen).' },
        { title: 'Trennpunkte: ϊ, ϋ', text: 'Zwei Punkte über ι oder υ bedeuten: getrennt lesen. κοροϊδεύω = ko-ro-i-dhé-vo (verspotten), nicht „koridevo“.' },
      ],
    },
    {
      id: 'el-abc-6', title: 'Konsonanten-Kombinationen', kind: 'combos',
      intro: 'So schreibt man b, d und g – Laute, für die es keinen eigenen Buchstaben gibt.',
      combos: [
        { t: 'μπ', sound: 'b / mb', hint: 'am Wortanfang b, in der Wortmitte meist mb.', ex: { t: 'μπύρα', tr: 'bíra', de: 'Bier' } },
        { t: 'ντ', sound: 'd / nd', hint: 'am Wortanfang d, in der Wortmitte meist nd.', ex: { t: 'ντομάτα', tr: 'domáta', de: 'Tomate' } },
        { t: 'γκ', sound: 'g / ng', hint: 'am Wortanfang hartes g wie in „Gabel“, in der Mitte oft ng.', ex: { t: 'γκαράζ', tr: 'garáz', de: 'Garage' } },
        { t: 'γγ', sound: 'ng', hint: 'ng wie in „Engel“.', ex: { t: 'Αγγλία', tr: 'anglía', de: 'England' } },
        { t: 'τσ', sound: 'ts', hint: 'ts wie das deutsche z in „Zeit“.', ex: { t: 'τσάι', tr: 'tsái', de: 'Tee' } },
        { t: 'τζ', sound: 'ds', hint: 'stimmhaftes ds wie in „Jeans“ (englisch).', ex: { t: 'τζάμι', tr: 'dzámi', de: 'Fensterscheibe' } },
      ],
      explain: [
        { title: 'Warum so kompliziert?', text: 'β, δ und γ wurden im Lauf der Jahrhunderte zu „weichen“ Lauten (w, dh, gh). Für b, d, g – vor allem in Lehnwörtern wie μπύρα (Bier) oder ντομάτα – nimmt man deshalb zwei Buchstaben.' },
      ],
    },
    {
      id: 'el-abc-7', title: 'Betonung & Silben', kind: 'syllables',
      intro: 'Jedes griechische Wort mit mehr als einer Silbe trägt einen Akzent (΄). Er zeigt, welche Silbe betont wird – und kann die Bedeutung ändern.',
      explain: [
        { title: 'Der Akzent (τόνος)', text: 'Der Strich über dem Vokal zeigt die betonte Silbe: καλημέρα = ka-li-MÉ-ra. Steht er auf einem Doppelvokal, steht er auf dem zweiten Buchstaben: είμαι, ούτε.' },
        { title: 'Betonung ändert die Bedeutung', text: 'πότε (PÓ-te) = wann? – ποτέ (po-TÉ) = nie. γέρος (JÉ-ros) = alter Mann – γερός (je-RÓS) = kräftig.' },
        { title: 'Schritt für Schritt lesen', text: '1. Erst Kombinationen suchen (ου, αι, μπ, ντ …). 2. Wort in Silben teilen: meist Konsonant + Vokal (κα-λη-μέ-ρα). Doppelte Konsonanten werden getrennt (θά-λασ-σα). 3. Akzent finden und diese Silbe betonen. 4. Langsam, dann schneller lesen.' },
      ],
      words: [
        { t: 'καλημέρα', tr: 'kaliméra', de: 'guten Morgen', syl: 'κα-λη-μέ-ρα' },
        { t: 'θάλασσα', tr: 'thálassa', de: 'Meer', syl: 'θά-λασ-σα' },
        { t: 'ευχαριστώ', tr: 'efcharistó', de: 'danke', syl: 'ευ-χα-ρι-στώ' },
        { t: 'Θεσσαλονίκη', tr: 'thessaloníki', de: 'Thessaloniki', syl: 'Θεσ-σα-λο-νί-κη' },
        { t: 'ντομάτα', tr: 'domáta', de: 'Tomate', syl: 'ντο-μά-τα' },
        { t: 'μπουγάτσα', tr: 'bugátsa', de: 'Bougatsa', syl: 'μπου-γά-τσα' },
        { t: 'παρακαλώ', tr: 'parakaló', de: 'bitte', syl: 'πα-ρα-κα-λώ' },
        { t: 'σπίτι', tr: 'spíti', de: 'Haus', syl: 'σπί-τι' },
        { t: 'πότε', tr: 'póte', de: 'wann?', syl: 'πό-τε' },
        { t: 'ποτέ', tr: 'poté', de: 'nie', syl: 'πο-τέ' },
      ],
    },
    {
      id: 'el-abc-8', title: 'Wörter lesen', kind: 'words',
      intro: 'Jetzt liest du echte Alltagswörter. Lies erst selbst, dann hör zu und vergleiche.',
      words: [
        { t: 'γεια', tr: 'ja', de: 'hallo / tschüss' },
        { t: 'ναι', tr: 'ne', de: 'ja' },
        { t: 'όχι', tr: 'óchi', de: 'nein' },
        { t: 'νερό', tr: 'neró', de: 'Wasser' },
        { t: 'καφές', tr: 'kafés', de: 'Kaffee' },
        { t: 'ψωμί', tr: 'psomí', de: 'Brot' },
        { t: 'φίλος', tr: 'fílos', de: 'Freund' },
        { t: 'δρόμος', tr: 'dhrómos', de: 'Straße' },
        { t: 'μπύρα', tr: 'bíra', de: 'Bier' },
        { t: 'αύριο', tr: 'ávrio', de: 'morgen' },
        { t: 'σήμερα', tr: 'símera', de: 'heute' },
        { t: 'μετρό', tr: 'metró', de: 'U-Bahn' },
      ],
    },
    {
      id: 'el-abc-9', title: 'Erste Sätze', kind: 'sentences',
      intro: 'Kurze Sätze lesen und verstehen. Achte auf das griechische Fragezeichen: Es sieht aus wie ein Semikolon (;).',
      words: [
        { t: 'Γεια σου, τι κάνεις;', tr: 'ja su, ti kánis?', de: 'Hallo, wie geht\'s dir?' },
        { t: 'Με λένε Νίκλας.', tr: 'me léne níklas.', de: 'Ich heiße Niklas.' },
        { t: 'Θέλω ένα νερό, παρακαλώ.', tr: 'thélo éna neró, parakaló.', de: 'Ich möchte ein Wasser, bitte.' },
        { t: 'Πού είναι το μετρό;', tr: 'pu íne to metró?', de: 'Wo ist die U-Bahn?' },
        { t: 'Η Θεσσαλονίκη είναι ωραία.', tr: 'i thessaloníki íne oréa.', de: 'Thessaloniki ist schön.' },
      ],
    },
  ],
};
