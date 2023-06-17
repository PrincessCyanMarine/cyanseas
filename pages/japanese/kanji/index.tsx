import { useEffect, useId, useState } from "react";
import style from "../../../styles/pages/japanese/kanji/index.module.scss";
import $ from "jquery";
import Popup from "../../../components/Popup";
import { downloadObjectAsJson } from "../../../utils/utils";
import { useRouter } from "next/router";
import Link from "../../../components/Link";
import {
  DEFAULT_KANJI_LIST,
  Kanji,
  changedKanji,
  loadKanji,
} from "../../../utils/kanji";

function modeFromText(text: "reading" | "definition" | "kanji") {
  switch (text.toLowerCase()) {
    case "reading":
      return MODE.READING;
    case "definition":
      return MODE.DEFINITION;
    case "kanji":
      return MODE.KANJI;
    default:
      return null;
  }
}

function stringProp(kanji: Kanji, mode: MODE) {
  let a = propFromMode(kanji, mode);
  if (Array.isArray(a)) a = a[Math.floor(Math.random() * a.length)];
  if (!a) a = "undefined";
  return a;
}

function propFromMode(kanji: Kanji, mode: MODE) {
  switch (mode) {
    case MODE.READING:
      return kanji.readings;
    case MODE.DEFINITION:
      return kanji.definition;
    case MODE.KANJI:
      return kanji.kanji;
    default:
      return null;
  }
}

function inputTypeFromString(text: string) {
  if (!text || !text.trim()) return INPUT_TYPE.MULTIPLE_CHOICES;
  switch (text.toUpperCase()) {
    case "TEXT":
      return INPUT_TYPE.TEXT;
    case "NONE":
      return INPUT_TYPE.NONE;
    default:
      return INPUT_TYPE.MULTIPLE_CHOICES;
  }
}

enum MODE {
  KANJI,
  DEFINITION,
  READING,
}

enum INPUT_TYPE {
  TEXT,
  MULTIPLE_CHOICES,
  NONE,
}

