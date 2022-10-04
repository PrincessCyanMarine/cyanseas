import { useEffect, useState } from "react";
import usePrint from "../../../../hooks/usePrint";
import {
  getRandomFromArray,
  getRandomIndex,
  shuffle,
} from "../../../../utils/utils";
import list from "./list.json";

function getIndex() {
  return getRandomIndex(Object.keys(list));
}

export default () => {
  const [currentIndex, setIndex] = useState<number>(-1);
  const [ending, setEnding] = useState<[string, string[]]>();
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const getRandom = () => {
    let index;
    while (currentIndex === (index = getIndex()));
    return index;
  };

  usePrint(currentIndex);
  usePrint(ending);

  function getNext() {
    let index = getRandom();
    setIndex(index);
    setEnding(Object.entries(list)[index]);
  }

  useEffect(getNext, []);

  function win() {
    getNext();
    setCorrect((c) => c + 1);
  }
  function lose() {
    getNext();
    setWrong((w) => w + 1);
  }

  function Buttons() {
    let buttons = [];
    let values = Object.values(list);
    for (let i = 0; i < values.length; i++)
      buttons[i] = (
        <div style={{ width: "100%" }}>
          <button
            onClick={() => {
              if (i === currentIndex) win();
              else lose();
            }}
            style={{ width: "100%" }}
            key={i}
          >
            {values[i].join(" / ")}
          </button>
        </div>
      );
    return <div>{shuffle(buttons)}</div>;
  }

  return (
    <div>
      {ending && (
        <div>
          <h1>{ending[0]}</h1>
          <Buttons />
        </div>
      )}
      <div>Correct: {correct}</div>
      <div>Wrong: {wrong}</div>
    </div>
  );
};
