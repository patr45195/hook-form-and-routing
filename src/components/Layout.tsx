import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layout">
      <header>Header</header>
      <div className="content">
        <div className="sidebar">
          <div className="sidebar-links">
            <Link to="/">Home</Link>
            <Link to="/form">Form</Link>
            <Link to="/table">Table</Link>
            <Link to="/selectForm">Select Form</Link>
            <Link to="/virtualize">Virtualize</Link>
          </div>
        </div>
        <main>
          <div className="contentWrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