export default () => {
  const [selected, setSelected] = useState<Kanji | undefined>();
  const [input, setInput] = useState<string>("");
  const [mode, setMode] = useState<MODE>(MODE.KANJI);
  const [answerType, setAnswerType] = useState<MODE>(MODE.READING);
  const input_id = useId().replace(/:/g, "");
  const dialog_id = useId().replace(/:/g, "");
  const dialog_id_2 = useId().replace(/:/g, "");
  const [loaded, setLoaded] = useState(false);
  const [kanji, setKanji] = useState<Kanji[]>(DEFAULT_KANJI_LIST);
  const router = useRouter();
  const [inputType, setInputType] = useState<INPUT_TYPE>(
    INPUT_TYPE.MULTIPLE_CHOICES
  );
  const [showReveal, setShowReveal] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [filtered, setFiltered] = useState(kanji);
  const [noRepeat, setNoRepeat] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setFiltered(kanji);
    setReset(true);
  }, [kanji, noRepeat]);

  useEffect(() => {
    selectRandom();
  }, [reset]);

  const inputElement = {
    [INPUT_TYPE.TEXT]: () => {
      return (
        <input
          className={style.input}
          id={input_id}
          value={input}
          onChange={(ev) => {
            setInput(ev.target.value);
          }}
          onKeyDown={(ev) => {
            if (ev.key == "Enter") testInput();
          }}
        />
      );
    },
    [INPUT_TYPE.MULTIPLE_CHOICES]: () => {
      if (!selected) return <span></span>;
      let choices = [undefined, undefined, undefined, undefined] as [
        JSX.Element?,
        JSX.Element?,
        JSX.Element?,
        JSX.Element?
      ];
      let correct = Math.floor(Math.random() * 4);

      choices[correct] = multipleChoiceElem(
        stringProp(selected, answerType),
        true,
        correct
      );

      for (let i = 0; i < 4; i++) {
        if (i == correct) continue;
        let prop: string,
          attempts = 0;
        do {
          let randomIndex = Math.floor(Math.random() * kanji.length);
          prop = stringProp(kanji[randomIndex], answerType);
          attempts++;
        } while (
          attempts < 64 &&
          (selected.readings.includes(prop) ||
            prop == stringProp(selected, answerType))
        );
        choices[i] = multipleChoiceElem(prop, false, i);
      }

      return (
        <div className={style.choices}>
          {choices.map((choice, i) => {
            return <div key={i}>{choice}</div>;
          })}
        </div>
      );
    },

    [INPUT_TYPE.NONE]: () => {
      return <span></span>;
    },
  };

  let choiceId = useId().replace(/:/g, "");
  function multipleChoiceElem(prop: string, correct: boolean, index: number) {
    let thisId = choiceId + index;
    return (
      <div
        id={thisId}
        className={style.choice}
        onClick={() => {
          if (correct) {
            reveal();
          } else {
            let self = $(`#${thisId}`);
            console.log(self);
            self.addClass(style.wrong);
            self.addClass(style.shake);
            setTimeout(() => {
              self.removeClass(style.shake);
            }, 1000);
          }
        }}
      >
        {prop}
      </div>
    );
  }

  function save() {
    if (!loaded) return;
    localStorage.setItem(
      "kanjiConfig",
      JSON.stringify({
        mode,
        inputType,
        answerType,
        showReveal,
        showNext,
        noRepeat,
      })
    );
    if (changedKanji(kanji))
      localStorage.setItem("kanji", JSON.stringify(kanji));
    else localStorage.removeItem("kanji");
    console.log("saved");
  }

  function load() {
    let savedConfig = localStorage.getItem("kanjiConfig");

    if (savedConfig) {
      let parseConfig = JSON.parse(savedConfig);
      console.log(parseConfig);
      setMode(parseConfig.mode);
      setInputType(parseConfig.inputType);
      setAnswerType(parseConfig.answerType);
      setShowReveal(parseConfig.showReveal);
      setShowNext(parseConfig.showNext);
      setNoRepeat(parseConfig.noRepeat);
    }

    setKanji(loadKanji());
  }

  useEffect(() => {
    if (!loaded) return;
    save();
  });

  useEffect(() => {
    if (loaded) return;
    load();
    setLoaded(true);
  }, []);

  function importFile() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (ev) => {
      // @ts-ignore
      let file = ev.target!.files[0];
      let reader = new FileReader();
      reader.onload = (ev) => {
        let result = ev.target!.result;
        let json = JSON.parse(result as string);
        setKanji(json);
        $(`#${dialog_id}`).trigger("close");
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function exportFile() {
    downloadObjectAsJson(kanji, "kanji-" + new Date().getTime());
  }

  function selectRandom() {
    if (inputType == INPUT_TYPE.MULTIPLE_CHOICES) {
      for (let i = 0; i < 4; i++) {
        $(`#${choiceId + i}`).removeClass(style.wrong);
      }
    }
    let randomIndex: number, sel, prop: string | string[];
    let attempts = 0;
    do {
      randomIndex = Math.floor(Math.random() * filtered.length);
      sel = filtered[randomIndex];
      prop = propFromMode(filtered[randomIndex], mode) || "";
      if (Array.isArray(prop)) prop = prop.join(", ");
      attempts++;
    } while (attempts < 64 && (!sel || sel == selected || !prop.trim()));
    setSelected(filtered[randomIndex]);
    if (noRepeat)
      setFiltered((filtered) => filtered.filter((v, i) => i != randomIndex));
  }

  useEffect(() => {
    selectRandom();
  }, [kanji, mode]);

  useEffect(() => {
    $(`#${input_id}`).trigger("focus");
  });

  useEffect(() => {
    console.log(input);
  }, [input]);

  function testInput() {
    if (!selected) return;
    let answer = input.trim().toLowerCase();
    if (answerType == MODE.READING) {
      if (selected?.readings.includes(answer)) {
        setInput("");
        selectRandom();
      }
    } else if (answer == stringProp(selected, answerType).toLowerCase()) {
      setInput("");
      selectRandom();
    }
  }

  function reveal() {
    $(`#${dialog_id_2}`).trigger("showModal");
  }
  return (
    <div className={style.container}>
      {filtered.length == 0 ? (
        <p>No kanji left</p>
      ) : (
        <p className={style.kanji}>
          {mode == MODE.KANJI
            ? selected?.kanji
            : mode == MODE.DEFINITION
            ? selected?.definition
            : selected?.readings.join(", ")}
        </p>
      )}
      {inputElement[inputType]()}
      {noRepeat && <p>{filtered.length}</p>}
      {showReveal && (
        <button
          className={`${style.input} ${style.buttons}`}
          onClick={() => reveal()}
        >
          REVEAL
        </button>
      )}
      {showNext && (
        <button
          className={`${style.input} ${style.buttons}`}
          onClick={() => selectRandom()}
        >
          NEXT
        </button>
      )}
      <button
        className={`${style.input} ${style.buttons}`}
        onClick={() => $(`#${dialog_id}`).trigger("showModal")}
      >
        CONFIG
      </button>
      <dialog id={dialog_id} className={style.modal}>
        <div>
          <h3>Mode</h3>
          <form
            onChange={(ev) => {
              // @ts-ignore
              setMode(modeFromText(ev.target.value));
              selectRandom();
            }}
            className={style.form}
          >
            <label>
              <input
                checked={mode == MODE.KANJI}
                type="radio"
                radioGroup="mode"
                name="mode"
                value="kanji"
              />{" "}
              KANJI
            </label>
            <label>
              <input
                checked={mode == MODE.DEFINITION}
                type="radio"
                radioGroup="mode"
                name="mode"
                value="definition"
              />{" "}
              DEFINITION
            </label>
            <label>
              <input
                checked={mode == MODE.READING}
                type="radio"
                radioGroup="mode"
                name="mode"
                value="reading"
              />{" "}
              READING
            </label>
          </form>
        </div>
        <div>
          <h3>Answer type</h3>
          <form
            onChange={(ev) => {
              // @ts-ignore
              setAnswerType(modeFromText(ev.target.value));
            }}
            className={style.form}
          >
            <label>
              <input
                checked={answerType == MODE.KANJI}
                type="radio"
                radioGroup="answerType"
                name="answerType"
                value="kanji"
              />{" "}
              KANJI
            </label>
            <label>
              <input
                checked={answerType == MODE.DEFINITION}
                type="radio"
                radioGroup="answerType"
                name="answerType"
                value="definition"
              />{" "}
              DEFINITION
            </label>
            <label>
              <input
                checked={answerType == MODE.READING}
                type="radio"
                radioGroup="answerType"
                name="answerType"
                value="reading"
              />{" "}
              READING
            </label>
          </form>
        </div>
        <div>
          <h3>Input type</h3>
          <form
            onChange={(ev) => {
              // @ts-ignore
              setInputType(inputTypeFromString(ev.target.value));
            }}
            className={style.form}
          >
            <label>
              <input
                checked={inputType == INPUT_TYPE.TEXT}
                type="radio"
                radioGroup="inputType"
                name="inputType"
                value="TEXT"
              />{" "}
              TEXT
            </label>
            <label>
              <input
                checked={inputType == INPUT_TYPE.MULTIPLE_CHOICES}
                type="radio"
                radioGroup="inputType"
                name="inputType"
                value="MULTIPLE_CHOICES"
              />{" "}
              MULTIPLE_CHOICES
            </label>
            <label>
              <input
                checked={inputType == INPUT_TYPE.NONE}
                type="radio"
                radioGroup="inputType"
                name="inputType"
                value="NONE"
              />{" "}
              NONE
            </label>
          </form>
        </div>

        <h3>Others</h3>
        <label>
          <p>
            <input
              type="checkbox"
              checked={showReveal}
              onChange={(ev) => setShowReveal(ev.target.checked)}
            />{" "}
            Show "reveal" button
          </p>
        </label>
        <label>
          <p>
            <input
              type="checkbox"
              checked={showNext}
              onChange={(ev) => setShowNext(ev.target.checked)}
            />{" "}
            Show "next" button
          </p>
        </label>
        <label>
          <p>
            <input
              type="checkbox"
              checked={noRepeat}
              onChange={(ev) => setNoRepeat(ev.target.checked)}
            />{" "}
            Don't repeat
          </p>
        </label>
        <p>
          <button
            onClick={() => {
              importFile();
            }}
            className={`${style.button} ${style.buttons}`}
            title="Import kanji list from file"
          >
            <p>IMPORT</p>
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              exportFile();
            }}
            className={`${style.button} ${style.buttons}`}
            disabled={!changedKanji(kanji)}
            title={
              "Export kanji list to file" +
              (changedKanji(kanji) ? "" : " (no changes to export)")
            }
          >
            <p>EXPORT</p>
          </button>
        </p>
        <p>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset?")) {
                setKanji(DEFAULT_KANJI_LIST);
                localStorage.removeItem("kanji");
                // save();
                selectRandom();
              }
            }}
            className={`${style.button} ${style.buttons}`}
            disabled={!changedKanji(kanji)}
            title={
              "Reset to default kanji list" +
              (changedKanji(kanji) ? "" : " (already using default)")
            }
          >
            <p>RESET</p>
          </button>
        </p>
        <p>
          <Link href="./kanji/edit">
            <button
              className={`${style.button} ${style.buttons}`}
              title="Edit kanji list"
            >
              <p>EDIT</p>
            </button>
          </Link>
        </p>

        <p>
          <button
            onClick={() => $(`#${dialog_id}`).trigger("close")}
            className={`${style.button} ${style.buttons}`}
            title="Close menu"
          >
            <p>CLOSE</p>
          </button>
        </p>
      </dialog>
      <dialog className={style.modal} id={dialog_id_2}>
        <h1 className={style.reveal_kanji}>{selected?.kanji}</h1>
        <p className={style.reveal_readings}>{selected?.readings.join(", ")}</p>
        <p className={style.reveal_definition}>{selected?.definition}</p>
        <p>
          <button
            className={style.buttons}
            onClick={() => {
              $(`#${dialog_id_2}`).trigger("close");
              selectRandom();
            }}
          >
            NEXT
          </button>
        </p>
        <p>
          <button
            className={style.buttons}
            onClick={() => {
              $(`#${dialog_id_2}`).trigger("close");
            }}
          >
            CLOSE
          </button>
        </p>
      </dialog>
    </div>
  );
};
