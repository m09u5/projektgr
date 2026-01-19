import React from "react";
import { Point } from "../../../models/point.model";
import { useNavigate, Link } from "react-router-dom";

type Props = {
  points: Point[];
  selectedPoint: Point | null;
  onSelect: (point: Point) => void;
};

function Sidebar({ points, selectedPoint, onSelect }: Props) {
  const navigate = useNavigate();

  return (
    <div className="p-4 h-full w-[280px] bg-white shadow-lg rounded-lg flex flex-col gap-4">
      <div className="text-sm font-semibold">Blisko ciebie</div>

      {/* Lista punktów */}
      <div className="flex flex-col gap-2">
        {points.map((point) => {
          const isActive = selectedPoint?.id === point.id;

          return (
            <button
              key={point.id}
              onClick={() => onSelect(point)}
              className={`bg-white rounded p-2 text-left hover:bg-sky-50 ${
                isActive ? "ring-2 ring-sky-400" : ""
              }`}
            >
              <div className="font-medium">{point.name}</div>

              {point.description && (
                <div className="text-xs text-gray-600">{point.description}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Szczegóły wybranego punktu */}
      {selectedPoint && (
        <div className="bg-white rounded p-3">
          <div className="font-semibold">{selectedPoint.name}</div>

          {selectedPoint.imageUrl && (
            <img
              src={selectedPoint.imageUrl}
              alt={selectedPoint.name}
              className="mt-2 rounded"
            />
          )}

          {selectedPoint.description && (
            <p className="text-sm mt-1">{selectedPoint.description}</p>
          )}

          <button
            onClick={() => navigate(`/reserve/${selectedPoint.id}`)}
            className="mt-3 w-full bg-brandGreen text-white rounded px-3 py-2"
          >
            Zarezerwuj wizytę
          </button>
        </div>
      )}

      {/* Link na dole */}
      <Link
        to="/my-reservations"
        className="mt-auto text-sm text-sky-600 underline"
      >
        Moje rezerwacje
      </Link>
    </div>
  );
}

export default Sidebar;
