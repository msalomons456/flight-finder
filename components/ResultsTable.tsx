"use client";

import Image from "next/image";
import { SearchResults } from "@/app/page";

function formatTime(str: string) {
  const date = new Date(str.includes("T") ? str : str.replace(" ", "T"));
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatDuration(iso: string) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return `${h} ${m}`.trim();
}

function formatLayoverDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function ResultsTable({ data }: { data: SearchResults }) {
  if (data.results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No flights found to <strong>{data.destination}</strong> from the {data.region} region on that date.
      </div>
    );
  }

  const cheapest = data.results[0].price;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-blue-900 mb-1">
        Flights to {data.destination} from {data.region}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {data.results.length} airports with available flights — sorted by price
      </p>

      <div className="flex flex-col gap-3">
        {data.results.map((r, i) => (
          <div
            key={r.origin}
            className={`bg-white rounded-xl shadow-sm border p-4 ${
              i === 0 ? "border-green-400 ring-1 ring-green-300" : "border-gray-100"
            }`}
          >
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
                </div>
              </div>

              {/* Route */}
              <div className="flex-1 sm:px-6 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{formatTime(r.departure)}</span>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs text-gray-400">{formatDuration(r.duration)}</span>
                  <div className="w-full border-t border-dashed border-gray-300 my-0.5" />
                  <span className="text-xs text-gray-400">
                    {r.stops === 0 ? "Nonstop" : `${r.stops} stop${r.stops > 1 ? "s" : ""}`}
                  </span>
                </div>
                <span className="font-medium">{formatTime(r.arrival)}</span>
              </div>

              {/* Price */}
              <div className="text-right sm:w-36">
                <div className={`text-2xl font-bold ${i === 0 ? "text-green-600" : "text-gray-800"}`}>
                  ${r.price.toFixed(0)}
                </div>
                {i > 0 && (
                  <div className="text-xs text-red-400">+${(r.price - cheapest).toFixed(0)} more</div>
                )}
                {i === 0 && (
                  <div className="text-xs text-green-500 font-semibold">Best price</div>
                )}
              </div>
            </div>

            {/* Layover details */}
            {r.layovers && r.layovers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                {r.layovers.map((l) => (
                  <span
                    key={l.id}
                    className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-2.5 py-1 rounded-full"
                  >
                    <span className="font-bold">{l.id}</span>
                    <span className="text-amber-500">·</span>
                    <span>{formatLayoverDuration(l.duration)} layover</span>
                    {l.overnight && (
                      <span className="ml-1 bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                        overnight
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
