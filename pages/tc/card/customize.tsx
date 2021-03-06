import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createXpBar } from "../../../utils/card";

const defaultStyle = {
  color: "#000000",
  color2: "#000000",
  title: "",
  type: "normal",
};

export default () => {
  const [accessToken, setAccessToken] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [style, setStyle] = useState(defaultStyle);
  const [initialStyle, setInitialStyle] = useState(defaultStyle);
  const [xpBar, setXpBar] = useState("");

  function authRedirect() {
    let url = `https://discord.com/api/oauth2/authorize?client_id=743606862578057277&redirect_uri=${location.origin}${location.pathname}&response_type=token&scope=identify`;
    location.replace(url);
  }

  useEffect(() => {
    let hash = location.hash.replace("#", "");
    let params = new URLSearchParams(hash);
    let tokenType =
      params.get("token_type") ?? sessionStorage.getItem("token_type");
    let accessToken =
      params.get("access_token") ?? sessionStorage.getItem("access_token");
    if (!accessToken || !tokenType) {
      authRedirect();
      return;
    }
    setAccessToken(accessToken);
    setTokenType(tokenType);
    sessionStorage.setItem("token_type", tokenType);
    sessionStorage.setItem("access_token", accessToken);
    if (hash) location.hash = "";
  }, []);

  useEffect(() => {
    if (!accessToken || !tokenType) return;
    axios
      .get("https://triviumcomicsbotstypescript.herokuapp.com/card/getInfo", {
        params: { tokenType, accessToken },
      })
      .then(({ data }) => {
        setStyle(data);
        setInitialStyle(data);
      })
      .catch(() => {
        authRedirect();
      });
  }, [accessToken, tokenType]);

  useEffect(() => {
    createXpBar(style.type, style.color, style.color2).then((xpBar) => {
      setXpBar(xpBar.toDataURL());
    });
  }, [style]);

  return (
    <div>
      <h1>Title</h1>
      <p>
        <input
          style={{ width: "100%" }}
          maxLength={70}
          value={style.title}
          onChange={(ev) => {
            setStyle((s) => ({ ...s, title: ev.target.value }));
          }}
        />
      </p>
      <h1>XP Bar</h1>
      <p>
        <img src={xpBar} />
      </p>
      <p>
        <select
          value={style.type}
          onChange={(ev) => {
            setStyle((s) => ({ ...s, type: ev.target.value }));
          }}
        >
          <option value="normal">Simple</option>
          <option value="stripes">Stripes A</option>
          <option value="stripes2">Stripes B</option>
          <option value="dual">Dual A</option>
          <option value="dualb">Dual B</option>
        </select>
      </p>
      <p>
        <label>
          <input
            value={style.color}
            onChange={(ev) => {
              setStyle((s) => ({ ...s, color: ev.target.value }));
            }}
            type="color"
          />{" "}
          Color A
        </label>
      </p>
      <p>
        <label>
          <input
            value={style.color2}
            onChange={(ev) => {
              setStyle((s) => ({ ...s, color2: ev.target.value }));
            }}
            type="color"
          />{" "}
          Color B
        </label>
      </p>
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setStyle(initialStyle);
          }}
        >
          Reset
        </button>

        <button
          onClick={() => {
            axios.post(
              "https://triviumcomicsbotstypescript.herokuapp.com/card/getInfo",
              { style },
              { params: { tokenType, accessToken } }
            );
          }}
        >
          Save
        </button>
      </p>
    </div>
  );
};
