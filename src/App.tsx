import Table from "./components/Table";

function App() {
  return (
    <div className="layout">
      <header>Header</header>
      <div className="content">
        <div className="sidebar">
          <div>Page 1</div>
          <div>Page 2</div>
          <div>Page 3</div>
        </div>
        <main>
          <div className="testContainer">
            <Table />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
