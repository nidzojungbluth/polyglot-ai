import type { AbcCourse } from './types';

// Russisch – moderne Standardaussprache (Moskauer Norm).
export const abcRu: AbcCourse = {
  code: 'ru', title: 'Russisches Alphabet (Kyrillisch)', forBeginners: true,
  intro: 'Das russische Alphabet hat 33 Buchstaben. Gute Nachricht: Einige kennst du schon, und Russisch wird fast so gelesen, wie es geschrieben wird. Wir gehen vom Bekannten zum Neuen. Die lateinische Umschrift ist nur eine Krücke – Ziel ist, Kyrillisch direkt zu lesen.',
  units: [
    {
      id: 'ru-abc-1', title: 'Bekannte Buchstaben', kind: 'letters',
      intro: 'Diese sechs sehen aus wie lateinische Buchstaben UND klingen ungefähr so. Ein leichter Start.',
      letters: [
        { up: 'А', low: 'а', name: 'а (a)', sound: 'a', hint: 'a wie in „Mama“.', ex: { t: 'ма́ма', tr: 'máma', de: 'Mama' } },
        { up: 'К', low: 'к', name: 'ка (ka)', sound: 'k', hint: 'k wie im Deutschen, etwas weniger gehaucht.', ex: { t: 'кот', tr: 'kot', de: 'Kater' } },
        { up: 'М', low: 'м', name: 'эм (em)', sound: 'm', hint: 'm wie im Deutschen.', ex: { t: 'мо́ре', tr: 'mórje', de: 'Meer' } },
        { up: 'О', low: 'о', name: 'о (o)', sound: 'o', hint: 'betont: o wie in „Post“. Unbetont klingt es meist wie a!', ex: { t: 'окно́', tr: 'aknó', de: 'Fenster' }, trap: 'Unbetontes о wird wie a gesprochen: молоко́ = „malakó“.' },
        { up: 'Т', low: 'т', name: 'тэ (te)', sound: 't', hint: 't wie im Deutschen. Kleines т sieht aus wie ein kleines großes T.', ex: { t: 'торт', tr: 'tort', de: 'Torte' } },
        { up: 'Е', low: 'е', name: 'е (je)', sound: 'je / e', hint: 'am Wortanfang und nach Vokalen „je“; nach Konsonanten e, wobei der Konsonant davor weich wird.', ex: { t: 'нет', tr: 'njet', de: 'nein' }, trap: 'Am Anfang immer mit j: е́хать = „jéchat’“.' },
      ],
    },
    {
      id: 'ru-abc-2', title: 'Falsche Freunde', kind: 'letters',
      intro: 'Vorsicht! Diese sehen aus wie lateinische Buchstaben, klingen aber ganz anders. Das ist die häufigste Fehlerquelle für Anfänger.',
      letters: [
        { up: 'В', low: 'в', name: 'вэ (we)', sound: 'w (wie in Wasser)', hint: 'w wie in „Wasser“.', ex: { t: 'вода́', tr: 'vadá', de: 'Wasser' }, trap: 'Sieht aus wie B, ist aber ein w!' },
        { up: 'Н', low: 'н', name: 'эн (en)', sound: 'n', hint: 'n wie im Deutschen.', ex: { t: 'нос', tr: 'nos', de: 'Nase' }, trap: 'Sieht aus wie H, ist aber ein n!' },
        { up: 'Р', low: 'р', name: 'эр (er)', sound: 'r (gerollt)', hint: 'mit der Zungenspitze gerolltes r.', ex: { t: 'рука́', tr: 'ruká', de: 'Hand' }, trap: 'Sieht aus wie P, ist aber ein r!' },
        { up: 'С', low: 'с', name: 'эс (es)', sound: 's (scharf)', hint: 'scharfes s wie in „Haus“.', ex: { t: 'сок', tr: 'sok', de: 'Saft' }, trap: 'Sieht aus wie C, ist aber ein s!' },
        { up: 'У', low: 'у', name: 'у (u)', sound: 'u', hint: 'u wie in „gut“.', ex: { t: 'у́тро', tr: 'útra', de: 'Morgen' }, trap: 'Sieht aus wie y, ist aber ein u!' },
        { up: 'Х', low: 'х', name: 'ха (cha)', sound: 'ch (wie in Bach)', hint: 'ch wie in „Bach“ – auch vor e und i.', ex: { t: 'хлеб', tr: 'chljep', de: 'Brot' }, trap: 'Sieht aus wie X, ist aber ch!' },
      ],
    },
    {
      id: 'ru-abc-3', title: 'Neue Formen 1', kind: 'letters',
      intro: 'Diese Buchstaben sehen neu aus, stehen aber für Laute, die du aus dem Deutschen kennst.',
      letters: [
        { up: 'Б', low: 'б', name: 'бэ (be)', sound: 'b', hint: 'b wie im Deutschen. Am Wortende wie p.', ex: { t: 'банк', tr: 'bank', de: 'Bank' }, trap: 'Nicht mit В (w) verwechseln: Б = b, В = w.' },
        { up: 'Г', low: 'г', name: 'гэ (ge)', sound: 'g', hint: 'hartes g wie in „Gast“. In den Endungen -ого/-его klingt es wie w (его́ = „jiwó“).', ex: { t: 'го́род', tr: 'górat', de: 'Stadt' } },
        { up: 'Д', low: 'д', name: 'дэ (de)', sound: 'd', hint: 'd wie im Deutschen. Am Wortende wie t.', ex: { t: 'дом', tr: 'dom', de: 'Haus' } },
        { up: 'З', low: 'з', name: 'зэ (se)', sound: 's (stimmhaft, wie Sonne)', hint: 'summendes s wie in „Sonne“.', ex: { t: 'зима́', tr: 'zimá', de: 'Winter' }, trap: 'Sieht aus wie die Zahl 3. Klingt nicht wie deutsches z (ts)!' },
        { up: 'И', low: 'и', name: 'и (i)', sound: 'i', hint: 'i wie in „Kino“.', ex: { t: 'и́мя', tr: 'ímja', de: 'Vorname' }, trap: 'Sieht aus wie ein gespiegeltes N – ist aber ein i.' },
        { up: 'Й', low: 'й', name: 'и кра́ткое (kurzes i)', sound: 'j (kurz)', hint: 'kurzes j wie am Ende von „Mai“.', ex: { t: 'чай', tr: 'tschaj', de: 'Tee' } },
        { up: 'Л', low: 'л', name: 'эль (el)', sound: 'l', hint: 'eher dunkles l (Zunge weiter hinten), vor е/и/ь hell.', ex: { t: 'ла́мпа', tr: 'lámpa', de: 'Lampe' } },
        { up: 'П', low: 'п', name: 'пэ (pe)', sound: 'p', hint: 'p wie im Deutschen.', ex: { t: 'па́па', tr: 'pápa', de: 'Papa' }, trap: 'Sieht aus wie das griechische Pi – ist ein p.' },
      ],
    },
    {
      id: 'ru-abc-4', title: 'Neue Formen 2: Zischlaute & ы', kind: 'letters',
      intro: 'Die Zischlaute und das berühmte ы. Hier lohnt sich genaues Hinhören.',
      letters: [
        { up: 'Ж', low: 'ж', name: 'жэ (zhe)', sound: 'zh (wie in Garage)', hint: 'stimmhaftes sch wie das „g“ in „Garage“.', ex: { t: 'жена́', tr: 'zhená', de: 'Ehefrau' } },
        { up: 'Ш', low: 'ш', name: 'ша (scha)', sound: 'sch (hart)', hint: 'hartes sch wie in „Schule“, Zunge eher hinten.', ex: { t: 'шко́ла', tr: 'schkóla', de: 'Schule' }, trap: 'Ш (sch) und Щ (langes weiches sch) unterscheiden sich nur durch das Schwänzchen.' },
        { up: 'Щ', low: 'щ', name: 'ща (schtscha)', sound: 'schsch (lang, weich)', hint: 'langes, weiches sch – heute eher „schsch“ als „schtsch“.', ex: { t: 'борщ', tr: 'borschtsch', de: 'Borschtsch' } },
        { up: 'Ч', low: 'ч', name: 'че (tsche)', sound: 'tsch', hint: 'weiches tsch wie in „Tschüss“.', ex: { t: 'час', tr: 'tschas', de: 'Stunde' }, trap: 'Sieht aus wie eine umgedrehte 4. In что klingt es wie sch: „schto“.' },
        { up: 'Ц', low: 'ц', name: 'цэ (tse)', sound: 'ts', hint: 'ts wie das deutsche z in „Zeit“.', ex: { t: 'центр', tr: 'tsentr', de: 'Zentrum' } },
        { up: 'Ф', low: 'ф', name: 'эф (ef)', sound: 'f', hint: 'f wie im Deutschen.', ex: { t: 'фо́то', tr: 'fóta', de: 'Foto' } },
        { up: 'Ы', low: 'ы', name: 'ы (y)', sound: 'y (dumpfes i)', hint: 'Sag „i“ und ziehe die Zunge nach hinten, Lippen nicht rund – ein dumpfes i, zwischen i und ü.', ex: { t: 'сыр', tr: 'syr', de: 'Käse' }, trap: 'Kein ü und kein normales i. Unterschied: мы (wir) vs. ми (Musiknote „mi“).' },
        { up: 'Э', low: 'э', name: 'э (e)', sound: 'e (ohne j)', hint: 'offenes e wie in „Bett“ – ohne j davor.', ex: { t: 'э́то', tr: 'éta', de: 'das (ist)' } },
      ],
    },
    {
      id: 'ru-abc-5', title: 'Vokale mit j: Я, Ю, Ё', kind: 'letters',
      intro: 'Diese Vokale enthalten ein j – oder sie machen den Konsonanten davor weich.',
      letters: [
        { up: 'Я', low: 'я', name: 'я (ja)', sound: 'ja', hint: 'ja; nach Konsonanten: a mit weichem Konsonanten davor. Allein heißt я „ich“.', ex: { t: 'я́блоко', tr: 'jáblaka', de: 'Apfel' }, trap: 'Sieht aus wie ein gespiegeltes R – ist aber „ja“.' },
        { up: 'Ю', low: 'ю', name: 'ю (ju)', sound: 'ju', hint: 'ju wie in „Jugend“.', ex: { t: 'юг', tr: 'juk', de: 'Süden' } },
        { up: 'Ё', low: 'ё', name: 'ё (jo)', sound: 'jo', hint: 'jo – und immer betont! In normalen Texten fehlen die Punkte oft (ёлка → елка).', ex: { t: 'ёлка', tr: 'jólka', de: 'Tannenbaum' }, trap: 'Wenn die Punkte fehlen, sieht ё aus wie е – trotzdem „jo“ sprechen.' },
      ],
      explain: [
        { title: 'е, ё, э, ю – der Unterschied', text: 'е = je (oder e mit weichem Konsonanten), ё = jo (immer betont), э = reines e ohne j (э́то), ю = ju. Merkhilfe: я, ю, е, ё sind die „weichen“ Partner von а, у, э, о.' },
      ],
    },
    {
      id: 'ru-abc-6', title: 'Weiches & hartes Zeichen', kind: 'letters',
      intro: 'Zwei Buchstaben ohne eigenen Laut. Sie verändern nur die Nachbarn.',
      letters: [
        { up: 'Ь', low: 'ь', name: 'мя́гкий знак (weiches Zeichen)', sound: '(macht weich)', hint: 'kein eigener Laut: Der Konsonant davor wird weich (mit leichtem j-Klang) ausgesprochen.', ex: { t: 'мать', tr: 'mat’', de: 'Mutter' }, trap: 'мат (Matt / Mat-Schimpfwörter) und мать (Mutter) unterscheiden sich nur durch ь!' },
        { up: 'Ъ', low: 'ъ', name: 'твёрдый знак (hartes Zeichen)', sound: '(trennt)', hint: 'kein eigener Laut: trennt Vorsilbe und Wort, danach klingt ein j: подъе́зд = „padjést“.', ex: { t: 'подъе́зд', tr: 'padjést', de: 'Hauseingang' } },
      ],
    },
    {
      id: 'ru-abc-7', title: 'Betonung & Silben', kind: 'syllables',
      intro: 'Im Russischen ist die Betonung frei und verändert den Klang der Vokale. Deshalb zeigt die App sie mit einem Akzent (´) – in normalen Texten steht er nicht.',
      explain: [
        { title: 'Unbetonte Vokale klingen anders', text: 'Nur die betonte Silbe klingt „wie geschrieben“. Unbetontes о klingt wie a (молоко́ = „malakó“), unbetontes е und я eher wie i (сего́дня = „sivódnja“). Das nennt man Vokalreduktion.' },
        { title: 'Betonung ändert die Bedeutung', text: 'за́мок (SÁ-mak) = Schloss (Burg) – замо́к (sa-MÓK) = Schloss (zum Abschließen). му́ка = Qual – мука́ = Mehl.' },
        { title: 'Endungen werden weich oder stimmlos', text: 'Am Wortende werden б, в, г, д, ж, з stimmlos: хлеб = „chljep“, го́род = „górat“.' },
        { title: 'Umschrift ist nur eine Krücke', text: 'Die lateinische Umschrift hilft am Anfang, ist aber ungenau. Russen schreiben Kyrillisch – und nur wer Kyrillisch liest, kann Schilder, Menüs und Nachrichten verstehen.' },
      ],
      words: [
        { t: 'молоко́', tr: 'malakó', de: 'Milch', syl: 'мо-ло-ко́' },
        { t: 'хорошо́', tr: 'charaschó', de: 'gut', syl: 'хо-ро-шо́' },
        { t: 'маши́на', tr: 'maschína', de: 'Auto', syl: 'ма-ши́-на' },
        { t: 'соба́ка', tr: 'sabáka', de: 'Hund', syl: 'со-ба́-ка' },
        { t: 'каранда́ш', tr: 'karandásch', de: 'Bleistift', syl: 'ка-ран-да́ш' },
        { t: 'телефо́н', tr: 'tjelefón', de: 'Telefon', syl: 'те-ле-фо́н' },
        { t: 'балала́йка', tr: 'balalájka', de: 'Balalaika', syl: 'ба-ла-ла́й-ка' },
        { t: 'спаси́бо', tr: 'spasíba', de: 'danke', syl: 'спа-си́-бо' },
      ],
    },
    {
      id: 'ru-abc-8', title: 'Wörter lesen', kind: 'words',
      intro: 'Echte Wörter von Schildern, Menüs und aus dem Alltag in Moskau.',
      words: [
        { t: 'приве́т', tr: 'priwjét', de: 'hallo' },
        { t: 'да', tr: 'da', de: 'ja' },
        { t: 'нет', tr: 'njet', de: 'nein' },
        { t: 'метро́', tr: 'mitró', de: 'U-Bahn' },
        { t: 'кафе́', tr: 'kafé', de: 'Café' },
        { t: 'вход', tr: 'fchot', de: 'Eingang' },
        { t: 'вы́ход', tr: 'wýchat', de: 'Ausgang' },
        { t: 'ко́фе', tr: 'kófje', de: 'Kaffee' },
        { t: 'пи́во', tr: 'píwa', de: 'Bier' },
        { t: 'апте́ка', tr: 'aptjéka', de: 'Apotheke' },
        { t: 'Москва́', tr: 'maskwá', de: 'Moskau' },
        { t: 'сего́дня', tr: 'siwódnja', de: 'heute' },
      ],
    },
    {
      id: 'ru-abc-9', title: 'Erste Sätze', kind: 'sentences',
      intro: 'Kurze Sätze lesen und verstehen.',
      words: [
        { t: 'Приве́т! Как дела́?', tr: 'priwjét! kak dilá?', de: 'Hallo! Wie geht\'s?' },
        { t: 'Меня́ зову́т Ни́клас.', tr: 'minjá sawút níklas.', de: 'Ich heiße Niklas.' },
        { t: 'Я живу́ в Москве́.', tr: 'ja zhiwú w maskwjé.', de: 'Ich wohne in Moskau.' },
        { t: 'Где метро́?', tr: 'gdje mitró?', de: 'Wo ist die U-Bahn?' },
        { t: 'Э́то мой дом.', tr: 'éta moj dom.', de: 'Das ist mein Haus.' },
      ],
    },
  ],
};
