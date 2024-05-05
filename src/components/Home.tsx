import { useEffect, useState } from "react";

function Home() {
  const initialState1 = { name: "john" };
  const initialState2 = { name: "alex" };

  const [state1, setState1] = useState(initialState1);
  const [state2, setState2] = useState(initialState2);

  useEffect(() => {
    console.log("state changed");
  }, [state1, state2]);

  const handleChangeState = () => {
    setState1({ name: "non john" });
  };

  const resetState = () => {
    setState1({ name: "john" });
  };

  const isStateDifferentFromInitial = (
    state: { name: string },
    initialState: { name: string }
  ) => {
    return JSON.stringify(state) !== JSON.stringify(initialState);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleChangeState}>Change state</button>
      <button onClick={resetState}>Reset state</button>
      {isStateDifferentFromInitial(state1, initialState1) ||
      isStateDifferentFromInitial(state2, initialState2) ? (
        <p>At least one state is different from its initial value.</p>
      ) : null}
    </>
  );
}

export default Home;
