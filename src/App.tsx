import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import HomePage from "./pages/home.tsx";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
