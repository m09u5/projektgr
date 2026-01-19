import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Point } from "../models/point.model";
import React from "react";

export default function ReservePage() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [point, setPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (!pointId) return;

    const stored = localStorage.getItem("points");
    if (!stored) return;

    const points: Point[] = JSON.parse(stored);
    const found = points.find((p) => p.id === pointId);
    setPoint(found ?? null);
  }, [pointId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !point) return;

    const stored = localStorage.getItem("reservations");
    const reservations = stored ? JSON.parse(stored) : [];

    reservations.push({
      id: crypto.randomUUID(),
      pointId: point.id,
      pointName: point.name,
      date,
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    navigate("/reservation-success", {
      state: {
        pointName: point.name,
        date,
      },
    });
  }

  if (!point) {
    return <div className="p-6">Nie znaleziono punktu.</div>;
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-lg font-semibold mb-1">Rezerwacja wizyty</h1>

      <div className="text-sm text-gray-600 mb-4">
        Punkt: <strong>{point.name}</strong>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />

        <button className="bg-sky-500 text-white rounded py-2">
          Potwierdź rezerwację
        </button>
      </form>
    </div>
  );
}
