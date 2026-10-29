import type { LanguagePack } from './types';

export const en: LanguagePack = {
  code: 'en', name: 'Englisch (UK)', native: 'English', flag: '🇬🇧', city: 'London',
  speechLang: 'en-GB', speechFallback: 'en-US', version: 1,
  note: 'Britisches Englisch mit Fokus auf London. Viele Slang-Wörter sind in den USA unüblich.',
  words: [
    { id: 'en-hello', t: 'hello', de: 'hallo', reg: 'neutral', cat: 'Begrüßung', ex: { t: 'Hello, nice to meet you.', de: 'Hallo, schön dich kennenzulernen.' } },
    { id: 'en-hiya', t: 'hiya', de: 'hi / hallo (locker)', reg: 'locker', cat: 'Begrüßung', ex: { t: 'Hiya, you alright?', de: 'Hi, alles gut?' } },
    { id: 'en-alright', t: 'you alright?', de: 'alles gut? (Begrüßung, keine echte Frage)', reg: 'locker', cat: 'Begrüßung', ex: { t: 'Alright mate? – Yeah, not bad, you?', de: 'Alles klar? – Ja, ganz gut, und du?' } },
    { id: 'en-goodmorning', t: 'good morning', de: 'guten Morgen', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'en-howareyou', t: 'how are you?', de: 'wie geht es dir/Ihnen?', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'en-thanks', t: 'thank you', de: 'danke', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'en-cheers', t: 'cheers', de: 'danke / prost / tschüss', reg: 'locker', cat: 'Höflichkeit', ex: { t: 'Cheers for the help!', de: 'Danke für die Hilfe!' } },
    { id: 'en-please', t: 'please', de: 'bitte', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'en-sorry', t: 'sorry', de: 'Entschuldigung / wie bitte?', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'en-excuseme', t: 'excuse me', de: 'entschuldigen Sie', reg: 'formell', cat: 'Höflichkeit' },
    { id: 'en-coffee', t: 'a coffee', de: 'ein Kaffee', reg: 'neutral', cat: 'Café' },
    { id: 'en-flatwhite', t: 'a flat white', de: 'ein Flat White (Kaffee mit Milchschaum)', reg: 'neutral', cat: 'Café' },
    { id: 'en-tea', t: 'a cup of tea / a cuppa', de: 'eine Tasse Tee', reg: 'locker', cat: 'Café' },
    { id: 'en-could', t: 'could I have …?', de: 'könnte ich … haben?', reg: 'neutral', cat: 'Café', ex: { t: 'Could I have a flat white, please?', de: 'Könnte ich einen Flat White haben, bitte?' } },
    { id: 'en-takeaway', t: 'to take away', de: 'zum Mitnehmen', reg: 'neutral', cat: 'Café' },
    { id: 'en-eatin', t: 'to eat in', de: 'zum Hieressen', reg: 'neutral', cat: 'Café' },
    { id: 'en-bill', t: 'the bill', de: 'die Rechnung', reg: 'neutral', cat: 'Café' },
    { id: 'en-card', t: 'can I pay by card?', de: 'kann ich mit Karte zahlen?', reg: 'neutral', cat: 'Café' },
    { id: 'en-name', t: 'my name is …', de: 'ich heiße …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'en-from', t: "I'm from …", de: 'ich komme aus …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'en-whatdoyoudo', t: 'what do you do?', de: 'was machst du beruflich?', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'en-mate', t: 'mate', de: 'Kumpel', reg: 'locker', cat: 'Kennenlernen' },
    { id: 'en-weekend', t: 'the weekend', de: 'das Wochenende', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'en-weather', t: 'the weather', de: 'das Wetter', reg: 'neutral', cat: 'Smalltalk', ex: { t: 'Lovely weather today, isn\'t it?', de: 'Schönes Wetter heute, oder?' } },
    { id: 'en-tired', t: 'tired', de: 'müde', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'en-gym', t: 'the gym', de: 'das Fitnessstudio', reg: 'neutral', cat: 'Fitness' },
    { id: 'en-workout', t: 'a workout', de: 'ein Training', reg: 'neutral', cat: 'Fitness' },
    { id: 'en-sets', t: 'how many sets have you got left?', de: 'wie viele Sätze hast du noch?', reg: 'neutral', cat: 'Fitness' },
    { id: 'en-workin', t: 'can I work in?', de: 'kann ich mich (abwechselnd) dazwischen schieben?', reg: 'locker', cat: 'Fitness' },
    { id: 'en-seeyou', t: 'see you later', de: 'bis später', reg: 'neutral', cat: 'Abschied' },
  ],
  slang: [
    { id: 'en-s-knackered', t: 'knackered', de: 'total erledigt, fix und fertig', reg: 'slang', region: 'ganz UK', situation: 'nach der Arbeit, nach dem Training', effect: 'normal unter Freunden, im Job leicht salopp', politeness: 'locker', formal: 'very tired / exhausted', ex: { t: "I'm absolutely knackered after that shift.", de: 'Ich bin nach der Schicht völlig fertig.' } },
    { id: 'en-s-gutted', t: 'gutted', de: 'total enttäuscht, am Boden', reg: 'slang', region: 'ganz UK', situation: 'verlorenes Spiel, abgesagte Pläne', effect: 'zeigt echte Enttäuschung, sehr gebräuchlich', politeness: 'locker', formal: 'very disappointed', ex: { t: "I didn't get the job – gutted.", de: 'Hab den Job nicht bekommen – total enttäuscht.' } },
    { id: 'en-s-chuffed', t: 'chuffed', de: 'total gefreut, stolz', reg: 'slang', region: 'ganz UK', situation: 'gute Nachrichten', effect: 'freundlich, positiv', politeness: 'locker', formal: 'very pleased', ex: { t: "I'm well chuffed with that result.", de: 'Ich freu mich riesig über das Ergebnis.' } },
    { id: 'en-s-skint', t: 'skint', de: 'pleite', reg: 'slang', region: 'ganz UK', situation: 'wenn man Einladungen ablehnt', effect: 'locker, ehrlich, nicht peinlich', politeness: 'locker', formal: "I don't have any money", ex: { t: "Can't come out tonight, I'm skint.", de: 'Kann heute nicht mit, ich bin pleite.' } },
    { id: 'en-s-fancy', t: 'fancy a …?', de: 'Lust auf …?', reg: 'locker', region: 'ganz UK', situation: 'Einladung unter Freunden/Kollegen', effect: 'freundlich, unverbindlich', politeness: 'höflich', formal: 'would you like …?', ex: { t: 'Fancy a pint after work?', de: 'Lust auf ein Bier nach der Arbeit?' } },
    { id: 'en-s-innit', t: 'innit', de: '…, oder? / ne? (Bestätigung)', reg: 'jugend', region: 'London, Südengland', situation: 'unter Jüngeren, sehr informell', effect: 'wirkt jugendlich; von Lernenden gesagt oft komisch', politeness: 'locker', formal: "isn't it?", ex: { t: "It's cold today, innit.", de: 'Kalt heute, ne?' } },
    { id: 'en-s-bare', t: 'bare', de: 'sehr / viele (als Verstärker)', reg: 'jugend', region: 'London (Multicultural London English)', situation: 'Jugendliche unter sich', effect: 'stark jugendlich, Erwachsene benutzen es kaum', politeness: 'locker', formal: 'a lot of / very', ex: { t: 'There was bare people at the party.', de: 'Auf der Party waren voll viele Leute.' } },
    { id: 'en-s-peng', t: 'peng', de: 'richtig gut / sehr attraktiv', reg: 'jugend', region: 'London', situation: 'Essen, Kleidung, Menschen', effect: 'jugendlich; über Personen kann es aufdringlich wirken', politeness: 'locker', formal: 'really good / attractive', ex: { t: 'This burger is peng.', de: 'Der Burger ist richtig gut.' } },
    { id: 'en-s-proper', t: 'proper', de: 'richtig, echt (als Verstärker)', reg: 'locker', region: 'ganz UK, v. a. Norden und London', situation: 'Alltag', effect: 'locker, neutral', politeness: 'locker', formal: 'really', ex: { t: "That was proper good.", de: 'Das war echt gut.' } },
    { id: 'en-s-taking', t: 'taking the piss', de: 'jemanden verarschen / unverschämt sein', reg: 'vulgär', region: 'ganz UK', situation: 'unter Freunden (Spaß) oder bei Ärger', effect: 'derb; im Job oder bei Fremden vermeiden', politeness: 'unhöflich', formal: "you're joking / that's unreasonable", ex: { t: "£8 for a coffee? They're taking the piss.", de: '8 Pfund für einen Kaffee? Die spinnen doch.' } },
    { id: 'en-s-bloody', t: 'bloody', de: 'verdammt (Verstärker)', reg: 'vulgär', region: 'ganz UK, Australien', situation: 'Ärger oder Begeisterung', effect: 'mild derb, heute in vielen Situationen akzeptiert, aber nicht formell', politeness: 'unhöflich', formal: 'very / really', ex: { t: "It's bloody freezing.", de: 'Es ist verdammt kalt.' } },
  ],
  lessons: [
    {
      id: 'en-l1', title: 'Begrüßen wie in London', goal: 'Leute locker und höflich begrüßen und verabschieden',
      words: ['en-hello', 'en-hiya', 'en-alright', 'en-goodmorning', 'en-howareyou', 'en-thanks', 'en-cheers', 'en-seeyou', 'en-name', 'en-from'],
      grammar: { title: '„You alright?“ ist keine echte Frage', text: 'In Großbritannien ist „Alright?“ oder „You alright?“ eine Begrüßung. Man antwortet kurz („Yeah, not bad, you?“) und erzählt nicht, wie es einem wirklich geht. „I am“ wird im Gespräch fast immer zu „I\'m“ verkürzt.' },
      cloze: [
        { t: 'Hiya, you ___?', answer: 'alright', de: 'Hi, alles gut?' },
        { t: "My ___ is Niklas.", answer: 'name', de: 'Ich heiße Niklas.' },
        { t: '___ for the help!', answer: 'Cheers', de: 'Danke für die Hilfe!' },
      ],
      order: [
        { answer: "I'm from Germany", de: 'Ich komme aus Deutschland' },
        { answer: 'nice to meet you', de: 'schön, dich kennenzulernen' },
      ],
    },
    {
      id: 'en-l2', title: 'Im Café bestellen', goal: 'Bestellen, bezahlen, nachfragen',
      words: ['en-coffee', 'en-flatwhite', 'en-tea', 'en-could', 'en-takeaway', 'en-eatin', 'en-bill', 'en-card', 'en-please', 'en-sorry', 'en-excuseme'],
      grammar: { title: 'Höflich bestellen mit „could“', text: '„I want a coffee“ klingt im Englischen unhöflich. Besser: „Could I have …, please?“ oder „Can I get …?“. Das „please“ ist in Großbritannien fast Pflicht. „Sorry?“ heißt oft einfach „Wie bitte?“.' },
      cloze: [
        { t: 'Could I ___ a flat white, please?', answer: 'have', de: 'Könnte ich einen Flat White haben, bitte?' },
        { t: 'Is that to eat in or to take ___?', answer: 'away', de: 'Zum Hieressen oder zum Mitnehmen?' },
        { t: 'Can I pay by ___?', answer: 'card', de: 'Kann ich mit Karte zahlen?' },
      ],
      order: [
        { answer: 'could I have a cup of tea please', de: 'könnte ich bitte eine Tasse Tee haben' },
        { answer: 'can I pay by card', de: 'kann ich mit Karte zahlen' },
      ],
    },
    {
      id: 'en-l3', title: 'Smalltalk & Fitnessstudio', goal: 'Über Wetter, Wochenende und Training plaudern',
      words: ['en-weekend', 'en-weather', 'en-tired', 'en-whatdoyoudo', 'en-mate', 'en-gym', 'en-workout', 'en-sets', 'en-workin'],
      grammar: { title: 'Rückfragen mit „isn\'t it?“', text: 'Mit einem kurzen Anhängsel macht man aus einer Aussage eine Einladung zum Gespräch: „Lovely day, isn\'t it?“, „You\'re new here, aren\'t you?“. Bei positiver Aussage folgt ein verneintes Anhängsel.' },
      cloze: [
        { t: 'Lovely weather today, ___ it?', answer: "isn't", de: 'Schönes Wetter heute, oder?' },
        { t: 'How many ___ have you got left?', answer: 'sets', de: 'Wie viele Sätze hast du noch?' },
        { t: 'What do you ___?', answer: 'do', de: 'Was machst du beruflich?' },
      ],
      order: [
        { answer: 'can I work in with you', de: 'kann ich mich bei dir abwechseln' },
        { answer: 'what are you up to this weekend', de: 'was machst du dieses Wochenende' },
      ],
    },
  ],
  roleplays: [
    {
      id: 'en-r-cafe', title: 'Café in Shoreditch', scene: 'Du stehst in einem kleinen Café in London. Hinter dir ist eine Schlange.', start: 'a',
      nodes: {
        a: { npc: "Hiya, what can I get you?", npcDe: 'Hi, was darf es sein?', options: [
          { t: 'Could I have a flat white, please?', de: 'Könnte ich einen Flat White haben, bitte?', reg: 'neutral', next: 'b', note: 'Perfekt – höflich und natürlich.' },
          { t: 'I want a coffee.', de: 'Ich will einen Kaffee.', reg: 'neutral', next: 'b', note: 'Verständlich, klingt aber fordernd. Besser: „Could I have …, please?“' },
          { t: "Alright? Can I grab a flat white?", de: 'Hi! Kann ich mir einen Flat White holen?', reg: 'locker', next: 'b', note: 'Sehr natürlich und locker – so reden viele Londoner.' },
        ] },
        b: { npc: 'Sure. Eat in or take away?', npcDe: 'Klar. Hier trinken oder mitnehmen?', options: [
          { t: 'Take away, please.', de: 'Zum Mitnehmen, bitte.', reg: 'neutral', next: 'c' },
          { t: 'To eat in, cheers.', de: 'Zum Hiertrinken, danke.', reg: 'locker', next: 'c', note: '„Cheers“ als Danke ist typisch britisch.' },
        ] },
        c: { npc: "That's £3.40. Card or cash?", npcDe: 'Das macht 3,40 £. Karte oder bar?', options: [
          { t: 'Card, please.', de: 'Karte, bitte.', reg: 'neutral', next: 'd' },
          { t: '£3.40? Bloody hell, that\'s steep.', de: '3,40? Meine Güte, ganz schön teuer.', reg: 'vulgär', next: 'd', note: 'Verständlich, aber „bloody hell“ zu Fremden kann unhöflich wirken.' },
        ] },
        d: { npc: 'Lovely, there you go. Have a good one!', npcDe: 'Super, bitte schön. Schönen Tag noch!', options: [
          { t: 'Cheers, you too!', de: 'Danke, dir auch!', reg: 'locker', next: null, note: 'Klassischer Abschluss.' },
          { t: 'Thank you very much, goodbye.', de: 'Vielen Dank, auf Wiedersehen.', reg: 'formell', next: null, note: 'Korrekt, im Café etwas steif.' },
        ] },
      },
    },
    {
      id: 'en-r-party', title: 'Neue Leute auf einer Hausparty', scene: 'Ein Freund hat dich zu einer Hausparty mitgenommen. Jemand spricht dich an.', start: 'a',
      nodes: {
        a: { npc: "Alright? I don't think we've met. I'm Sam.", npcDe: 'Hi! Ich glaube, wir kennen uns noch nicht. Ich bin Sam.', options: [
          { t: "Hiya, I'm Niklas. I came with Tom.", de: 'Hi, ich bin Niklas. Ich bin mit Tom gekommen.', reg: 'locker', next: 'b', note: 'Gut: Name plus Verbindung – das macht Smalltalk leicht.' },
          { t: 'Good evening. My name is Niklas.', de: 'Guten Abend. Mein Name ist Niklas.', reg: 'formell', next: 'b', note: 'Korrekt, auf einer Party aber sehr förmlich.' },
        ] },
        b: { npc: "Nice one. So where are you from?", npcDe: 'Cool. Und wo kommst du her?', options: [
          { t: "I'm from Germany, near Hamburg.", de: 'Ich komme aus Deutschland, bei Hamburg.', reg: 'neutral', next: 'c' },
          { t: 'Germany. You?', de: 'Deutschland. Und du?', reg: 'locker', next: 'c', note: 'Kurze Gegenfrage hält das Gespräch am Laufen.' },
        ] },
        c: { npc: "Oh nice! I'm from Leeds, but I've lived in London for ages. What do you do?", npcDe: 'Oh cool! Ich bin aus Leeds, wohne aber schon ewig in London. Was machst du so?', options: [
          { t: "I'm looking for work at the moment, in logistics.", de: 'Ich suche gerade Arbeit, in der Logistik.', reg: 'neutral', next: 'd' },
          { t: "Bit of this, bit of that. Mostly I'm knackered.", de: 'Mal dies, mal das. Meistens bin ich fertig.', reg: 'slang', next: 'd', note: 'Humorvoll und typisch britisch – kommt meist gut an.' },
        ] },
        d: { npc: "Fair enough! Fancy a drink? I'm heading to the kitchen.", npcDe: 'Verstehe! Lust auf was zu trinken? Ich geh in die Küche.', options: [
          { t: 'Yeah, go on then. Cheers!', de: 'Ja, gerne. Danke!', reg: 'locker', next: null, note: '„Go on then“ = typisch britisches „na gut, gern“.' },
          { t: "I'm alright, thanks.", de: 'Nein danke, passt schon.', reg: 'locker', next: null, note: 'Achtung: „I\'m alright“ heißt hier „Nein danke“.' },
        ] },
      },
    },
    {
      id: 'en-r-gym', title: 'Im Fitnessstudio', scene: 'Du willst an die Hantelbank, aber jemand trainiert dort.', start: 'a',
      nodes: {
        a: { npc: '(Jemand macht gerade einen Satz auf der Bank.)', npcDe: '', options: [
          { t: 'Sorry mate, how many sets have you got left?', de: 'Sorry, Kumpel, wie viele Sätze hast du noch?', reg: 'locker', next: 'b', note: 'Genau so fragt man im Gym.' },
          { t: 'Give me the bench.', de: 'Gib mir die Bank.', reg: 'neutral', next: 'b', note: 'Klingt aggressiv. Besser fragen, wie viele Sätze noch übrig sind.' },
        ] },
        b: { npc: 'Just two more. You can work in if you want.', npcDe: 'Nur noch zwei. Du kannst dich gern abwechseln.', options: [
          { t: 'Cheers, that would be great.', de: 'Danke, das wäre super.', reg: 'locker', next: 'c' },
          { t: "No worries, I'll wait.", de: 'Kein Stress, ich warte.', reg: 'locker', next: 'c' },
        ] },
        c: { npc: "All yours, mate. Have a good workout!", npcDe: 'Gehört dir. Gutes Training!', options: [
          { t: 'Cheers, you too!', de: 'Danke, dir auch!', reg: 'locker', next: null },
        ] },
      },
    },
  ],
  coachRules: [
    { pattern: '\\bi want (a|an|the)\\b', fix: 'Could I have …, please?', why: '„I want“ klingt beim Bestellen fordernd. Höflicher: „Could I have …, please?“' },
    { pattern: '\\bi am agree\\b', fix: 'I agree', why: '„agree“ ist ein Verb – kein „am“ davor.' },
    { pattern: '\\bsince (\\d+|two|three|four|five) (years|months|weeks|days)\\b', fix: 'for … years', why: 'Bei einer Zeitdauer benutzt man „for“ („for two years“). „since“ steht vor einem Zeitpunkt („since 2022“).' },
    { pattern: '\\bi am (\\d+) years\\b(?! old)', fix: "I'm … years old", why: 'Alter: „I\'m 22 years old“ oder einfach „I\'m 22“.' },
    { pattern: '\\bhow do you call\\b', fix: 'What do you call …?', why: 'Deutsches „Wie nennt man …“ wird zu „What do you call …?“' },
    { pattern: '\\bmake (a )?photo', fix: 'take a photo', why: 'Fotos „nimmt“ man auf Englisch: „take a photo“.' },
    { pattern: '\\bbecome (a|the|some|my)\\b', fix: 'get …', why: 'Achtung falscher Freund: „become“ heißt „werden“, nicht „bekommen“. Bekommen = „get“.' },
    { pattern: '\\bhe (go|have|do|want|like)\\b', fix: 'he goes / has / does / wants / likes', why: 'In der 3. Person Einzahl (he/she/it) bekommt das Verb ein -s.' },
  ],
};
