import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Table from "./components/Table";
import { Form } from "./components/Form";
import { MyForm, fetchDefaultUserValues } from "./components/MyForm";
import Home from "./components/Home";
import Virtualize from "./components/Virtualize";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/table" element={<Table />} />
        <Route path="/virtualize" element={<Virtualize />} />
        <Route
          path="/selectForm"
          element={<MyForm getDefaultValues={fetchDefaultUserValues} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
