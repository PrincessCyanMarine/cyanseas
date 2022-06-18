import { Formik } from "formik";
import { ChangeEvent, KeyboardEvent, useEffect, useId, useState } from "react";
import styles from "../../../../styles/pages/japanese/kana/practice.module.scss";
import { kanaList, kanaTypeLookup, useKana } from "../../../../utils/kana";
import { ensureUnique, getRandomFromArray } from "../../../../utils/utils";

export default () => {
  const id = useId();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [pronounciationMode, setPronounciationMode] = useState(false);
  const [customizeKana, setCustomizeKana] = useState(false);
  const [newKana, setNewKana] = useState(false);
  const [autoTest, setAutoTest] = useState(true);
  const [allowed, setAllowed] = useState<string[]>([
    "あ",
    "い",
    "お",
    "え",
    "う",
    "か",
    "き",
    "こ",
    "け",
    "く",
    "さ",
    "し",
    "そ",
    "せ",
    "す",
    "た",
    "ち",
    "と",
    "て",
    "つ",
    "な",
    "に",
    "の",
    "ね",
    "ぬ",
    "は",
    "ひ",
    "ほ",
    "へ",
    "ふ",
    "ま",
    "み",
    "も",
    "め",
    "む",
    "や",
    "ゆ",
    "よ",
    "ら",
    "り",
    "ろ",
    "れ",
    "る",
    "わ",
    "を",
    "ん",
  ]);
  const kana = useKana(allowed, newKana);

  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const [toggled, setToggled] = useState<{ [type: string]: boolean }>({
    hiragana: true,
    "hiragana-tenten": false,
    "hiragana-maru": false,
    katakana: false,
    "katakana-tenten": false,
    "katakana-maru": false,
  });

  useEffect(() => {
    console.log(correct, incorrect);
  }, [correct, incorrect]);

  useEffect(() => {
    let saved = localStorage.getItem("allowedKana");
    if (saved) setAllowed(saved.split(","));
    setLoadedFromStorage(true);
  }, []);

  useEffect(() => {
    if (!loadedFromStorage) return;
    localStorage.setItem("allowedKana", allowed.join());
  }, [allowed, loadedFromStorage]);

  useEffect(() => {
    console.log(kana);
  }, [kana]);

  const kanaTypes: { [type: string]: string[] } = {};

  kanaList.forEach((kana) => {
    let type = kana[2];
    if (!kanaTypes[type]) kanaTypes[type] = [];
    kanaTypes[type].push(kana[0]);
  });

  function testCorrect() {
    if (!kana) return;
    let element: any = document.getElementById(id);
    if (
      pronounciationMode
        ? kana[0] === element.value
        : kana[1].includes(element.value)
    ) {
      next();
      setCorrect((c) => c + 1);
      return true;
    }
    return false;
  }

  function skip() {
    next();
    setIncorrect((i) => i + 1);
    if (!kana) return;
    if (pronounciationMode)
      alert(`The kana read as ${kana[1][0]} is ${kana[0]}`);
    else alert(`The kana ${kana[0]} is read as\n${kana[1].join(", ")}`);
  }

  function next() {
    setNewKana(!newKana);
    let element: any = document.getElementById(id);
    if (!element) return;
    element.value = "";
  }

  function keydown(ev: globalThis.KeyboardEvent) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (!testCorrect()) skip();
    }
  }

  useEffect(() => {
    document.getElementById(id)?.addEventListener("keydown", keydown);
    return () => {
      document.getElementById(id)?.removeEventListener("keydown", keydown);
    };
  });

  return (
    <div>
      <div className={styles.kana}>
        {kana && (pronounciationMode ? kana[1][0] : kana[0])}
        {pronounciationMode && kana && (
          <>
            <small>{kana[2].split("-")[0]}</small>
          </>
        )}
      </div>
      <p>
        <input
          id={id}
          type="text"
          onChange={() => {
            if (autoTest) testCorrect();
          }}
        />
      </p>
      <br />
      <p>
        <button
          onClick={(ev) => {
            skip();
          }}
        >
          Skip
        </button>
      </p>
      <br />
      <p>Correct: {correct}</p>
      <p>Skipped/Incorrect: {incorrect}</p>
      <br />
      <p>
        <button onClick={() => setCustomizeKana(true)}>
          Select allowed kana
        </button>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            onChange={(ev) => {
              setAutoTest(ev.target.checked);
            }}
            defaultChecked={autoTest}
          />
          <span>Test if correct automatically</span>
        </label>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            onChange={(ev) => {
              setPronounciationMode(ev.target.checked);
            }}
            defaultChecked={pronounciationMode}
          />
          <span>Show pronounciation</span>
        </label>
      </p>

      <div
        className={styles.kanaSelectionOuter}
        style={customizeKana ? {} : { display: "none" }}
      >
        <div
          onClick={() => {
            setCustomizeKana(false);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div className={styles.kanaSelectionInner}>
          <a
            onClick={() => {
              setCustomizeKana(false);
            }}
            className={styles.x}
          >
            x
          </a>
          <form className={styles.innerInner}>
            {Object.entries(kanaTypes).map(([type, k]) => {
              return (
                <div key={type}>
                  <p>
                    <button
                      onClick={() => {
                        let newState = !toggled[type];
                        setToggled({ ...toggled, [type]: newState });
                        setAllowed((c) => {
                          let newAllowed;
                          if (newState)
                            newAllowed = [
                              ...c,
                              ...kanaList
                                .filter((kana) => kana[2] === type)
                                .map((kana) => kana[0]),
                            ];
                          else
                            newAllowed = c.filter(
                              (kana) => kanaTypeLookup[kana] !== type
                            );

                          return ensureUnique(newAllowed);
                        });
                      }}
                      type="button"
                    >
                      {type[0].toUpperCase()}
                    </button>
                  </p>
                  {k.map((kana, i) => {
                    return (
                      <p key={i}>
                        <label>
                          {kana}{" "}
                          <input
                            className={type}
                            type="checkbox"
                            defaultChecked={allowed?.includes(kana)}
                          />
                        </label>
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
};
