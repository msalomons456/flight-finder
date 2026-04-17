"use client";

import { useState, useMemo, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import FlightFilters from "@/components/FlightFilters";
import SummaryPage from "@/components/SummaryPage";
import { TIME_WINDOWS } from "@/components/FlightFilters";
import { Alliance, getAlliance, getAirlineCodeFromName } from "@/lib/alliances";
import { findAirportByIata } from "@/lib/airports";
import type { Airport } from "@/lib/airports";
import type { Region } from "@/lib/regions";

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
  travelClass: string;
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
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | "">("");
  const [searchedAt, setSearchedAt] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [formDefaults, setFormDefaults] = useState<{
    destinationAirport?: Airport | null;
    region?: Region | null;
    date?: string; returnDate?: string;
    tripType?: "1" | "2"; adults?: string; maxStops?: string; travelClass?: string;
  }>({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);

    // Restore shared itinerary
    const encoded = p.get("itinerary");
    if (encoded) {
      try {
        const { outbound, returnFlight, adults, travelClass } = JSON.parse(
          atob(encoded.replace(/-/g, "+").replace(/_/g, "/"))
        );
        setSelectedOutbound(outbound);
        setSelectedReturn(returnFlight ?? null);
        setSearchParams((prev) => prev ?? { destination: "", regionLabel: "", airports: [], date: "", returnDate: "", tripType: returnFlight ? "1" : "2", adults: adults ?? "1", maxStops: "", travelClass: travelClass ?? "1" });
        setStep("summary");
        return;
      } catch { /* invalid encoded data, fall through */ }
    }

    // Restore shared search
    const iata = p.get("to");
    const airports = p.get("airports")?.split(",").filter(Boolean) ?? [];
    const regionLabel = p.get("from");
    if (!iata || !regionLabel || !airports.length) return;
    const airport = findAirportByIata(iata);
    if (!airport) return;
    setFormDefaults({
      destinationAirport: airport,
      region: { key: "shared", label: regionLabel, airports },
      date: p.get("date") ?? "",
      returnDate: p.get("ret") ?? "",
      tripType: (p.get("type") as "1" | "2") ?? "1",
      adults: p.get("pax") ?? "1",
      maxStops: p.get("stops") ?? "",
      travelClass: p.get("class") ?? "1",
    });
  }, []);

  const filteredOutbound = useMemo(() => {
    if (!outboundResults) return null;
    return {
      ...outboundResults,
      results: outboundResults.results.filter((r) => {
        if (!matchesTimeFilter(r.departure, outboundTimes)) return false;
        if (selectedAlliance) {
          const code = getAirlineCodeFromName(r.airline);
          if (getAlliance(code) !== selectedAlliance) return false;
        }
        return true;
      }),
    };
  }, [outboundResults, outboundTimes, selectedAlliance]);

  const filteredReturn = useMemo(() => {
    if (!returnResults) return null;
    return {
      ...returnResults,
      results: returnResults.results.filter((r) => {
        if (!matchesTimeFilter(r.departure, returnTimes)) return false;
        if (selectedAlliance) {
          const code = getAirlineCodeFromName(r.airline);
          if (getAlliance(code) !== selectedAlliance) return false;
        }
        return true;
      }),
    };
  }, [returnResults, returnTimes, selectedAlliance]);

  async function handleSearch(params: SearchParams) {
    setLoading(true);
    setError(null);
    setOutboundResults(null);
    setReturnResults(null);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setOutboundTimes([]);
    setReturnTimes([]);
    setSelectedAlliance("");
    setSearchedAt(null);
    setStep("search");
    setSearchParams(params);

    try {
      const results = await fetchFlights({
        destination: params.destination,
        regionLabel: params.regionLabel,
        airports: params.airports.join(","),
        date: params.date,
        returnDate: "",
        tripType: "2",
        adults: params.adults,
        maxStops: params.maxStops,
        travelClass: params.travelClass,
      });
      setOutboundResults(results);
      setSearchedAt(new Date());
      const qs = new URLSearchParams({
        to: params.destination,
        from: params.regionLabel,
        airports: params.airports.join(","),
        date: params.date,
        ret: params.returnDate,
        type: params.tripType,
        pax: params.adults,
        stops: params.maxStops,
        class: params.travelClass,
      }).toString();
      window.history.replaceState(null, "", `?${qs}`);
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
      updateItineraryUrl(flight, null, searchParams?.adults ?? "1", searchParams?.travelClass ?? "1");
      return;
    }

    // Round trip — fetch return flights to every airport in the origin region
    setLoading(true);
    setError(null);
    setReturnTimes([]);

    try {
      const settled = await Promise.allSettled(
        searchParams!.airports.map((originAirport) =>
          fetchFlights({
            destination: originAirport,                      // arrive at each airport in the origin region
            regionLabel: searchParams!.regionLabel,
            airports: searchParams!.destination,              // fly FROM the destination
            date: searchParams!.returnDate,
            returnDate: "",
            tripType: "2",
            adults: searchParams!.adults,
            maxStops: searchParams!.maxStops,
            travelClass: searchParams!.travelClass,
          })
        )
      );

      const allFlights = settled
        .flatMap((r) => r.status === "fulfilled" ? r.value.results : [])
        .filter((r) => typeof r.price === "number" && !isNaN(r.price))
        .sort((a, b) => a.price - b.price);

      setReturnResults({
        region: searchParams!.regionLabel,
        destination: searchParams!.regionLabel,
        tripType: "2",
        results: allFlights,
      });
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
    updateItineraryUrl(selectedOutbound!, flight, searchParams?.adults ?? "1", searchParams?.travelClass ?? "1");
  }

  function updateItineraryUrl(outbound: FlightResult, returnFlight: FlightResult | null, adults: string, travelClass: string) {
    const payload = JSON.stringify({ outbound, returnFlight, adults, travelClass });
    const encoded = btoa(payload).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    window.history.replaceState(null, "", `?itinerary=${encoded}`);
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
          <button
            onClick={handleStartOver}
            className="text-4xl font-bold text-blue-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
          >
            FlightFinder
          </button>
          <p className="text-blue-600 text-lg">
            Pick your destination. We&apos;ll find the cheapest flight from anywhere nearby.
          </p>
        </div>

        {step === "summary" && selectedOutbound ? (
          <SummaryPage
            outbound={selectedOutbound}
            returnFlight={selectedReturn}
            adults={searchParams?.adults ?? "1"}
            travelClass={searchParams?.travelClass ?? "1"}
            onBack={handleBack}
            onStartOver={handleStartOver}
          />
        ) : (
          <>
            <SearchForm onSearch={handleSearch} loading={loading} defaultValues={formDefaults} />

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
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {copied ? "Link copied!" : "Share search"}
                  </button>
                </div>
                <div className="mt-2">
                  <FlightFilters
                    isRoundTrip={isRoundTrip}
                    outboundTimes={outboundTimes}
                    returnTimes={returnTimes}
                    selectedAlliance={selectedAlliance}
                    onChange={(ob, ret) => { setOutboundTimes(ob); setReturnTimes(ret); }}
                    onAllianceChange={setSelectedAlliance}
                  />
                </div>
                <ResultsTable
                  data={filteredOutbound}
                  onSelect={handleSelectOutbound}
                  selectLabel={isRoundTrip ? "Select & Find Return" : "Select"}
                  searchedAt={searchedAt}
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
                      {searchParams?.destination} → {searchParams?.regionLabel} · {searchParams?.returnDate}
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
                    selectedAlliance={selectedAlliance}
                    outboundLabel="Return Departure"
                    onChange={(ob) => setReturnTimes(ob)}
                    onAllianceChange={setSelectedAlliance}
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
