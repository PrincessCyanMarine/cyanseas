import React, { useEffect, useState } from "react";
import list from "./list.json";
import { getRandomFromArray } from "../../../../utils/utils";
import styles from "../../../../styles/pages/games/multiplayer/wordle.module.scss";
import $ from "jquery";
import Snack from "../../../../components/Snack";
import adapter from "webrtc-adapter";
import Peer, { DataConnection } from "peerjs";
import { RestaurantRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import usePrint from "../../../../hooks/usePrint";

type States = "correct" | "contained" | "incorrect" | "notguessed";

function getRandomWord() {
  return "TITTY";
  return getRandomFromArray(list);

  // return list[594];
}

const getRandomUuid = () =>
  Math.floor(Math.random() * 2 ** 18)
    .toString(36)
    .padStart(4, "0");

function Square(letter?: string, state: States = "notguessed") {
  return <span className={`${styles.square} ${styles[state]}`}>{letter}</span>;
}

function count(str: string, letter: string) {
  return str.split("").reduce((t, cv) => (cv === letter ? t + 1 : t), 0);
}

function Board(word: string, guesses: string[], tries: number) {
  function getState(i: number, e: number): States {
    // (!guesses[i] || guesses.length <= e) ? "incorrect"
    // return (["correct", "incorrect", "contained"] as States[])[(i + e) % 3];
    let w = guesses[i];
    if (!w) w = "";

    let l = w[e];
    if (i >= tries) return "notguessed";
    if (l === word[e]) return "correct";
    if (!word.includes(l)) return "incorrect";
    let a1 = count(word, l);
    let a2 = word
      .substring(0, e)
      .split("")
      .reduce((t, cv, i) => (cv === w[i] ? t + 1 : t), 0);
    let a = a1 - a2;
    console.log(`${a1} - ${a2} = ${a}`);
    let p = -1;
    for (let j = 0; j < a; j++) {
      p = w.indexOf(l, p + 1);
      if (p >= e && w[e] != l) return "contained";
    }
    return "incorrect";
  }

  let res: JSX.Element[][] = [];
  for (let i = 0; i < 6; i++) {
    res[i] = [];
    for (let e = 0; e < 5; e++) {
      res[i].push(Square(guesses[i]?.[e], getState(i, e)));
    }
  }

  return (
    <div>
      {res.map((row, i) => (
        <p className={styles.row} id={`row-${i}`} key={i}>
          {row}
        </p>
      ))}
    </div>
  );
}

type Opponent = {
  guesses: string[];
  tries: number;
};

export default () => {
  const router = useRouter();

  const [word, setWord] = useState<string>();
  const [guesses, setGuesses] = useState<string[]>(["TTTAA"]);
  const [tries, setTries] = useState(1);
  // const [tries, setTries] = useState(0);
  const [message, alert] = useState("");
  const [stop, setStop] = useState(true);
  const [opponent, setOpponent] = useState<Opponent>({
    guesses: [] as string[],
    tries: 0,
  });
  const [guessed, setGuessed] = useState<string[]>([]);
  const [uuid, setUuid] = useState<string>();
  const [peer, setPeer] = useState<Peer>();
  const [connectTo, setConnectTo] = useState("");
  const [conn, setConn] = useState<DataConnection>();

  const Message = () => {
    return (
      <Snack
        message={message}
        handleClose={(ev, reason) => {
          alert("");
        }}
        open={message.length > 0}
        autoHideDuration={2000}
        key="Success"
      />
    );
  };

  function shake(reason?: string) {
    if (reason) alert(reason);
    let row = $(`#row-${tries}`);
    row?.on("animationend", (ev) => {
      row.removeClass(styles.shake);
      row?.off("animationend");
    });
    row?.addClass(styles.shake);
  }

  function win() {
    setStop(true);
  }

  function lose() {
    setStop(true);
  }

  //   function Keyboard() {
  //     return (
  //       <div className={styles.keyboard}>
  //         {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter, i) => {
  //           return (
  //             <div
  //               key={letter}
  //               className={`${styles.key} ${
  //                 guessed.includes(letter) ? styles.guessed : ""
  //               }`}
  //             >
  //               {letter}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   }

  function onkeydown(ev: KeyboardEvent) {
    if (stop) return;
    let { key } = ev;
    console.log(key);
    alert("");

    switch (key) {
      case "Backspace":
        setGuesses((g) => {
          let res = [...g];
          if (!res[tries] || res[tries].length == 0) return res;
          res[tries] = res[tries].substring(0, res[tries].length - 1);
          return res;
        });
        break;
      case "Enter":
        let r = false;
        let w = guesses[tries];
        if ((r = w?.length === 5) /* && list.includes(w) */) {
          setTries((t) => t + 1);
          w.split("").forEach((l) => {
            setGuessed((g) => (g.includes(l) ? g : [...g, l]));
          });
          if (w === word) return win();
          if (tries > 4) lose();
        } else {
          shake(!r ? "Too short" : "Not a word");
        }
        break;

      default:
        if (key.match(/^[A-Z]$/i))
          setGuesses((g) => {
            let res = [...g];
            if (!res[tries]) res[tries] = "";
            if (res[tries].length >= 5) return res;
            res[tries] += key.toUpperCase();
            return res;
          });
    }
  }

  useEffect(() => {
    if (!stop) window.addEventListener("keydown", onkeydown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
    };
  }, [guesses, tries, stop]);

  useEffect(() => {
    let pack = { type: "opponent", opponent: { guesses, tries } };
    if (conn) conn.send(pack);
    console.log(pack);
  }, [conn, guesses, tries]);

  usePrint(opponent);
  usePrint(conn);

  useEffect(() => {
    // setWord(getRandomWord());
    setUuid(getRandomUuid());
  }, []);

  useEffect(() => {
    if (!uuid) return;
    console.log(uuid);
    import("peerjs").then(({ default: Peer }) => {
      let p = new Peer(uuid);

      function isValidData(
        data: any
      ): data is
        | { type: "word"; word: string }
        | { type: "opponent"; opponent: Opponent } {
        if (!data || typeof data != "object" || !("type" in data)) return false;
        if (data.type === "word" && typeof data.word === "string") return true;
        if (
          data.type === "opponent" &&
          "opponent" in data &&
          typeof data.opponent?.tries === "number" &&
          Array.isArray(data.opponent?.guesses) &&
          (data.opponent?.guesses as any[])?.every((v) => typeof v === "string")
        )
          return true;
        return false;
      }

      p.on("connection", (c) => {
        setConn(c);
        setStop(false);
        c.on("data", (data) => {
          // Will print 'hi!'
          console.log(data);
          if (isValidData(data)) {
            console.log("valid");
            switch (data.type) {
              case "word":
                setWord(data.word);
                break;
              case "opponent":
                setOpponent(data.opponent);
                break;
            }
          } else console.log("invalid");
        });
        c.on("close", () => {
          router.reload();
        });
      });

      p.on("disconnected", () => {
        router.reload();
      });
      setPeer(p);
    });
  }, [uuid]);

  return (
    <div>
      <p>{word}</p>
      <p>{uuid}</p>
      {word && (
        <div className={styles.boards}>
          {Board(word, guesses, tries)}
          <div className={styles.divider} />
          {Board(word, opponent.guesses, opponent.tries)}
        </div>
      )}

      {/* {Keyboard()} */}
      {Message()}
      {peer && !conn && (
        <div>
          <p>
            <input
              value={connectTo}
              onChange={(ev) => {
                setConnectTo(ev.target.value);
              }}
            />
          </p>
          <p>
            <button
              onClick={() => {
                let c = peer.connect(connectTo);

                c.on("close", () => {
                  router.reload();
                });

                c.on("open", () => {
                  let w = getRandomWord();
                  setWord(w);
                  c.send({ type: "word", word: w });
                  setStop(false);
                });
                setConn(c);
              }}
            >
              Connect
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
