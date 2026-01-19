import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { Point } from "../../models/point.model";
import L from "leaflet";
import React from "react";

const tempMarkerIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background: #22c55e;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>
  `,
});

type Props = {
  onPickLocation: (lat: number, lng: number) => void;
};

export default function AdminMap({ onPickLocation }: Props) {
  const [tempPosition, setTempPosition] = useState<[number, number] | null>(
    null
  );

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setTempPosition([lat, lng]);
        onPickLocation(lat, lng);
      },
    });

    return null;
  }

  return (
    <div className="flex-1 rounded overflow-hidden">
      <MapContainer
        center={[51.1079, 17.0385]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler />

        {tempPosition && (
          <Marker
            position={tempPosition}
            {...({ icon: tempMarkerIcon } as any)}
          />
        )}
      </MapContainer>
    </div>
  );
}
