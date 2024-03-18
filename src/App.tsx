import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Table from "./components/Table";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>home</div>} />
        <Route path="/form" element={<div>form</div>} />
        <Route path="/table" element={<Table />} />
      </Route>
    </Routes>
  );
}

export default App;
