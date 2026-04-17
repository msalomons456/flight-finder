"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { SearchResults, FlightResult, Leg } from "@/app/page";
import { getAlliance, getAirlineCodeFromName } from "@/lib/alliances";

type SortKey = "price" | "duration";

function fareClassStyle(travelClass: string): string {
  if (travelClass === "First")           return "bg-amber-100 text-amber-800";
  if (travelClass === "Business")        return "bg-violet-100 text-violet-800";
  if (travelClass === "Premium Economy") return "bg-sky-100 text-sky-800";
  if (travelClass === "Mixed")           return "bg-orange-100 text-orange-800";
  return "bg-emerald-100 text-emerald-800";
}

function resolvedFareClass(legs: Leg[]): string {
  if (!legs.length) return "";
  const classes = [...new Set(legs.map((l) => l.travelClass).filter(Boolean))];
  return classes.length > 1 ? "Mixed" : classes[0];
}

function parseDurationMinutes(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;
  return (parseInt(match[1] ?? "0") * 60) + parseInt(match[2] ?? "0");
}

function formatTime(str: string) {
  const date = new Date(str.includes("T") ? str : str.replace(" ", "T"));
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatDateTime(str: string) {
  const date = new Date(str.includes("T") ? str : str.replace(" ", "T"));
  return date.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function dayOffset(departure: string, arrival: string) {
  const dep = new Date(departure.includes("T") ? departure : departure.replace(" ", "T"));
  const arr = new Date(arrival.includes("T") ? arrival : arrival.replace(" ", "T"));
  const diff = Math.round((arr.setHours(0,0,0,0) - dep.setHours(0,0,0,0)) / 86400000);
  return diff;
}

function formatDuration(iso: string) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return `${h} ${m}`.trim();
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatLayoverDuration(minutes: number) {
  return formatMinutes(minutes);
}

function LegDetail({ leg }: { leg: Leg }) {
  return (
    <div className="flex gap-4">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-1 flex-shrink-0" />
        <div className="w-px flex-1 bg-gray-200 my-1" />
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
      </div>

      <div className="flex-1 pb-1">
        {/* Departure */}
        <div className="mb-2">
          <div className="text-sm font-semibold text-gray-800">{formatDateTime(leg.departureTime)}</div>
          <div className="text-sm text-gray-600">{leg.departureAirportName} <span className="text-gray-400">({leg.departureCode})</span></div>
        </div>

        {/* Flight info */}
        <div className="flex items-center gap-2 my-2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-500">
          {leg.airlineLogo && (
            <Image src={leg.airlineLogo} alt={leg.airline} width={16} height={16} className="object-contain flex-shrink-0" />
          )}
          <span className="font-medium text-gray-700">{leg.airline} {leg.flightNumber.replace(/^[A-Z0-9]+\s/, "")}</span>
          <span className="text-gray-300">·</span>
          <span>{leg.airplane}</span>
          <span className="text-gray-300">·</span>
          <span>{formatMinutes(leg.duration)}</span>
          <span className="text-gray-300">·</span>
          <span>{leg.travelClass}</span>
        </div>

        {/* Arrival */}
        <div>
          <div className="text-sm font-semibold text-gray-800">{formatDateTime(leg.arrivalTime)}</div>
          <div className="text-sm text-gray-600">{leg.arrivalAirportName} <span className="text-gray-400">({leg.arrivalCode})</span></div>
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZES = [10, 25, 50, 100];

type Props = {
  data: SearchResults;
  onSelect: (flight: FlightResult) => void;
  selectLabel?: string;
  searchedAt?: Date | null;
};

function useFreshnessLabel(searchedAt?: Date | null) {
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!searchedAt) { setLabel(""); return; }
    function update() {
      const mins = Math.floor((Date.now() - searchedAt!.getTime()) / 60000);
      setLabel(mins < 1 ? "Prices fetched just now" : `Prices fetched ${mins} min ago`);
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [searchedAt]);
  return label;
}

export default function ResultsTable({ data, onSelect, selectLabel = "Select", searchedAt }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const freshnessLabel = useFreshnessLabel(searchedAt);
  const isStale = searchedAt ? Date.now() - searchedAt.getTime() > 10 * 60 * 1000 : false;

  const sortedResults = useMemo(() => {
    return [...data.results].sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : parseDurationMinutes(a.duration) - parseDurationMinutes(b.duration)
    );
  }, [data.results, sortBy]);

  if (data.results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No flights found to <strong>{data.destination}</strong> from the {data.region} region on that date.
      </div>
    );
  }

  const cheapest = data.results[0].price;

  function toggleExpand(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <div className="mt-8">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-blue-900">
              Flights to {data.destination} from {data.region}
            </h2>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${data.tripType === "1" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
              {data.tripType === "1" ? "Round Trip" : "One Way"}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-sm text-gray-500">
              Showing {Math.min(pageSize, data.results.length)} of {data.results.length} results · One-way fare per person
            </p>
            {freshnessLabel && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isStale ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
              }`}>
                {isStale ? "⚠ " : "✓ "}{freshnessLabel}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-gray-500">Sort:</span>
          {(["price", "duration"] as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                sortBy === key
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {key === "price" ? "Price" : "Duration"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sortedResults.slice(0, pageSize).map((r, i) => {
          const key = `${r.origin}-${r.flightNumber || r.airline}-${i}`;
          const isExpanded = expanded.has(key);

          return (
            <div
              key={key}
              className={`bg-white rounded-xl shadow-sm border ${
                i === 0 ? "border-green-400 ring-1 ring-green-300" : "border-gray-100"
              }`}
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Rank + Origin */}
                  <div className="flex items-center gap-3 sm:w-40">
                    <span className={`text-lg font-bold w-7 text-center ${i === 0 ? "text-green-600" : "text-gray-400"}`}>
                      #{i + 1}
                    </span>
                    <div>
                      <div className="text-2xl font-bold text-blue-800">{r.origin}</div>
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        {r.airlineLogo && (
                          <Image src={r.airlineLogo} alt={r.airline} width={16} height={16} className="object-contain flex-shrink-0" />
                        )}
                        <span className="text-xs text-gray-400">
                          {r.airline}{r.flightNumber ? ` ${r.flightNumber.replace(/^[A-Z0-9]+\s/, "")}` : ""}
                        </span>
                      </div>
                      {(() => {
                        const alliance = getAlliance(getAirlineCodeFromName(r.airline));
                        if (alliance === "None") return null;
                        const styles =
                          alliance === "Star Alliance" ? "text-blue-600" :
                          alliance === "SkyTeam"       ? "text-sky-600" :
                          "text-red-600";
                        return <div className={`text-[10px] font-semibold ${styles}`}>{alliance}</div>;
                      })()}
                      {r.legs?.length > 0 && resolvedFareClass(r.legs) && (
                        <span className={`mt-1 self-start text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${fareClassStyle(resolvedFareClass(r.legs))}`}>
                          {resolvedFareClass(r.legs)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 sm:px-4 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{formatTime(r.departure)}</span>
                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-xs text-gray-400">{formatDuration(r.duration)}</span>
                        <div className="w-full border-t border-dashed border-gray-300 my-0.5" />
                        <span className="text-xs text-gray-400">
                          {r.stops === 0 ? "Nonstop" : `${r.stops} stop${r.stops > 1 ? "s" : ""}`}
                        </span>
                      </div>
                      <span className="font-medium">
                        {formatTime(r.arrival)}
                        {dayOffset(r.departure, r.arrival) > 0 && (
                          <sup className="text-[10px] text-amber-500 font-semibold ml-0.5">
                            +{dayOffset(r.departure, r.arrival)}
                          </sup>
                        )}
                      </span>
                    </div>
                    {r.layovers && r.layovers.length > 0 && (
                      <div className="flex flex-col items-center gap-1">
                        {r.layovers.map((l) => (
                          <span
                            key={l.id}
                            className="relative group inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-2.5 py-1 rounded-full cursor-default"
                          >
                            <span className="font-bold">{l.id}</span>
                            <span className="text-amber-500">·</span>
                            <span>{formatLayoverDuration(l.duration)} layover</span>
                            {l.overnight && (
                              <span className="ml-1 bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                                overnight
                              </span>
                            )}
                            <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] rounded-lg bg-gray-900 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center shadow-lg">
                              <span className="block font-semibold">{l.name}</span>
                              {l.nextFlightNumber && (
                                <span className="block text-gray-300 mt-0.5">Next: {l.nextFlightNumber}</span>
                              )}
                              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrival airport */}
                  <div className="hidden sm:block text-right sm:w-16">
                    <div className="text-2xl font-bold text-blue-800">
                      {r.legs[r.legs.length - 1]?.arrivalCode}
                    </div>
                  </div>

                  {/* Price + Select */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${i === 0 ? "text-green-600" : "text-gray-800"}`}>
                        ${r.price.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-400">one-way fare</div>
                      {i > 0 && (
                        <div className="text-xs text-red-400">+${(r.price - cheapest).toFixed(0)} more</div>
                      )}
                      {i === 0 && (
                        <div className="text-xs text-green-500 font-semibold">Best price</div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelect(r)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
                    >
                      {selectLabel}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expand toggle */}
              <button
                onClick={() => toggleExpand(key)}
                className="w-full flex items-center justify-center gap-1 py-2 border-t border-gray-100 text-xs text-gray-400 hover:text-blue-500 hover:bg-gray-50 transition-colors rounded-b-xl"
              >
                <span>{isExpanded ? "Hide details" : "Flight details"}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded leg details */}
              {isExpanded && r.legs && (
                <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex flex-col gap-4">
                  {r.legs.map((leg, li) => (
                    <div key={`${leg.flightNumber}-${li}`}>
                      <LegDetail leg={leg} />
                      {li < r.legs.length - 1 && r.layovers[li] && (
                        <div className="ml-6 mt-2 mb-1 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                          <span>Layover in {r.layovers[li].name}</span>
                          <span className="text-amber-400">·</span>
                          <span>{formatLayoverDuration(r.layovers[li].duration)}</span>
                          {r.layovers[li].overnight && <span className="font-semibold">(overnight)</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-600">
        <span>Results per page:</span>
        <div className="flex gap-1">
          {PAGE_SIZES.map((n) => (
            <button
              key={n}
              onClick={() => setPageSize(n)}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                pageSize === n
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
