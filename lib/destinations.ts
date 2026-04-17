export type Destination = {
  iata: string;
  city: string;
  country: string;
  flag: string;
  tags: string[];
};

export const SURPRISE_DESTINATIONS: Destination[] = [
  // Europe
  { iata: "LHR", city: "London",        country: "UK",            flag: "🇬🇧", tags: ["europe", "city", "culture", "history"] },
  { iata: "CDG", city: "Paris",         country: "France",        flag: "🇫🇷", tags: ["europe", "city", "culture", "romance", "food", "luxury"] },
  { iata: "FCO", city: "Rome",          country: "Italy",         flag: "🇮🇹", tags: ["europe", "city", "culture", "history", "food", "romance"] },
  { iata: "BCN", city: "Barcelona",     country: "Spain",         flag: "🇪🇸", tags: ["europe", "city", "beach", "culture", "food"] },
  { iata: "AMS", city: "Amsterdam",     country: "Netherlands",   flag: "🇳🇱", tags: ["europe", "city", "culture"] },
  { iata: "LIS", city: "Lisbon",        country: "Portugal",      flag: "🇵🇹", tags: ["europe", "city", "beach", "culture", "food"] },
  { iata: "ATH", city: "Athens",        country: "Greece",        flag: "🇬🇷", tags: ["europe", "city", "beach", "history", "culture"] },
  { iata: "DUB", city: "Dublin",        country: "Ireland",       flag: "🇮🇪", tags: ["europe", "city", "culture"] },
  { iata: "CPH", city: "Copenhagen",    country: "Denmark",       flag: "🇩🇰", tags: ["europe", "city", "culture", "food"] },
  // Middle East
  { iata: "DXB", city: "Dubai",         country: "UAE",           flag: "🇦🇪", tags: ["middle east", "city", "luxury", "exotic", "shopping"] },
  { iata: "DOH", city: "Doha",          country: "Qatar",         flag: "🇶🇦", tags: ["middle east", "city", "luxury", "exotic"] },
  // Asia
  { iata: "NRT", city: "Tokyo",         country: "Japan",         flag: "🇯🇵", tags: ["asia", "city", "exotic", "culture", "food"] },
  { iata: "BKK", city: "Bangkok",       country: "Thailand",      flag: "🇹🇭", tags: ["asia", "city", "exotic", "food", "culture", "budget"] },
  { iata: "DPS", city: "Bali",          country: "Indonesia",     flag: "🇮🇩", tags: ["asia", "beach", "exotic", "nature", "romance"] },
  { iata: "SIN", city: "Singapore",     country: "Singapore",     flag: "🇸🇬", tags: ["asia", "city", "luxury", "food", "exotic"] },
  { iata: "HKT", city: "Phuket",        country: "Thailand",      flag: "🇹🇭", tags: ["asia", "beach", "exotic", "nature"] },
  { iata: "ICN", city: "Seoul",         country: "South Korea",   flag: "🇰🇷", tags: ["asia", "city", "culture", "food"] },
  { iata: "HAN", city: "Hanoi",         country: "Vietnam",       flag: "🇻🇳", tags: ["asia", "city", "exotic", "food", "culture", "budget"] },
  // Oceania
  { iata: "SYD", city: "Sydney",        country: "Australia",     flag: "🇦🇺", tags: ["oceania", "city", "beach", "nature"] },
  // Latin America
  { iata: "MEX", city: "Mexico City",   country: "Mexico",        flag: "🇲🇽", tags: ["latin america", "city", "culture", "food", "history"] },
  { iata: "CUN", city: "Cancún",        country: "Mexico",        flag: "🇲🇽", tags: ["latin america", "beach", "resort", "nature"] },
  { iata: "GRU", city: "São Paulo",     country: "Brazil",        flag: "🇧🇷", tags: ["latin america", "city", "culture", "food"] },
  { iata: "GIG", city: "Rio de Janeiro",country: "Brazil",        flag: "🇧🇷", tags: ["latin america", "city", "beach", "culture"] },
  { iata: "BOG", city: "Bogotá",        country: "Colombia",      flag: "🇨🇴", tags: ["latin america", "city", "culture", "exotic"] },
  { iata: "LIM", city: "Lima",          country: "Peru",          flag: "🇵🇪", tags: ["latin america", "city", "food", "culture", "adventure"] },
  // Africa
  { iata: "CPT", city: "Cape Town",     country: "South Africa",  flag: "🇿🇦", tags: ["africa", "city", "beach", "nature", "adventure", "exotic"] },
  { iata: "RAK", city: "Marrakesh",     country: "Morocco",       flag: "🇲🇦", tags: ["africa", "city", "exotic", "culture", "adventure"] },
  // North America
  { iata: "YYZ", city: "Toronto",       country: "Canada",        flag: "🇨🇦", tags: ["north america", "city", "culture"] },
  { iata: "CUN", city: "Cancún",        country: "Mexico",        flag: "🇲🇽", tags: ["latin america", "beach", "resort", "nature"] },
];

// De-duplicate by IATA (Cancun appears twice above — remove duplicate)
const seen = new Set<string>();
export const SURPRISE_DESTINATIONS_DEDUPED = SURPRISE_DESTINATIONS.filter((d) => {
  if (seen.has(d.iata)) return false;
  seen.add(d.iata);
  return true;
});

export type Vibe = {
  label: string;
  emoji: string;
  tags: string[];
};

export const VIBES: Vibe[] = [
  { label: "Beach",          emoji: "🏖",  tags: ["beach", "resort"] },
  { label: "City Break",     emoji: "🌆",  tags: ["city"] },
  { label: "Food & Culture", emoji: "🍜",  tags: ["food", "culture"] },
  { label: "Adventure",      emoji: "🌿",  tags: ["nature", "adventure"] },
  { label: "Luxury",         emoji: "✨",  tags: ["luxury"] },
  { label: "Exotic",         emoji: "🌟",  tags: ["exotic"] },
  { label: "Romance",        emoji: "💕",  tags: ["romance"] },
  { label: "Europe",         emoji: "🌍",  tags: ["europe"] },
  { label: "Asia",           emoji: "🌏",  tags: ["asia"] },
  { label: "Latin America",  emoji: "🌎",  tags: ["latin america"] },
];

export function filterDestinationsByVibes(vibes: string[]): Destination[] {
  if (!vibes.length) return SURPRISE_DESTINATIONS_DEDUPED;
  const activeTags = VIBES.filter((v) => vibes.includes(v.label)).flatMap((v) => v.tags);
  return SURPRISE_DESTINATIONS_DEDUPED.filter((d) =>
    d.tags.some((t) => activeTags.includes(t))
  );
}
