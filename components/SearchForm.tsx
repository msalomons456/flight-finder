"use client";

import { useState, useMemo } from "react";
import RegionCombobox from "@/components/RegionCombobox";
import DestinationCombobox from "@/components/DestinationCombobox";
import { type Region } from "@/lib/regions";
import { type Airport } from "@/lib/airports";
import { VIBES, filterDestinationsByVibes } from "@/lib/destinations";

type DefaultValues = {
  destinationAirport?: Airport | null;
  region?: Region | null;
  date?: string;
  returnDate?: string;
  tripType?: "1" | "2";
  adults?: string;
  maxStops?: string;
  travelClass?: string;
};

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
    travelClass: string;
    surpriseVibes: string[];
  }) => void;
  loading: boolean;
  defaultValues?: DefaultValues;
};

const inputClass = "h-11 border border-gray-200 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white";

type Mode = "roundtrip" | "oneway" | "surprise";

const TRIP_DURATIONS = [
  { label: "Weekend",  days: 3  },
  { label: "1 Week",   days: 7  },
  { label: "2 Weeks",  days: 14 },
  { label: "1 Month",  days: 30 },
];

function getSeasonMonths(): { label: string; emoji: string; yearMonth: string }[] {
  const now = new Date();
  const year = now.getFullYear();
  // Return next occurrence of each season peak month
  function nextYearMonth(month: number): string {
    const d = new Date(year, month - 1, 1);
    if (d <= now) d.setFullYear(year + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  return [
    { label: "Spring", emoji: "🌸", yearMonth: nextYearMonth(5)  },
    { label: "Summer", emoji: "☀️",  yearMonth: nextYearMonth(7)  },
    { label: "Fall",   emoji: "🍂", yearMonth: nextYearMonth(10) },
    { label: "Winter", emoji: "❄️",  yearMonth: nextYearMonth(12) },
  ];
}

function getNextMonths(count: number): { label: string; yearMonth: string }[] {
  const months = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
    months.push({ label, yearMonth });
  }
  return months;
}

function computeDates(yearMonth: string, tripDays: number): { date: string; returnDate: string } {
  const date = `${yearMonth}-15`;
  const ret = new Date(`${date}T00:00:00`);
  ret.setDate(ret.getDate() + tripDays);
  const returnDate = ret.toISOString().split("T")[0];
  return { date, returnDate };
}

export default function SearchForm({ onSearch, loading, defaultValues }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [mode, setMode] = useState<Mode>(defaultValues?.tripType === "2" ? "oneway" : "roundtrip");
  const [destinationAirport, setDestinationAirport] = useState<Airport | null>(defaultValues?.destinationAirport ?? null);
  const [region, setRegion] = useState<Region | null>(defaultValues?.region ?? null);
  const [date, setDate] = useState(defaultValues?.date ?? "");
  const [returnDate, setReturnDate] = useState(defaultValues?.returnDate ?? "");
  const [adults, setAdults] = useState(defaultValues?.adults ?? "1");
  const [maxStops, setMaxStops] = useState(defaultValues?.maxStops ?? "");
  const [travelClass, setTravelClass] = useState(defaultValues?.travelClass ?? "1");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [dateMode, setDateMode] = useState<"flexible" | "specific">("flexible");
  const [flexMonth, setFlexMonth] = useState<string | null>(null);
  const [tripDuration, setTripDuration] = useState(7);
  const [surpriseDate, setSurpriseDate] = useState("");
  const [surpriseReturnDate, setSurpriseReturnDate] = useState("");

  const surpriseMe = mode === "surprise";
  const tripType: "1" | "2" = mode === "roundtrip" ? "1" : "2";
  const matchingCount = filterDestinationsByVibes(selectedVibes).length;
  const seasons = useMemo(() => getSeasonMonths(), []);
  const nextMonths = useMemo(() => getNextMonths(12), []);

  function toggleVibe(label: string) {
    setSelectedVibes((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!surpriseMe && !destinationAirport) return;
    if (!region) return;

    let outDate = date;
    let retDate = mode === "roundtrip" ? returnDate : "";

    if (surpriseMe) {
      if (dateMode === "flexible") {
        if (!flexMonth) return;
        const computed = computeDates(flexMonth, tripDuration);
        outDate = computed.date;
        retDate = computed.returnDate;
      } else {
        if (!surpriseDate) return;
        outDate = surpriseDate;
        retDate = surpriseReturnDate;
      }
    } else {
      if (!outDate) return;
      if (mode === "roundtrip" && !retDate) return;
    }

    onSearch({
      destination: surpriseMe ? "surprise" : destinationAirport!.iata,
      regionLabel: region.label,
      airports: region.airports,
      date: outDate,
      returnDate: retDate,
      tripType: surpriseMe ? "1" : tripType,
      adults,
      maxStops,
      travelClass,
      surpriseVibes: selectedVibes,
    });
  }

  const surpriseDateReady = dateMode === "flexible" ? !!flexMonth : !!surpriseDate;
  const canSubmit = region && (
    surpriseMe
      ? surpriseDateReady
      : (!!destinationAirport && !!date && (mode !== "roundtrip" || !!returnDate))
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
    >
      {/* Mode toggle */}
      <div className="flex gap-2 flex-wrap">
        {([
          { value: "roundtrip", label: "Round Trip" },
          { value: "oneway",    label: "One Way" },
        ] as { value: Mode; label: string }[]).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setMode(opt.value)}
            className={`px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
              mode === opt.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode(mode === "surprise" ? "roundtrip" : "surprise")}
          className={`px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ${
            mode === "surprise"
              ? "bg-violet-600 text-white border-violet-600"
              : "bg-white text-violet-600 border-violet-200 hover:border-violet-400"
          }`}
        >
          🎲 Surprise Me!
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Origin */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Search From Airport, City, or Region</label>
          <RegionCombobox value={region} onChange={setRegion} inputClass={inputClass} />
        </div>

        {/* Destination — hidden in surprise mode */}
        {!surpriseMe && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Destination Airport</label>
            <DestinationCombobox
              value={destinationAirport}
              onChange={setDestinationAirport}
              inputClass={inputClass}
            />
          </div>
        )}

        {/* Dates — standard mode */}
        {!surpriseMe && (
          <>
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
            {mode === "roundtrip" ? (
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
                <select value={adults} onChange={(e) => setAdults(e.target.value)} className={inputClass}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
                  ))}
                </select>
              </div>
            )}
            {mode === "roundtrip" && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Passengers</label>
                <select value={adults} onChange={(e) => setAdults(e.target.value)} className={inputClass}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {/* Surprise Me controls */}
        {surpriseMe && (
          <>
            {/* Vibe chips */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <div className="flex items-baseline gap-2">
                <label className="text-sm font-semibold text-gray-600">What&apos;s your vibe?</label>
                <span className="text-xs text-gray-400">
                  {selectedVibes.length === 0
                    ? `Searching all ${matchingCount} destinations`
                    : `${matchingCount} destination${matchingCount !== 1 ? "s" : ""} match`}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {VIBES.map((vibe) => {
                  const active = selectedVibes.includes(vibe.label);
                  return (
                    <button
                      key={vibe.label}
                      type="button"
                      onClick={() => toggleVibe(vibe.label)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                        active
                          ? "bg-violet-600 text-white border-violet-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-violet-400"
                      }`}
                    >
                      <span>{vibe.emoji}</span>
                      <span>{vibe.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* When — header + mode toggle */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600">When?</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
                  {(["flexible", "specific"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDateMode(m)}
                      className={`px-3 py-1.5 transition-colors ${
                        dateMode === m
                          ? "bg-violet-600 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {m === "flexible" ? "Flexible" : "Specific Date"}
                    </button>
                  ))}
                </div>
              </div>

              {dateMode === "flexible" ? (
                <>
                  {/* Season quick-picks */}
                  <div className="flex gap-2 flex-wrap">
                    {seasons.map((s) => (
                      <button
                        key={s.yearMonth}
                        type="button"
                        onClick={() => setFlexMonth(s.yearMonth)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                          flexMonth === s.yearMonth
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-600 border-gray-200 hover:border-violet-400"
                        }`}
                      >
                        <span>{s.emoji}</span>
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                  {/* Month pills */}
                  <div className="flex gap-1.5 flex-wrap">
                    {nextMonths.map((m) => (
                      <button
                        key={m.yearMonth}
                        type="button"
                        onClick={() => setFlexMonth(m.yearMonth)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          flexMonth === m.yearMonth
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-500 border-gray-200 hover:border-violet-400"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Departure</label>
                    <input
                      type="date"
                      value={surpriseDate}
                      min={today}
                      onChange={(e) => setSurpriseDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Return <span className="text-gray-400">(optional)</span></label>
                    <input
                      type="date"
                      value={surpriseReturnDate}
                      min={surpriseDate || today}
                      onChange={(e) => setSurpriseReturnDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Trip length — flexible only */}
            {dateMode === "flexible" && (
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Trip Length</label>
                <div className="flex gap-2 flex-wrap">
                  {TRIP_DURATIONS.map((d) => (
                    <button
                      key={d.days}
                      type="button"
                      onClick={() => setTripDuration(d.days)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        tripDuration === d.days
                          ? "bg-violet-600 text-white border-violet-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-violet-400"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Passengers */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Passengers</label>
              <select value={adults} onChange={(e) => setAdults(e.target.value)} className={inputClass}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "adult" : "adults"}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600">Max Stops</label>
          <div className="flex flex-wrap gap-2">
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

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-semibold text-gray-600">Fare Class</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "1", label: "Economy", sub: "incl. Basic Economy" },
              { value: "2", label: "Premium Economy", sub: null },
              { value: "3", label: "Business", sub: null },
              { value: "4", label: "First", sub: null },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTravelClass(opt.value)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors flex flex-col items-center justify-center leading-tight h-[46px] ${
                  travelClass === opt.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                }`}
              >
                <span>{opt.label}</span>
                {opt.sub && (
                  <span className={`text-[10px] font-normal ${travelClass === opt.value ? "text-blue-200" : "text-gray-400"}`}>
                    {opt.sub}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !canSubmit}
        className={`mt-2 w-full text-white font-semibold py-3 rounded-xl transition-colors text-lg disabled:opacity-50 ${
          surpriseMe
            ? "bg-violet-600 hover:bg-violet-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Searching…" : surpriseMe ? "🎲 Find My Surprise Trip" : "Find Cheapest Flights"}
      </button>
    </form>
  );
}
