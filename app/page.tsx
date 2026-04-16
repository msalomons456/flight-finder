"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";

export type Layover = {
  id: string;
  name: string;
  duration: number;
  overnight?: boolean;
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
};

export type SearchResults = {
  region: string;
  destination: string;
  results: FlightResult[];
};

export default function Home() {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(params: {
    destination: string;
    regionLabel: string;
    airports: string[];
    date: string;
    adults: string;
    maxStops: string;
  }) {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const qs = new URLSearchParams({
        destination: params.destination,
        regionLabel: params.regionLabel,
        airports: params.airports.join(","),
        date: params.date,
        adults: params.adults,
        maxStops: params.maxStops,
      }).toString();
      const res = await fetch(`/api/search?${qs}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">FlightFinder</h1>
          <p className="text-blue-600 text-lg">
            Pick your destination. We&apos;ll find the cheapest flight from anywhere nearby.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-10 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
            <p className="mt-3 text-blue-700">Searching across all airports in region…</p>
          </div>
        )}

        {results && !loading && <ResultsTable data={results} />}
      </div>
    </main>
  );
}
