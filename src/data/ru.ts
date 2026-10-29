import type { LanguagePack } from './types';

export const ru: LanguagePack = {
  code: 'ru', name: 'Russisch', native: 'Русский', flag: '🇷🇺', city: 'Moskau',
  speechLang: 'ru-RU', version: 1,
  note: 'Russisch in kyrillischer Schrift mit Betonungszeichen (´) als Lernhilfe – in normalen Texten stehen sie nicht. Die lateinische Umschrift ist eine Aussprachehilfe: ch = wie in „Bach“, tsch = „Tschüss“, sch = „Schule“, zh = wie „Garage“. Unbetontes o klingt meist wie a (молоко́ → „malakó“).',
  focus: 'Moskau: Akanje (unbetontes o wie a) ist Standard. Typisch Moskauer Wörter sind z. B. подъе́зд (St. Petersburg: пара́дная), бордю́р (поре́брик) und шаурма́ (шаве́рма). Die meisten Slangwörter sind landesweit, nicht nur in Moskau verbreitet – die App kennzeichnet das.',
  words: [
    { id: 'ru-privet', t: 'приве́т', de: 'hallo (du)', reg: 'locker', cat: 'greet', ex: { t: 'Приве́т! Как дела́?', de: 'Hallo! Wie geht\'s?' } },
    { id: 'ru-zdravstvujte', t: 'здра́вствуйте', de: 'guten Tag (Sie / mehrere)', reg: 'formell', cat: 'greet', note: 'das erste в wird nicht gesprochen' },
    { id: 'ru-dobroe', t: 'до́брое у́тро', de: 'guten Morgen', reg: 'neutral', cat: 'greet' },
    { id: 'ru-kakdela', t: 'как дела́?', de: 'wie geht\'s?', reg: 'neutral', cat: 'greet' },
    { id: 'ru-normalno', t: 'норма́льно', de: 'ganz okay', reg: 'locker', cat: 'greet', ex: { t: 'Как дела́? – Норма́льно, а у тебя́?', de: 'Wie geht\'s? – Ganz okay, und dir?' } },
    { id: 'ru-spasibo', t: 'спаси́бо', de: 'danke', reg: 'neutral', cat: 'greet' },
    { id: 'ru-pozhalujsta', t: 'пожа́луйста', de: 'bitte / gern geschehen', reg: 'neutral', cat: 'greet' },
    { id: 'ru-izvinite', t: 'извини́те', de: 'Entschuldigung (Sie)', reg: 'formell', cat: 'greet' },
    { id: 'ru-izvini', t: 'извини́', de: 'Entschuldigung (du)', reg: 'neutral', cat: 'greet' },
    { id: 'ru-da', t: 'да', de: 'ja', reg: 'neutral', cat: 'greet' },
    { id: 'ru-net', t: 'нет', de: 'nein', reg: 'neutral', cat: 'greet' },
    { id: 'ru-poka', t: 'пока́', de: 'tschüss', reg: 'locker', cat: 'greet' },
    { id: 'ru-dosvidanija', t: 'до свида́ния', de: 'auf Wiedersehen', reg: 'neutral', cat: 'greet' },
    { id: 'ru-menjazovut', t: 'меня́ зову́т …', de: 'ich heiße …', reg: 'neutral', cat: 'greet', ex: { t: 'Меня́ зову́т Ни́клас.', de: 'Ich heiße Niklas.' } },
    { id: 'ru-jaiz', t: 'я из Герма́нии', de: 'ich komme aus Deutschland', reg: 'neutral', cat: 'greet' },
    { id: 'ru-prijatno', t: 'о́чень прия́тно', de: 'freut mich sehr', reg: 'neutral', cat: 'greet' },
    { id: 'ru-kofe', t: 'ко́фе', de: 'Kaffee', reg: 'neutral', cat: 'food', note: 'grammatisch männlich: „оди́н ко́фе“' },
    { id: 'ru-mozhno', t: 'мо́жно …?', de: 'kann ich … haben? / darf ich?', reg: 'neutral', cat: 'food', ex: { t: 'Мо́жно капучи́но?', de: 'Kann ich einen Cappuccino haben?' } },
    { id: 'ru-schet', t: 'счёт, пожа́луйста', de: 'die Rechnung, bitte', reg: 'neutral', cat: 'food' },
    { id: 'ru-kartoj', t: 'мо́жно ка́ртой?', de: 'kann ich mit Karte zahlen?', reg: 'neutral', cat: 'food' },
    { id: 'ru-ssoboj', t: 'с собо́й', de: 'zum Mitnehmen', reg: 'neutral', cat: 'food' },
    { id: 'ru-zdes', t: 'здесь', de: 'hier (zum Hiertrinken)', reg: 'neutral', cat: 'food' },
    { id: 'ru-shaurma', t: 'шаурма́', de: 'Schawarma (Fleisch im Fladenbrot)', reg: 'regional', cat: 'food', note: 'In Moskau „шаурма́“, in St. Petersburg „шаве́рма“' },
    { id: 'ru-metro', t: 'метро́', de: 'U-Bahn', reg: 'neutral', cat: 'travel' },
    { id: 'ru-gde', t: 'где …?', de: 'wo ist …?', reg: 'neutral', cat: 'city', ex: { t: 'Где ближа́йшее метро́?', de: 'Wo ist die nächste U-Bahn?' } },
    { id: 'ru-zal', t: 'тренажёрный зал', de: 'Fitnessstudio', reg: 'neutral', cat: 'fitness' },
    { id: 'ru-podhod', t: 'подхо́д', de: 'Satz (beim Training)', reg: 'neutral', cat: 'fitness', ex: { t: 'Ско́лько у тебя́ ещё подхо́дов?', de: 'Wie viele Sätze hast du noch?' } },
    { id: 'ru-ustal', t: 'я уста́л', de: 'ich bin müde (Mann)', reg: 'neutral', cat: 'smalltalk', note: 'Frau: я уста́ла' },
    { id: 'ru-vyhodnye', t: 'выходны́е', de: 'Wochenende', reg: 'neutral', cat: 'smalltalk', ex: { t: 'Что де́лаешь на выходны́х?', de: 'Was machst du am Wochenende?' } },
    { id: 'ru-chemzanimaeshsja', t: 'чем занима́ешься?', de: 'was machst du (beruflich)?', reg: 'neutral', cat: 'smalltalk' },
    { id: 'ru-uvidimsja', t: 'уви́димся', de: 'bis dann / wir sehen uns', reg: 'neutral', cat: 'greet' },
    { id: 'ru-drug', t: 'друг', de: 'Freund', reg: 'neutral', cat: 'family' },
  ],
  slang: [
    { id: 'ru-s-norm', t: 'норм', de: 'passt / okay', reg: 'slang', region: 'ganz Russland', situation: 'Antwort auf „Wie geht\'s?“, Chat', effect: 'locker, sehr häufig', politeness: 'locker', formal: 'норма́льно', ex: { t: 'Как дела́? – Норм.', de: 'Wie geht\'s? – Passt.' } },
    { id: 'ru-s-blin', t: 'блин', de: 'Mist! (wörtl.: Pfannkuchen)', reg: 'locker', region: 'ganz Russland', situation: 'Ärger, Überraschung – harmloser Ersatz für ein derbes Wort', effect: 'gesellschaftlich akzeptiert', politeness: 'locker', formal: 'ой / жаль', ex: { t: 'Блин, я опозда́л!', de: 'Mist, ich bin zu spät!' } },
    { id: 'ru-s-krinzh', t: 'кринж', de: 'Fremdscham, peinlich (aus engl. „cringe“)', reg: 'jugend', region: 'ganz Russland, Internet', situation: 'Jugend, Social Media', effect: 'sehr jugendlich', politeness: 'locker', formal: 'сты́дно / нело́вко', ex: { t: 'Э́то тако́й кринж!', de: 'Das ist so peinlich!' } },
    { id: 'ru-s-kruto', t: 'кру́то', de: 'cool, krass', reg: 'locker', region: 'ganz Russland', situation: 'Begeisterung, alle Altersgruppen', effect: 'positiv', politeness: 'freundlich', formal: 'отли́чно', ex: { t: 'Вот э́то кру́то!', de: 'Das ist echt cool!' } },
    { id: 'ru-s-pofig', t: 'по́фиг', de: 'egal', reg: 'slang', region: 'ganz Russland', situation: 'unter Freunden', effect: 'kann gleichgültig oder unhöflich wirken', politeness: 'locker', formal: 'всё равно́', ex: { t: 'Мне по́фиг.', de: 'Mir egal.' } },
    { id: 'ru-s-babki', t: 'ба́бки', de: 'Kohle, Geld', reg: 'slang', region: 'ganz Russland', situation: 'über Geld unter Freunden', effect: 'locker', politeness: 'locker', formal: 'де́ньги', ex: { t: 'У меня́ нет ба́бок.', de: 'Ich hab keine Kohle.' } },
    { id: 'ru-s-chuvak', t: 'чува́к', de: 'Typ, Alter', reg: 'slang', region: 'ganz Russland', situation: 'Anrede unter Freunden, Erzählen', effect: 'locker, eher jugendlich', politeness: 'vertraut', formal: '(Name)', ex: { t: 'Чува́к, ты где?', de: 'Alter, wo bist du?' } },
    { id: 'ru-s-tusit', t: 'туси́ть', de: 'abhängen, feiern', reg: 'slang', region: 'ganz Russland', situation: 'Ausgehen, Partys', effect: 'locker, jugendlich', politeness: 'locker', formal: 'проводи́ть вре́мя', ex: { t: 'Пошли́ туси́ть!', de: 'Lass uns feiern gehen!' } },
    { id: 'ru-s-kapec', t: 'капе́ц', de: 'krass / Katastrophe (entschärft)', reg: 'slang', region: 'ganz Russland', situation: 'Überraschung oder Ärger', effect: 'harmlose Version eines Mat-Wortes', politeness: 'locker', formal: 'кошма́р', ex: { t: 'Капе́ц, ско́лько наро́ду!', de: 'Krass, wie viele Leute!' } },
    { id: 'ru-s-pizdec', t: 'пизде́ц', de: 'totale Katastrophe (Mat, sehr derb)', reg: 'vulgär', region: 'ganz Russland', situation: 'nur zum Verstehen; unter engen Freunden', effect: 'Mat (russ. Vulgärsprache) – gesellschaftlich tabu, in Medien verboten', politeness: 'vulgär', formal: 'кошма́р / капе́ц', ex: { t: 'Про́бки – про́сто пизде́ц.', de: 'Der Stau ist eine totale Katastrophe.' } },
  ],
  lessons: [
    {
      id: 'ru-l1', title: 'Hallo in Moskau', goal: 'Begrüßen, du oder Sie, sich vorstellen',
      words: ['ru-privet', 'ru-zdravstvujte', 'ru-dobroe', 'ru-kakdela', 'ru-normalno', 'ru-spasibo', 'ru-pozhalujsta', 'ru-poka', 'ru-menjazovut', 'ru-jaiz', 'ru-prijatno', 'ru-uvidimsja'],
      grammar: { title: 'Приве́т oder Здра́вствуйте?', text: '„Приве́т“ sagst du Freunden und Gleichaltrigen, „Здра́вствуйте“ allen anderen. Betonung ist im Russischen frei – deshalb zeigt die App sie mit einem Akzent (´) an.' },
      cloze: [
        { t: 'Меня́ ___ Ни́клас.', answer: 'зовут', de: 'Ich heiße Niklas.' },
        { t: 'Как ___? – Норма́льно.', answer: 'дела', de: 'Wie geht\'s? – Ganz okay.' },
        { t: 'Я из ___.', answer: 'Германии', de: 'Ich komme aus Deutschland.' },
      ],
      order: [
        { answer: 'меня зовут Никлас я из Германии', de: 'ich heiße Niklas, ich komme aus Deutschland' },
        { answer: 'привет как дела', de: 'hallo, wie geht\'s' },
      ],
    },
    {
      id: 'ru-l2', title: 'Kaffee & Schawarma', goal: 'Bestellen, bezahlen, mitnehmen',
      words: ['ru-kofe', 'ru-mozhno', 'ru-schet', 'ru-kartoj', 'ru-ssoboj', 'ru-zdes', 'ru-shaurma', 'ru-spasibo', 'ru-izvinite', 'ru-izvini'],
      grammar: { title: '„Мо́жно …?“', text: '„Мо́жно …?“ (darf ich / geht …?) ist die einfachste höfliche Bitte: „Мо́жно ко́фе?“, „Мо́жно ка́ртой?“. „Я хочу́ …“ (ich will) klingt im Café sehr direkt.' },
      cloze: [
        { t: '___ капучи́но?', answer: 'Можно', de: 'Kann ich einen Cappuccino haben?' },
        { t: 'С ___, пожа́луйста.', answer: 'собой', de: 'Zum Mitnehmen, bitte.' },
        { t: 'Мо́жно ___?', answer: 'картой', de: 'Kann ich mit Karte zahlen?' },
      ],
      order: [
        { answer: 'можно один кофе с собой', de: 'kann ich einen Kaffee zum Mitnehmen haben' },
        { answer: 'можно счёт пожалуйста', de: 'die Rechnung bitte' },
      ],
    },
    {
      id: 'ru-l3', title: 'Metro, Gym & Wochenende', goal: 'Nach dem Weg fragen, im Gym reden, Smalltalk',
      words: ['ru-metro', 'ru-gde', 'ru-zal', 'ru-podhod', 'ru-ustal', 'ru-vyhodnye', 'ru-chemzanimaeshsja', 'ru-drug', 'ru-da', 'ru-net', 'ru-dosvidanija'],
      grammar: { title: 'Männlich oder weiblich in der Vergangenheit', text: 'In der Vergangenheit zeigt das Verb das Geschlecht: ein Mann sagt „я уста́л“, eine Frau „я уста́ла“. Gleiches gilt für „я был / я была́“ (ich war).' },
      cloze: [
        { t: 'Где ___ метро́?', answer: 'ближайшее', de: 'Wo ist die nächste U-Bahn?' },
        { t: 'Что де́лаешь на ___?', answer: 'выходных', de: 'Was machst du am Wochenende?' },
        { t: 'Ско́лько у тебя́ ещё ___?', answer: 'подходов', de: 'Wie viele Sätze hast du noch?' },
      ],
      order: [
        { answer: 'я очень устал сегодня', de: 'ich bin heute sehr müde' },
        { answer: 'что делаешь на выходных', de: 'was machst du am Wochenende' },
      ],
    },
  ],
  roleplays: [
    {
      id: 'ru-r-kofe', title: 'Coffeeshop an der Tverskaja', scene: 'Ein volles Café im Zentrum Moskaus. Die Barista hat es eilig.', start: 'a', level: 'A1',
      nodes: {
        a: { npc: 'Здра́вствуйте! Что вам?', npcDe: 'Guten Tag! Was darf\'s sein?', options: [
          { t: 'Здра́вствуйте! Мо́жно капучи́но?', de: 'Guten Tag! Kann ich einen Cappuccino haben?', reg: 'neutral', next: 'b', note: 'Perfekt – höflich und natürlich.' },
          { t: 'Я хочу́ ко́фе.', de: 'Ich will Kaffee.', reg: 'neutral', next: 'b', note: 'Verständlich, aber sehr direkt. Besser: „Мо́жно …?“' },
          { t: 'Приве́т, капучи́но, пожа́луйста.', de: 'Hi, einen Cappuccino bitte.', reg: 'locker', next: 'b', note: 'In jungen Cafés okay. Bei Älteren lieber „Здра́вствуйте“.' },
        ] },
        b: { npc: 'Здесь и́ли с собо́й?', npcDe: 'Hier oder zum Mitnehmen?', options: [
          { t: 'С собо́й.', de: 'Zum Mitnehmen.', reg: 'neutral', next: 'c' },
          { t: 'Здесь, спаси́бо.', de: 'Hier, danke.', reg: 'neutral', next: 'c' },
        ] },
        c: { npc: 'Три́ста пятьдеся́т рубле́й. Ка́ртой?', npcDe: 'Dreihundertfünfzig Rubel. Mit Karte?', options: [
          { t: 'Да, ка́ртой.', de: 'Ja, mit Karte.', reg: 'neutral', next: 'd' },
          { t: 'Нет, нали́чными.', de: 'Nein, bar.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Ва́ш капучи́но. Хоро́шего дня!', npcDe: 'Ihr Cappuccino. Schönen Tag!', options: [
          { t: 'Спаси́бо, и вам!', de: 'Danke, Ihnen auch!', reg: 'neutral', next: null, note: '„И вам“ = „Ihnen auch“ – die Standardantwort.' },
          { t: 'Спс!', de: 'Danke! (Chat-Kürzel)', reg: 'chat', next: null, note: '„Спс“ schreibt man im Chat – gesprochen klingt es seltsam. Sag „Спаси́бо“.' },
        ] },
      },
    },
    {
      id: 'ru-r-metro', title: 'Verlaufen in der Metro', scene: 'Du stehst am Umstieg in der Moskauer Metro und findest den Weg nicht.', start: 'a', level: 'A1',
      nodes: {
        a: { npc: '(Eine ältere Frau wartet neben dir.)', npcDe: '', options: [
          { t: 'Извини́те, как дое́хать до Парка Го́рького?', de: 'Entschuldigung, wie komme ich zum Gorki-Park?', reg: 'neutral', next: 'b', note: 'Höflich mit „Извини́те“ – genau richtig bei Fremden.' },
          { t: 'Э, где Парк Го́рького?', de: 'Äh, wo ist der Gorki-Park?', reg: 'locker', next: 'b', note: 'Zu knapp für eine ältere Fremde. Immer mit „Извини́те“ anfangen.' },
        ] },
        b: { npc: 'Вам на́до на кольцеву́ю, пото́м одна́ ста́нция до «Октя́брьской».', npcDe: 'Sie müssen auf die Ringlinie, dann eine Station bis „Oktjabrskaja“.', options: [
          { t: 'Повтори́те, пожа́луйста, поме́дленнее.', de: 'Wiederholen Sie bitte, langsamer.', reg: 'formell', next: 'c', note: 'Sehr nützlicher Satz!' },
          { t: 'Поня́тно, спаси́бо большо́е!', de: 'Verstanden, vielen Dank!', reg: 'neutral', next: 'd' },
        ] },
        c: { npc: 'Кольцева́я ли́ния. Одна́ ста́нция. «Октя́брьская».', npcDe: 'Ringlinie. Eine Station. Oktjabrskaja.', options: [
          { t: 'Спаси́бо большо́е!', de: 'Vielen Dank!', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Не́ за что. Уда́чи!', npcDe: 'Keine Ursache. Viel Glück!', options: [
          { t: 'До свида́ния!', de: 'Auf Wiedersehen!', reg: 'neutral', next: null },
        ] },
      },
    },
    {
      id: 'ru-r-znakomstvo', title: 'Kennenlernen auf einer Party', scene: 'Eine Wohnungsparty in Moskau. Jemand setzt sich neben dich.', start: 'a', level: 'A2',
      nodes: {
        a: { npc: 'Приве́т! Я Ка́тя. А ты?', npcDe: 'Hi! Ich bin Katja. Und du?', options: [
          { t: 'Приве́т! Я Ни́клас, о́чень прия́тно.', de: 'Hi! Ich bin Niklas, freut mich.', reg: 'neutral', next: 'b', note: 'Natürlich und freundlich.' },
          { t: 'Здра́вствуйте, меня́ зову́т Ни́клас.', de: 'Guten Tag, mein Name ist Niklas.', reg: 'formell', next: 'b', note: 'Auf einer Party zu förmlich – hier sagt man „Приве́т“ und duzt.' },
        ] },
        b: { npc: 'Ой, у тебя́ акце́нт! Ты отку́да?', npcDe: 'Oh, du hast einen Akzent! Woher kommst du?', options: [
          { t: 'Из Герма́нии. Я учу́ ру́сский.', de: 'Aus Deutschland. Ich lerne Russisch.', reg: 'neutral', next: 'c' },
          { t: 'Я из Герма́ния.', de: '(fast richtig) Ich bin aus Deutschland.', reg: 'neutral', next: 'c', note: 'Nach „из“ steht der Genitiv: „из Герма́нии“.' },
        ] },
        c: { npc: 'Кру́то! Ты хорошо́ говори́шь. Дава́й как-нибу́дь схо́дим на ко́фе?', npcDe: 'Cool! Du sprichst gut. Wollen wir mal einen Kaffee trinken gehen?', options: [
          { t: 'Дава́й! Дашь свой но́мер?', de: 'Gern! Gibst du mir deine Nummer?', reg: 'flirt', next: 'd', note: 'Locker und direkt – passt perfekt.' },
          { t: 'Да, с удово́льствием.', de: 'Ja, sehr gerne.', reg: 'neutral', next: 'd', note: 'Höflich und warm.' },
        ] },
        d: { npc: 'Коне́чно. Ски́нь мне сообще́ние в Телегра́ме.', npcDe: 'Klar. Schick mir eine Nachricht auf Telegram.', options: [
          { t: 'Договори́лись! Созвони́мся.', de: 'Abgemacht! Wir hören uns.', reg: 'locker', next: null, note: '„Договори́лись“ = „abgemacht“ – sehr nützlich.' },
        ] },
      },
    },
    {
      id: 'ru-r-chat', title: 'Nachrichten verstehen', scene: 'Dein Freund Dima schreibt dir. Was meint er – und was antwortest du?', start: 'a', level: 'A2',
      nodes: {
        a: { npc: 'прив, чё де́лаешь? го в бар щас', npcDe: 'Hi, was machst du? Lass uns jetzt in eine Bar gehen', options: [
          { t: 'прив! норм, го. где?', de: 'Hi! Passt, los. Wo?', reg: 'chat', next: 'b', note: 'Genau im Stil des Chats: „прив“ = приве́т, „го“ = los.' },
          { t: 'Здра́вствуйте, Дми́трий. Я согла́сен.', de: 'Guten Tag, Dmitri. Ich bin einverstanden.', reg: 'formell', next: 'b', note: 'Grammatisch richtig, im Chat aber wie ein Behördenbrief 😄' },
        ] },
        b: { npc: 'на Покро́вке, кста там ща́с наро́ду ваще мно́го', npcDe: 'Auf der Pokrowka, übrigens ist da gerade total viel los', options: [
          { t: 'ок, бу́ду че́рез полчаса́', de: 'Ok, bin in einer halben Stunde da', reg: 'chat', next: 'c', note: '„кста“ = кста́ти (übrigens), „ваще“ = вообще́ (total).' },
          { t: 'бли́н, я уста́л. мо́жет, за́втра?', de: 'Mist, ich bin müde. Vielleicht morgen?', reg: 'locker', next: 'c', note: 'Freundlich abgesagt – völlig okay.' },
        ] },
        c: { npc: 'ок, договори́лись 👍', npcDe: 'Ok, abgemacht 👍', options: [
          { t: 'спс, до встре́чи!', de: 'Danke, bis dann!', reg: 'chat', next: null, note: '„спс“ = спаси́бо – im Chat völlig normal.' },
        ] },
      },
    },
    {
      id: 'ru-r-zal', title: 'Im Fitnessstudio', scene: 'Du willst an die Hantelbank, aber jemand trainiert dort.', start: 'a', level: 'A1',
      nodes: {
        a: { npc: '(Ein Typ macht gerade einen Satz.)', npcDe: '', options: [
          { t: 'Извини́, ско́лько у тебя́ ещё подхо́дов?', de: 'Sorry, wie viele Sätze hast du noch?', reg: 'neutral', next: 'b', note: 'Genau so fragt man – im Gym duzt man sich meist.' },
          { t: 'Брата́н, ты ско́ро?', de: 'Alter, bist du bald fertig?', reg: 'slang', next: 'b', note: 'Unter Gleichaltrigen okay, klingt aber ungeduldig.' },
        ] },
        b: { npc: 'Ещё оди́н, и скамья́ твоя́.', npcDe: 'Noch einer, dann gehört die Bank dir.', options: [
          { t: 'Ок, спаси́бо!', de: 'Ok, danke!', reg: 'locker', next: null },
          { t: 'Без проблем, не торопи́сь.', de: 'Kein Problem, lass dir Zeit.', reg: 'neutral', next: null, note: 'Freundlich und entspannt.' },
        ] },
      },
    },
  ],
  coachRules: [
    { pattern: '\\bя есть (студент|немец|рабочий|\\p{L}+ист)', fix: 'я студе́нт (ohne „есть“)', why: 'Im Präsens fällt „sein“ weg: „Я студе́нт“. „Я есть“ heißt meist „ich esse“!' },
    { pattern: '\\bя (\\d+) (лет|год|года)\\b', fix: 'мне … лет', why: 'Alter mit Dativ: „Мне 25 лет“ (wörtlich: mir sind 25 Jahre).' },
    { pattern: '\\bиз германия\\b', fix: 'из Герма́нии', why: 'Nach „из“ steht der Genitiv: Герма́ния → из Герма́нии.' },
    { pattern: '\\bя нравится\\b', fix: 'мне нра́вится', why: '„нра́виться“ funktioniert umgekehrt: „Мне нра́вится Москва́“ (Moskau gefällt mir).' },
    { pattern: '\\bкак ты зовут\\b', fix: 'как тебя́ зову́т?', why: 'Wörtlich „Wie nennt man dich?“ – deshalb „тебя́“ (dich), nicht „ты“.' },
    { pattern: '\\bя хочу (кофе|чай|пиво|воду)\\b', fix: 'Мо́жно …? / Да́йте, пожа́луйста, …', why: '„Я хочу́“ ist korrekt, klingt beim Bestellen aber sehr direkt.' },
    { pattern: '\\bв москва\\b', fix: 'в Москве́ / в Москву́', why: 'Nach „в“ ändert sich die Endung: в Москве́ (wo?), в Москву́ (wohin?).' },
  ],
};
