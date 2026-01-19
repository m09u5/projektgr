import React, { useEffect, useState } from "react";
import Sidebar from "../layout/organization-panel/side-bar/sidebar";
import MapView from "../components/map/MapView";
import { Point } from "../models/point.model";
import { initialPoints } from "../data/initialPoints";

function Home() {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("points");

    if (stored) {
      setPoints(JSON.parse(stored));
    } else {
      setPoints(initialPoints);
      localStorage.setItem("points", JSON.stringify(initialPoints));
    }
  }, []);

  return (
    <div className="flex h-screen gap-4 p-4">
      <Sidebar
        points={points}
        selectedPoint={selectedPoint}
        onSelect={setSelectedPoint}
      />

      <MapView
        points={points}
        selectedPoint={selectedPoint}
        onSelectPoint={setSelectedPoint}
      />
    </div>
  );
}

export default Home;
