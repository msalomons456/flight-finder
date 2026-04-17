"use client";

import Image from "next/image";
import { FlightResult, Leg } from "@/app/page";
import { getAirlineCodeFromName, getAirlineWebsite } from "@/lib/alliances";

function buildKayakOneWayUrl(flight: FlightResult, adults: string, travelClass: string): string {
  const toDate = (str: string) => str.replace("T", " ").slice(0, 10);
  const cabinMap: Record<string, string> = {
    "1": "economy", "2": "premiumeconomy", "3": "business", "4": "first",
  };
  const cabin = cabinMap[travelClass] ?? "economy";
  const o = flight.legs[0].departureCode;
  const d = flight.legs[flight.legs.length - 1].arrivalCode;
  const dep = toDate(flight.departure);
  return `https://www.kayak.com/flights/${o}-${d}/${dep}/${adults}adults/${cabin}`;
}

function formatDateTime(str: string) {
  const date = new Date(str.includes("T") ? str : str.replace(" ", "T"));
  return date.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function LegTimeline({ leg }: { leg: Leg }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
        <div className="w-px flex-1 bg-gray-200 my-1" />
        <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
      </div>
      <div className="flex-1 pb-1">
        <div className="mb-3">
          <div className="font-semibold text-gray-800">{formatDateTime(leg.departureTime)}</div>
          <div className="text-gray-600">{leg.departureAirportName} <span className="text-gray-400">({leg.departureCode})</span></div>
        </div>
        <div className="flex items-center gap-2 my-3 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-500">
          {leg.airlineLogo && (
            <Image src={leg.airlineLogo} alt={leg.airline} width={18} height={18} className="object-contain flex-shrink-0" />
          )}
          <span className="font-medium text-gray-700">{leg.airline} {leg.flightNumber.replace(/^[A-Z0-9]+\s/, "")}</span>
          <span className="text-gray-300">·</span>
          <span>{leg.airplane}</span>
          <span className="text-gray-300">·</span>
          <span>{formatMinutes(leg.duration)}</span>
          <span className="text-gray-300">·</span>
          <span>{leg.travelClass}</span>
        </div>
        <div>
          <div className="font-semibold text-gray-800">{formatDateTime(leg.arrivalTime)}</div>
          <div className="text-gray-600">{leg.arrivalAirportName} <span className="text-gray-400">({leg.arrivalCode})</span></div>
        </div>
      </div>
    </div>
  );
}

function FlightCard({ flight, label }: { flight: FlightResult; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {flight.airlineLogo && (
            <Image src={flight.airlineLogo} alt={flight.airline} width={24} height={24} className="object-contain" />
          )}
          <div>
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{label}</div>
            <div className="font-bold text-gray-800">
              {flight.origin} → {flight.legs[flight.legs.length - 1]?.arrivalCode}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-700">${flight.price.toFixed(0)}</div>
          <div className="text-xs text-gray-400">{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}</div>
        </div>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">
        {flight.legs.map((leg, i) => (
          <div key={`${leg.flightNumber}-${i}`}>
            <LegTimeline leg={leg} />
            {i < flight.legs.length - 1 && flight.layovers[i] && (
              <div className="ml-7 my-2 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                <span>Layover · {flight.layovers[i].name}</span>
                <span className="text-amber-400">·</span>
                <span>{formatMinutes(flight.layovers[i].duration)}</span>
                {flight.layovers[i].overnight && <span className="font-semibold">(overnight)</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  outbound: FlightResult;
  returnFlight: FlightResult | null;
  adults: string;
  travelClass: string;
  onBack: () => void;
  onStartOver: () => void;
};

export default function SummaryPage({ outbound, returnFlight, adults, travelClass, onBack, onStartOver }: Props) {
  const total = outbound.price + (returnFlight?.price ?? 0);
  const isRoundTrip = !!returnFlight;

  const kayakOutboundUrl = buildKayakOneWayUrl(outbound, adults, travelClass);
  const kayakReturnUrl = returnFlight ? buildKayakOneWayUrl(returnFlight, adults, travelClass) : null;

  const directLinks: { label: string; airline: string; logo: string }[] = [];
  directLinks.push({ label: "Outbound", airline: outbound.airline, logo: outbound.airlineLogo });
  if (returnFlight) {
    directLinks.push({ label: "Return", airline: returnFlight.airline, logo: returnFlight.airlineLogo });
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Your Selection</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {isRoundTrip ? "Round trip" : "One way"} · Review your flights before booking
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Back to results
        </button>
      </div>

      {/* Flight cards */}
      <FlightCard flight={outbound} label="Outbound Flight" />
      {returnFlight && <FlightCard flight={returnFlight} label="Return Flight" />}

      {/* Price summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
        <h3 className="font-bold text-gray-700 mb-3">Price Summary</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex justify-between items-baseline">
            <span>Outbound ({outbound.origin} → {outbound.legs[outbound.legs.length - 1]?.arrivalCode})</span>
            <span className="font-medium">${outbound.price.toFixed(0)} <span className="text-xs text-gray-400 font-normal">one-way</span></span>
          </div>
          {returnFlight && (
            <div className="flex justify-between items-baseline">
              <span>Return ({returnFlight.origin} → {returnFlight.legs[returnFlight.legs.length - 1]?.arrivalCode})</span>
              <span className="font-medium">${returnFlight.price.toFixed(0)} <span className="text-xs text-gray-400 font-normal">one-way</span></span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-800">
            <span>Estimated Total</span>
            <span>${total.toFixed(0)}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Each price is a one-way fare. Total is the combined cost of both legs. Final price confirmed on airline site.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {/* Primary: Kayak — one tab per leg */}
        {kayakReturnUrl ? (
          <div className="flex rounded-xl overflow-hidden">
            <a
              href={kayakOutboundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              <span className="text-xs text-blue-200 font-normal">Outbound</span>
              <span>Search on Kayak →</span>
            </a>
            <div className="w-px bg-blue-500" />
            <a
              href={kayakReturnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              <span className="text-xs text-blue-200 font-normal">Return</span>
              <span>Search on Kayak →</span>
            </a>
          </div>
        ) : (
          <a
            href={kayakOutboundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors text-lg"
          >
            Search on Kayak →
          </a>
        )}

        {/* Secondary: direct airline links */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-gray-400 text-center">Or book directly with the airline</p>
          <div className="flex gap-2">
            {directLinks.map(({ label, airline, logo }) => (
              <a
                key={label}
                href={getAirlineWebsite(getAirlineCodeFromName(airline))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-white border border-gray-200 hover:border-blue-400 text-gray-700 font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                <span className="text-[10px] text-gray-400 font-normal">{label}</span>
                <div className="flex items-center gap-1.5">
                  {logo && <Image src={logo} alt={airline} width={14} height={14} className="object-contain" />}
                  <span>{airline}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={onStartOver}
          className="w-full text-center bg-white border border-gray-200 hover:border-blue-400 text-gray-600 font-semibold py-3 rounded-xl transition-colors"
        >
          Start New Search
        </button>
      </div>
    </div>
  );
}
