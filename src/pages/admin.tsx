import React, { useState } from "react";
import { Point } from "../models/point.model";
import AdminMap from "../components/map/AdminMap";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  function handlePickLocation(latValue: number, lngValue: number) {
    setLat(latValue);
    setLng(lngValue);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!lat || !lng) {
      alert("Najpierw wybierz punkt na mapie");
      return;
    }

    const newPoint: Point = {
      id: crypto.randomUUID(),
      name,
      description,
      lat,
      lng,
    };

    const stored = localStorage.getItem("points");
    const points: Point[] = stored ? JSON.parse(stored) : [];

    points.push(newPoint);
    localStorage.setItem("points", JSON.stringify(points));

    setName("");
    setDescription("");
    setLat(null);
    setLng(null);

    alert("Punkt zapisany ✅");
  }

  return (
    <div className="flex h-screen gap-6 p-6">
      <form onSubmit={handleSubmit} className="w-[320px] flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Dodaj punkt</h1>

        <input
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />

        <textarea
          placeholder="Opis (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <input
          placeholder="Latitude"
          value={lat ?? ""}
          readOnly
          className="border rounded px-3 py-2 bg-gray-50"
        />

        <input
          placeholder="Longitude"
          value={lng ?? ""}
          readOnly
          className="border rounded px-3 py-2 bg-gray-50"
        />

        <button className="bg-sky-500 text-white rounded py-2">
          Zapisz punkt
        </button>
      </form>

      <AdminMap onPickLocation={handlePickLocation} />
    </div>
  );
}
