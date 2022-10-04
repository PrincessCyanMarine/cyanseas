import { CSSProperties } from "@mui/styled-engine";
import { match } from "assert";
import { setIn } from "formik";
import { useEffect, useState } from "react";

enum OPTIONS {
  NEITHER,
  L,
  I,
}

const style: CSSProperties = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  width: "100%",
};

export default () => {
  const [input, setInput] = useState<string>();
  const [output, setOutput] = useState<OPTIONS>(OPTIONS.NEITHER);
  const [replace, setReplace] = useState("");
  useEffect(() => {
    if (input) {
      let i = input[0];
      if (i === "I" || i === "i") setOutput(OPTIONS.I);
      else if (i === "L" || i === "l") setOutput(OPTIONS.L);

      setInput(i);
    } else setOutput(OPTIONS.NEITHER);
  }, [input]);

  function getText() {
    switch (output) {
      case OPTIONS.L:
        return "That's a L";
        break;

      case OPTIONS.I:
        return "That's an i";
        break;

      default:
        return "That's neither, mate";
        break;
    }
  }

  return (
    <div>
      <h1>l or I?</h1>
      <p>{getText()}</p>
      <div>
        <input
          value={input}
          onChange={(ev) => setInput(ev.target.value[0])}
          maxLength={1}
        />
      </div>
      <br />

      <div>
        <textarea
          onChange={(ev) => {
            setReplace(ev.target.value.replace(/I/g, "i").replace(/l/g, "L"));
          }}
          style={style}
        ></textarea>
      </div>
      <div>
        <textarea value={replace} style={style} />
      </div>
    </div>
  );
};
