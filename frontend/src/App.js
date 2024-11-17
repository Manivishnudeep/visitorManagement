import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Employees from "./components/History/Employees";
import Security from "./components/Security/Security";
import Approver from "./components/Approver/Approver";
import EmployeeHistory from "./components/History/EmployeeHistory";

const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
};

const ProtectedRoute = ({ role, children }) => {
  const userRole = getRoleFromToken();
  if (!userRole) {
    return <Navigate to="/" />;
  }
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employee-history/:employeeId" element={<EmployeeHistory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/security"
          element={
            <ProtectedRoute role="security">
              <Security />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approver"
          element={
            <ProtectedRoute role="approver">
              <Approver />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
