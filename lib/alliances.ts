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

export const AIRLINE_WEBSITES: Record<string, string> = {
  // North America
  AA: "https://www.aa.com",
  DL: "https://www.delta.com",
  UA: "https://www.united.com",
  AS: "https://www.alaskaair.com",
  B6: "https://www.jetblue.com",
  WN: "https://www.southwest.com",
  NK: "https://www.spirit.com",
  F9: "https://www.flyfrontier.com",
  AC: "https://www.aircanada.com",
  WS: "https://www.westjet.com",
  AM: "https://www.aeromexico.com",
  CM: "https://www.copaair.com",
  // Europe
  BA: "https://www.britishairways.com",
  LH: "https://www.lufthansa.com",
  AF: "https://www.airfrance.com",
  KL: "https://www.klm.com",
  LX: "https://www.swiss.com",
  OS: "https://www.austrian.com",
  SN: "https://www.brusselsairlines.com",
  TP: "https://www.tapair.com",
  IB: "https://www.iberia.com",
  AY: "https://www.finnair.com",
  SK: "https://www.flysas.com",
  TK: "https://www.turkishairlines.com",
  FR: "https://www.ryanair.com",
  U2: "https://www.easyjet.com",
  A3: "https://en.aegeanair.com",
  // Asia-Pacific
  SQ: "https://www.singaporeair.com",
  NH: "https://www.ana.co.jp/en",
  JL: "https://www.jal.com",
  CX: "https://www.cathaypacific.com",
  QF: "https://www.qantas.com",
  NZ: "https://www.airnewzealand.com",
  MH: "https://www.malaysiaairlines.com",
  TG: "https://www.thaiairways.com",
  BR: "https://www.evaair.com",
  OZ: "https://www.flyasiana.com",
  KE: "https://www.koreanair.com",
  CA: "https://www.airchina.com",
  MU: "https://www.ceair.com",
  CZ: "https://www.csair.com",
  ZH: "https://www.shenzhenair.com",
  AI: "https://www.airindia.com",
  VN: "https://www.vietnamairlines.com",
  GA: "https://www.garuda-indonesia.com",
  UL: "https://www.srilankan.com",
  FJ: "https://www.fijiairways.com",
  // Middle East & Africa
  QR: "https://www.qatarairways.com",
  ET: "https://www.ethiopianairlines.com",
  MS: "https://www.egyptair.com",
  ME: "https://www.mea.com.lb",
  KQ: "https://www.kenya-airways.com",
  SA: "https://www.flysaa.com",
  // South America
  LA: "https://www.latamairlines.com",
  RJ: "https://www.rj.com",
};

export function getAirlineWebsite(airlineCode: string): string {
  return AIRLINE_WEBSITES[airlineCode] ?? "https://www.google.com/flights";
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
    "Air New Zealand": "NZ",
    "Southwest": "WN", "Spirit": "NK", "Frontier": "F9", "LATAM": "LA",
    "WestJet": "WS", "Ryanair": "FR", "EasyJet": "U2",
    "China Southern": "CZ", "Ethiopian Airlines": "ET", "Ethiopian": "ET",
    "Copa Airlines": "CM", "Copa": "CM", "Aegean": "A3",
  };
  return nameToCode[airlineName] ?? "";
}
