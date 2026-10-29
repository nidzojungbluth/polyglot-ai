import type { LanguagePack } from './types';

export const es: LanguagePack = {
  code: 'es', name: 'Spanisch (Spanien)', native: 'Español', flag: '🇪🇸', city: 'Madrid',
  speechLang: 'es-ES', speechFallback: 'es-MX', version: 1,
  note: 'Spanisch aus Spanien (Madrid). In Lateinamerika sind viele Slang-Wörter anders oder unbekannt; „vosotros“ gibt es dort im Alltag nicht.',
  words: [
    { id: 'es-hola', t: 'hola', de: 'hallo', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'es-buenas', t: 'buenas', de: 'hallo / Tag (kurz für buenos días/tardes)', reg: 'locker', cat: 'Begrüßung', ex: { t: '¡Buenas! ¿Qué tal?', de: 'Hallo! Wie geht\'s?' } },
    { id: 'es-quetal', t: '¿qué tal?', de: 'wie geht\'s?', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'es-buenosdias', t: 'buenos días', de: 'guten Morgen / guten Tag', reg: 'neutral', cat: 'Begrüßung' },
    { id: 'es-comoesta', t: '¿cómo está usted?', de: 'wie geht es Ihnen?', reg: 'formell', cat: 'Begrüßung' },
    { id: 'es-gracias', t: 'gracias', de: 'danke', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'es-porfa', t: 'por favor / porfa', de: 'bitte (porfa = locker)', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'es-perdona', t: 'perdona', de: 'Entschuldigung (du)', reg: 'neutral', cat: 'Höflichkeit' },
    { id: 'es-perdone', t: 'perdone', de: 'Entschuldigung (Sie)', reg: 'formell', cat: 'Höflichkeit' },
    { id: 'es-vale', t: 'vale', de: 'okay', reg: 'locker', cat: 'Höflichkeit', ex: { t: 'Nos vemos a las ocho. – ¡Vale!', de: 'Wir sehen uns um acht. – Okay!' } },
    { id: 'es-cafeconleche', t: 'un café con leche', de: 'ein Milchkaffee', reg: 'neutral', cat: 'Café' },
    { id: 'es-cortado', t: 'un cortado', de: 'Espresso mit etwas Milch', reg: 'neutral', cat: 'Café' },
    { id: 'es-caña', t: 'una caña', de: 'ein kleines Bier vom Fass', reg: 'neutral', cat: 'Café' },
    { id: 'es-meponesun', t: '¿me pones …?', de: 'kannst du mir … bringen? (typisch in Spanien)', reg: 'locker', cat: 'Café', ex: { t: '¿Me pones un cortado, por favor?', de: 'Bringst du mir einen Cortado, bitte?' } },
    { id: 'es-paratomar', t: 'para tomar aquí', de: 'zum Hiertrinken', reg: 'neutral', cat: 'Café' },
    { id: 'es-parallevar', t: 'para llevar', de: 'zum Mitnehmen', reg: 'neutral', cat: 'Café' },
    { id: 'es-cuenta', t: 'la cuenta', de: 'die Rechnung', reg: 'neutral', cat: 'Café' },
    { id: 'es-tarjeta', t: '¿puedo pagar con tarjeta?', de: 'kann ich mit Karte zahlen?', reg: 'neutral', cat: 'Café' },
    { id: 'es-mellamo', t: 'me llamo …', de: 'ich heiße …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'es-soyde', t: 'soy de …', de: 'ich komme aus …', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'es-aquetededicas', t: '¿a qué te dedicas?', de: 'was machst du beruflich?', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'es-encantado', t: 'encantado / encantada', de: 'freut mich', reg: 'neutral', cat: 'Kennenlernen' },
    { id: 'es-findesemana', t: 'el fin de semana', de: 'das Wochenende', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'es-calor', t: '¡qué calor!', de: 'was für eine Hitze!', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'es-cansado', t: 'cansado / cansada', de: 'müde', reg: 'neutral', cat: 'Smalltalk' },
    { id: 'es-gimnasio', t: 'el gimnasio / el gym', de: 'das Fitnessstudio', reg: 'neutral', cat: 'Fitness' },
    { id: 'es-series', t: '¿te quedan muchas series?', de: 'hast du noch viele Sätze?', reg: 'neutral', cat: 'Fitness' },
    { id: 'es-hastaluego', t: 'hasta luego', de: 'bis später / tschüss', reg: 'neutral', cat: 'Abschied' },
    { id: 'es-nosvemos', t: 'nos vemos', de: 'wir sehen uns', reg: 'locker', cat: 'Abschied' },
  ],
  slang: [
    { id: 'es-s-tio', t: 'tío / tía', de: 'Alter / Typ / Kumpel (wörtlich: Onkel/Tante)', reg: 'slang', region: 'Spanien', situation: 'unter Freunden, sehr häufig', effect: 'freundschaftlich; bei Fremden oder Älteren zu locker', politeness: 'locker', formal: 'amigo / (Name)', ex: { t: 'Tío, ¿has visto el partido?', de: 'Alter, hast du das Spiel gesehen?' } },
    { id: 'es-s-guay', t: 'guay', de: 'cool, toll', reg: 'slang', region: 'Spanien', situation: 'Alltag, alle Altersgruppen', effect: 'freundlich, leicht jugendlich', politeness: 'locker', formal: 'genial / muy bien', ex: { t: '¡Qué guay tu chaqueta!', de: 'Wie cool ist deine Jacke!' } },
    { id: 'es-s-mola', t: 'mola / me mola', de: 'ist cool / gefällt mir', reg: 'slang', region: 'Spanien', situation: 'Musik, Pläne, Klamotten', effect: 'locker, positiv', politeness: 'locker', formal: 'me gusta mucho', ex: { t: 'Me mola mucho este bar.', de: 'Die Bar gefällt mir voll.' } },
    { id: 'es-s-curro', t: 'el curro / currar', de: 'die Arbeit / arbeiten', reg: 'slang', region: 'Spanien', situation: 'über den Job reden', effect: 'normal unter Bekannten', politeness: 'locker', formal: 'el trabajo / trabajar', ex: { t: 'Mañana curro a las siete.', de: 'Morgen arbeite ich um sieben.' } },
    { id: 'es-s-flipar', t: 'flipar / estoy flipando', de: 'baff sein / ich fass es nicht', reg: 'slang', region: 'Spanien', situation: 'Überraschung (positiv oder negativ)', effect: 'locker, ausdrucksstark', politeness: 'locker', formal: 'estoy muy sorprendido', ex: { t: '¿Cien euros? Estoy flipando.', de: 'Hundert Euro? Ich fass es nicht.' } },
    { id: 'es-s-quefuerte', t: '¡qué fuerte!', de: 'krass! / heftig!', reg: 'locker', region: 'Spanien', situation: 'Reaktion auf Neuigkeiten, Klatsch', effect: 'locker, zeigt Anteilnahme', politeness: 'locker', formal: '¡qué sorpresa! / ¡increíble!', ex: { t: '¿Se han separado? ¡Qué fuerte!', de: 'Die haben sich getrennt? Krass!' } },
    { id: 'es-s-enplan', t: 'en plan', de: 'so / quasi (Füllwort)', reg: 'jugend', region: 'Spanien', situation: 'Erzählen unter Jüngeren', effect: 'sehr jugendlich; zu häufig wirkt es kindlich', politeness: 'locker', formal: 'como / por ejemplo', ex: { t: 'Y él, en plan, no me dijo nada.', de: 'Und er so: hat mir nichts gesagt.' } },
    { id: 'es-s-pasta', t: 'la pasta', de: 'Kohle, Geld', reg: 'slang', region: 'Spanien', situation: 'über Geld reden', effect: 'locker', politeness: 'locker', formal: 'el dinero', ex: { t: 'Ese piso cuesta una pasta.', de: 'Die Wohnung kostet eine Menge Kohle.' } },
    { id: 'es-s-ligar', t: 'ligar', de: 'flirten, jemanden aufreißen', reg: 'flirt', region: 'Spanien', situation: 'Ausgehen, über Dates reden', effect: 'locker; kann je nach Ton anzüglich wirken', politeness: 'locker', formal: 'conocer a alguien / coquetear', ex: { t: 'Anoche ligó con alguien en la discoteca.', de: 'Gestern hat er/sie in der Disco jemanden kennengelernt.' } },
    { id: 'es-s-joder', t: '¡joder!', de: 'Mist! / Verdammt! (derb)', reg: 'vulgär', region: 'Spanien (sehr häufig)', situation: 'Ärger, Überraschung, Schmerz', effect: 'in Spanien alltäglich, aber derb; nie im Job oder bei Fremden', politeness: 'unhöflich', formal: '¡vaya! / ¡madre mía!', ex: { t: '¡Joder, qué frío hace!', de: 'Verdammt, ist das kalt!' } },
  ],
  lessons: [
    {
      id: 'es-l1', title: 'Begrüßen wie in Madrid', goal: 'Hallo sagen, sich vorstellen, du oder Sie',
      words: ['es-hola', 'es-buenas', 'es-quetal', 'es-buenosdias', 'es-comoesta', 'es-mellamo', 'es-soyde', 'es-encantado', 'es-hastaluego', 'es-nosvemos'],
      grammar: { title: 'Du (tú) oder Sie (usted)?', text: 'In Spanien duzt man sehr schnell – auch Kellner, Kollegen und Gleichaltrige. „Usted“ nutzt man bei älteren Menschen, Behörden und sehr formellen Situationen. Beim Verb: tú eres / usted es.' },
      cloze: [
        { t: '¡Hola! ¿Qué ___?', answer: 'tal', de: 'Hallo! Wie geht\'s?' },
        { t: 'Me ___ Niklas.', answer: 'llamo', de: 'Ich heiße Niklas.' },
        { t: 'Soy ___ Alemania.', answer: 'de', de: 'Ich komme aus Deutschland.' },
      ],
      order: [
        { answer: 'me llamo Niklas y soy de Alemania', de: 'ich heiße Niklas und komme aus Deutschland' },
        { answer: 'hasta luego nos vemos', de: 'bis später, wir sehen uns' },
      ],
    },
    {
      id: 'es-l2', title: 'Café und Bar', goal: 'In einer spanischen Bar bestellen und zahlen',
      words: ['es-cafeconleche', 'es-cortado', 'es-caña', 'es-meponesun', 'es-paratomar', 'es-parallevar', 'es-cuenta', 'es-tarjeta', 'es-gracias', 'es-porfa', 'es-perdona', 'es-vale'],
      grammar: { title: '„¿Me pones …?“', text: 'In Spanien bestellt man oft direkt: „¿Me pones un café?“ (wörtlich: „Stellst du mir einen Kaffee hin?“). Das ist nicht unhöflich, sondern normal. Etwas höflicher: „¿Me pones …, por favor?“' },
      cloze: [
        { t: '¿Me ___ un café con leche?', answer: 'pones', de: 'Bringst du mir einen Milchkaffee?' },
        { t: 'Para ___, por favor.', answer: 'llevar', de: 'Zum Mitnehmen, bitte.' },
        { t: 'La ___, por favor.', answer: 'cuenta', de: 'Die Rechnung, bitte.' },
      ],
      order: [
        { answer: 'me pones una caña por favor', de: 'bringst du mir bitte ein kleines Bier' },
        { answer: 'puedo pagar con tarjeta', de: 'kann ich mit Karte zahlen' },
      ],
    },
    {
      id: 'es-l3', title: 'Smalltalk & Gym', goal: 'Über Arbeit, Wetter und Training reden',
      words: ['es-aquetededicas', 'es-findesemana', 'es-calor', 'es-cansado', 'es-gimnasio', 'es-series'],
      grammar: { title: 'ser oder estar?', text: '„Ser“ beschreibt dauerhafte Eigenschaften und Herkunft (soy alemán). „Estar“ beschreibt Zustände und Orte (estoy cansado, estoy en Madrid). Müde, krank, gestresst = immer „estar“.' },
      cloze: [
        { t: '___ muy cansado hoy.', answer: 'Estoy', de: 'Ich bin heute sehr müde.' },
        { t: '¿A qué te ___?', answer: 'dedicas', de: 'Was machst du beruflich?' },
        { t: '¡Qué ___ hace hoy!', answer: 'calor', de: 'Ist das heute heiß!' },
      ],
      order: [
        { answer: 'te quedan muchas series', de: 'hast du noch viele Sätze' },
        { answer: 'qué haces el fin de semana', de: 'was machst du am Wochenende' },
      ],
    },
  ],
  roleplays: [
    {
      id: 'es-r-bar', title: 'Bar in Malasaña', scene: 'Eine volle Bar in Madrid am Vormittag. Der Kellner hat wenig Zeit.', start: 'a',
      nodes: {
        a: { npc: '¡Buenas! ¿Qué te pongo?', npcDe: 'Hallo! Was darf\'s sein?', options: [
          { t: 'Hola, ¿me pones un café con leche, por favor?', de: 'Hallo, bringst du mir bitte einen Milchkaffee?', reg: 'neutral', next: 'b', note: 'Perfekt und ganz natürlich.' },
          { t: 'Quiero un café.', de: 'Ich will einen Kaffee.', reg: 'neutral', next: 'b', note: 'In Spanien okay, aber „¿Me pones …?“ klingt natürlicher.' },
          { t: 'Buenas, un cortado, porfa.', de: 'Hallo, einen Cortado, bitte.', reg: 'locker', next: 'b', note: 'Kurz und locker – genau wie Einheimische.' },
        ] },
        b: { npc: '¿Para tomar aquí o para llevar?', npcDe: 'Zum Hiertrinken oder zum Mitnehmen?', options: [
          { t: 'Para tomar aquí.', de: 'Zum Hiertrinken.', reg: 'neutral', next: 'c' },
          { t: 'Para llevar, gracias.', de: 'Zum Mitnehmen, danke.', reg: 'neutral', next: 'c' },
        ] },
        c: { npc: 'Aquí tienes. ¿Algo más?', npcDe: 'Bitte schön. Noch etwas?', options: [
          { t: 'No, nada más. ¿Me cobras?', de: 'Nein, nichts mehr. Kann ich zahlen?', reg: 'locker', next: 'd', note: '„¿Me cobras?“ = typisch für „Ich möchte zahlen“.' },
          { t: 'La cuenta, por favor.', de: 'Die Rechnung, bitte.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: 'Son dos euros. ¡Gracias, guapo!', npcDe: 'Zwei Euro. Danke, Schöner!', options: [
          { t: '¡Gracias, hasta luego!', de: 'Danke, tschüss!', reg: 'neutral', next: null, note: '„guapo/guapa“ ist in Madrid eine freundliche Anrede, kein Flirt.' },
        ] },
      },
    },
    {
      id: 'es-r-amigos', title: 'Neue Leute kennenlernen', scene: 'Bei einem Sprachaustausch-Abend in einer Bar spricht dich jemand an.', start: 'a',
      nodes: {
        a: { npc: '¡Hola! ¿Eres nuevo por aquí? Me llamo Lucía.', npcDe: 'Hi! Bist du neu hier? Ich heiße Lucía.', options: [
          { t: 'Sí, es mi primera vez. Me llamo Niklas, encantado.', de: 'Ja, ist mein erstes Mal. Ich heiße Niklas, freut mich.', reg: 'neutral', next: 'b', note: 'Sehr gut! Mann sagt „encantado“, Frau „encantada“.' },
          { t: 'Hola. Mi nombre es Niklas.', de: 'Hallo. Mein Name ist Niklas.', reg: 'formell', next: 'b', note: 'Richtig, aber steif. „Me llamo …“ ist natürlicher.' },
        ] },
        b: { npc: '¡Encantada! ¿Y de dónde eres?', npcDe: 'Freut mich! Und woher kommst du?', options: [
          { t: 'Soy de Alemania. ¿Y tú?', de: 'Ich bin aus Deutschland. Und du?', reg: 'neutral', next: 'c' },
          { t: 'Estoy de Alemania.', de: '(falsch) Ich bin aus Deutschland.', reg: 'neutral', next: 'c', note: 'Herkunft immer mit „ser“: „Soy de Alemania“.' },
        ] },
        c: { npc: 'Yo soy de aquí, de Madrid. ¿Y a qué te dedicas?', npcDe: 'Ich bin von hier, aus Madrid. Und was machst du so?', options: [
          { t: 'Ahora busco curro en logística.', de: 'Ich suche gerade Arbeit in der Logistik.', reg: 'slang', next: 'd', note: '„Curro“ statt „trabajo“ – klingt sehr spanisch.' },
          { t: 'Busco trabajo.', de: 'Ich suche Arbeit.', reg: 'neutral', next: 'd' },
        ] },
        d: { npc: '¡Mucha suerte! Oye, ¿te vienes luego a tomar algo con nosotros?', npcDe: 'Viel Glück! Sag mal, kommst du später noch mit, was trinken?', options: [
          { t: '¡Vale, me apunto!', de: 'Okay, ich bin dabei!', reg: 'locker', next: null, note: '„Me apunto“ = „ich bin dabei“ – sehr natürlich.' },
          { t: 'Hoy no puedo, pero otro día sí.', de: 'Heute kann ich nicht, aber ein andermal gern.', reg: 'neutral', next: null },
        ] },
      },
    },
    {
      id: 'es-r-gym', title: 'Im Gimnasio', scene: 'Du willst die Hantelbank benutzen.', start: 'a',
      nodes: {
        a: { npc: '(Jemand trainiert auf der Bank.)', npcDe: '', options: [
          { t: 'Perdona, ¿te quedan muchas series?', de: 'Entschuldige, hast du noch viele Sätze?', reg: 'neutral', next: 'b', note: 'Höflich und klar.' },
          { t: 'Tío, ¿acabas ya?', de: 'Alter, bist du bald fertig?', reg: 'slang', next: 'b', note: 'Unter Gleichaltrigen okay, kann aber ungeduldig klingen.' },
        ] },
        b: { npc: 'Una más y te la dejo.', npcDe: 'Noch einen, dann überlass ich sie dir.', options: [
          { t: 'Vale, gracias.', de: 'Okay, danke.', reg: 'locker', next: null },
          { t: 'Sin prisa, tranqui.', de: 'Keine Eile, ganz entspannt.', reg: 'locker', next: null, note: '„Tranqui“ = locker für „tranquilo“.' },
        ] },
      },
    },
  ],
  coachRules: [
    { pattern: '\\bestoy de\\b', fix: 'soy de …', why: 'Herkunft wird mit „ser“ ausgedrückt: „Soy de Alemania“.' },
    { pattern: '\\bsoy (cansad[oa]|enferm[oa]|aburrid[oa])\\b', fix: 'estoy …', why: 'Zustände (müde, krank) mit „estar“. „Soy aburrido“ heißt sogar „Ich bin langweilig“!' },
    { pattern: '\\btengo (\\d+) años? viejo', fix: 'tengo … años', why: 'Alter: „Tengo 22 años“ – ohne „viejo“.' },
    { pattern: '\\bestoy embarazad[oa]\\b', fix: 'me da vergüenza / estoy avergonzado', why: 'Falscher Freund! „embarazada“ heißt „schwanger“. Peinlich sein = „me da vergüenza“.' },
    { pattern: '\\bla problema\\b', fix: 'el problema', why: '„problema“ ist männlich, obwohl es auf -a endet.' },
    { pattern: '\\bmuy mucho\\b', fix: 'muchísimo', why: '„muy“ und „mucho“ stehen nie zusammen. Für „sehr viel“: „muchísimo“.' },
    { pattern: '\\byo gusto\\b', fix: 'me gusta …', why: '„gustar“ funktioniert umgekehrt: „Me gusta el café“ (wörtlich: Der Kaffee gefällt mir).' },
  ],
};
