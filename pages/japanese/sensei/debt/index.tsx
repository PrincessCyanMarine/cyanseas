import Head from "next/head";

export default () => {
  const debt = (
    [
      ["Edna", 0.5],
      ["Leonardo", 0],
      ["Danielle", 0],
      ["Hayashi", 0],
      ["Isabelle", 0],
      ["Rawan", 0],
    ] as [string, number][]
  )
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <Head>
        <meta
          property="og:title"
          content="Quanto dinheiro Akira先生 deve para seus alunos 👀"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cyanmarine.net" />
        <meta
          property="og:image"
          content="https://cyanmarine.net/assets/images/japanese/money.png"
        />
        <meta
          property="og:description"
          content="Um site que informa o quanto Akira先生 deve para seus alunos"
        />
        <meta property="theme-color" content="#00FFFF" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta property="og:image" content="" /> */}

        <title>Quanto dinheiro Akira先生 deve para seus alunos 👀</title>
      </Head>

      <h1>Quanto o Akira先生 deve para seus alunos </h1>

      <div>
        {debt.map((item) => (
          <h2
            className="no-animation"
            style={{
              color: "white",

              display: "flex",
              justifyContent: "space-around",
            }}
            key={item[0]}
          >
            <span style={{ width: "100%" }}>{item[0]}:</span>{" "}
            <span style={{ width: "100%" }}>R${item[1].toFixed(2)}</span>
          </h2>
        ))}
      </div>
      <h1 className="no-animation" style={{ color: "white" }}>
        👀
      </h1>
    </div>
  );
};
