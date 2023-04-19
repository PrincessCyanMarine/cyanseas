import { useEffect, useState } from "react";
import Kanji from "../../../components/kanji/Kanji";
import style from "../../../styles/pages/japanese/kanji.module.scss";
import { useRouter } from "next/router";
import Popup from "../../../components/Popup";
import EditKanji from "../../../components/kanji/EditKanji";

export interface KanjiType {
  kanji: string;
  meaning: string;
  groups: string[];
  readings: string[];
}

export default () => {
  const [data, setData] = useState<KanjiType[]>([
    { kanji: "一", meaning: "one", groups: ["numbers"], readings: ["いち"] },
    { kanji: "二", meaning: "two", groups: ["numbers"], readings: ["に"] },
    { kanji: "三", meaning: "three", groups: ["numbers"], readings: ["さん"] },
    { kanji: "四", meaning: "four", groups: ["numbers"], readings: ["し"] },
    { kanji: "五", meaning: "five", groups: ["numbers"], readings: ["ご"] },
    {
      kanji: "月",
      meaning: "moon",
      groups: ["weekdays", "substantive"],
      readings: ["つき"],
    },
    {
      kanji: "日",
      meaning: "sun",
      groups: ["weekdays", "substantive"],
      readings: ["ひ"],
    },
    {
      kanji: "木",
      meaning: "tree",
      groups: ["weekdays", "substantive"],
      readings: ["き"],
    },
    {
      kanji: "早",
      meaning: "quick",
      groups: ["adjective"],
      readings: ["はや"],
    },
    { kanji: "遅", meaning: "slow", groups: ["adjective"], readings: ["おそ"] },
    {
      kanji: "美",
      meaning: "pretty",
      groups: ["adjective"],
      readings: ["うつく"],
    },
    {
      kanji: "白",
      meaning: "white",
      groups: ["adjective"],
      readings: ["しろ"],
    },
    {
      kanji: "犬",
      meaning: "dog",
      groups: ["substantive", "animal"],
      readings: ["いぬ"],
    },
    {
      kanji: "猫",
      meaning: "cat",
      groups: ["substantive", "animal"],
      readings: ["ねこ"],
    },
    {
      kanji: "鳥",
      meaning: "bird",
      groups: ["substantive", "animal"],
      readings: ["とり"],
    },
    {
      kanji: "魚",
      meaning: "fish",
      groups: ["substantive", "animal"],
      readings: ["さかな"],
    },
    {
      kanji: "車",
      meaning: "car",
      groups: ["substantive"],
      readings: ["くるま"],
    },
    {
      kanji: "電",
      meaning: "electric",
      groups: ["substantive"],
      readings: ["でん"],
    },
  ]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [editing, setEditing] = useState(-1);
  const [generated, setGenerated] = useState<KanjiType[]>([]);
  const [selected, setSelected] = useState<{ [group: string]: number }>({});
  const [selected_any, setSelectedAny] = useState(0);

  useEffect(() => {
    setLoading(true);
    const stored = localStorage.getItem("kanji");
    if (stored) setData(JSON.parse(stored));
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("Is loading", loading);
    if (loading) return;
    console.log("saving data", data);
    localStorage.setItem("kanji", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (loading) return;
    const groups = data.reduce((acc, item) => {
      item.groups.forEach((group) => {
        if (!acc.includes(group)) acc.push(group);
      });
      return acc;
    }, [] as string[]);
    setGroups(groups);
  }, [data, loading]);

  useEffect(() => {
    console.log(generated);
  }, [generated]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <div style={{ margin: "0.5rem" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {editing > -1 && editing < data.length && data[editing] && (
            <EditKanji
              remove={() => {
                setData((d) => d.filter((_, i) => i !== editing));
                setEditing(-1);
              }}
              close={() => setEditing(-1)}
              kanji={data[editing]}
              saveKanji={(kanji) => {
                console.log(kanji);
                setData((d) => {
                  d[editing] = kanji;
                  console.log("Edited", d[editing]);
                  return d;
                });
              }}
            />
          )}

          <div>
            <div className={style.groups}>
              {groups.map((group) => {
                return (
                  <Selector
                    key={group}
                    group={group}
                    max={
                      data.filter((item) => item.groups.includes(group)).length
                    }
                    setSelected={(value) => {
                      setSelected((s) => ({ ...s, [group]: value }));
                    }}
                  />
                );
              })}
              <Selector
                group="any"
                max={data.length}
                setSelected={setSelectedAny}
              />
            </div>
          </div>
          <br />
          <button
            onClick={() => {
              setGenerated([]);
              let allGenerated = [] as KanjiType[];

              console.log("selected", selected);
              const select = (filtered: KanjiType[], quantity: number) => {
                console.log("selecting", filtered, quantity);

                const inCommon = allGenerated.filter((item) =>
                  filtered.includes(item)
                );
                filtered = filtered.filter((item) => !inCommon.includes(item));
                console.log(inCommon, filtered);

                if (filtered.length < quantity) return filtered;

                const _selected = [] as KanjiType[];

                while (
                  _selected.length < quantity &&
                  _selected.length < filtered.length - inCommon.length
                ) {
                  let item =
                    filtered[Math.floor(Math.random() * filtered.length)];
                  if (!_selected.includes(item) && !inCommon.includes(item))
                    _selected.push(item);
                }
                return _selected;
              };

              for (const [group, quantity] of Object.entries(selected)) {
                if (quantity <= 0) continue;
                allGenerated = [
                  ...allGenerated,
                  ...select(
                    data.filter((item) => item.groups.includes(group)),
                    quantity
                  ),
                ];
              }

              if (data && selected_any > 0)
                allGenerated = [...allGenerated, ...select(data, selected_any)];

              setGenerated(allGenerated);
            }}
          >
            Generate
          </button>

          <br />
          {generated &&
            generated.length > 0 &&
            generated.map((item, index) => {
              return <div>{item.kanji}</div>;
            })}

          <br />
          <br />
          <br />

          <button
            onClick={() => {
              if (!confirm("Are you sure...?")) return;
              localStorage.removeItem("kanji");
              router.reload();
            }}
          >
            Reset
          </button>
          <button
            onClick={() => {
              setData([]);
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              setData((d) => [
                { kanji: "", meaning: "", groups: [], readings: [] },
                ...d,
              ]);
              setEditing(0);
            }}
          >
            Add
          </button>

          <div className={style.list}>
            {data.map((item, index) => {
              return (
                <Kanji
                  edit={() => setEditing(index)}
                  key={index}
                  kanji={item}
                  remove={() => {
                    setData((d) => d.filter((_, i) => i !== index));
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Selector = ({
  group,
  max,
  setSelected,
}: {
  group: string;
  max: number;
  setSelected: (num: number) => void;
}) => {
  const [value, setValue] = useState(0);
  return (
    <div className={style.selector}>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => {
          let num = Math.max(
            0,
            Math.min(max, parseInt(e.target.value.replace(/[^0-9]/g, "")))
          );
          setValue(num);
          setSelected(num);
        }}
      />
      <p>
        {group} ({max})
      </p>
    </div>
  );
};
