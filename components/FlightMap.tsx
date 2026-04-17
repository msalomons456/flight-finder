"use client";

import { useState, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FlightResult } from "@/app/page";
import { AIRPORT_COORDS } from "@/lib/airports";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type Props = {
  results: FlightResult[];
  onSelect: (flight: FlightResult) => void;
  selectLabel?: string;
  pinAtOrigin?: boolean;
};

export default function FlightMap({ results, onSelect, selectLabel = "Select", pinAtOrigin = false }: Props) {
  const [popupFlight, setPopupFlight] = useState<FlightResult | null>(null);

  const cheapest = results.length > 0 ? Math.min(...results.map((r) => r.price)) : 0;

  const handleMarkerClick = useCallback((flight: FlightResult) => {
    setPopupFlight((prev) => (prev?.flightNumber === flight.flightNumber && prev?.origin === flight.origin ? null : flight));
  }, []);

  return (
    <div className="w-full h-[540px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={{ longitude: 10, latitude: 20, zoom: 1.5 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onClick={() => setPopupFlight(null)}
      >
        <NavigationControl position="top-right" />

        {results.map((r, i) => {
          const arrivalCode = r.legs[r.legs.length - 1]?.arrivalCode;
          const pinCode = pinAtOrigin ? r.origin : arrivalCode;
          const coords = pinCode ? AIRPORT_COORDS[pinCode] : null;
          if (!coords) return null;
          const isCheapest = r.price === cheapest;

          return (
            <Marker
              key={`${r.origin}-${arrivalCode}-${i}`}
              longitude={coords[0]}
              latitude={coords[1]}
              anchor="bottom"
              onClick={(e) => { e.originalEvent.stopPropagation(); handleMarkerClick(r); }}
            >
              <div
                className={`
                  flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer
                  transition-transform hover:scale-110 select-none
                  ${isCheapest
                    ? "bg-green-500 text-white ring-2 ring-green-300"
                    : "bg-blue-600 text-white"}
                `}
              >
                ${r.price.toFixed(0)}
              </div>
            </Marker>
          );
        })}

        {popupFlight && (() => {
          const arrivalCode = popupFlight.legs[popupFlight.legs.length - 1]?.arrivalCode;
          const pinCode = pinAtOrigin ? popupFlight.origin : arrivalCode;
          const coords = pinCode ? AIRPORT_COORDS[pinCode] : null;
          if (!coords) return null;
          return (
            <Popup
              longitude={coords[0]}
              latitude={coords[1]}
              anchor="bottom"
              offset={36}
              closeButton={false}
              closeOnClick={false}
              onClose={() => setPopupFlight(null)}
              className="flight-map-popup"
            >
              <div className="p-3 min-w-[180px]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-900 text-base">
                      {popupFlight.origin} → {arrivalCode}
                    </div>
                    <div className="text-xs text-gray-500">{popupFlight.airline}</div>
                  </div>
                  <div className="text-xl font-bold text-blue-700">${popupFlight.price.toFixed(0)}</div>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  {popupFlight.stops === 0 ? "Nonstop" : `${popupFlight.stops} stop${popupFlight.stops > 1 ? "s" : ""}`}
                  {" · "}
                  {popupFlight.duration.replace("PT", "").replace("H", "h ").replace("M", "m").toLowerCase()}
                </div>
                <button
                  onClick={() => { onSelect(popupFlight); setPopupFlight(null); }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 rounded-lg transition-colors"
                >
                  {selectLabel}
                </button>
              </div>
            </Popup>
          );
        })()}
      </Map>
    </div>
  );
}
