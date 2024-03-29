import { Formik } from "formik";
import { ChangeEvent, KeyboardEvent, useEffect, useId, useState } from "react";
import Popup from "../../../../components/Popup";
import styles from "../../../../styles/pages/japanese/kana/practice.module.scss";
import { kanaList, kanaTypeLookup, useKana } from "../../../../utils/kana";
import { ensureUnique, getRandomFromArray } from "../../../../utils/utils";
import $ from "jquery";
import Snack from "../../../../components/Snack";
import Head from "next/head";
import Link from "../../../../components/Link";

export default () => {
  const id = useId();
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [pronounciationMode, setPronounciationMode] = useState(false);
  const [customizeKana, setCustomizeKana] = useState(false);
  const [newKana, setNewKana] = useState(false);
  const [autoTest, setAutoTest] = useState(true);
  const [timed, setTimed] = useState(false);
  const [lost, setLost] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [showAnswerPopup, setShowAnswerPopup] = useState(false);
  const [allowed, setAllowed] = useState<string[]>(defaultAllowed);
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
    let savedKana = localStorage.getItem("allowedKana");
    let savedToggle = localStorage.getItem("toggledKana");
    let savedReading = localStorage.getItem("showAsReading");
    let savedAutoTest = localStorage.getItem("autoTest");
    if (savedKana) setAllowed(savedKana.split(","));
    if (savedToggle) setToggled(JSON.parse(savedToggle));
    if (savedReading) setPronounciationMode(savedReading === "true");
    if (savedAutoTest) setAutoTest(savedAutoTest === "true");
    setLoadedFromStorage(true);
  }, []);

  useEffect(() => {
    if (!loadedFromStorage) return;
    localStorage.setItem("allowedKana", allowed.join());
  }, [allowed, loadedFromStorage]);

  useEffect(() => {
    if (!loadedFromStorage) return;
    localStorage.setItem("toggledKana", JSON.stringify(toggled));
  }, [toggled, loadedFromStorage]);

  useEffect(() => {
    if (!loadedFromStorage) return;
    localStorage.setItem(
      "showAsReading",
      pronounciationMode ? "true" : "false"
    );
  }, [pronounciationMode, loadedFromStorage]);

  useEffect(() => {
    if (!loadedFromStorage) return;
    localStorage.setItem("autoTest", autoTest ? "true" : "false");
  }, [autoTest, loadedFromStorage]);

  useEffect(() => {
    if (!lost) return;
    setTimed(false);
    skip();
  }, [lost]);

  useEffect(() => {
    let timer: NodeJS.Timer | undefined;
    if (timed && !lost) {
      setTimeLeft(5);
      timer = setInterval(() => {
        $(`.${styles.timer}`).get(0)?.scrollTo({ top: 0, behavior: "auto" });
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timed, lost]);

  useEffect(() => {
    if (timeLeft < 1) {
      setLost(true);
    }
  }, [timeLeft]);

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
        ? kana[0] === element.value.toLowerCase()
        : kana[1].includes(element.value.toLowerCase())
    ) {
      next();
      setCorrect((c) => c + 1);
      if (timed) setTimeLeft(3);
      return true;
    }
    return false;
  }

  function skip() {
    setIncorrect((i) => i + 1);
    if (!kana) return;
    setShowAnswerPopup(true);
    document.getElementById(id)?.blur();
    // if (pronounciationMode)
    //   alert(`The kana read as ${kana[1][0]} is ${kana[0]}`);
    // else alert(`The kana ${kana[0]} is read as\n${kana[1].join(", ")}`);
  }

  function next() {
    setNewKana(!newKana);
    let element: any = document.getElementById(id);
    if (!element) return;
    element.value = "";
  }

  function closePopup() {
    setShowAnswerPopup(false);
    next();
    document.getElementById(id)?.focus();
  }

  function keydown(ev: globalThis.KeyboardEvent) {
    switch (ev.key) {
      case "Enter":
      case " ":
        ev.preventDefault();
        if (showAnswerPopup) closePopup();
        else if (!testCorrect()) skip();
        break;
      case "Escape":
        if (showAnswerPopup) closePopup();
        if (customizeKana && allowed.length > 0) setCustomizeKana(false);
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  });

  return (
    <div>
      <Head>
        <title>Cyan's kana practice</title>
        <meta property="og:site_name" content="Cyan's kana practice" />
        <meta property="og:title" content="Cyan's kana practice" />

        <meta
          name="description"
          content="A simple website made by CyanMarine to help her to practice japanese kana (Better on mobile)"
        />
        <meta
          property="og:description"
          content="A simple page made by CyanMarine to help her to practice japanese kana (Better on mobile)"
        />
      </Head>

      {timed && <span className={styles.timer}>{timeLeft}</span>}
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
        <Link href="https://old.cyanmarine.net/japanese/kana/practice.html">
          Old version
        </Link>
      </p>
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
          <span>Automatically test answer</span>
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
      <p>
        <label>
          <input
            type="checkbox"
            onChange={(ev) => {
              setTimed(ev.target.checked);
              if (ev.target.checked) {
                $("input")[0].focus({ preventScroll: true });
              }
            }}
            checked={timed}
          />
          <span>Timed</span>
        </label>
      </p>

      <div
        className={styles.kanaSelectionOuter}
        style={customizeKana || allowed.length === 0 ? {} : { display: "none" }}
      >
        <div
          onClick={() => {
            if (allowed.length > 0) setCustomizeKana(false);
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
          {allowed.length > 0 && (
            <a
              onClick={() => {
                if (allowed.length > 0) setCustomizeKana(false);
              }}
              className={styles.x}
            >
              x
            </a>
          )}
          <form className={styles.innerInner}>
            {Object.entries(kanaTypes).map(([type, k]) => {
              return (
                <div key={type}>
                  <p
                    onClick={() => {
                      let newState = !toggled[type];
                      setToggled((c) => ({ ...c, [type]: newState }));
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
                            (k) => kanaTypeLookup[k] !== type
                          );

                        return ensureUnique(newAllowed);
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <button
                      type="button"
                      className={styles.typeToggler}
                      data-toggled={toggled[type] ?? false}
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
                            onChange={(ev) => {
                              if (ev.target.checked)
                                setAllowed((c) => [...c, kana]);
                              else
                                setAllowed((c) => c.filter((k) => k !== kana));
                            }}
                            className={type}
                            type="checkbox"
                            checked={allowed?.includes(kana)}
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

      {showAnswerPopup && kana && (
        <Popup
          close={() => {
            closePopup();
          }}
          className={styles.answerPopup}
        >
          <div className={styles.answerInner}>
            <div>
              <div style={{ fontSize: "0.5em" }}>Kana</div>
              <a>{kana[0]}</a>
            </div>
            <div>
              <div style={{ fontSize: "0.5em" }}>Reading</div>
              <a>{kana[1][0]}</a>
            </div>
          </div>
        </Popup>
      )}

      <Snack
        handleClose={() => {
          setLost(false);
        }}
        message="You lost"
        open={lost}
        autoHideDuration={1000}
        closeButton
        key="lost"
      />
    </div>
  );
};

const defaultAllowed = [
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
];
