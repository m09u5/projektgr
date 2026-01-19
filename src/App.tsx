import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";
import ReservePage from "./pages/reserve";
import ReservationSuccessPage from "./pages/reservation-success";
import MyReservationsPage from "./pages/my-reservations";

import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/reserve/:pointId" element={<ReservePage />} />
      <Route path="/reservation-success" element={<ReservationSuccessPage />} />
      <Route path="/my-reservations" element={<MyReservationsPage />} />
    </Routes>
  );
}
