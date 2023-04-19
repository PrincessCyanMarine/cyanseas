import { KanjiType } from "../../pages/japanese/kanji";
import Popup from "../Popup";
import style from "../../styles/components/japanese/EditKanji.module.scss";
import { useState } from "react";

export default ({
  saveKanji,
  kanji: _kanji,
  close,
  remove,
}: {
  kanji: KanjiType;
  saveKanji: (kanji: KanjiType) => void;
  close: () => void;
  remove: () => void;
}) => {
  const [kanji, setKanji] = useState<KanjiType>(_kanji);

  return (
    <Popup close={close} className={style.popup}>
      <p>Kanji</p>
      <p>
        <input
          className={style.input}
          value={kanji.kanji}
          onChange={(e) => {
            setKanji({ ...kanji, kanji: e.target.value });
          }}
        />
      </p>

      <p>Meaning</p>
      <p>
        <input
          className={style.input}
          value={kanji.meaning}
          onChange={(e) => {
            setKanji({ ...kanji, meaning: e.target.value });
          }}
        />
      </p>

      <div>
        <p>Groups</p>
        {kanji.groups.map((group, index) => (
          <p className={style.group}>
            <span>
              <input
                value={group}
                onChange={(e) => {
                  const newGroups = [...kanji.groups];
                  newGroups[index] = e.target.value;
                  setKanji({ ...kanji, groups: newGroups });
                }}
              />
              {"  "}
              <span
                onClick={() => {
                  setKanji({
                    ...kanji,
                    groups: kanji.groups.filter((_, i) => i != index),
                  });
                }}
                className={style.remove}
              >
                x
              </span>
            </span>
          </p>
        ))}
        <button
          onClick={() => {
            setKanji({ ...kanji, groups: [...kanji.groups, ""] });
          }}
        >
          Add group
        </button>
      </div>

      <div>
        <p>Readings</p>
        {kanji.readings.map((reading, index) => (
          <p className={style.reading}>
            <span>
              <input
                value={reading}
                onChange={(e) => {
                  const newReadings = [...kanji.readings];
                  newReadings[index] = e.target.value;
                  setKanji({ ...kanji, readings: newReadings });
                }}
              />
              {"  "}
              <span
                onClick={() => {
                  setKanji({
                    ...kanji,
                    readings: kanji.readings.filter((_, i) => i != index),
                  });
                }}
                className={style.remove}
              >
                x
              </span>
            </span>
          </p>
        ))}
        <button
          onClick={() => {
            setKanji({ ...kanji, readings: [...kanji.readings, ""] });
          }}
        >
          Add reading
        </button>
      </div>
      <div className={style.buttons}>
        <button
          onClick={() => {
            saveKanji(kanji);
            close();
          }}
        >
          Save
        </button>
        <button onClick={remove}>Remove</button>
        <button onClick={close}>Close</button>
      </div>
    </Popup>
  );
};
