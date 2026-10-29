import type { LanguagePack } from './types';

export const el: LanguagePack = {
  code: 'el', name: 'Griechisch', native: 'Ελληνικά', flag: '🇬🇷', city: 'Thessaloniki',
  speechLang: 'el-GR', version: 1,
  focus: 'Thessaloniki: Der größte Teil des Wortschatzes und Slangs ist in ganz Griechenland gleich. Echte Besonderheiten des Nordens sind z. B. „σε λέω“ statt „σου λέω“ (Akkusativ statt Genitiv), σουβλάκι für den Fleischspieß (Athen: καλαμάκι), der Wind Βαρδάρης und die Tsipouro-Kultur. Das „dicke L“ gilt als typisch für Thessaloniki, ist aber eher ein Klischee und vor allem bei älteren Sprechern zu hören.',
  note: 'Modernes Griechisch mit Schwerpunkt Thessaloniki. Das griechische Fragezeichen ist „;“. Jedes Wort zeigt eine lateinische Umschrift (Aussprachehilfe) und die betonte Silbe trägt einen Akzent.',
  words: [
    { id: 'el-geiasou', t: 'γεια σου', tr: 'ja su', de: 'hallo / tschüss (du)', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'el-geiasas', t: 'γεια σας', tr: 'ja sas', de: 'hallo / tschüss (Sie oder mehrere)', reg: 'formell', cat: 'Begrüßung' },
    { id: 'el-kalimera', t: 'καλημέρα', tr: 'kaliméra', de: 'guten Morgen', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'el-kalispera', t: 'καλησπέρα', tr: 'kalispéra', de: 'guten Abend (ab Nachmittag)', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'el-tikaneis', t: 'τι κάνεις;', tr: 'ti kánis', de: 'wie geht\'s dir?', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'el-tikanete', t: 'τι κάνετε;', tr: 'ti kánete', de: 'wie geht es Ihnen?', reg: 'formell', cat: 'Begrüßung' },
    { id: 'el-ela', t: 'έλα', tr: 'éla', de: 'komm / hey / na (auch am Telefon)', reg: 'locker', cat: 'Begrüßung', ex: { t: 'Έλα, τι λέει;', de: 'Hey, was geht?' } },
    { id: 'el-efxaristo', t: 'ευχαριστώ', tr: 'efcharistó', de: 'danke', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'el-parakalo', t: 'παρακαλώ', tr: 'parakaló', de: 'bitte / gern geschehen', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'el-signomi', t: 'συγγνώμη', tr: 'signómi', de: 'Entschuldigung', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'el-nai', t: 'ναι', tr: 'nä', de: 'ja (Achtung: klingt wie „nee“!)', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'el-oxi', t: 'όχι', tr: 'óchi', de: 'nein', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'el-freddo', t: 'ένας φρέντο εσπρέσο', tr: 'énas frédo espréso', de: 'ein Freddo Espresso (eiskalter Espresso)', reg: 'neutral', cat: 'Café' },
    { id: 'el-ellinikos', t: 'ένας ελληνικός καφές', tr: 'énas ellinikós kafés', de: 'ein griechischer Mokka', reg: 'neutral', cat: 'Café' },
    { id: 'el-thaithela', t: 'θα ήθελα …', tr: 'tha íthela', de: 'ich hätte gern …', reg: 'neutral', cat: 'Café', ex: { t: 'Θα ήθελα έναν φρέντο εσπρέσο, παρακαλώ.', de: 'Ich hätte gern einen Freddo Espresso, bitte.' } },
    { id: 'el-sketo', t: 'σκέτο / μέτριο / γλυκό', tr: 'skéto / métrio / glikó', de: 'ohne Zucker / mittel / süß', reg: 'neutral', cat: 'Café' },
    { id: 'el-paketo', t: 'για πακέτο', tr: 'ja pakéto', de: 'zum Mitnehmen', reg: 'neutral', cat: 'Café' },
    { id: 'el-logariasmo', t: 'τον λογαριασμό, παρακαλώ', tr: 'ton logariasmó, parakaló', de: 'die Rechnung, bitte', reg: 'neutral', cat: 'Café' },
    { id: 'el-karta', t: 'μπορώ να πληρώσω με κάρτα;', tr: 'boró na pliróso me kárta', de: 'kann ich mit Karte zahlen?', reg: 'neutral', cat: 'Café' },
    { id: 'el-melene', t: 'με λένε …', tr: 'me léne', de: 'ich heiße …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'el-eimaiapo', t: 'είμαι από τη Γερμανία', tr: 'íme apó ti Jermanía', de: 'ich komme aus Deutschland', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'el-xairopoly', t: 'χαίρω πολύ', tr: 'chéro polí', de: 'freut mich', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'el-douleia', t: 'τι δουλειά κάνεις;', tr: 'ti duljá kánis', de: 'was arbeitest du?', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'el-file', t: 'φίλε', tr: 'fíle', de: 'Kumpel / Alter', reg: 'locker', cat: 'Kennenlernen' },
    { id: 'el-zesti', t: 'κάνει ζέστη', tr: 'káni zésti', de: 'es ist heiß', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'el-kourasmenos', t: 'κουρασμένος / κουρασμένη', tr: 'kurasménos / kurasméni', de: 'müde (m / w)', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'el-gym', t: 'το γυμναστήριο', tr: 'to jimnastírio', de: 'das Fitnessstudio', reg: 'neutral', cat: 'Fitness' },
    { id: 'el-seires', t: 'σου μένουν πολλά σετ;', tr: 'su ménun polá set', de: 'hast du noch viele Sätze?', reg: 'locker', cat: 'Fitness' },
    { id: 'el-talame', t: 'τα λέμε', tr: 'ta léme', de: 'bis dann / man sieht sich', reg: 'locker', cat: 'Abschied' },
    { id: 'el-geiamas', t: 'γεια μας!', tr: 'ja mas', de: 'Prost! (wörtlich: auf unsere Gesundheit)', reg: 'locker', cat: 'Abschied' },
  ],
  slang: [
    { id: 'el-s-re', t: 'ρε', tr: 're', de: 'hey / Mann / Alter (Verstärkungs-Partikel)', reg: 'slang', region: 'ganz Griechenland', situation: 'unter Freunden, bei Erstaunen oder Ärger', effect: 'freundschaftlich unter Bekannten, zu Fremden respektlos', politeness: 'locker', formal: '(einfach weglassen)', ex: { t: 'Έλα ρε, σοβαρά;', de: 'Ach komm, Mann, im Ernst?' } },
    { id: 'el-s-malaka', t: 'μαλάκα', tr: 'maláka', de: 'Idiot (Beleidigung) – unter engen Freunden auch „Alter“', reg: 'vulgär', region: 'ganz Griechenland', situation: 'nur unter sehr engen Freunden', effect: 'zu Fremden eine echte Beleidigung! Ton und Beziehung entscheiden alles', politeness: 'beleidigend', formal: 'φίλε (fíle)', ex: { t: 'Μαλάκα, πού είσαι;', de: '(unter Kumpels) Alter, wo bist du?' } },
    { id: 'el-s-komple', t: 'κομπλέ', tr: 'komplé', de: 'alles klar / passt', reg: 'slang', region: 'ganz Griechenland', situation: 'Absprachen, Bestätigung', effect: 'locker, positiv', politeness: 'locker', formal: 'εντάξει (endáxi)', ex: { t: 'Στις οκτώ; Κομπλέ.', de: 'Um acht? Passt.' } },
    { id: 'el-s-psinesai', t: 'ψήνεσαι;', tr: 'psínese', de: 'hast du Lust? / bist du dabei?', reg: 'slang', region: 'ganz Griechenland', situation: 'Pläne vorschlagen', effect: 'locker, jugendlich', politeness: 'locker', formal: 'θέλεις; (thélis)', ex: { t: 'Ψήνεσαι για καφέ;', de: 'Lust auf einen Kaffee?' } },
    { id: 'el-s-ante', t: 'άντε', tr: 'ánde', de: 'los / komm schon / na dann', reg: 'locker', region: 'ganz Griechenland', situation: 'Antreiben, Verabschieden, Ungeduld', effect: 'je nach Ton freundlich oder genervt', politeness: 'locker', formal: 'ελάτε / πάμε', ex: { t: 'Άντε, πάμε!', de: 'Los, gehen wir!' } },
    { id: 'el-s-tispaei', t: 'τα σπάει', tr: 'ta spái', de: 'ist der Hammer / rockt', reg: 'slang', region: 'ganz Griechenland', situation: 'Musik, Essen, Orte', effect: 'begeistert, jugendlich', politeness: 'locker', formal: 'είναι εξαιρετικό', ex: { t: 'Αυτό το μπαρ τα σπάει!', de: 'Diese Bar ist der Hammer!' } },
    { id: 'el-s-fasi', t: 'τι φάση;', tr: 'ti fási', de: 'was geht? / was ist los?', reg: 'jugend', region: 'ganz Griechenland', situation: 'Begrüßung unter Jüngeren', effect: 'jugendlich, locker', politeness: 'locker', formal: 'τι κάνεις;', ex: { t: 'Έλα, τι φάση;', de: 'Hey, was geht?' } },
    { id: 'el-s-arazo', t: 'αράζω', tr: 'arázo', de: 'chillen, abhängen', reg: 'slang', region: 'ganz Griechenland', situation: 'Freizeit, Wochenende', effect: 'locker', politeness: 'locker', formal: 'χαλαρώνω (chalaróno)', ex: { t: 'Το Σάββατο αράζουμε στην παραλία.', de: 'Am Samstag chillen wir am Strand.' } },
    { id: 'el-s-kapsoura', t: 'καψούρα', tr: 'kapsúra', de: 'heftige Verliebtheit / Liebeskummer', reg: 'flirt', region: 'ganz Griechenland', situation: 'über Gefühle und Dates reden', effect: 'humorvoll-dramatisch, sehr gebräuchlich', politeness: 'locker', formal: 'είμαι ερωτευμένος', ex: { t: 'Έχει μεγάλη καψούρα μαζί της.', de: 'Er ist total verknallt in sie.' } },
    { id: 'el-s-baxalo', t: 'μπάχαλο', tr: 'báchalo', de: 'Chaos, Durcheinander', reg: 'locker', region: 'ganz Griechenland', situation: 'Wohnung, Verkehr, Organisation', effect: 'locker, leicht humorvoll', politeness: 'locker', formal: 'ακαταστασία (akatastasía)', ex: { t: 'Το δωμάτιό μου είναι μπάχαλο.', de: 'Mein Zimmer ist ein Chaos.' } },
  ],
  lessons: [
    {
      id: 'el-l1', title: 'Begrüßen wie in Thessaloniki', goal: 'Hallo sagen, du oder Sie, sich vorstellen',
      words: ['el-geiasou', 'el-geiasas', 'el-kalimera', 'el-kalispera', 'el-tikaneis', 'el-tikanete', 'el-ela', 'el-melene', 'el-eimaiapo', 'el-xairopoly', 'el-nai', 'el-oxi'],
      grammar: { title: 'σου oder σας?', text: '„Γεια σου“ (ja su) sagt man zu einer Person, die man duzt. „Γεια σας“ (ja sas) zu Älteren, Fremden in formellen Situationen oder zu mehreren Leuten. Ganz wichtig: „ναι“ (nä) heißt JA.' },
      cloze: [
        { t: 'Με ___ Νίκλας.', answer: 'λένε', de: 'Ich heiße Niklas.' },
        { t: 'Τι ___; – Καλά, εσύ;', answer: 'κάνεις', de: 'Wie geht\'s? – Gut, und dir?' },
        { t: 'Είμαι ___ τη Γερμανία.', answer: 'από', de: 'Ich komme aus Deutschland.' },
      ],
      order: [
        { answer: 'με λένε Νίκλας χαίρω πολύ', de: 'ich heiße Niklas, freut mich' },
        { answer: 'είμαι από τη Γερμανία', de: 'ich komme aus Deutschland' },
      ],
    },
    {
      id: 'el-l2', title: 'Kaffee bestellen', goal: 'Griechischen Kaffee richtig bestellen und zahlen',
      words: ['el-freddo', 'el-ellinikos', 'el-thaithela', 'el-sketo', 'el-paketo', 'el-logariasmo', 'el-karta', 'el-efxaristo', 'el-parakalo', 'el-signomi'],
      grammar: { title: 'Zucker gleich mitbestellen', text: 'Beim griechischen Kaffee und Freddo sagt man sofort, wie süß er sein soll: σκέτο (ohne), μέτριο (mittel), γλυκό (süß). „Παρακαλώ“ heißt „bitte“ UND „gern geschehen“.' },
      cloze: [
        { t: 'Θα ___ έναν φρέντο εσπρέσο.', answer: 'ήθελα', de: 'Ich hätte gern einen Freddo Espresso.' },
        { t: 'Για ___, παρακαλώ.', answer: 'πακέτο', de: 'Zum Mitnehmen, bitte.' },
        { t: 'Τον ___, παρακαλώ.', answer: 'λογαριασμό', de: 'Die Rechnung, bitte.' },
      ],
      order: [
        { answer: 'θα ήθελα έναν ελληνικό καφέ μέτριο', de: 'ich hätte gern einen griechischen Kaffee, mittelsüß' },
        { answer: 'μπορώ να πληρώσω με κάρτα', de: 'kann ich mit Karte zahlen' },
      ],
    },
    {
      id: 'el-l3', title: 'Smalltalk & Gym', goal: 'Über Wetter, Müdigkeit und Training reden',
      words: ['el-douleia', 'el-file', 'el-zesti', 'el-kourasmenos', 'el-gym', 'el-seires', 'el-talame', 'el-geiamas'],
      grammar: { title: 'Männlich oder weiblich?', text: 'Adjektive passen sich an: Ein Mann sagt „είμαι κουρασμένος“, eine Frau „είμαι κουρασμένη“. Viele männliche Formen enden auf -ος, weibliche auf -η oder -α.' },
      cloze: [
        { t: 'Σήμερα κάνει πολλή ___.', answer: 'ζέστη', de: 'Heute ist es sehr heiß.' },
        { t: 'Τι ___ κάνεις;', answer: 'δουλειά', de: 'Was arbeitest du?' },
        { t: 'Τα ___ αύριο!', answer: 'λέμε', de: 'Bis morgen!' },
      ],
      order: [
        { answer: 'σου μένουν πολλά σετ', de: 'hast du noch viele Sätze' },
        { answer: 'είμαι πολύ κουρασμένος σήμερα', de: 'ich bin heute sehr müde' },
      ],
    },
  ],
  roleplays: [
    {
      id: 'el-r-cafe', title: 'Café an der Promenade', scene: 'Ein Café an der Nea Paralia in Thessaloniki. Es ist heiß, alle trinken Freddo.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: 'Γεια σας! Τι θα πάρετε;', npcDe: 'Hallo! Was nehmen Sie?', options: [
          { t: 'Θα ήθελα έναν φρέντο εσπρέσο, παρακαλώ.', de: 'Ich hätte gern einen Freddo Espresso, bitte.', reg: 'neutral', next: 'b', note: 'Perfekt und höflich.' },
          { t: 'Ένα φρέντο εσπρέσο σκέτο.', de: 'Einen Freddo Espresso ohne Zucker.', reg: 'locker', next: 'c', note: 'Gut! Du hast den Zucker gleich mitbestellt.' },
        ] },
        b: { npc: 'Πώς τον θέλετε; Σκέτο, μέτριο ή γλυκό;', npcDe: 'Wie möchten Sie ihn? Ohne, mittel oder süß?', options: [
          { t: 'Μέτριο, παρακαλώ.', de: 'Mittel, bitte.', reg: 'neutral', next: 'c' },
          { t: 'Σκέτο.', de: 'Ohne Zucker.', reg: 'neutral', next: 'c' },
        ] },
        c: { npc: 'Για εδώ ή για πακέτο;', npcDe: 'Für hier oder zum Mitnehmen?', options: [
          { t: 'Για πακέτο.', de: 'Zum Mitnehmen.', reg: 'neutral', next: 'd' },
          { t: 'Για εδώ, ευχαριστώ.', de: 'Für hier, danke.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Δύο ευρώ και πενήντα. Ορίστε!', npcDe: 'Zwei Euro fünfzig. Bitte schön!', options: [
          { t: 'Ευχαριστώ πολύ, καλή συνέχεια!', de: 'Vielen Dank, schönen Tag noch!', reg: 'neutral', next: null, note: '„Καλή συνέχεια“ (weiterhin alles Gute) ist ein sehr griechischer Abschied.' },
          { t: 'Ευχαριστώ, γεια!', de: 'Danke, tschüss!', reg: 'locker', next: null },
        ] },
      },
    },
    {
      id: 'el-r-party', title: 'Abends in Ladadika', scene: 'Du sitzt mit Freunden eines Freundes in einer Bar in Ladadika.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: 'Έλα, γεια σου! Είμαι ο Γιώργος. Εσύ;', npcDe: 'Hey, hallo! Ich bin Giorgos. Und du?', options: [
          { t: 'Γεια σου! Με λένε Νίκλας, χαίρω πολύ.', de: 'Hallo! Ich heiße Niklas, freut mich.', reg: 'neutral', next: 'b', note: 'Sehr gut.' },
          { t: 'Γεια σας, ονομάζομαι Νίκλας.', de: 'Guten Tag, mein Name ist Niklas.', reg: 'formell', next: 'b', note: 'Korrekt, aber in der Bar viel zu förmlich – hier duzt man.' },
        ] },
        b: { npc: 'Από πού είσαι;', npcDe: 'Woher kommst du?', options: [
          { t: 'Είμαι από τη Γερμανία.', de: 'Ich komme aus Deutschland.', reg: 'neutral', next: 'c' },
          { t: 'Είμαι από Γερμανία.', de: '(fast richtig) Ich komme aus Deutschland.', reg: 'neutral', next: 'c', note: 'Im Griechischen braucht das Land einen Artikel: „από τη Γερμανία“.' },
        ] },
        c: { npc: 'Τέλεια! Ψήνεσαι να πάμε μετά για σουβλάκια;', npcDe: 'Super! Hast du Lust, nachher Souvlaki essen zu gehen?', options: [
          { t: 'Κομπλέ, πάμε!', de: 'Passt, gehen wir!', reg: 'slang', next: 'd', note: 'Klingt total natürlich.' },
          { t: 'Ναι, ευχαριστώ.', de: 'Ja, danke.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Γεια μας, λοιπόν!', npcDe: 'Na dann, Prost!', options: [
          { t: 'Γεια μας!', de: 'Prost!', reg: 'locker', next: null, note: 'Beim Anstoßen schaut man sich in die Augen.' },
        ] },
      },
    },
    {
      id: 'el-r-gym', title: 'Im Gymnastírio', scene: 'Jemand trainiert an der Bank, die du brauchst.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: '(Jemand macht gerade einen Satz.)', npcDe: '', options: [
          { t: 'Συγγνώμη φίλε, σου μένουν πολλά σετ;', de: 'Sorry, Kumpel, hast du noch viele Sätze?', reg: 'locker', next: 'b', note: 'Genau so.' },
          { t: 'Ρε, τελείωσες;', de: 'Hey, bist du fertig?', reg: 'slang', next: 'b', note: '„Ρε“ zu Fremden kann frech klingen.' },
        ] },
        b: { npc: 'Ένα ακόμα και είναι δικός σου.', npcDe: 'Noch einer, dann gehört sie dir.', options: [
          { t: 'Κομπλέ, ευχαριστώ!', de: 'Passt, danke!', reg: 'locker', next: null },
        ] },
      },
    },
    {
      id: 'el-r-chat', title: 'Nachricht an einen Freund', scene: 'Dein Freund Nikos schreibt dir am Freitagabend.', start: 'a', level: 'A2',
      nodes: {
        a: { npc: 'έλα ρε, τι λέει; ψήνεσαι για τσίπουρα απόψε;', npcDe: 'Hey, was geht? Hast du Lust auf Tsipouro heute Abend?', options: [
          { t: 'Πάμε! Πού και τι ώρα;', de: 'Klar! Wo und wann?', reg: 'locker', next: 'b', note: 'Kurz, locker, perfekt für den Chat.' },
          { t: 'Καλησπέρα. Θα ήθελα πολύ να έρθω.', de: 'Guten Abend. Ich würde sehr gerne kommen.', reg: 'formell', next: 'b', note: 'Richtig, aber im Chat mit Freunden viel zu steif.' },
        ] },
        b: { npc: 'στις 10 στην Καμάρα, μετά πάμε Λαδάδικα', npcDe: 'Um 10 an der Kamara, danach gehen wir nach Ladadika', options: [
          { t: 'Κομπλέ, τα λέμε!', de: 'Passt, bis dann!', reg: 'slang', next: 'c', note: '„Κομπλέ“ + „τα λέμε“ – so schreiben Griechen wirklich.' },
          { t: 'Άκυρο, δεν μπορώ απόψε 😕', de: 'Geht leider nicht, ich kann heute nicht 😕', reg: 'slang', next: 'c', note: '„Άκυρο“ = Plan abgesagt. Ehrlich und völlig okay.' },
        ] },
        c: { npc: 'οκ 👍', npcDe: 'Ok 👍', options: [
          { t: 'τπτ, φιλιά!', de: 'Nix zu danken, Küsschen!', reg: 'chat', next: null, note: '„Φιλιά“ (Küsse) ist unter Freunden – auch Männern – ein normaler Gruß.' },
        ] },
      },
    },
    {
      id: 'el-r-uni', title: 'Flirten an der Uni', scene: 'In der Mensa der Aristoteles-Universität sitzt jemand allein am Tisch.', start: 'a', level: 'A2',
      nodes: {
        a: { npc: '(Eine Studentin lächelt dich kurz an.)', npcDe: '', options: [
          { t: 'Γεια! Είναι ελεύθερη η θέση;', de: 'Hi! Ist der Platz frei?', reg: 'neutral', next: 'b', note: 'Unaufdringlicher Einstieg – genau richtig.' },
          { t: 'Είσαι πολύ όμορφη.', de: 'Du bist sehr schön.', reg: 'flirt', next: 'b', note: 'Als allererster Satz zu direkt. Erst ins Gespräch kommen.' },
        ] },
        b: { npc: 'Ναι, κάτσε. Δεν είσαι από εδώ, ε;', npcDe: 'Ja, setz dich. Du bist nicht von hier, oder?', options: [
          { t: 'Όχι, είμαι από τη Γερμανία. Κάνω Erasmus.', de: 'Nein, ich bin aus Deutschland. Ich mache Erasmus.', reg: 'neutral', next: 'c' },
          { t: 'Τόσο φαίνεται; 😄', de: 'Merkt man das so sehr? 😄', reg: 'locker', next: 'c', note: 'Humor kommt in Griechenland sehr gut an.' },
        ] },
        c: { npc: 'Χαχα, λίγο! Σου αρέσει η Σαλονίκη;', npcDe: 'Haha, ein bisschen! Gefällt dir Saloniki?', options: [
          { t: 'Πολύ! Θες να πάμε για καφέ κάποια στιγμή να μου δείξεις την πόλη;', de: 'Sehr! Wollen wir irgendwann einen Kaffee trinken und du zeigst mir die Stadt?', reg: 'flirt', next: 'd', note: 'Charmant: Interesse zeigen und einen Grund für ein Treffen geben.' },
          { t: 'Ναι, είναι ωραία.', de: 'Ja, ist schön.', reg: 'neutral', next: 'd', note: 'Höflich, aber das Gespräch schläft so schnell ein.' },
        ] },
        d: { npc: 'Γιατί όχι; Δώσε μου το κινητό σου.', npcDe: 'Warum nicht? Gib mir deine Nummer.', options: [
          { t: 'Τέλεια! Χάρηκα πολύ.', de: 'Super! Hat mich sehr gefreut.', reg: 'locker', next: null },
        ] },
      },
    },
    {
      id: 'el-r-dromos', title: 'Nach dem Weg zur Kamara', scene: 'Du stehst am Aristoteles-Platz und suchst die Kamara.', start: 'a', level: 'A1',
      nodes: {
        a: { npc: '(Ein älterer Herr liest Zeitung auf einer Bank.)', npcDe: '', options: [
          { t: 'Συγγνώμη, πού είναι η Καμάρα;', de: 'Entschuldigung, wo ist die Kamara?', reg: 'neutral', next: 'b', note: 'Klar und höflich.' },
          { t: 'Ρε, πού είναι η Καμάρα;', de: 'Hey, wo ist die Kamara?', reg: 'slang', next: 'b', note: '„Ρε“ zu einem älteren Fremden ist respektlos.' },
        ] },
        b: { npc: 'Ανεβείτε την Αριστοτέλους, στρίψτε δεξιά στην Εγνατία και περπατήστε δέκα λεπτά.', npcDe: 'Gehen Sie die Aristotelous hoch, biegen Sie rechts in die Egnatia ab und gehen Sie zehn Minuten.', options: [
          { t: 'Μπορείτε να το πείτε πιο αργά;', de: 'Können Sie das langsamer sagen?', reg: 'formell', next: 'c', note: 'Gut! Bei Älteren siezen (Endung -ετε).' },
          { t: 'Ευχαριστώ πολύ!', de: 'Vielen Dank!', reg: 'neutral', next: 'd' },
        ] },
        c: { npc: 'Ευθεία, μετά δεξιά. Δέκα λεπτά.', npcDe: 'Geradeaus, dann rechts. Zehn Minuten.', options: [
          { t: 'Ευχαριστώ πολύ!', de: 'Vielen Dank!', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Παρακαλώ, καλή βόλτα!', npcDe: 'Gern, schönen Spaziergang!', options: [
          { t: 'Ευχαριστώ, γεια σας!', de: 'Danke, auf Wiedersehen!', reg: 'neutral', next: null },
        ] },
      },
    },
  ],
  coachRules: [
    { pattern: 'από γερμανία', fix: 'από τη Γερμανία', why: 'Länder brauchen im Griechischen einen Artikel: „από τη Γερμανία“, „από την Ελλάδα“.' },
    { pattern: 'έχω \\d+ χρόνια', fix: 'είμαι … χρονών', why: 'Alter: „Είμαι 22 χρονών“ (wörtlich: Ich bin 22 Jahre).' },
    { pattern: 'ευχαριστό\\b', fix: 'ευχαριστώ', why: 'Am Ende steht ein ω (Omega): ευχαριστώ.' },
    { pattern: 'καλή μέρα', fix: 'καλημέρα', why: 'Als Gruß schreibt man es zusammen: „καλημέρα“. „Καλή μέρα“ getrennt = „einen schönen Tag“ (als Wunsch).' },
    { pattern: '\\?', fix: ';', why: 'Das griechische Fragezeichen sieht aus wie ein Semikolon: „Τι κάνεις;“' },
  ],
};
