import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

type Layover = { id: string; name: string; duration: number; overnight?: boolean; nextFlightNumber?: string };

type Leg = {
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
  legs: Leg[];
};

function toResult(origin: string, flight: Record<string, unknown>): FlightResult | null {
  const rawLegs = (flight.flights as {
    departure_airport: { name: string; id: string; time: string };
    arrival_airport: { name: string; id: string; time: string };
    airline: string;
    airline_logo: string;
    flight_number: string;
    airplane: string;
    travel_class: string;
    duration: number;
  }[]) ?? [];
  if (!rawLegs.length) return null;

  const firstLeg = rawLegs[0];
  const lastLeg = rawLegs[rawLegs.length - 1];
  const totalMinutes = rawLegs.reduce((sum, l) => sum + (l.duration ?? 0), 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  const layovers: Layover[] = ((flight.layovers as Layover[]) ?? []).map((l, i) => ({
    id: l.id,
    name: l.name,
    duration: l.duration,
    overnight: l.overnight ?? false,
    nextFlightNumber: rawLegs[i + 1]?.flight_number ?? "",
  }));

  const legs: Leg[] = rawLegs.map((l) => ({
    flightNumber: l.flight_number ?? "",
    airline: l.airline,
    airlineLogo: l.airline_logo,
    airplane: l.airplane ?? "",
    departureAirportName: l.departure_airport.name,
    departureCode: l.departure_airport.id,
    departureTime: l.departure_airport.time,
    arrivalAirportName: l.arrival_airport.name,
    arrivalCode: l.arrival_airport.id,
    arrivalTime: l.arrival_airport.time,
    duration: l.duration,
    travelClass: l.travel_class ?? "Economy",
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
    legs,
  };
}

async function flightsFromOrigin(
  origin: string,
  destination: string,
  date: string,
  returnDate: string,
  tripType: number,
  adults: number,
  maxStops: number | null,
  travelClass: number
): Promise<FlightResult[]> {
  try {
    const params: Record<string, unknown> = {
      engine: "google_flights",
      departure_id: origin,
      arrival_id: destination,
      outbound_date: date,
      type: tripType,
      adults,
      travel_class: travelClass,
      currency: "USD",
      hl: "en",
      api_key: process.env.SERPAPI_KEY,
    };
    if (tripType === 1 && returnDate) params.return_date = returnDate;
    const data = await getJson(params);

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
  const returnDate = searchParams.get("returnDate") || "";
  const tripType = parseInt(searchParams.get("tripType") || "2");
  const adults = parseInt(searchParams.get("adults") || "1");
  const maxStopsParam = searchParams.get("maxStops");
  const maxStops = maxStopsParam !== null && maxStopsParam !== "" ? parseInt(maxStopsParam) : null;
  const travelClass = parseInt(searchParams.get("travelClass") || "1");

  if (!destination || !airportsParam || !date || !regionLabel) {
    return NextResponse.json({ error: "Missing required params" }, { status: 400 });
  }

  const airports = airportsParam.split(",").map((a) => a.trim()).filter(Boolean);

  const settled = await Promise.allSettled(
    airports.map((origin) =>
      flightsFromOrigin(origin, destination, date, returnDate, tripType, adults, maxStops, travelClass)
    )
  );

  const results = settled
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((r) => typeof r.price === "number" && !isNaN(r.price))
    .sort((a, b) => a.price - b.price);

  return NextResponse.json({ region: regionLabel, destination, tripType: String(tripType), results });
}
