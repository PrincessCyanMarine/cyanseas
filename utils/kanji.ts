export interface Kanji {
  kanji: string;
  readings: string[];
  definition: string;
}
export const DEFAULT_KANJI_LIST: Kanji[] = [
  { kanji: "気", readings: ["き"], definition: "" },
  { kanji: "日", readings: ["にち", "ひ"], definition: "Day, sun" },
  { kanji: "本", readings: ["ほん"], definition: "Book" },
  { kanji: "人", readings: ["じん", "にん", "ひと"], definition: "Person" },
  { kanji: "火", readings: ["ひ"], definition: "Fire" },
  { kanji: "水", readings: ["みず", "すい"], definition: "Water" },
  { kanji: "金", readings: ["きん"], definition: "Gold" },
  { kanji: "時", readings: ["じ", "とき"], definition: "Time" },
  { kanji: "予報", readings: ["よほう"], definition: "Forecast" },
  { kanji: "天気", readings: ["てんき"], definition: "Weather" },
  { kanji: "雨", readings: ["あめ"], definition: "Rain" },
  { kanji: "雪", readings: ["ゆき"], definition: "Snow" },
  { kanji: "強", readings: ["つよ(い)"], definition: "Strong" },
  { kanji: "弱", readings: ["よわ(い)"], definition: "Weak" },
  { kanji: "暑", readings: ["あつ(い)"], definition: "Hot" },
  { kanji: "最近", readings: ["さいきん"], definition: "Recently" },
  { kanji: "助", readings: ["たす(かる)"], definition: "Help out" },
  { kanji: "上手", readings: ["じょうず"], definition: "Good at (something)" },
  { kanji: "遊", readings: ["あそ(ぶ)"], definition: "Play, Have fun" },
  { kanji: "買", readings: ["か(う)"], definition: "Buy" },
  { kanji: "黒", readings: ["くろ(い)"], definition: "Dark" },
  { kanji: "話", readings: ["はな(す)"], definition: "Talk, speak" },
  { kanji: "気持ち", readings: ["きもち"], definition: "Feeling" },
  { kanji: "名前", readings: ["なまえ"], definition: "Name" },
  { kanji: "下", readings: ["した"], definition: "Below, down" },
  { kanji: "帰", readings: ["かえ(る)"], definition: "Go back (home)" },
  { kanji: "仕事", readings: ["しごと"], definition: "Work" },
  { kanji: "変", readings: ["へん"], definition: "Weird" },
  { kanji: "男子", readings: ["だんし"], definition: "Guy" },
  {
    kanji: "本人",
    readings: ["ほんにん"],
    definition: "The person in question",
  },
  { kanji: "待", readings: ["ま(つ)"], definition: "Wait" },
  { kanji: "借", readings: ["か(りる)"], definition: "Borrow" },
  { kanji: "忘", readings: ["わす(れる)"], definition: "Forget" },
  { kanji: "分", readings: ["わ(かる)"], definition: "Understand, know" },
  { kanji: "感", readings: ["かん(じ)"], definition: "Feeling" },
  { kanji: "笑", readings: ["わら(い)"], definition: "Laugh" },
  { kanji: "本当", readings: ["ほんとう"], definition: "Truth" },
  { kanji: "仕方", readings: ["しかた(ない)"], definition: "There's no way" },
  { kanji: "星", readings: ["ほし"], definition: "Star" },
  { kanji: "私", readings: ["わたし"], definition: "I" },
  { kanji: "僕", readings: ["ぼく"], definition: "I (b)" },
  { kanji: "花", readings: ["はな"], definition: "Flower" },
  { kanji: "見", readings: ["み"], definition: "Look, view" },
  { kanji: "母", readings: ["はは"], definition: "Mother" },
  { kanji: "父", readings: ["ちち"], definition: "Father" },
  { kanji: "毎日", readings: ["まいにち"], definition: "Every day" },
  { kanji: "中", readings: ["なか"], definition: "Middle, in, during" },
  { kanji: "行", readings: ["い(く)"], definition: "Go" },
  { kanji: "雨", readings: ["あめ"], definition: "Rain" },
  { kanji: "甘", readings: ["あま(い)"], definition: "Sweet" },
  { kanji: "友達", readings: ["ともだち"], definition: "Friend" },
  { kanji: "田中", readings: ["たなか"], definition: "Tanaka" },
  { kanji: "好", readings: ["す(き)"], definition: "Like" },
  { kanji: "食べ物", readings: ["たべもの"], definition: "Food" },
  { kanji: "休み", readings: ["やすみ"], definition: "Rest" },
  { kanji: "前", readings: ["まえ"], definition: "Before, front" },
  { kanji: "後", readings: ["あと", "うし(ろ)"], definition: "After, back" },
  {
    kanji: "月",
    readings: ["げつ", "がつ", "つき"],
    definition: "Moon, month",
  },
  { kanji: "国", readings: ["くに"], definition: "Country" },
  { kanji: "天国", readings: ["てんごく"], definition: "Paradise, heaven" },
  { kanji: "空", readings: ["そら"], definition: "Sky" },
  { kanji: "多", readings: ["おお(い)"], definition: "Many, a lot" },
  { kanji: "高校", readings: ["こうこう"], definition: "High school" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
  // { kanji: "", readings: [""], definition: "" },
];

function getSaved() {
  let kanji = localStorage.getItem("kanji");
  let res;
  if (kanji) res = JSON.parse(kanji);
  return res;
}

export function loadKanji() {
  let kanji = getSaved();
  return changedKanji(kanji) ? kanji : DEFAULT_KANJI_LIST;
}

export function changedKanji(kanji: Kanji[]) {
  if (!kanji || kanji.length == 0) return false;
  if (kanji.length != DEFAULT_KANJI_LIST.length) return true;
  for (let i = 0; i < kanji.length; i++) {
    let saved = kanji[i];
    let defaultKanji = DEFAULT_KANJI_LIST[i];
    if (saved.kanji != defaultKanji.kanji) return true;
    if (saved.definition != defaultKanji.definition) return true;
    if (saved.readings.length != defaultKanji.readings.length) return true;
    for (let j = 0; j < saved.readings.length; j++)
      if (saved.readings[j] != defaultKanji.readings[j]) return true;
  }
  return false;
}
