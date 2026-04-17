"use client";

import { useState, useMemo } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import FlightFilters from "@/components/FlightFilters";
import SummaryPage from "@/components/SummaryPage";
import { TIME_WINDOWS } from "@/components/FlightFilters";

export type Layover = {
  id: string;
  name: string;
  duration: number;
  overnight?: boolean;
  nextFlightNumber?: string;
};

export type Leg = {
  flightNumber: string;
  airline: string;
  airlineLogo: string;
  airplane: string;
  departureAirportName: string;
  departureCode: string;
  departureTime: string;
  arrivalAirportName: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: number;
  travelClass: string;
};

export type FlightResult = {
  origin: string;
  price: number;
  currency: string;
  airline: string;
  flightNumber: string;
  airlineLogo: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  layovers: Layover[];
  legs: Leg[];
};

export type SearchResults = {
  region: string;
  destination: string;
  tripType: "1" | "2";
  results: FlightResult[];
};

type SearchParams = {
  destination: string;
  regionLabel: string;
  airports: string[];
  date: string;
  returnDate: string;
  tripType: "1" | "2";
  adults: string;
  maxStops: string;
};

type Step = "search" | "selectReturn" | "summary";

function getHour(str: string): number {
  const date = new Date(str.includes("T") ? str : str.replace(" ", "T"));
  return date.getHours();
}

function matchesTimeFilter(timeStr: string, selected: string[]): boolean {
  if (!selected.length) return true;
  const hour = getHour(timeStr);
  return selected.some((key) => {
    const win = TIME_WINDOWS.find((w) => `${w.start}-${w.end}` === key);
    if (!win) return false;
    return hour >= win.start && hour < win.end;
  });
}

async function fetchFlights(params: Record<string, string>): Promise<SearchResults> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`/api/search?${qs}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Search failed");
  return data;
}

export default function Home() {
  const [step, setStep] = useState<Step>("search");
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [outboundResults, setOutboundResults] = useState<SearchResults | null>(null);
  const [returnResults, setReturnResults] = useState<SearchResults | null>(null);
  const [selectedOutbound, setSelectedOutbound] = useState<FlightResult | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outboundTimes, setOutboundTimes] = useState<string[]>([]);
  const [returnTimes, setReturnTimes] = useState<string[]>([]);

  const filteredOutbound = useMemo(() => {
    if (!outboundResults) return null;
    return { ...outboundResults, results: outboundResults.results.filter((r) => matchesTimeFilter(r.departure, outboundTimes)) };
  }, [outboundResults, outboundTimes]);

  const filteredReturn = useMemo(() => {
    if (!returnResults) return null;
    return { ...returnResults, results: returnResults.results.filter((r) => matchesTimeFilter(r.departure, returnTimes)) };
  }, [returnResults, returnTimes]);

  async function handleSearch(params: SearchParams) {
    setLoading(true);
    setError(null);
    setOutboundResults(null);
    setReturnResults(null);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setOutboundTimes([]);
    setReturnTimes([]);
    setStep("search");
    setSearchParams(params);

    try {
      const results = await fetchFlights({
        destination: params.destination,
        regionLabel: params.regionLabel,
        airports: params.airports.join(","),
        date: params.date,
        returnDate: params.returnDate,
        tripType: params.tripType,
        adults: params.adults,
        maxStops: params.maxStops,
      });
      setOutboundResults(results);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectOutbound(flight: FlightResult) {
    setSelectedOutbound(flight);

    if (searchParams?.tripType !== "1") {
      setStep("summary");
      return;
    }

    // Round trip — fetch return flights
    setLoading(true);
    setError(null);
    setReturnTimes([]);

    try {
      const results = await fetchFlights({
        destination: flight.origin,                          // return TO the origin airport
        regionLabel: searchParams!.regionLabel,
        airports: [searchParams!.destination],               // fly FROM the destination
        date: searchParams!.returnDate,
        returnDate: "",
        tripType: "2",                                       // one-way leg
        adults: searchParams!.adults,
        maxStops: searchParams!.maxStops,
      });
      // Label it as a return search
      setReturnResults({ ...results, region: `${searchParams!.destination} → ${flight.origin}` });
      setStep("selectReturn");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectReturn(flight: FlightResult) {
    setSelectedReturn(flight);
    setStep("summary");
  }

  function handleBack() {
    if (step === "summary" && searchParams?.tripType === "1") {
      setStep("selectReturn");
    } else if (step === "selectReturn") {
      setStep("search");
    } else {
      setStep("search");
    }
  }

  function handleStartOver() {
    setStep("search");
    setOutboundResults(null);
    setReturnResults(null);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setSearchParams(null);
  }

  const isRoundTrip = searchParams?.tripType === "1";

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">FlightFinder</h1>
          <p className="text-blue-600 text-lg">
            Pick your destination. We&apos;ll find the cheapest flight from anywhere nearby.
          </p>
        </div>

        {step === "summary" && selectedOutbound ? (
          <SummaryPage
            outbound={selectedOutbound}
            returnFlight={selectedReturn}
            onBack={handleBack}
            onStartOver={handleStartOver}
          />
        ) : (
          <>
            <SearchForm onSearch={handleSearch} loading={loading} />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                {error}
              </div>
            )}

            {loading && (
              <div className="mt-10 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
                <p className="mt-3 text-blue-700">
                  {step === "selectReturn" ? "Finding return flights…" : "Searching across all airports in region…"}
                </p>
              </div>
            )}

            {/* Outbound results */}
            {step === "search" && filteredOutbound && !loading && (
              <>
                <div className="mt-6">
                  <FlightFilters
                    isRoundTrip={isRoundTrip}
                    outboundTimes={outboundTimes}
                    returnTimes={returnTimes}
                    onChange={(ob, ret) => { setOutboundTimes(ob); setReturnTimes(ret); }}
                  />
                </div>
                <ResultsTable
                  data={filteredOutbound}
                  onSelect={handleSelectOutbound}
                  selectLabel={isRoundTrip ? "Select & Find Return" : "Select"}
                />
              </>
            )}

            {/* Return results */}
            {step === "selectReturn" && filteredReturn && !loading && (
              <>
                <div className="mt-6 mb-2 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">Now choose your return flight</h2>
                    <p className="text-sm text-gray-500">
                      {searchParams?.destination} → {selectedOutbound?.origin} · {searchParams?.returnDate}
                    </p>
                  </div>
                  <button onClick={handleBack} className="text-sm text-blue-600 hover:underline">
                    ← Back to outbound
                  </button>
                </div>
                <div className="mt-4">
                  <FlightFilters
                    isRoundTrip={false}
                    outboundTimes={returnTimes}
                    returnTimes={[]}
                    onChange={(ob) => setReturnTimes(ob)}
                  />
                </div>
                <ResultsTable
                  data={filteredReturn}
                  onSelect={handleSelectReturn}
                  selectLabel="Select Return"
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
