import { useEffect, useState } from "react";

function Home() {
  const initialState1 = { name: "john" };
  const initialState2 = { name: "alex" };

  const [state1, setState1] = useState(initialState1);
  const [state2, setState2] = useState(initialState2);

  useEffect(() => {
    const hasChangesState =
      isStateDifferentFromInitial(state1, initialState1) ||
      isStateDifferentFromInitial(state2, initialState2)
        ? true
        : false;

    // console.log(hasChangesState);
  }, [initialState1, initialState2, state1, state2]);

  const handleChangeState1 = () => {
    setState1({ name: "non john" });
  };

  const handleChangeState2 = () => {
    setState2({ name: "non alex" });
  };

  const resetState = () => {
    setState1({ name: "john" });
    setState2({ name: "alex" });
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
      <button onClick={handleChangeState1}>Change state 1</button>
      <button onClick={handleChangeState2}>Change state 2</button>
      <button onClick={resetState}>Reset state</button>
    </>
  );
}

export default Home;
