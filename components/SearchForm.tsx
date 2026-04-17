"use client";

import { useState } from "react";
import RegionCombobox from "@/components/RegionCombobox";
import { type Region } from "@/lib/regions";

type Props = {
  onSearch: (params: {
    destination: string;
    regionLabel: string;
    airports: string[];
    date: string;
    returnDate: string;
    tripType: "1" | "2";
    adults: string;
    maxStops: string;
  }) => void;
  loading: boolean;
};

const inputClass = "h-11 border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white";

export default function SearchForm({ onSearch, loading }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [destination, setDestination] = useState("");
  const [region, setRegion] = useState<Region | null>(null);
  const [tripType, setTripType] = useState<"1" | "2">("2");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [maxStops, setMaxStops] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !region || !date) return;
    if (tripType === "1" && !returnDate) return;
    onSearch({
      destination: destination.toUpperCase(),
      regionLabel: region.label,
      airports: region.airports,
      date,
      returnDate: tripType === "1" ? returnDate : "",
      tripType,
      adults,
      maxStops,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
    >
      {/* Trip type toggle */}
      <div className="flex gap-2">
        {[{ value: "2", label: "One Way" }, { value: "1", label: "Round Trip" }].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTripType(opt.value as "1" | "2")}
            className={`px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
              tripType === opt.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

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
            className={`${inputClass} font-mono uppercase tracking-widest placeholder:text-gray-400`}
          />
          <span className="text-xs text-gray-400">3-letter IATA code</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Search From Region</label>
          <RegionCombobox value={region} onChange={setRegion} inputClass={inputClass} />
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

        {tripType === "1" ? (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Return Date</label>
            <input
              type="date"
              value={returnDate}
              min={date || today}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className={inputClass}
            />
          </div>
        ) : (
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
        )}

        {tripType === "1" && (
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
        )}

        <div className={`flex flex-col gap-1 ${tripType === "1" ? "sm:col-span-2" : "sm:col-span-2"}`}>
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
        disabled={loading || !region}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors text-lg"
      >
        {loading ? "Searching…" : "Find Cheapest Flights"}
      </button>
    </form>
  );
}
