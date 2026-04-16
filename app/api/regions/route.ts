import { NextResponse } from "next/server";

export const REGIONS: Record<string, { label: string; airports: string[] }> = {
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

export async function GET() {
  const regions = Object.entries(REGIONS).map(([key, val]) => ({
    key,
    label: val.label,
    airports: val.airports,
  }));
  return NextResponse.json(regions);
}
