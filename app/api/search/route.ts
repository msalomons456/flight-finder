import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

type Layover = { id: string; name: string; duration: number; overnight?: boolean };

type FlightResult = {
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

function toResult(origin: string, flight: Record<string, unknown>): FlightResult | null {
  const legs = (flight.flights as {
    departure_airport: { time: string };
    arrival_airport: { time: string };
    airline: string;
    airline_logo: string;
    flight_number: string;
    duration: number;
  }[]) ?? [];
  if (!legs.length) return null;

  const firstLeg = legs[0];
  const lastLeg = legs[legs.length - 1];
  const totalMinutes = legs.reduce((sum, l) => sum + (l.duration ?? 0), 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  const layovers: Layover[] = ((flight.layovers as Layover[]) ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    duration: l.duration,
    overnight: l.overnight ?? false,
  }));

  return {
    origin,
    price: flight.price as number,
    currency: "USD",
    airline: firstLeg.airline,
    flightNumber: firstLeg.flight_number ?? "",
    airlineLogo: firstLeg.airline_logo,
    departure: firstLeg.departure_airport.time,
    arrival: lastLeg.arrival_airport.time,
    duration: `PT${h}H${m}M`,
    stops: legs.length - 1,
    layovers,
  };
}

async function flightsFromOrigin(
  origin: string,
  destination: string,
  date: string,
  adults: number,
  maxStops: number | null
): Promise<FlightResult[]> {
  try {
    const data = await getJson({
      engine: "google_flights",
      departure_id: origin,
      arrival_id: destination,
      outbound_date: date,
      type: 2,
      adults,
      currency: "USD",
      hl: "en",
      api_key: process.env.SERPAPI_KEY,
    });

    let flights = [...(data.best_flights ?? []), ...(data.other_flights ?? [])];

    if (maxStops !== null) {
      flights = flights.filter((f) => (f.flights?.length ?? 1) - 1 <= maxStops);
    }
    if (!flights.length) return [];

    return flights
      .map((f) => toResult(origin, f))
      .filter(Boolean) as FlightResult[];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination")?.toUpperCase();
  const regionLabel = searchParams.get("regionLabel");
  const airportsParam = searchParams.get("airports");
  const date = searchParams.get("date");
  const adults = parseInt(searchParams.get("adults") || "1");
  const maxStopsParam = searchParams.get("maxStops");
  const maxStops = maxStopsParam !== null && maxStopsParam !== "" ? parseInt(maxStopsParam) : null;

  if (!destination || !airportsParam || !date || !regionLabel) {
    return NextResponse.json({ error: "Missing required params" }, { status: 400 });
  }

  const airports = airportsParam.split(",").map((a) => a.trim()).filter(Boolean);

  const settled = await Promise.allSettled(
    airports.map((origin) =>
      flightsFromOrigin(origin, destination, date, adults, maxStops)
    )
  );

  const results = settled
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .sort((a, b) => a.price - b.price);

  return NextResponse.json({ region: regionLabel, destination, results });
}
