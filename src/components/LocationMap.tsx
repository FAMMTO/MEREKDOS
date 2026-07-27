"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl/mapbox";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Merek Comercializadora — Honda Vista #118-A, Col. Linda Vista, Guadalupe, N.L.
const LOCATION = { longitude: -100.257077, latitude: 25.691407 };

export default function LocationMap() {
  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-zinc-600">
        {/* set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to enable the map */}
        mapa aquí
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ ...LOCATION, zoom: 14 }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      style={{ width: "100%", height: "100%" }}
    >
      <Marker longitude={LOCATION.longitude} latitude={LOCATION.latitude} anchor="bottom">
        <div className="h-5 w-5 rounded-full border-2 border-white bg-brand-orange shadow-[0_0_12px_var(--brand-orange)]" />
      </Marker>
    </Map>
  );
}
