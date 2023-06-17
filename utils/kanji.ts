export interface Kanji {
  kanji: string;
  readings: string[];
  definition: string;
}
export const DEFAULT_KANJI_LIST: Kanji[] = [
  // { kanji: "気", readings: ["き"], definition: "" },
  { kanji: "日曜日", readings: ["にちようび"], definition: "Sunday" },
  { kanji: "本", readings: ["ほん"], definition: "Book" },
  { kanji: "人", readings: ["ひと"], definition: "Person" },
  { kanji: "火", readings: ["ひ"], definition: "Fire" },
  { kanji: "火曜日", readings: ["かようび"], definition: "Tuesday (terça)" },
  { kanji: "水", readings: ["みず"], definition: "Water" },
  { kanji: "水曜日", readings: ["すいようび"], definition: "Wednesday" },
  { kanji: "金", readings: ["かね"], definition: "Gold" },
  { kanji: "金曜日", readings: ["きんようび"], definition: "Friday" },
  { kanji: "時", readings: ["とき"], definition: "Time" },
  { kanji: "七時", readings: ["しちじ"], definition: "Seven o'clock" },
  { kanji: "予報", readings: ["よほう"], definition: "Forecast" },
  { kanji: "天気", readings: ["てんき"], definition: "Weather" },
  { kanji: "雪", readings: ["ゆき"], definition: "Snow" },
  { kanji: "強い", readings: ["つよい"], definition: "Strong" },
  { kanji: "弱い", readings: ["よわい"], definition: "Weak" },
  { kanji: "暑い", readings: ["あつい"], definition: "Hot" },
  { kanji: "最近", readings: ["さいきん"], definition: "Recently" },
  { kanji: "助ける", readings: ["たすける"], definition: "Help out" },
  { kanji: "上手", readings: ["じょうず"], definition: "Good at (something)" },
  { kanji: "遊ぶ", readings: ["あそぶ"], definition: "Play, Have fun" },
  { kanji: "買う", readings: ["かう"], definition: "Buy" },
  { kanji: "黒い", readings: ["くろい"], definition: "Dark" },
  { kanji: "話す", readings: ["はなす"], definition: "Talk, speak" },
  { kanji: "気持ち", readings: ["きもち"], definition: "Feeling" },
  { kanji: "名前", readings: ["なまえ"], definition: "Name" },
  { kanji: "下", readings: ["した"], definition: "Below, down" },
  { kanji: "帰る", readings: ["かえる"], definition: "Go back (home)" },
  { kanji: "仕事", readings: ["しごと"], definition: "Work" },
  { kanji: "変", readings: ["へん"], definition: "Weird" },
  { kanji: "男子", readings: ["だんし"], definition: "Guy" },
  {
    kanji: "本人",
    readings: ["ほんにん"],
    definition: "The person in question",
  },
  { kanji: "待つ", readings: ["まつ"], definition: "Wait" },
  { kanji: "借りる", readings: ["かりる"], definition: "Borrow" },
  { kanji: "忘れる", readings: ["わすれる"], definition: "Forget" },
  { kanji: "分かる", readings: ["わかる"], definition: "Understand" },
  { kanji: "感じ", readings: ["かんじ"], definition: "Feeling" },
  { kanji: "漢字", readings: ["かんじ"], definition: "Kanji" },
  { kanji: "笑い", readings: ["わらい"], definition: "Laughter" },
  { kanji: "笑う", readings: ["わらう"], definition: "To laugh" },
  { kanji: "本当", readings: ["ほんとう"], definition: "Truth" },
  { kanji: "仕方ない", readings: ["しかたない"], definition: "There's no way" },
  { kanji: "危ない", readings: ["あぶない"], definition: "Dangerous" },
  { kanji: "星", readings: ["ほし"], definition: "Star" },
  { kanji: "私", readings: ["わたし"], definition: "I" },
  { kanji: "僕", readings: ["ぼく"], definition: "I (b)" },
  { kanji: "花見", readings: ["はなみ"], definition: "Flower watching" },
  { kanji: "見る", readings: ["みる"], definition: "Watch" },
  { kanji: "母", readings: ["はは"], definition: "(My) Mother" },
  {
    kanji: "お母さん",
    readings: ["おかあさん"],
    definition: "Mother",
  },
  { kanji: "父", readings: ["ちち"], definition: "(My) Father" },
  { kanji: "お父さん", readings: ["おとうさん"], definition: "Father" },
  { kanji: "毎日", readings: ["まいにち"], definition: "Every day" },
  {
    kanji: "中",
    readings: ["なか", "ちゅう"],
    definition: "Middle, in, during",
  },
  { kanji: "行く", readings: ["いく"], definition: "Go" },
  { kanji: "雨", readings: ["あめ"], definition: "Rain" },
  { kanji: "甘い", readings: ["あまい"], definition: "Sweet" },
  { kanji: "友達", readings: ["ともだち"], definition: "Friend" },
  { kanji: "田中", readings: ["たなか"], definition: "Tanaka" },
  { kanji: "好き", readings: ["すき"], definition: "Like" },
  { kanji: "食べ物", readings: ["たべもの"], definition: "Food" },
  { kanji: "休み", readings: ["やすみ"], definition: "Rest" },
  { kanji: "前", readings: ["まえ"], definition: "Before, front" },
  { kanji: "後", readings: ["あと"], definition: "After" },
  { kanji: "後ろ", readings: ["うしろ"], definition: "Back" },
  {
    kanji: "月",
    readings: ["げつ", "がつ", "つき"],
    definition: "Moon, month",
  },
  { kanji: "国", readings: ["くに"], definition: "Country" },
  { kanji: "天国", readings: ["てんごく"], definition: "Paradise, heaven" },
  { kanji: "空", readings: ["そら"], definition: "Sky" },
  { kanji: "多い", readings: ["おおい"], definition: "Many, a lot" },
  { kanji: "高校", readings: ["こうこう"], definition: "High school" },
  { kanji: "大学校", readings: ["だいがっこう"], definition: "University" },
  { kanji: "言葉", readings: ["ことば"], definition: "Word" },
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
