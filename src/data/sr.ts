import type { LanguagePack } from './types';

export const sr: LanguagePack = {
  code: 'sr', name: 'Serbisch', native: 'Srpski', flag: '🇷🇸', city: 'Belgrad',
  speechLang: 'sr-RS', speechFallback: 'hr-HR', version: 1, scripts: 'sr',
  focus: 'Belgrad: ekavische Aussprache (lepo, mleko), viel „bre“ und „brate“, Treffpunkt „kod konja“, Splavovi an Save und Donau, Kafana-Kultur, der Wind Košava und Šatrovački (Silbentausch-Slang wie „konza“). Die meisten Slangwörter sind in ganz Serbien üblich – die App zeigt, was wirklich typisch Belgrad ist.',
  note: 'Serbisch wird mit kyrillischer und lateinischer Schrift geschrieben – beide sind korrekt. Hier steht die lateinische Schrift, die im Alltag und Chat sehr verbreitet ist. Gesprochen wird die Belgrader (ekavische) Aussprache. Auf iPhones gibt es oft keine serbische Stimme; dann wird die sehr ähnliche kroatische Stimme benutzt.',
  words: [
    { id: 'sr-zdravo', t: 'zdravo', de: 'hallo', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'sr-cao', t: 'ćao', de: 'hi / tschüss', reg: 'locker', cat: 'Begrüßung' },
    { id: 'sr-dobardan', t: 'dobar dan', de: 'guten Tag', reg: 'formell', cat: 'Begrüßung' },
    { id: 'sr-dobrojutro', t: 'dobro jutro', de: 'guten Morgen', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'sr-kakosi', t: 'kako si?', de: 'wie geht\'s dir?', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'sr-kakoste', t: 'kako ste?', de: 'wie geht es Ihnen?', reg: 'formell', cat: 'Begrüßung' },
    { id: 'sr-staima', t: 'šta ima?', de: 'was geht? / was gibt\'s Neues?', reg: 'locker', cat: 'Begrüßung', ex: { t: 'Ćao, šta ima? – Ništa posebno.', de: 'Hi, was geht? – Nichts Besonderes.' } },
    { id: 'sr-hvala', t: 'hvala', de: 'danke', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'sr-molim', t: 'molim', de: 'bitte / gern geschehen / wie bitte?', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'sr-izvinite', t: 'izvinite', de: 'Entschuldigung (Sie)', reg: 'formell', cat: 'Höflichkeit' },
    { id: 'sr-izvini', t: 'izvini', de: 'Entschuldigung (du)', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'sr-kafa', t: 'kafa', de: 'Kaffee', reg: 'neutral', cat: 'Café' },
    { id: 'sr-domaca', t: 'domaća kafa', de: 'Mokka („Hauskaffee“, gekocht)', reg: 'neutral', cat: 'Café' },
    { id: 'sr-moze', t: 'može …?', de: 'kann ich … haben? (wörtlich: geht …?)', reg: 'locker', cat: 'Café', ex: { t: 'Može jedan espreso sa mlekom?', de: 'Kann ich einen Espresso mit Milch haben?' } },
    { id: 'sr-jabih', t: 'ja bih …', de: 'ich hätte gern …', reg: 'neutral', cat: 'Café', ex: { t: 'Ja bih jednu kafu, molim.', de: 'Ich hätte gern einen Kaffee, bitte.' } },
    { id: 'sr-zaponeti', t: 'za poneti', de: 'zum Mitnehmen', reg: 'neutral', cat: 'Café' },
    { id: 'sr-racun', t: 'račun, molim', de: 'die Rechnung, bitte', reg: 'neutral', cat: 'Café' },
    { id: 'sr-kartica', t: 'mogu li da platim karticom?', de: 'kann ich mit Karte zahlen?', reg: 'neutral', cat: 'Café' },
    { id: 'sr-zovemse', t: 'zovem se …', de: 'ich heiße …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'sr-izne', t: 'ja sam iz Nemačke', de: 'ich komme aus Deutschland', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'sr-drago', t: 'drago mi je', de: 'freut mich', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'sr-cime', t: 'čime se baviš?', de: 'was machst du beruflich?', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'sr-vikend', t: 'vikend', de: 'Wochenende', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'sr-vruce', t: 'vruće je', de: 'es ist heiß', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'sr-umoran', t: 'umoran / umorna', de: 'müde (m / w)', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'sr-teretana', t: 'teretana', de: 'Fitnessstudio', reg: 'neutral', cat: 'Fitness' },
    { id: 'sr-serije', t: 'koliko ti je još serija ostalo?', de: 'wie viele Sätze hast du noch?', reg: 'neutral', cat: 'Fitness' },
    { id: 'sr-vidimose', t: 'vidimo se', de: 'wir sehen uns', reg: 'neutral', cat: 'Abschied' },
    { id: 'sr-ziveli', t: 'živeli!', de: 'Prost!', reg: 'neutral', cat: 'Abschied' },
  ],
  slang: [
    { id: 'sr-s-brate', t: 'brate', de: 'Bruder / Alter / Digga', reg: 'slang', region: 'ganz Serbien', situation: 'unter Freunden, sehr häufig', effect: 'freundschaftlich; bei Fremden oder Älteren zu locker', politeness: 'locker', formal: '(Name)', ex: { t: 'Brate, gde si?', de: 'Alter, wo bist du?' } },
    { id: 'sr-s-bre', t: 'bre', de: 'Mann / doch (Verstärkungs-Partikel)', reg: 'regional', region: 'Belgrad, Süd- und Zentralserbien', situation: 'Ungeduld, Betonung, Spaß', effect: 'sehr typisch; je nach Ton herzlich oder genervt', politeness: 'locker', formal: '(einfach weglassen)', ex: { t: 'Ajde bre, kasnimo!', de: 'Los, Mann, wir sind spät dran!' } },
    { id: 'sr-s-vazi', t: 'važi', de: 'okay / abgemacht', reg: 'locker', region: 'ganz Serbien', situation: 'Verabredungen, Zustimmung', effect: 'freundlich, alltäglich', politeness: 'locker', formal: 'u redu / dogovoreno', ex: { t: 'Vidimo se u osam? – Važi!', de: 'Sehen wir uns um acht? – Abgemacht!' } },
    { id: 'sr-s-nemafrke', t: 'nema frke', de: 'kein Stress / kein Problem', reg: 'slang', region: 'ganz Serbien', situation: 'Antwort auf Danke oder Entschuldigung', effect: 'locker, beruhigend', politeness: 'locker', formal: 'nema problema / nema na čemu', ex: { t: 'Izvini što kasnim. – Nema frke.', de: 'Sorry, dass ich spät bin. – Kein Stress.' } },
    { id: 'sr-s-smor', t: 'smor', de: 'langweilig / öde Sache', reg: 'slang', region: 'ganz Serbien', situation: 'Arbeit, Unterricht, Warten', effect: 'jugendlich-locker', politeness: 'locker', formal: 'dosadno', ex: { t: 'Ovaj film je totalni smor.', de: 'Der Film ist total öde.' } },
    { id: 'sr-s-lova', t: 'lova', de: 'Kohle, Geld', reg: 'slang', region: 'ganz Serbien', situation: 'über Geld reden', effect: 'locker', politeness: 'locker', formal: 'novac / pare', ex: { t: 'Nemam lovu za to.', de: 'Ich hab kein Geld dafür.' } },
    { id: 'sr-s-dzabe', t: 'džabe', de: 'umsonst (gratis) / vergeblich', reg: 'locker', region: 'ganz Serbien', situation: 'Angebote, vergebliche Mühe', effect: 'alltäglich', politeness: 'locker', formal: 'besplatno / uzalud', ex: { t: 'Ulaz je džabe!', de: 'Der Eintritt ist umsonst!' } },
    { id: 'sr-s-gotivim', t: 'gotivim', de: 'ich mag / feiere (jemanden, etwas)', reg: 'slang', region: 'ganz Serbien', situation: 'über Leute, Musik, Orte', effect: 'locker, herzlich', politeness: 'locker', formal: 'sviđa mi se', ex: { t: 'Gotivim ovaj kafić.', de: 'Ich mag dieses Café richtig.' } },
    { id: 'sr-s-lik', t: 'lik', de: 'Typ, Kerl', reg: 'slang', region: 'ganz Serbien', situation: 'über Dritte erzählen', effect: 'locker; kann je nach Ton abwertend sein', politeness: 'locker', formal: 'čovek / momak', ex: { t: 'Neki lik me je pitao za tebe.', de: 'Irgendein Typ hat nach dir gefragt.' } },
    { id: 'sr-s-jebote', t: 'jebote', de: 'verdammt / krass (derb)', reg: 'vulgär', region: 'ganz Serbien (sehr häufig)', situation: 'Überraschung, Ärger', effect: 'unter Freunden alltäglich, sonst grob unhöflich', politeness: 'unhöflich', formal: 'ma daj! / ne mogu da verujem', ex: { t: 'Jebote, koliko je skupo!', de: 'Krass, wie teuer!' } },
  ],
  lessons: [
    {
      id: 'sr-l1', title: 'Begrüßen wie in Belgrad', goal: 'Hallo sagen, du oder Sie, sich vorstellen',
      words: ['sr-zdravo', 'sr-cao', 'sr-dobardan', 'sr-dobrojutro', 'sr-kakosi', 'sr-kakoste', 'sr-staima', 'sr-zovemse', 'sr-izne', 'sr-drago', 'sr-vidimose'],
      grammar: { title: 'ti oder Vi?', text: '„Kako si?“ fragt man Freunde und Gleichaltrige, „Kako ste?“ Fremde, Ältere und mehrere Personen. Nach „iz“ (aus) ändert sich das Land: Nemačka → iz Nemačke, Srbija → iz Srbije.' },
      cloze: [
        { t: '___ se Niklas.', answer: 'Zovem', de: 'Ich heiße Niklas.' },
        { t: 'Ja sam iz ___.', answer: 'Nemačke', de: 'Ich komme aus Deutschland.' },
        { t: 'Drago mi ___.', answer: 'je', de: 'Freut mich.' },
      ],
      order: [
        { answer: 'zovem se Niklas i ja sam iz Nemačke', de: 'ich heiße Niklas und komme aus Deutschland' },
        { answer: 'ćao šta ima', de: 'hi, was geht' },
      ],
    },
    {
      id: 'sr-l2', title: 'Kafa trinken', goal: 'Im Café bestellen und zahlen',
      words: ['sr-kafa', 'sr-domaca', 'sr-moze', 'sr-jabih', 'sr-zaponeti', 'sr-racun', 'sr-kartica', 'sr-hvala', 'sr-molim', 'sr-izvinite', 'sr-izvini'],
      grammar: { title: '„Može …?“ und „da“ + Verb', text: 'Am natürlichsten bestellt man mit „Može …?“ („Geht …?“). Serbisch verbindet zwei Verben gern mit „da“: „Mogu li da platim?“ (Kann ich zahlen?). „Molim“ heißt bitte, gern geschehen und auch „wie bitte?“.' },
      cloze: [
        { t: '___ jedna kafa?', answer: 'Može', de: 'Kann ich einen Kaffee haben?' },
        { t: 'Mogu li da ___ karticom?', answer: 'platim', de: 'Kann ich mit Karte zahlen?' },
        { t: 'Za ___, molim.', answer: 'poneti', de: 'Zum Mitnehmen, bitte.' },
      ],
      order: [
        { answer: 'može jedan espreso sa mlekom', de: 'kann ich einen Espresso mit Milch haben' },
        { answer: 'mogu li da platim karticom', de: 'kann ich mit Karte zahlen' },
      ],
    },
    {
      id: 'sr-l3', title: 'Smalltalk & Teretana', goal: 'Über Wetter, Müdigkeit und Training reden',
      words: ['sr-cime', 'sr-vikend', 'sr-vruce', 'sr-umoran', 'sr-teretana', 'sr-serije', 'sr-ziveli'],
      grammar: { title: 'Männlich oder weiblich', text: 'Ein Mann sagt „umoran sam“, eine Frau „umorna sam“. Das „sam“ (bin) steht oft an zweiter Stelle im Satz: „Danas sam umoran“ (Heute bin ich müde).' },
      cloze: [
        { t: 'Danas ___ umoran.', answer: 'sam', de: 'Heute bin ich müde.' },
        { t: 'Čime se ___?', answer: 'baviš', de: 'Was machst du beruflich?' },
        { t: '___ je danas!', answer: 'Vruće', de: 'Heiß heute!' },
      ],
      order: [
        { answer: 'koliko ti je još serija ostalo', de: 'wie viele Sätze hast du noch' },
        { answer: 'šta radiš za vikend', de: 'was machst du am Wochenende' },
      ],
    },
  ],
  roleplays: [
    {
      id: 'sr-r-kafic', title: 'Kafić in Dorćol', scene: 'Ein gemütliches Café in Belgrad. Die Kellnerin kommt an deinen Tisch.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: 'Dobar dan! Izvolite?', npcDe: 'Guten Tag! Bitte schön? (Was darf es sein?)', options: [
          { t: 'Dobar dan, može jedna domaća kafa?', de: 'Guten Tag, kann ich einen Mokka haben?', reg: 'neutral', next: 'b', note: 'Perfekt – genau so bestellen Einheimische.' },
          { t: 'Hoću kafu.', de: 'Ich will Kaffee.', reg: 'neutral', next: 'b', note: 'Verständlich, aber recht direkt. Besser: „Može jedna kafa?“' },
        ] },
        b: { npc: 'Može. Nešto uz kafu?', npcDe: 'Klar. Etwas zum Kaffee?', options: [
          { t: 'Ne, hvala, to je sve.', de: 'Nein danke, das ist alles.', reg: 'neutral', next: 'c' },
          { t: 'Može i čaša vode?', de: 'Kann ich auch ein Glas Wasser haben?', reg: 'neutral', next: 'c' },
        ] },
        c: { npc: 'Izvolite. Prijatno!', npcDe: 'Bitte schön. Lass es dir schmecken!', options: [
          { t: 'Hvala! Račun, molim vas.', de: 'Danke! Die Rechnung, bitte.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Dvesta pedeset dinara.', npcDe: 'Zweihundertfünfzig Dinar.', options: [
          { t: 'Izvolite, hvala. Prijatno!', de: 'Bitte, danke. Schönen Tag!', reg: 'neutral', next: null, note: '„Prijatno“ ist ein vielseitiger, freundlicher Abschiedsgruß.' },
          { t: 'Mogu li da platim karticom?', de: 'Kann ich mit Karte zahlen?', reg: 'neutral', next: null, note: 'Gut gefragt – in kleinen Cafés ist Bargeld noch üblich.' },
        ] },
      },
    },
    {
      id: 'sr-r-drustvo', title: 'Neue Leute auf einem Splav', scene: 'Ein Partyschiff (splav) an der Save. Ein Freund stellt dich vor.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: 'Ćao! Ja sam Marko. Kako se zoveš?', npcDe: 'Hi! Ich bin Marko. Wie heißt du?', options: [
          { t: 'Ćao, zovem se Niklas. Drago mi je!', de: 'Hi, ich heiße Niklas. Freut mich!', reg: 'locker', next: 'b', note: 'Sehr gut.' },
          { t: 'Dobar dan, ja sam Niklas.', de: 'Guten Tag, ich bin Niklas.', reg: 'formell', next: 'b', note: 'Auf einer Party zu förmlich – hier sagt man „Ćao“.' },
        ] },
        b: { npc: 'Odakle si?', npcDe: 'Woher kommst du?', options: [
          { t: 'Iz Nemačke sam.', de: 'Ich bin aus Deutschland.', reg: 'neutral', next: 'c' },
          { t: 'Ja sam iz Nemačka.', de: '(fast richtig) Ich bin aus Deutschland.', reg: 'neutral', next: 'c', note: 'Nach „iz“ ändert sich die Endung: „iz Nemačke“.' },
        ] },
        c: { npc: 'Super, brate! Hoćeš piće?', npcDe: 'Super, Alter! Willst du was trinken?', options: [
          { t: 'Važi, može pivo!', de: 'Okay, gern ein Bier!', reg: 'locker', next: 'd', note: 'Klingt total natürlich.' },
          { t: 'Ne, hvala, nema frke.', de: 'Nein danke, alles gut.', reg: 'slang', next: 'd' },
        ] },
        d: { npc: 'Živeli!', npcDe: 'Prost!', options: [
          { t: 'Živeli!', de: 'Prost!', reg: 'neutral', next: null, note: 'Beim Anstoßen in die Augen schauen – das ist in Serbien wichtig.' },
        ] },
      },
    },
    {
      id: 'sr-r-teretana', title: 'In der Teretana', scene: 'Jemand trainiert an der Bank, die du brauchst.', level: 'A1', start: 'a',
      nodes: {
        a: { npc: '(Jemand macht gerade einen Satz.)', npcDe: '', options: [
          { t: 'Izvini, koliko ti je još serija ostalo?', de: 'Entschuldige, wie viele Sätze hast du noch?', reg: 'neutral', next: 'b', note: 'Höflich und klar.' },
          { t: 'Brate, jesi gotov?', de: 'Alter, bist du fertig?', reg: 'slang', next: 'b', note: 'Unter Jungs im Gym ganz normal.' },
        ] },
        b: { npc: 'Još jedna i tvoja je.', npcDe: 'Noch einer, dann gehört sie dir.', options: [
          { t: 'Važi, hvala!', de: 'Okay, danke!', reg: 'locker', next: null },
          { t: 'Nema frke, polako.', de: 'Kein Stress, lass dir Zeit.', reg: 'slang', next: null },
        ] },
      },
    },
    {
      id: 'sr-r-flert', title: 'Flirt im Kafić', scene: 'Ein Café in Dorćol. Am Nachbartisch sitzt jemand, mit dem du schon Blicke getauscht hast.', start: 'a', level: 'A2',
      nodes: {
        a: { npc: '(Sie schaut von ihrem Handy auf.)', npcDe: '', options: [
          { t: 'Izvini, da li je ovo mesto slobodno?', de: 'Entschuldige, ist der Platz frei?', reg: 'neutral', next: 'b', note: 'Unaufdringlicher Einstieg – genau richtig.' },
          { t: 'Ćao lepotice!', de: 'Hallo, Schöne!', reg: 'flirt', next: 'b', note: 'Klingt nach Anmachspruch – als erster Satz eher unangenehm.' },
        ] },
        b: { npc: 'Jeste, sedi. Nisi odavde, a?', npcDe: 'Ja, setz dich. Du bist nicht von hier, oder?', options: [
          { t: 'Nisam, iz Nemačke sam. Učim srpski.', de: 'Nein, ich bin aus Deutschland. Ich lerne Serbisch.', reg: 'neutral', next: 'c' },
          { t: 'Toliko se vidi? 😄', de: 'Sieht man das so sehr? 😄', reg: 'locker', next: 'c', note: 'Selbstironie kommt in Belgrad sehr gut an.' },
        ] },
        c: { npc: 'Haha, malo. Ali dobro pričaš! Kako ti se sviđa Beograd?', npcDe: 'Haha, ein bisschen. Aber du sprichst gut! Wie gefällt dir Belgrad?', options: [
          { t: 'Ludilo! Hoćeš da mi pokažeš neki dobar splav?', de: 'Wahnsinn! Zeigst du mir ein gutes Splav?', reg: 'flirt', next: 'd', note: 'Begeisterung plus ein Grund, sich wiederzusehen – charmant.' },
          { t: 'Lep je grad.', de: 'Schöne Stadt.', reg: 'neutral', next: 'd', note: 'Höflich, aber so endet das Gespräch schnell.' },
        ] },
        d: { npc: 'Može. Daj mi broj, javiću ti se.', npcDe: 'Klar. Gib mir deine Nummer, ich melde mich.', options: [
          { t: 'Važi! Drago mi je.', de: 'Abgemacht! Freut mich.', reg: 'locker', next: null },
        ] },
      },
    },
    {
      id: 'sr-r-chat', title: 'Nachrichten von Marko', scene: 'Dein Kumpel Marko schreibt dir am Samstag.', start: 'a', level: 'A2',
      nodes: {
        a: { npc: 'gde si brate, šta ima? idemo večeras na splav?', npcDe: 'Was geht, Bruder? Gehen wir heute Abend aufs Splav?', options: [
          { t: 'ajde, može! u koliko?', de: 'Komm, geht klar! Um wie viel Uhr?', reg: 'locker', next: 'b', note: 'Natürlicher Chat-Stil.' },
          { t: 'Poštovani Marko, rado ću doći.', de: 'Sehr geehrter Marko, ich komme gerne.', reg: 'formell', next: 'b', note: 'Wie ein Geschäftsbrief – im Chat unter Freunden komisch 😄' },
        ] },
        b: { npc: 'u 11 kod konja, vlj će biti gužva', npcDe: 'Um 11 beim Pferd, wahrscheinlich wird es voll', options: [
          { t: 'važi, vidimo se!', de: 'Abgemacht, wir sehen uns!', reg: 'locker', next: 'c', note: '„vlj“ = valjda (wahrscheinlich), „kod konja“ = Treffpunkt am Platz der Republik.' },
          { t: 'nzm, imam frku na poslu sutra', de: 'Weiß nicht, ich hab morgen Stress auf der Arbeit', reg: 'chat', next: 'c', note: '„nzm“ = ne znam, „frka“ = Stress.' },
        ] },
        c: { npc: 'ok, javi se 👊', npcDe: 'Ok, meld dich 👊', options: [
          { t: 'pozz!', de: 'Tschüss!', reg: 'chat', next: null },
        ] },
      },
    },
  ],
  coachRules: [
    { pattern: '\\biz nemačka\\b', fix: 'iz Nemačke', why: 'Nach „iz“ steht der Genitiv: Nemačka → iz Nemačke.' },
    { pattern: '\\biz srbija\\b', fix: 'iz Srbije', why: 'Nach „iz“ steht der Genitiv: Srbija → iz Srbije.' },
    { pattern: '\\bmogu li platiti\\b', fix: 'mogu li da platim', why: 'Nicht falsch, klingt aber kroatisch. In Serbien sagt man meist „da“ + Verb: „Mogu li da platim?“' },
    { pattern: '\\b(lijep|mlijek|bijel|vrijeme)', fix: 'lep, mleko, beo, vreme', why: 'Formen mit „ije“ sind kroatisch/bosnisch. In Belgrad spricht man „e“: lepo, mleko, vreme.' },
    { pattern: '\\bhoću (kafu|pivo|vodu)\\b', fix: 'Može …? / Ja bih …', why: '„Hoću“ (ich will) ist sehr direkt. Höflicher: „Može kafa?“ oder „Ja bih kafu“.' },
  ],
};
