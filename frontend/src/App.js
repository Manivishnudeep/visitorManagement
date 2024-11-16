import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Employees from "./components/History/Employees";
import Security from "./components/Security/Security";
import Approver from "./components/Approver/Approver";

// Utility function to decode JWT and get role
const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.role; // Assuming the role is stored in the payload
  } catch (e) {
    return null;
  }
};

// Higher Order Component for Protected Routes
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
