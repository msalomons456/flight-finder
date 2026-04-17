export type Destination = {
  iata: string;
  city: string;
  country: string;
  flag: string;
  tags: string[];
};

export const SURPRISE_DESTINATIONS: Destination[] = [
  // Europe
  { iata: "LHR", city: "London",          country: "UK",             flag: "🇬🇧", tags: ["europe", "city", "culture", "history"] },
  { iata: "CDG", city: "Paris",           country: "France",         flag: "🇫🇷", tags: ["europe", "city", "culture", "romance", "food", "luxury"] },
  { iata: "FCO", city: "Rome",            country: "Italy",          flag: "🇮🇹", tags: ["europe", "city", "culture", "history", "food", "romance"] },
  { iata: "BCN", city: "Barcelona",       country: "Spain",          flag: "🇪🇸", tags: ["europe", "city", "beach", "culture", "food"] },
  { iata: "MAD", city: "Madrid",          country: "Spain",          flag: "🇪🇸", tags: ["europe", "city", "culture", "food"] },
  { iata: "AMS", city: "Amsterdam",       country: "Netherlands",    flag: "🇳🇱", tags: ["europe", "city", "culture"] },
  { iata: "LIS", city: "Lisbon",          country: "Portugal",       flag: "🇵🇹", tags: ["europe", "city", "beach", "culture", "food"] },
  { iata: "OPO", city: "Porto",           country: "Portugal",       flag: "🇵🇹", tags: ["europe", "city", "culture", "food"] },
  { iata: "ATH", city: "Athens",          country: "Greece",         flag: "🇬🇷", tags: ["europe", "city", "beach", "history", "culture"] },
  { iata: "DUB", city: "Dublin",          country: "Ireland",        flag: "🇮🇪", tags: ["europe", "city", "culture"] },
  { iata: "CPH", city: "Copenhagen",      country: "Denmark",        flag: "🇩🇰", tags: ["europe", "city", "culture", "food"] },
  { iata: "ARN", city: "Stockholm",       country: "Sweden",         flag: "🇸🇪", tags: ["europe", "city", "culture", "nature"] },
  { iata: "OSL", city: "Oslo",            country: "Norway",         flag: "🇳🇴", tags: ["europe", "city", "nature", "adventure"] },
  { iata: "HEL", city: "Helsinki",        country: "Finland",        flag: "🇫🇮", tags: ["europe", "city", "culture", "nature"] },
  { iata: "VIE", city: "Vienna",          country: "Austria",        flag: "🇦🇹", tags: ["europe", "city", "culture", "history", "food"] },
  { iata: "PRG", city: "Prague",          country: "Czech Republic", flag: "🇨🇿", tags: ["europe", "city", "culture", "history"] },
  { iata: "BUD", city: "Budapest",        country: "Hungary",        flag: "🇭🇺", tags: ["europe", "city", "culture", "history", "food"] },
  { iata: "WAW", city: "Warsaw",          country: "Poland",         flag: "🇵🇱", tags: ["europe", "city", "culture", "history"] },
  { iata: "BER", city: "Berlin",          country: "Germany",        flag: "🇩🇪", tags: ["europe", "city", "culture", "history"] },
  { iata: "MUC", city: "Munich",          country: "Germany",        flag: "🇩🇪", tags: ["europe", "city", "culture", "food"] },
  { iata: "ZRH", city: "Zurich",          country: "Switzerland",    flag: "🇨🇭", tags: ["europe", "city", "luxury", "nature"] },
  { iata: "MXP", city: "Milan",           country: "Italy",          flag: "🇮🇹", tags: ["europe", "city", "culture", "food", "luxury"] },
  { iata: "NCE", city: "Nice",            country: "France",         flag: "🇫🇷", tags: ["europe", "city", "beach", "luxury", "romance"] },
  { iata: "EDI", city: "Edinburgh",       country: "UK",             flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", tags: ["europe", "city", "culture", "history", "nature"] },
  // Middle East
  { iata: "DXB", city: "Dubai",           country: "UAE",            flag: "🇦🇪", tags: ["middle east", "city", "luxury", "exotic", "shopping"] },
  { iata: "AUH", city: "Abu Dhabi",       country: "UAE",            flag: "🇦🇪", tags: ["middle east", "city", "luxury", "exotic"] },
  { iata: "DOH", city: "Doha",            country: "Qatar",          flag: "🇶🇦", tags: ["middle east", "city", "luxury", "exotic"] },
  { iata: "TLV", city: "Tel Aviv",        country: "Israel",         flag: "🇮🇱", tags: ["middle east", "city", "beach", "culture", "history"] },
  { iata: "MCT", city: "Muscat",          country: "Oman",           flag: "🇴🇲", tags: ["middle east", "city", "exotic", "nature", "adventure"] },
  { iata: "AMM", city: "Amman",           country: "Jordan",         flag: "🇯🇴", tags: ["middle east", "city", "history", "culture", "exotic"] },
  // Asia
  { iata: "NRT", city: "Tokyo",           country: "Japan",          flag: "🇯🇵", tags: ["asia", "city", "exotic", "culture", "food"] },
  { iata: "KIX", city: "Osaka",           country: "Japan",          flag: "🇯🇵", tags: ["asia", "city", "exotic", "culture", "food"] },
  { iata: "ICN", city: "Seoul",           country: "South Korea",    flag: "🇰🇷", tags: ["asia", "city", "culture", "food"] },
  { iata: "HKG", city: "Hong Kong",       country: "Hong Kong",      flag: "🇭🇰", tags: ["asia", "city", "food", "culture", "luxury"] },
  { iata: "TPE", city: "Taipei",          country: "Taiwan",         flag: "🇹🇼", tags: ["asia", "city", "food", "culture", "exotic"] },
  { iata: "PVG", city: "Shanghai",        country: "China",          flag: "🇨🇳", tags: ["asia", "city", "culture", "food", "exotic"] },
  { iata: "PEK", city: "Beijing",         country: "China",          flag: "🇨🇳", tags: ["asia", "city", "history", "culture", "exotic"] },
  { iata: "BKK", city: "Bangkok",         country: "Thailand",       flag: "🇹🇭", tags: ["asia", "city", "exotic", "food", "culture", "budget"] },
  { iata: "HKT", city: "Phuket",          country: "Thailand",       flag: "🇹🇭", tags: ["asia", "beach", "exotic", "nature", "resort"] },
  { iata: "CNX", city: "Chiang Mai",      country: "Thailand",       flag: "🇹🇭", tags: ["asia", "city", "exotic", "culture", "nature", "budget"] },
  { iata: "DPS", city: "Bali",            country: "Indonesia",      flag: "🇮🇩", tags: ["asia", "beach", "exotic", "nature", "romance"] },
  { iata: "SIN", city: "Singapore",       country: "Singapore",      flag: "🇸🇬", tags: ["asia", "city", "luxury", "food", "exotic"] },
  { iata: "KUL", city: "Kuala Lumpur",    country: "Malaysia",       flag: "🇲🇾", tags: ["asia", "city", "food", "culture", "exotic", "budget"] },
  { iata: "HAN", city: "Hanoi",           country: "Vietnam",        flag: "🇻🇳", tags: ["asia", "city", "exotic", "food", "culture", "budget"] },
  { iata: "SGN", city: "Ho Chi Minh City",country: "Vietnam",        flag: "🇻🇳", tags: ["asia", "city", "exotic", "food", "culture", "budget"] },
  { iata: "MNL", city: "Manila",          country: "Philippines",    flag: "🇵🇭", tags: ["asia", "city", "exotic", "beach"] },
  { iata: "CEB", city: "Cebu",            country: "Philippines",    flag: "🇵🇭", tags: ["asia", "beach", "exotic", "nature", "budget"] },
  { iata: "REP", city: "Siem Reap",       country: "Cambodia",       flag: "🇰🇭", tags: ["asia", "city", "exotic", "history", "culture", "budget"] },
  { iata: "DEL", city: "Delhi",           country: "India",          flag: "🇮🇳", tags: ["asia", "city", "exotic", "history", "culture"] },
  { iata: "BOM", city: "Mumbai",          country: "India",          flag: "🇮🇳", tags: ["asia", "city", "exotic", "food", "culture"] },
  { iata: "CMB", city: "Colombo",         country: "Sri Lanka",      flag: "🇱🇰", tags: ["asia", "city", "exotic", "beach", "nature", "budget"] },
  { iata: "KTM", city: "Kathmandu",       country: "Nepal",          flag: "🇳🇵", tags: ["asia", "exotic", "nature", "adventure", "culture"] },
  // Oceania
  { iata: "SYD", city: "Sydney",          country: "Australia",      flag: "🇦🇺", tags: ["oceania", "city", "beach", "nature"] },
  { iata: "MEL", city: "Melbourne",       country: "Australia",      flag: "🇦🇺", tags: ["oceania", "city", "culture", "food"] },
  { iata: "BNE", city: "Brisbane",        country: "Australia",      flag: "🇦🇺", tags: ["oceania", "city", "beach", "nature"] },
  { iata: "AKL", city: "Auckland",        country: "New Zealand",    flag: "🇳🇿", tags: ["oceania", "city", "nature", "adventure"] },
  { iata: "NAN", city: "Nadi",            country: "Fiji",           flag: "🇫🇯", tags: ["oceania", "beach", "resort", "romance", "exotic"] },
  { iata: "PPT", city: "Papeete",         country: "French Polynesia",flag: "🇵🇫", tags: ["oceania", "beach", "resort", "romance", "luxury", "exotic"] },
  // Latin America
  { iata: "MEX", city: "Mexico City",     country: "Mexico",         flag: "🇲🇽", tags: ["latin america", "city", "culture", "food", "history"] },
  { iata: "CUN", city: "Cancún",          country: "Mexico",         flag: "🇲🇽", tags: ["latin america", "beach", "resort", "nature"] },
  { iata: "GRU", city: "São Paulo",       country: "Brazil",         flag: "🇧🇷", tags: ["latin america", "city", "culture", "food"] },
  { iata: "GIG", city: "Rio de Janeiro",  country: "Brazil",         flag: "🇧🇷", tags: ["latin america", "city", "beach", "culture"] },
  { iata: "BOG", city: "Bogotá",          country: "Colombia",       flag: "🇨🇴", tags: ["latin america", "city", "culture", "exotic"] },
  { iata: "MDE", city: "Medellín",        country: "Colombia",       flag: "🇨🇴", tags: ["latin america", "city", "culture", "exotic", "budget"] },
  { iata: "LIM", city: "Lima",            country: "Peru",           flag: "🇵🇪", tags: ["latin america", "city", "food", "culture", "adventure"] },
  { iata: "EZE", city: "Buenos Aires",    country: "Argentina",      flag: "🇦🇷", tags: ["latin america", "city", "culture", "food", "romance"] },
  { iata: "SCL", city: "Santiago",        country: "Chile",          flag: "🇨🇱", tags: ["latin america", "city", "culture", "nature", "adventure"] },
  { iata: "UIO", city: "Quito",           country: "Ecuador",        flag: "🇪🇨", tags: ["latin america", "city", "exotic", "nature", "adventure"] },
  { iata: "PTY", city: "Panama City",     country: "Panama",         flag: "🇵🇦", tags: ["latin america", "city", "culture", "exotic"] },
  { iata: "PUJ", city: "Punta Cana",      country: "Dominican Republic", flag: "🇩🇴", tags: ["latin america", "beach", "resort", "romance"] },
  { iata: "MBJ", city: "Montego Bay",     country: "Jamaica",        flag: "🇯🇲", tags: ["latin america", "beach", "resort", "culture"] },
  { iata: "BGI", city: "Bridgetown",      country: "Barbados",       flag: "🇧🇧", tags: ["latin america", "beach", "resort", "luxury"] },
  { iata: "SJU", city: "San Juan",        country: "Puerto Rico",    flag: "🇵🇷", tags: ["latin america", "beach", "culture", "city"] },
  // Africa
  { iata: "CPT", city: "Cape Town",       country: "South Africa",   flag: "🇿🇦", tags: ["africa", "city", "beach", "nature", "adventure", "exotic"] },
  { iata: "JNB", city: "Johannesburg",    country: "South Africa",   flag: "🇿🇦", tags: ["africa", "city", "culture", "exotic", "adventure"] },
  { iata: "NBO", city: "Nairobi",         country: "Kenya",          flag: "🇰🇪", tags: ["africa", "city", "exotic", "nature", "adventure"] },
  { iata: "RAK", city: "Marrakesh",       country: "Morocco",        flag: "🇲🇦", tags: ["africa", "city", "exotic", "culture", "adventure"] },
  { iata: "CMN", city: "Casablanca",      country: "Morocco",        flag: "🇲🇦", tags: ["africa", "city", "culture", "exotic"] },
  { iata: "DKR", city: "Dakar",           country: "Senegal",        flag: "🇸🇳", tags: ["africa", "city", "exotic", "culture", "beach"] },
  { iata: "ADD", city: "Addis Ababa",     country: "Ethiopia",       flag: "🇪🇹", tags: ["africa", "city", "exotic", "culture", "history"] },
  { iata: "MRU", city: "Mauritius",       country: "Mauritius",      flag: "🇲🇺", tags: ["africa", "beach", "resort", "romance", "luxury", "exotic"] },
  { iata: "SEZ", city: "Mahé",            country: "Seychelles",     flag: "🇸🇨", tags: ["africa", "beach", "resort", "romance", "luxury", "exotic"] },
  { iata: "LPA", city: "Gran Canaria",    country: "Spain",          flag: "🇪🇸", tags: ["africa", "beach", "resort", "nature"] },
  // North America
  { iata: "YYZ", city: "Toronto",         country: "Canada",         flag: "🇨🇦", tags: ["north america", "city", "culture"] },
  { iata: "YVR", city: "Vancouver",       country: "Canada",         flag: "🇨🇦", tags: ["north america", "city", "nature", "adventure"] },
  { iata: "YUL", city: "Montreal",        country: "Canada",         flag: "🇨🇦", tags: ["north america", "city", "culture", "food"] },
  { iata: "JFK", city: "New York",        country: "USA",            flag: "🇺🇸", tags: ["north america", "city", "culture", "food", "luxury"] },
  { iata: "MIA", city: "Miami",           country: "USA",            flag: "🇺🇸", tags: ["north america", "city", "beach", "culture"] },
  { iata: "LAX", city: "Los Angeles",     country: "USA",            flag: "🇺🇸", tags: ["north america", "city", "culture", "beach"] },
  { iata: "ORD", city: "Chicago",         country: "USA",            flag: "🇺🇸", tags: ["north america", "city", "culture", "food"] },
  { iata: "SFO", city: "San Francisco",   country: "USA",            flag: "🇺🇸", tags: ["north america", "city", "culture", "food"] },
  { iata: "HNL", city: "Honolulu",        country: "USA",            flag: "🇺🇸", tags: ["north america", "beach", "resort", "nature"] },
];

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

const SAMPLE_SIZE = 20;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function filterDestinationsByVibes(vibes: string[]): Destination[] {
  const pool = vibes.length === 0
    ? SURPRISE_DESTINATIONS
    : (() => {
        const activeTags = VIBES.filter((v) => vibes.includes(v.label)).flatMap((v) => v.tags);
        return SURPRISE_DESTINATIONS.filter((d) => d.tags.some((t) => activeTags.includes(t)));
      })();
  return shuffle(pool).slice(0, SAMPLE_SIZE);
}
