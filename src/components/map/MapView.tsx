import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import { Point } from "../../models/point.model";
import React from "react";
import L from "leaflet";

type Props = {
  points: Point[];
  selectedPoint: Point | null;
  onSelectPoint: (point: Point) => void;
};

const defaultMarkerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background: #2563eb;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>
  `,
});

export default function MapView({
  selectedPoint,
  points,
  onSelectPoint,
}: Props) {
  return (
    <div className="flex-1 rounded overflow-hidden h-full">
      <MapContainer className="h-full w-full">
        <SetInitialView />
        <FlyToSelectedPoint point={selectedPoint} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            {...({ icon: defaultMarkerIcon } as any)}
            eventHandlers={{
              click: () => onSelectPoint(point),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

function SetInitialView() {
  const map = useMap();

  useEffect(() => {
    map.setView([51.1079, 17.0385], 13);
  }, [map]);

  return null;
}
function FlyToSelectedPoint({ point }: { point: Point | null }) {
  const map = useMap();

  useEffect(() => {
    if (!point) return;

    map.flyTo([point.lat, point.lng], 15, {
      animate: true,
      duration: 0.8,
    });
  }, [point, map]);

  return null;
}
