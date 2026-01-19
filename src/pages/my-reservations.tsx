import { useEffect, useState } from "react";
import { Reservation } from "../models/reservation.model";
import React from "react";

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("reservations");
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  function removeReservation(id: string) {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  }

  if (reservations.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-semibold">Moje rezerwacje</h1>
        <p className="mt-2 text-gray-600">Brak aktywnych rezerwacji.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-lg font-semibold mb-4">Moje rezerwacje</h1>

      <div className="flex flex-col gap-3">
        {reservations.map((res) => (
          <div
            key={res.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{res.pointName}</div>
              <div className="text-sm text-gray-600">Data: {res.date}</div>
            </div>

            <button
              onClick={() => removeReservation(res.id)}
              className="text-red-600 text-sm"
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
