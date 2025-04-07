import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "./dashboard/Dashboard";
import Sales from "./dashboard/Sales";
import Inventory from "./dashboard/Inventory";
import Customers from "./dashboard/Customers";
import Suppliers from "./dashboard/Suppliers";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <Router>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "220px", marginTop: "90px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales" element={<Sales token={token} />} />
          <Route path="/inventory" element={<Inventory token={token} />} />
          <Route path="/customers" element={<Customers token={token} />} />
          <Route path="/suppliers" element={<Suppliers token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
