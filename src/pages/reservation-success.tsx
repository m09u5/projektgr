import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

export default function ReservationSuccessPage() {
  const { state } = useLocation() as {
    state: { pointName: string; date: string };
  };

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Rezerwacja potwierdzona ✅</h1>

      <p>
        Punkt: <strong>{state.pointName}</strong>
      </p>

      <p className="mt-1">
        Data: <strong>{state.date}</strong>
      </p>

      <button
        onClick={() => navigate("/home")}
        className="mt-4 bg-sky-500 text-white rounded px-3 py-2"
      >
        Wróć do mapy
      </button>
    </div>
  );
}
