function Loom({ id }) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "60%",
        width: 1200,
        marginTop: "20px",
      }}
    >
      <iframe
        src={`https://www.loom.com/embed/${id}`}
        webkitallowfullscreen
        mozallowfullscreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  );
}

export default function () {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Loom
          title="Pablo - rocket ship"
          id="1bfca04b814148b9b0f2c8220be6715d"
        />
        <Loom id="180bd5643f7e4119b719d609446ee7b2" />
        <Loom id="51f3c8bf662b4cc3bdc59bcada0272ad" />
        <Loom id="cdb30ba6ac7d44a4a61fd500227b3277" />
        <Loom id="f6809c7bc0114d30afdf6219249e7944" />
        <Loom title="Remix Jokes" id="b7094e68de274e0390d4930c742cc98e" />
        <Loom title="Remix Demo" id="059d3d0770db447a8287c05bf269b476" />
        <Loom
          title="CodeSandbox - Proxies"
          id="e1526d53098844a4a8bf551b2cde8e2e"
        />
        <Loom
          title="Calix - Drag Event"
          id="96618b07bc2f4f9ba8b3eb6e7a606ddb"
        />
      </div>
    </div>
  );
}
