import { useEffect, useState } from "react";

function Home() {
  const [state1, setState1] = useState({ name: "john" });
  const [state2, setState2] = useState({ name: "alex" });

  useEffect(() => {
    console.log("state changed");
  }, [state1, state2]);

  const handleChangeState = () => {
    setState1({ name: "non john" });
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleChangeState}>Change state</button>
    </>
  );
}

export default Home;
