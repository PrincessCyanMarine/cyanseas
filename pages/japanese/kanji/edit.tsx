import { useEffect, useId, useState } from "react";
import Link from "../../../components/Link";
import style from "../../../styles/pages/japanese/kanji/edit.module.scss";
import $ from "jquery";
import { downloadObjectAsJson } from "../../../utils/utils";
import {
  DEFAULT_KANJI_LIST,
  Kanji,
  changedKanji,
  loadKanji,
} from "../../../utils/kanji";

export default () => {
  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editting, setEditting] = useState(-1);
  const [edittingKanji, setEdittingKanji] = useState<Kanji | null>(null);
  const modalId = useId().replace(/:/g, "");

  function save() {
    if (!loaded) return;
    if (changedKanji(kanji))
      localStorage.setItem("kanji", JSON.stringify(kanji));
    else localStorage.removeItem("kanji");
    console.log(
      changedKanji(kanji)
        ? "Kanji has been changed"
        : "Kanji has not been changed"
    );
    console.log("saved");
  }

  function load() {
    setKanji(loadKanji());
  }
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
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function exportFile() {
    downloadObjectAsJson(kanji, "kanji-" + new Date().getTime());
  }

  useEffect(() => {
    console.log("saving");
    if (!loaded) return;
    save();
  }, [kanji, loaded]);

  useEffect(() => {
    if (loaded) return;
    load();
    setLoaded(true);
  }, []);

  useEffect(() => {
    console.log(kanji);
  }, [kanji]);

  useEffect(() => {
    if (editting > -1) {
      setEdittingKanji(kanji[editting]);
      $(`#${modalId}`).trigger("showModal");
    } else setEdittingKanji(null);
    console.log(editting);
  }, [editting]);

  useEffect(() => console.log(edittingKanji), [edittingKanji]);

  return (
    <div>
      <div className={style.buttons}>
        <Link href="../kanji">
          <button className={style.button}>BACK</button>
        </Link>
        <button
          className={style.button}
          onClick={() => {
            setKanji([...kanji, { kanji: "", readings: [""], definition: "" }]);
            setEditting(kanji.length);
          }}
          title="Add new kanji"
        >
          +
        </button>
      </div>
      <div className={style.buttons}>
        <button
          className={style.button}
          onClick={() => importFile()}
          title="Import kanji list from file"
        >
          IMPORT
        </button>
        <button
          className={style.button}
          onClick={() => exportFile()}
          disabled={!changedKanji(kanji)}
          title={
            "Export kanji list to file" +
            (changedKanji(kanji) ? "" : " (no changes to export)")
          }
        >
          EXPORT
        </button>
        <button
          className={style.button}
          onClick={() => {
            if (confirm("Are you sure you want to reset?")) {
              setKanji(DEFAULT_KANJI_LIST);
              localStorage.removeItem("kanji");
              save();
            }
          }}
          disabled={!changedKanji(kanji)}
          title={
            "Reset to default kanji list" +
            (changedKanji(kanji) ? "" : " (already using default)")
          }
        >
          RESET
        </button>
        <button
          className={style.button}
          onClick={() => {
            if (confirm("Are you sure you want to clear the kanji list?")) {
              setKanji([]);
            }
          }}
          disabled={kanji.length == 0}
          title={
            "Clear the kanji list" +
            (kanji.length == 0 ? " (list is already empty)" : "")
          }
        >
          CLEAR
        </button>
      </div>
      <div className={style.list}>
        {kanji.map((k, i) => {
          return (
            <div
              className={style.item}
              onClick={() => {
                setEditting(i);
              }}
            >
              <p className={style.kanji}>{k.kanji}</p>
              <p className={style.readings}>{k.readings.join(", ")}</p>
              <p className={style.definition}>{k.definition}</p>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  setKanji(kanji.filter((k, _i) => _i !== i));
                }}
                className={style.x}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      {editting > -1 && (
        <dialog
          id={modalId}
          className={style.modal}
          onClick={(ev) => {
            let dimensions = ev.currentTarget.getBoundingClientRect();
            if (
              ev.clientX < dimensions.left ||
              ev.clientX > dimensions.right ||
              ev.clientY < dimensions.top ||
              ev.clientY > dimensions.bottom
            ) {
              setEditting(-1);
            }
          }}
        >
          <form
            // method="dialog"
            onSubmit={(ev) => {
              ev.stopPropagation();
              ev.preventDefault();
            }}
          >
            <p>
              <div>Kanji</div>
              <input
                value={edittingKanji?.kanji}
                onChange={(ev) =>
                  setEdittingKanji({
                    ...edittingKanji!,
                    kanji: ev.target.value,
                  })
                }
              />
            </p>
            <p>
              <div>Definition</div>
              <input
                value={edittingKanji?.definition}
                onChange={(ev) =>
                  setEdittingKanji({
                    ...edittingKanji!,
                    definition: ev.target.value,
                  })
                }
              />
            </p>
            <p>Readings</p>
            <p>
              {edittingKanji?.readings.map((r, i) => {
                return (
                  <p className={style.edit_reading}>
                    <input
                      value={r}
                      onChange={(ev) =>
                        setEdittingKanji({
                          ...edittingKanji!,
                          readings: edittingKanji?.readings.map((r, _i) =>
                            _i === i ? ev.target.value : r
                          ),
                        })
                      }
                    />
                    <span
                      className={style.x}
                      onClick={(ev) => {
                        setEdittingKanji({
                          ...edittingKanji!,
                          readings: edittingKanji?.readings.filter(
                            (r, _i) => _i !== i
                          ),
                        });
                      }}
                      title={"Remove 「" + r + "」 reading"}
                    >
                      X
                    </span>
                  </p>
                );
              })}
            </p>
            <button
              onClick={() => {
                setEdittingKanji({
                  ...edittingKanji!,
                  readings: [...edittingKanji!.readings, ""],
                });
              }}
              title="Add reading"
            >
              +
            </button>
            <p>
              <button
                onClick={() => {
                  setEditting(-1);
                }}
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setKanji(
                    kanji.map((k, i) => (i === editting ? edittingKanji! : k))
                  );
                  setEditting(-1);
                }}
              >
                SAVE
              </button>
              <button
                onClick={() => {
                  setKanji(kanji.filter((k, i) => i !== editting));
                  setEditting(-1);
                }}
                title="Remove kanji"
              >
                REMOVE
              </button>
            </p>
          </form>
        </dialog>
      )}
    </div>
  );
};
