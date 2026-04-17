export type Destination = {
  iata: string;
  city: string;
  country: string;
  flag: string;
};

export const SURPRISE_DESTINATIONS: Destination[] = [
  { iata: "LHR", city: "London",        country: "UK",          flag: "🇬🇧" },
  { iata: "CDG", city: "Paris",         country: "France",      flag: "🇫🇷" },
  { iata: "FCO", city: "Rome",          country: "Italy",       flag: "🇮🇹" },
  { iata: "BCN", city: "Barcelona",     country: "Spain",       flag: "🇪🇸" },
  { iata: "AMS", city: "Amsterdam",     country: "Netherlands", flag: "🇳🇱" },
  { iata: "DXB", city: "Dubai",         country: "UAE",         flag: "🇦🇪" },
  { iata: "NRT", city: "Tokyo",         country: "Japan",       flag: "🇯🇵" },
  { iata: "BKK", city: "Bangkok",       country: "Thailand",    flag: "🇹🇭" },
  { iata: "SIN", city: "Singapore",     country: "Singapore",   flag: "🇸🇬" },
  { iata: "SYD", city: "Sydney",        country: "Australia",   flag: "🇦🇺" },
  { iata: "MEX", city: "Mexico City",   country: "Mexico",      flag: "🇲🇽" },
  { iata: "GRU", city: "São Paulo",     country: "Brazil",      flag: "🇧🇷" },
  { iata: "YYZ", city: "Toronto",       country: "Canada",      flag: "🇨🇦" },
  { iata: "ICN", city: "Seoul",         country: "South Korea", flag: "🇰🇷" },
  { iata: "CPT", city: "Cape Town",     country: "South Africa",flag: "🇿🇦" },
];
