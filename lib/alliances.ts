export type Alliance = "Star Alliance" | "SkyTeam" | "oneworld" | "None";

export const AIRLINE_ALLIANCE: Record<string, Alliance> = {
  // Star Alliance
  UA: "Star Alliance", LH: "Star Alliance", AC: "Star Alliance", SQ: "Star Alliance",
  NH: "Star Alliance", TK: "Star Alliance", LX: "Star Alliance", OS: "Star Alliance",
  SN: "Star Alliance", TP: "Star Alliance", A3: "Star Alliance", CA: "Star Alliance",
  AI: "Star Alliance", NZ: "Star Alliance", OZ: "Star Alliance", CM: "Star Alliance",
  ET: "Star Alliance", BR: "Star Alliance", LO: "Star Alliance", SK: "Star Alliance",
  TG: "Star Alliance", SA: "Star Alliance", MS: "Star Alliance", ZH: "Star Alliance",

  // SkyTeam
  DL: "SkyTeam", AF: "SkyTeam", KL: "SkyTeam", KE: "SkyTeam", MU: "SkyTeam",
  AM: "SkyTeam", OK: "SkyTeam", KQ: "SkyTeam", VN: "SkyTeam", GA: "SkyTeam",
  RO: "SkyTeam", ME: "SkyTeam", SV: "SkyTeam", CZ: "SkyTeam", XF: "SkyTeam",
  UX: "SkyTeam", AZ: "SkyTeam",

  // oneworld
  AA: "oneworld", BA: "oneworld", CX: "oneworld", QF: "oneworld", JL: "oneworld",
  AY: "oneworld", IB: "oneworld", MH: "oneworld", RJ: "oneworld", QR: "oneworld",
  AT: "oneworld", AS: "oneworld", UL: "oneworld", FJ: "oneworld", S7: "oneworld",
};

export function getAlliance(airlineCode: string): Alliance {
  return AIRLINE_ALLIANCE[airlineCode] ?? "None";
}

export function getAirlineCodeFromName(airlineName: string): string {
  const nameToCode: Record<string, string> = {
    "United": "UA", "Lufthansa": "LH", "Air Canada": "AC", "Singapore Airlines": "SQ",
    "ANA": "NH", "Turkish Airlines": "TK", "Swiss": "LX", "Austrian": "OS",
    "Delta": "DL", "Air France": "AF", "KLM": "KL", "Korean Air": "KE",
    "China Eastern": "MU", "Aeromexico": "AM", "Vietnam Airlines": "VN",
    "American": "AA", "American Airlines": "AA", "British Airways": "BA",
    "Cathay Pacific": "CX", "Qantas": "QF", "Japan Airlines": "JL",
    "Finnair": "AY", "Iberia": "IB", "Malaysia Airlines": "MH", "Qatar Airways": "QR",
    "Alaska Airlines": "AS", "Alaska": "AS", "JetBlue": "B6",
    "Southwest": "WN", "Spirit": "NK", "Frontier": "F9", "LATAM": "LA",
    "WestJet": "WS", "Ryanair": "FR", "EasyJet": "U2",
    "China Southern": "CZ", "Ethiopian Airlines": "ET", "Ethiopian": "ET",
    "Copa Airlines": "CM", "Copa": "CM", "Aegean": "A3",
  };
  return nameToCode[airlineName] ?? "";
}
