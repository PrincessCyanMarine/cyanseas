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
      <h1>Quanto o Akira先生 deve para cada um de seus alunos </h1>

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
