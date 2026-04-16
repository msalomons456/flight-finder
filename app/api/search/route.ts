import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

const REGIONS: Record<string, { label: string; airports: string[] }> = {
  us_northeast: {
    label: "US Northeast",
    airports: ["JFK", "LGA", "EWR", "BOS", "PHL", "BWI", "DCA"],
  },
  us_southeast: {
    label: "US Southeast",
    airports: ["ATL", "MIA", "FLL", "MCO", "CLT", "RDU", "TPA"],
  },
  us_midwest: {
    label: "US Midwest",
    airports: ["ORD", "MDW", "DTW", "MSP", "STL", "CLE", "CMH"],
  },
  us_west: {
    label: "US West Coast",
    airports: ["LAX", "SFO", "SJC", "OAK", "SEA", "PDX", "LAS"],
  },
  us_southwest: {
    label: "US Southwest",
    airports: ["DFW", "DAL", "IAH", "HOU", "PHX", "DEN", "ABQ"],
  },
  uk_ireland: {
    label: "UK & Ireland",
    airports: ["LHR", "LGW", "MAN", "EDI", "DUB", "STN", "BHX"],
  },
  western_europe: {
    label: "Western Europe",
    airports: ["CDG", "AMS", "FRA", "BRU", "ZUR", "VIE", "MUC"],
  },
};

type Layover = { id: string; name: string; duration: number; overnight?: boolean };

async function cheapestFlightFromOrigin(
  origin: string,
  destination: string,
  date: string,
  adults: number
) {
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

    const flights = [...(data.best_flights ?? []), ...(data.other_flights ?? [])];
    if (!flights.length) return null;

    flights.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
    const flight = flights[0];
    const legs: {
      departure_airport: { time: string };
      arrival_airport: { time: string };
      airline: string;
      airline_logo: string;
      duration: number;
    }[] = flight.flights ?? [];
    if (!legs.length) return null;

    const firstLeg = legs[0];
    const lastLeg = legs[legs.length - 1];
    const totalMinutes = legs.reduce((sum: number, l: { duration: number }) => sum + (l.duration ?? 0), 0);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    const layovers: Layover[] = (flight.layovers ?? []).map((l: Layover) => ({
      id: l.id,
      name: l.name,
      duration: l.duration,
      overnight: l.overnight ?? false,
    }));

    return {
      origin,
      price: flight.price,
      currency: "USD",
      airline: firstLeg.airline,
      airlineLogo: firstLeg.airline_logo,
      departure: firstLeg.departure_airport.time,
      arrival: lastLeg.arrival_airport.time,
      duration: `PT${h}H${m}M`,
      stops: legs.length - 1,
      layovers,
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination")?.toUpperCase();
  const regionKey = searchParams.get("region");
  const date = searchParams.get("date");
  const adults = parseInt(searchParams.get("adults") || "1");
  const maxStops = searchParams.get("maxStops");

  if (!destination || !regionKey || !date) {
    return NextResponse.json({ error: "Missing required params" }, { status: 400 });
  }

  const region = REGIONS[regionKey];
  if (!region) {
    return NextResponse.json({ error: "Unknown region" }, { status: 400 });
  }

  const settled = await Promise.allSettled(
    region.airports.map((origin) =>
      cheapestFlightFromOrigin(origin, destination, date, adults)
    )
  );

  let results = settled
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(Boolean) as NonNullable<Awaited<ReturnType<typeof cheapestFlightFromOrigin>>>[];

  if (maxStops !== null && maxStops !== "") {
    const max = parseInt(maxStops);
    results = results.filter((r) => r.stops <= max);
  }

  results.sort((a, b) => a.price - b.price);

  return NextResponse.json({ region: region.label, destination, results });
}
