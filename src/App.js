import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UpdatePassword from "./components/UpdatePassword";
import "./style/styles.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Mostrar directamente el Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
