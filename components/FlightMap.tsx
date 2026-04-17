"use client";

import { useState, useMemo } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FlightResult } from "@/app/page";
import { AIRPORT_COORDS } from "@/lib/airports";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type PinGroup = {
  code: string;
  coords: [number, number];
  cheapestPrice: number;
  flightCount: number;
  routeLabel: string;
};

type Props = {
  results: FlightResult[];
  onPinClick: (airportCode: string) => void;
  pinAtOrigin?: boolean;
};

export default function FlightMap({ results, onPinClick, pinAtOrigin = false }: Props) {
  const [activePin, setActivePin] = useState<string | null>(null);

  const groups = useMemo<PinGroup[]>(() => {
    type Entry = { prices: number[]; coords: [number, number]; routeLabel: string };
    const groupMap: Record<string, Entry> = {};

    for (const r of results) {
      const arrivalCode = r.legs[r.legs.length - 1]?.arrivalCode;
      const pinCode = pinAtOrigin ? r.origin : arrivalCode;
      if (!pinCode) continue;
      const coords = AIRPORT_COORDS[pinCode];
      if (!coords) continue;

      if (!groupMap[pinCode]) {
        groupMap[pinCode] = {
          prices: [],
          coords,
          routeLabel: pinAtOrigin ? `${r.origin} → ${arrivalCode}` : `→ ${pinCode}`,
        };
      }
      groupMap[pinCode].prices.push(r.price);
    }

    return Object.entries(groupMap).map(([code, entry]) => ({
      code,
      coords: entry.coords,
      cheapestPrice: Math.min(...entry.prices),
      flightCount: entry.prices.length,
      routeLabel: entry.routeLabel,
    }));
  }, [results, pinAtOrigin]);

  const overallCheapest = groups.length > 0 ? Math.min(...groups.map((g) => g.cheapestPrice)) : 0;
  const activeGroup = groups.find((g) => g.code === activePin) ?? null;

  return (
    <div className="w-full h-[540px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={{ longitude: 10, latitude: 20, zoom: 1.5 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onClick={() => setActivePin(null)}
      >
        <NavigationControl position="top-right" />

        {groups.map((g) => {
          const isCheapest = g.cheapestPrice === overallCheapest;
          const isActive = g.code === activePin;
          return (
            <Marker
              key={g.code}
              longitude={g.coords[0]}
              latitude={g.coords[1]}
              anchor="bottom"
              onClick={(e) => { e.originalEvent.stopPropagation(); setActivePin(isActive ? null : g.code); }}
            >
              <div
                className={`
                  flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md cursor-pointer
                  transition-all hover:scale-110 select-none
                  ${isActive ? "scale-110 ring-2 ring-offset-1" : ""}
                  ${isCheapest
                    ? "bg-green-500 text-white ring-green-300"
                    : "bg-blue-600 text-white ring-blue-300"}
                `}
              >
                ${g.cheapestPrice.toFixed(0)}
              </div>
            </Marker>
          );
        })}

        {activeGroup && (
          <Popup
            longitude={activeGroup.coords[0]}
            latitude={activeGroup.coords[1]}
            anchor="bottom"
            offset={36}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setActivePin(null)}
          >
            <div className="p-3 min-w-[200px]">
              <div className="font-bold text-gray-900 text-sm mb-0.5">
                {activeGroup.routeLabel}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Starting from{" "}
                <span className="font-semibold text-blue-700">${activeGroup.cheapestPrice.toFixed(0)}</span>
                {" · "}
                {activeGroup.flightCount} flight{activeGroup.flightCount !== 1 ? "s" : ""}
              </div>
              <button
                onClick={() => { onPinClick(activeGroup.code); setActivePin(null); }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 rounded-lg transition-colors"
              >
                View flights →
              </button>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
