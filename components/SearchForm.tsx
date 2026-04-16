"use client";

import { useState } from "react";

const REGIONS = [
  { key: "us_northeast", label: "US Northeast (BOS, JFK, EWR, PHL, BWI…)" },
  { key: "us_southeast", label: "US Southeast (ATL, MIA, CLT, RDU…)" },
  { key: "us_midwest",   label: "US Midwest (ORD, DTW, MSP, STL…)" },
  { key: "us_west",      label: "US West Coast (LAX, SFO, SEA, PDX…)" },
  { key: "us_southwest", label: "US Southwest (DFW, IAH, PHX, DEN…)" },
  { key: "uk_ireland",   label: "UK & Ireland (LHR, LGW, MAN, DUB…)" },
  { key: "western_europe", label: "Western Europe (CDG, AMS, FRA, VIE…)" },
];

type Props = {
  onSearch: (params: { destination: string; region: string; date: string; adults: string; maxStops: string }) => void;
  loading: boolean;
};

const inputClass = "border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white";

export default function SearchForm({ onSearch, loading }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [destination, setDestination] = useState("");
  const [region, setRegion] = useState(REGIONS[0].key);
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [maxStops, setMaxStops] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !date) return;
    onSearch({ destination: destination.toUpperCase(), region, date, adults, maxStops });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Destination Airport</label>
          <input
            type="text"
            placeholder="e.g. NRT, CDG, LHR"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            maxLength={3}
            required
            className={`${inputClass} text-lg font-mono uppercase tracking-widest placeholder:text-gray-400`}
          />
          <span className="text-xs text-gray-400">3-letter IATA code</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Search From Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={inputClass}
          >
            {REGIONS.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Departure Date</label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Passengers</label>
          <select
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            className={inputClass}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600">Max Stops</label>
          <div className="flex gap-2">
            {[
              { value: "", label: "Any" },
              { value: "0", label: "Nonstop only" },
              { value: "1", label: "1 stop or fewer" },
              { value: "2", label: "2 stops or fewer" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMaxStops(opt.value)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  maxStops === opt.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors text-lg"
      >
        {loading ? "Searching…" : "Find Cheapest Flights"}
      </button>
    </form>
  );
}
