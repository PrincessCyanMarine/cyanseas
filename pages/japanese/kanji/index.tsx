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

enum MODE {
  KANJI,
  DEFINITION,
  READING,
}

export default () => {
  const [selected, setSelected] = useState<Kanji | undefined>();
  const [input, setInput] = useState<string>("");
  const [mode, setMode] = useState<MODE>(MODE.KANJI);
  const input_id = useId().replace(/:/g, "");
  const dialog_id = useId().replace(/:/g, "");
  const dialog_id_2 = useId().replace(/:/g, "");
  const [loaded, setLoaded] = useState(false);
  const [kanji, setKanji] = useState<Kanji[]>(DEFAULT_KANJI_LIST);
  const router = useRouter();
  const [showInput, setShowInput] = useState(true);
  const [showReveal, setShowReveal] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [filtered, setFiltered] = useState(kanji);
  const [noRepeat, setNoRepeat] = useState(false);

  useEffect(() => {
    setFiltered(kanji);
  }, [kanji, noRepeat]);

  function save() {
    if (!loaded) return;
    localStorage.setItem(
      "kanjiConfig",
      JSON.stringify({ mode, showInput, showReveal, showNext })
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
      setShowInput(parseConfig.showInput);
      setShowReveal(parseConfig.showReveal);
      setShowNext(parseConfig.showNext);
    }

    setKanji(loadKanji());
  }

  useEffect(() => {
    if (!loaded) return;
    save();
  }, [mode, showInput, showReveal, kanji]);

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
    if (input.trim() == selected?.kanji) {
      setInput("");
      selectRandom();
    }
  }

  function reveal() {
    $(`#${dialog_id_2}`).trigger("showModal");
  }
  return (
    <div className={style.container}>
      {noRepeat && <p>{filtered.length}</p>}
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
      {mode != MODE.KANJI && showInput && (
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
      )}
      {showReveal && (
        <button className={style.input} onClick={() => reveal()}>
          REVEAL
        </button>
      )}
      {showNext && (
        <button className={style.input} onClick={() => selectRandom()}>
          NEXT
        </button>
      )}
      <button
        className={style.input}
        onClick={() => $(`#${dialog_id}`).trigger("showModal")}
      >
        CONFIG
      </button>
      <dialog id={dialog_id} className={style.modal}>
        <p>Mode</p>
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
        <label>
          <p>
            <input
              type="checkbox"
              checked={showInput}
              onChange={(ev) => setShowInput(ev.target.checked)}
            />{" "}
            Show kanji input
          </p>
        </label>
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
            className={style.button}
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
            className={style.button}
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
            className={style.button}
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
            <button className={style.button} title="Edit kanji list">
              <p>EDIT</p>
            </button>
          </Link>
        </p>

        <p>
          <button
            onClick={() => $(`#${dialog_id}`).trigger("close")}
            className={style.button}
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
