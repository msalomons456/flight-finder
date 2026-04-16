export type Region = {
  key: string;
  label: string;
  airports: string[];
};

export const REGIONS: Region[] = [
  // US Regions
  { key: "us_northeast", label: "US Northeast", airports: ["JFK", "LGA", "EWR", "BOS", "PHL", "BWI", "DCA"] },
  { key: "us_southeast", label: "US Southeast", airports: ["ATL", "MIA", "FLL", "MCO", "CLT", "RDU", "TPA"] },
  { key: "us_midwest",   label: "US Midwest",   airports: ["ORD", "MDW", "DTW", "MSP", "STL", "CLE", "CMH"] },
  { key: "us_west",      label: "US West Coast", airports: ["LAX", "SFO", "SJC", "OAK", "SEA", "PDX", "LAS"] },
  { key: "us_southwest", label: "US Southwest", airports: ["DFW", "DAL", "IAH", "HOU", "PHX", "DEN", "ABQ"] },
  { key: "us_all",       label: "United States (All)", airports: ["JFK", "EWR", "BOS", "ATL", "MIA", "ORD", "LAX", "SFO", "DFW", "DEN", "SEA", "LAS"] },

  // Canada
  { key: "canada",         label: "Canada",          airports: ["YYZ", "YVR", "YUL", "YYC", "YEG", "YOW"] },
  { key: "canada_east",    label: "Canada East",     airports: ["YYZ", "YUL", "YOW", "YHZ"] },
  { key: "canada_west",    label: "Canada West",     airports: ["YVR", "YYC", "YEG"] },

  // Mexico & Caribbean
  { key: "mexico",         label: "Mexico",          airports: ["MEX", "CUN", "GDL", "MTY", "SJD", "PVR"] },
  { key: "caribbean",      label: "Caribbean",       airports: ["MBJ", "NAS", "PUJ", "SJU", "BGI", "GCM"] },

  // Central America
  { key: "central_america", label: "Central America", airports: ["PTY", "SJO", "SAL", "GUA", "TGU", "MGA"] },

  // South America
  { key: "south_america",   label: "South America (All)", airports: ["GRU", "EZE", "BOG", "LIM", "SCL", "GIG", "UIO", "CCS"] },
  { key: "brazil",          label: "Brazil",          airports: ["GRU", "GIG", "BSB", "SSA", "FOR", "REC"] },
  { key: "argentina",       label: "Argentina",       airports: ["EZE", "AEP", "COR", "MDZ", "BRC"] },
  { key: "colombia",        label: "Colombia",        airports: ["BOG", "MDE", "CTG", "CLO", "BAQ"] },
  { key: "chile",           label: "Chile",           airports: ["SCL", "PMC", "ANF"] },
  { key: "peru",            label: "Peru",            airports: ["LIM", "CUZ", "AQP"] },

  // Europe (broad)
  { key: "europe",          label: "Europe (All)",    airports: ["LHR", "CDG", "FRA", "AMS", "MAD", "BCN", "FCO", "MXP", "ZRH", "VIE", "BRU", "LIS"] },
  { key: "western_europe",  label: "Western Europe",  airports: ["CDG", "ORY", "AMS", "FRA", "MUC", "BRU", "ZRH", "VIE", "DUS", "HAM"] },
  { key: "southern_europe", label: "Southern Europe", airports: ["MAD", "BCN", "FCO", "MXP", "LIN", "ATH", "LIS", "OPO", "NCE", "MRS"] },
  { key: "northern_europe", label: "Northern Europe", airports: ["CPH", "ARN", "OSL", "HEL", "RVN", "GOT"] },
  { key: "eastern_europe",  label: "Eastern Europe",  airports: ["WAW", "PRG", "BUD", "OTP", "SOF", "KBP", "SVO", "LED"] },

  // UK & Ireland
  { key: "uk_ireland",      label: "UK & Ireland",    airports: ["LHR", "LGW", "MAN", "EDI", "GLA", "BHX", "DUB", "STN"] },
  { key: "uk",              label: "United Kingdom",  airports: ["LHR", "LGW", "MAN", "EDI", "GLA", "BHX", "LTN", "BRS"] },
  { key: "ireland",         label: "Ireland",         airports: ["DUB", "ORK", "SNN"] },

  // Individual European Countries
  { key: "france",          label: "France",          airports: ["CDG", "ORY", "NCE", "LYS", "MRS", "BOD", "TLS", "NTE"] },
  { key: "germany",         label: "Germany",         airports: ["FRA", "MUC", "BER", "DUS", "HAM", "STR", "CGN", "NUE"] },
  { key: "spain",           label: "Spain",           airports: ["MAD", "BCN", "AGP", "PMI", "ALC", "VLC", "SVQ", "BIO"] },
  { key: "italy",           label: "Italy",           airports: ["FCO", "MXP", "LIN", "VCE", "NAP", "CTA", "BLQ", "PSA"] },
  { key: "portugal",        label: "Portugal",        airports: ["LIS", "OPO", "FAO"] },
  { key: "netherlands",     label: "Netherlands",     airports: ["AMS", "EIN", "RTM"] },
  { key: "switzerland",     label: "Switzerland",     airports: ["ZRH", "GVA", "BSL"] },
  { key: "austria",         label: "Austria",         airports: ["VIE", "SZG", "INN", "GRZ"] },
  { key: "belgium",         label: "Belgium",         airports: ["BRU", "CRL", "LGG"] },
  { key: "greece",          label: "Greece",          airports: ["ATH", "SKG", "HER", "RHO", "CFU"] },
  { key: "turkey",          label: "Turkey",          airports: ["IST", "SAW", "AYT", "ADB", "ESB", "DLM"] },
  { key: "poland",          label: "Poland",          airports: ["WAW", "KRK", "WRO", "GDN", "KTW"] },
  { key: "czech_republic",  label: "Czech Republic",  airports: ["PRG"] },
  { key: "hungary",         label: "Hungary",         airports: ["BUD"] },
  { key: "scandinavia",     label: "Scandinavia",     airports: ["CPH", "ARN", "OSL", "HEL", "GOT", "BGO"] },
  { key: "denmark",         label: "Denmark",         airports: ["CPH", "AAR", "AAL"] },
  { key: "sweden",          label: "Sweden",          airports: ["ARN", "GOT", "MMX", "LLA"] },
  { key: "norway",          label: "Norway",          airports: ["OSL", "BGO", "TRD", "SVG"] },
  { key: "finland",         label: "Finland",         airports: ["HEL", "TMP", "TKU", "OUL"] },

  // Middle East
  { key: "middle_east",     label: "Middle East",     airports: ["DXB", "AUH", "DOH", "AMM", "BEY", "TLV", "KWI", "BAH", "MCT"] },
  { key: "uae",             label: "UAE",             airports: ["DXB", "AUH", "SHJ"] },
  { key: "qatar",           label: "Qatar",           airports: ["DOH"] },
  { key: "israel",          label: "Israel",          airports: ["TLV"] },
  { key: "jordan",          label: "Jordan",          airports: ["AMM", "AQJ"] },
  { key: "saudi_arabia",    label: "Saudi Arabia",    airports: ["RUH", "JED", "DMM"] },

  // Africa
  { key: "africa",          label: "Africa (All)",    airports: ["JNB", "CPT", "CAI", "CMN", "NBO", "LOS", "ACC", "ADD", "DAR"] },
  { key: "north_africa",    label: "North Africa",    airports: ["CAI", "CMN", "ALG", "TUN", "TIP", "HRG", "SSH"] },
  { key: "east_africa",     label: "East Africa",     airports: ["NBO", "ADD", "DAR", "EBB", "KGL"] },
  { key: "west_africa",     label: "West Africa",     airports: ["LOS", "ACC", "ABJ", "DKR", "CMN"] },
  { key: "south_africa",    label: "South Africa",    airports: ["JNB", "CPT", "DUR", "PLZ"] },
  { key: "egypt",           label: "Egypt",           airports: ["CAI", "HRG", "SSH", "LXR", "ASW"] },
  { key: "morocco",         label: "Morocco",         airports: ["CMN", "RAK", "AGA", "TNG", "FEZ"] },
  { key: "kenya",           label: "Kenya",           airports: ["NBO", "MBA"] },
  { key: "ethiopia",        label: "Ethiopia",        airports: ["ADD"] },
  { key: "nigeria",         label: "Nigeria",         airports: ["LOS", "ABV", "PHC", "KAN"] },
  { key: "ghana",           label: "Ghana",           airports: ["ACC"] },

  // Asia (broad)
  { key: "asia",            label: "Asia (All)",      airports: ["NRT", "HND", "ICN", "PEK", "PVG", "HKG", "SIN", "BKK", "DEL", "BOM", "KUL", "MNL"] },
  { key: "east_asia",       label: "East Asia",       airports: ["NRT", "HND", "KIX", "ICN", "GMP", "PEK", "PVG", "CAN", "HKG", "TPE"] },
  { key: "southeast_asia",  label: "Southeast Asia",  airports: ["SIN", "BKK", "DMK", "KUL", "CGK", "MNL", "SGN", "HAN", "RGN"] },
  { key: "south_asia",      label: "South Asia",      airports: ["DEL", "BOM", "BLR", "MAA", "CCU", "DAC", "CMB", "KTM"] },

  // Individual Asian Countries
  { key: "japan",           label: "Japan",           airports: ["NRT", "HND", "KIX", "NGO", "CTS", "FUK", "OKA"] },
  { key: "south_korea",     label: "South Korea",     airports: ["ICN", "GMP", "PUS"] },
  { key: "china",           label: "China",           airports: ["PEK", "PKX", "PVG", "SHA", "CAN", "SZX", "CTU", "WUH"] },
  { key: "hong_kong",       label: "Hong Kong",       airports: ["HKG"] },
  { key: "taiwan",          label: "Taiwan",          airports: ["TPE", "KHH"] },
  { key: "thailand",        label: "Thailand",        airports: ["BKK", "DMK", "HKT", "CNX", "USM"] },
  { key: "singapore",       label: "Singapore",       airports: ["SIN"] },
  { key: "indonesia",       label: "Indonesia",       airports: ["CGK", "DPS", "SUB", "UPG", "KNO"] },
  { key: "malaysia",        label: "Malaysia",        airports: ["KUL", "PEN", "BKI", "KCH"] },
  { key: "vietnam",         label: "Vietnam",         airports: ["SGN", "HAN", "DAD", "CXR"] },
  { key: "philippines",     label: "Philippines",     airports: ["MNL", "CEB", "DVO", "ILO"] },
  { key: "india",           label: "India",           airports: ["DEL", "BOM", "BLR", "MAA", "CCU", "HYD", "AMD", "COK"] },
  { key: "sri_lanka",       label: "Sri Lanka",       airports: ["CMB"] },
  { key: "nepal",           label: "Nepal",           airports: ["KTM"] },
  { key: "bangladesh",      label: "Bangladesh",      airports: ["DAC", "CGP"] },

  // Oceania
  { key: "oceania",         label: "Oceania",         airports: ["SYD", "MEL", "BNE", "PER", "AKL", "CHC", "WLG"] },
  { key: "australia",       label: "Australia",       airports: ["SYD", "MEL", "BNE", "PER", "ADL", "CBR", "OOL", "HBA"] },
  { key: "new_zealand",     label: "New Zealand",     airports: ["AKL", "CHC", "WLG", "ZQN", "DUD"] },
];

export function searchRegions(query: string): Region[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return REGIONS.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 8);
}
