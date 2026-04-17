export type Airport = {
  iata: string;
  name: string;
  city: string;
  country: string;
};

export const AIRPORTS: Airport[] = [
  // North America
  { iata: "JFK", name: "John F. Kennedy International", city: "New York", country: "US" },
  { iata: "LGA", name: "LaGuardia", city: "New York", country: "US" },
  { iata: "EWR", name: "Newark Liberty International", city: "Newark / New York", country: "US" },
  { iata: "BOS", name: "Logan International", city: "Boston", country: "US" },
  { iata: "PHL", name: "Philadelphia International", city: "Philadelphia", country: "US" },
  { iata: "DCA", name: "Ronald Reagan Washington National", city: "Washington D.C.", country: "US" },
  { iata: "IAD", name: "Dulles International", city: "Washington D.C.", country: "US" },
  { iata: "BWI", name: "Baltimore/Washington International", city: "Baltimore", country: "US" },
  { iata: "ATL", name: "Hartsfield-Jackson Atlanta International", city: "Atlanta", country: "US" },
  { iata: "MIA", name: "Miami International", city: "Miami", country: "US" },
  { iata: "FLL", name: "Fort Lauderdale-Hollywood International", city: "Fort Lauderdale", country: "US" },
  { iata: "MCO", name: "Orlando International", city: "Orlando", country: "US" },
  { iata: "TPA", name: "Tampa International", city: "Tampa", country: "US" },
  { iata: "CLT", name: "Charlotte Douglas International", city: "Charlotte", country: "US" },
  { iata: "RDU", name: "Raleigh-Durham International", city: "Raleigh", country: "US" },
  { iata: "ORD", name: "O'Hare International", city: "Chicago", country: "US" },
  { iata: "MDW", name: "Midway International", city: "Chicago", country: "US" },
  { iata: "DTW", name: "Detroit Metropolitan Wayne County", city: "Detroit", country: "US" },
  { iata: "MSP", name: "Minneapolis-Saint Paul International", city: "Minneapolis", country: "US" },
  { iata: "STL", name: "St. Louis Lambert International", city: "St. Louis", country: "US" },
  { iata: "CLE", name: "Cleveland Hopkins International", city: "Cleveland", country: "US" },
  { iata: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "US" },
  { iata: "SFO", name: "San Francisco International", city: "San Francisco", country: "US" },
  { iata: "SJC", name: "San José Mineta International", city: "San Jose", country: "US" },
  { iata: "OAK", name: "Oakland International", city: "Oakland", country: "US" },
  { iata: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "US" },
  { iata: "PDX", name: "Portland International", city: "Portland", country: "US" },
  { iata: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "US" },
  { iata: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "US" },
  { iata: "DAL", name: "Dallas Love Field", city: "Dallas", country: "US" },
  { iata: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "US" },
  { iata: "HOU", name: "William P. Hobby", city: "Houston", country: "US" },
  { iata: "PHX", name: "Phoenix Sky Harbor International", city: "Phoenix", country: "US" },
  { iata: "DEN", name: "Denver International", city: "Denver", country: "US" },
  { iata: "SLC", name: "Salt Lake City International", city: "Salt Lake City", country: "US" },
  { iata: "SAN", name: "San Diego International", city: "San Diego", country: "US" },
  { iata: "HNL", name: "Daniel K. Inouye International", city: "Honolulu", country: "US" },
  { iata: "ANC", name: "Ted Stevens Anchorage International", city: "Anchorage", country: "US" },
  { iata: "MSY", name: "Louis Armstrong New Orleans International", city: "New Orleans", country: "US" },
  { iata: "MCI", name: "Kansas City International", city: "Kansas City", country: "US" },
  { iata: "PIT", name: "Pittsburgh International", city: "Pittsburgh", country: "US" },
  { iata: "BNA", name: "Nashville International", city: "Nashville", country: "US" },
  { iata: "AUS", name: "Austin-Bergstrom International", city: "Austin", country: "US" },
  { iata: "SAT", name: "San Antonio International", city: "San Antonio", country: "US" },
  { iata: "MEM", name: "Memphis International", city: "Memphis", country: "US" },
  { iata: "BDL", name: "Bradley International", city: "Hartford", country: "US" },
  { iata: "PVD", name: "T.F. Green International", city: "Providence", country: "US" },
  { iata: "BUF", name: "Buffalo Niagara International", city: "Buffalo", country: "US" },
  { iata: "ABQ", name: "Albuquerque International Sunport", city: "Albuquerque", country: "US" },
  { iata: "OMA", name: "Eppley Airfield", city: "Omaha", country: "US" },
  { iata: "IND", name: "Indianapolis International", city: "Indianapolis", country: "US" },
  { iata: "CMH", name: "John Glenn Columbus International", city: "Columbus", country: "US" },
  { iata: "RSW", name: "Southwest Florida International", city: "Fort Myers", country: "US" },
  { iata: "JAX", name: "Jacksonville International", city: "Jacksonville", country: "US" },
  { iata: "RIC", name: "Richmond International", city: "Richmond", country: "US" },
  { iata: "BHM", name: "Birmingham-Shuttlesworth International", city: "Birmingham", country: "US" },
  { iata: "GRR", name: "Gerald R. Ford International", city: "Grand Rapids", country: "US" },
  { iata: "OKC", name: "Will Rogers World Airport", city: "Oklahoma City", country: "US" },
  { iata: "TUL", name: "Tulsa International", city: "Tulsa", country: "US" },
  { iata: "LIT", name: "Bill and Hillary Clinton National", city: "Little Rock", country: "US" },
  { iata: "CHS", name: "Charleston International", city: "Charleston", country: "US" },
  { iata: "SAV", name: "Savannah/Hilton Head International", city: "Savannah", country: "US" },
  { iata: "SRQ", name: "Sarasota-Bradenton International", city: "Sarasota", country: "US" },
  { iata: "ELP", name: "El Paso International", city: "El Paso", country: "US" },
  { iata: "BOI", name: "Boise Airport", city: "Boise", country: "US" },
  { iata: "GEG", name: "Spokane International", city: "Spokane", country: "US" },
  { iata: "FAT", name: "Fresno Yosemite International", city: "Fresno", country: "US" },
  { iata: "SMF", name: "Sacramento International", city: "Sacramento", country: "US" },
  { iata: "SNA", name: "John Wayne Airport", city: "Orange County", country: "US" },
  { iata: "BUR", name: "Hollywood Burbank Airport", city: "Burbank", country: "US" },
  { iata: "LGB", name: "Long Beach Airport", city: "Long Beach", country: "US" },
  { iata: "ONT", name: "Ontario International", city: "Ontario", country: "US" },
  { iata: "PSP", name: "Palm Springs International", city: "Palm Springs", country: "US" },
  { iata: "RNO", name: "Reno-Tahoe International", city: "Reno", country: "US" },
  { iata: "TUS", name: "Tucson International", city: "Tucson", country: "US" },

  // Canada
  { iata: "YYZ", name: "Toronto Pearson International", city: "Toronto", country: "Canada" },
  { iata: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
  { iata: "YUL", name: "Montréal-Pierre Elliott Trudeau International", city: "Montreal", country: "Canada" },
  { iata: "YYC", name: "Calgary International", city: "Calgary", country: "Canada" },
  { iata: "YEG", name: "Edmonton International", city: "Edmonton", country: "Canada" },
  { iata: "YOW", name: "Ottawa Macdonald-Cartier International", city: "Ottawa", country: "Canada" },
  { iata: "YHZ", name: "Halifax Stanfield International", city: "Halifax", country: "Canada" },
  { iata: "YWG", name: "Winnipeg James Armstrong Richardson International", city: "Winnipeg", country: "Canada" },

  // Mexico & Caribbean
  { iata: "MEX", name: "Benito Juárez International", city: "Mexico City", country: "Mexico" },
  { iata: "CUN", name: "Cancún International", city: "Cancun", country: "Mexico" },
  { iata: "GDL", name: "Miguel Hidalgo y Costilla International", city: "Guadalajara", country: "Mexico" },
  { iata: "MTY", name: "General Mariano Escobedo International", city: "Monterrey", country: "Mexico" },
  { iata: "SJD", name: "Los Cabos International", city: "Los Cabos", country: "Mexico" },
  { iata: "PVR", name: "Licenciado Gustavo Díaz Ordaz International", city: "Puerto Vallarta", country: "Mexico" },
  { iata: "MBJ", name: "Sangster International", city: "Montego Bay", country: "Jamaica" },
  { iata: "KIN", name: "Norman Manley International", city: "Kingston", country: "Jamaica" },
  { iata: "NAS", name: "Lynden Pindling International", city: "Nassau", country: "Bahamas" },
  { iata: "PUJ", name: "Punta Cana International", city: "Punta Cana", country: "Dominican Republic" },
  { iata: "SDQ", name: "Las Américas International", city: "Santo Domingo", country: "Dominican Republic" },
  { iata: "SJU", name: "Luis Muñoz Marín International", city: "San Juan", country: "Puerto Rico" },
  { iata: "BGI", name: "Grantley Adams International", city: "Bridgetown", country: "Barbados" },
  { iata: "GCM", name: "Owen Roberts International", city: "Grand Cayman", country: "Cayman Islands" },

  // Central America
  { iata: "PTY", name: "Tocumen International", city: "Panama City", country: "Panama" },
  { iata: "SJO", name: "Juan Santamaría International", city: "San Jose", country: "Costa Rica" },
  { iata: "SAL", name: "Monseñor Óscar Arnulfo Romero International", city: "San Salvador", country: "El Salvador" },
  { iata: "GUA", name: "La Aurora International", city: "Guatemala City", country: "Guatemala" },

  // South America
  { iata: "GRU", name: "São Paulo/Guarulhos International", city: "São Paulo", country: "Brazil" },
  { iata: "GIG", name: "Rio de Janeiro/Galeão International", city: "Rio de Janeiro", country: "Brazil" },
  { iata: "BSB", name: "Presidente Juscelino Kubitschek International", city: "Brasilia", country: "Brazil" },
  { iata: "EZE", name: "Ministro Pistarini International", city: "Buenos Aires", country: "Argentina" },
  { iata: "AEP", name: "Jorge Newbery Airpark", city: "Buenos Aires", country: "Argentina" },
  { iata: "BOG", name: "El Dorado International", city: "Bogotá", country: "Colombia" },
  { iata: "MDE", name: "José María Córdova International", city: "Medellín", country: "Colombia" },
  { iata: "LIM", name: "Jorge Chávez International", city: "Lima", country: "Peru" },
  { iata: "SCL", name: "Arturo Merino Benítez International", city: "Santiago", country: "Chile" },
  { iata: "UIO", name: "Mariscal Sucre International", city: "Quito", country: "Ecuador" },
  { iata: "GYE", name: "José Joaquín de Olmedo International", city: "Guayaquil", country: "Ecuador" },
  { iata: "CCS", name: "Simón Bolívar International", city: "Caracas", country: "Venezuela" },
  { iata: "MVD", name: "Carrasco International", city: "Montevideo", country: "Uruguay" },
  { iata: "ASU", name: "Silvio Pettirossi International", city: "Asunción", country: "Paraguay" },
  { iata: "CUZ", name: "Alejandro Velasco Astete International", city: "Cusco", country: "Peru" },

  // UK & Ireland
  { iata: "LHR", name: "Heathrow", city: "London", country: "UK" },
  { iata: "LGW", name: "Gatwick", city: "London", country: "UK" },
  { iata: "STN", name: "Stansted", city: "London", country: "UK" },
  { iata: "LTN", name: "Luton", city: "London", country: "UK" },
  { iata: "LCY", name: "City Airport", city: "London", country: "UK" },
  { iata: "MAN", name: "Manchester Airport", city: "Manchester", country: "UK" },
  { iata: "EDI", name: "Edinburgh Airport", city: "Edinburgh", country: "UK" },
  { iata: "GLA", name: "Glasgow Airport", city: "Glasgow", country: "UK" },
  { iata: "BHX", name: "Birmingham Airport", city: "Birmingham", country: "UK" },
  { iata: "BRS", name: "Bristol Airport", city: "Bristol", country: "UK" },
  { iata: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
  { iata: "ORK", name: "Cork Airport", city: "Cork", country: "Ireland" },
  { iata: "SNN", name: "Shannon Airport", city: "Shannon", country: "Ireland" },

  // Western Europe
  { iata: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { iata: "ORY", name: "Paris Orly", city: "Paris", country: "France" },
  { iata: "NCE", name: "Nice Côte d'Azur", city: "Nice", country: "France" },
  { iata: "LYS", name: "Saint-Exupéry", city: "Lyon", country: "France" },
  { iata: "MRS", name: "Marseille Provence", city: "Marseille", country: "France" },
  { iata: "BOD", name: "Bordeaux-Mérignac", city: "Bordeaux", country: "France" },
  { iata: "TLS", name: "Toulouse-Blagnac", city: "Toulouse", country: "France" },
  { iata: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { iata: "EIN", name: "Eindhoven Airport", city: "Eindhoven", country: "Netherlands" },
  { iata: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { iata: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  { iata: "BER", name: "Berlin Brandenburg", city: "Berlin", country: "Germany" },
  { iata: "DUS", name: "Düsseldorf Airport", city: "Düsseldorf", country: "Germany" },
  { iata: "HAM", name: "Hamburg Airport", city: "Hamburg", country: "Germany" },
  { iata: "STR", name: "Stuttgart Airport", city: "Stuttgart", country: "Germany" },
  { iata: "CGN", name: "Cologne Bonn Airport", city: "Cologne", country: "Germany" },
  { iata: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madrid", country: "Spain" },
  { iata: "BCN", name: "Barcelona-El Prat", city: "Barcelona", country: "Spain" },
  { iata: "AGP", name: "Málaga Airport", city: "Málaga", country: "Spain" },
  { iata: "PMI", name: "Palma de Mallorca Airport", city: "Palma", country: "Spain" },
  { iata: "VLC", name: "Valencia Airport", city: "Valencia", country: "Spain" },
  { iata: "SVQ", name: "Seville Airport", city: "Seville", country: "Spain" },
  { iata: "FCO", name: "Leonardo da Vinci–Fiumicino", city: "Rome", country: "Italy" },
  { iata: "MXP", name: "Milan Malpensa", city: "Milan", country: "Italy" },
  { iata: "LIN", name: "Milan Linate", city: "Milan", country: "Italy" },
  { iata: "VCE", name: "Venice Marco Polo", city: "Venice", country: "Italy" },
  { iata: "NAP", name: "Naples International", city: "Naples", country: "Italy" },
  { iata: "CTA", name: "Catania-Fontanarossa", city: "Catania", country: "Italy" },
  { iata: "BLQ", name: "Bologna Guglielmo Marconi", city: "Bologna", country: "Italy" },
  { iata: "FLR", name: "Florence Airport", city: "Florence", country: "Italy" },
  { iata: "LIS", name: "Humberto Delgado Airport", city: "Lisbon", country: "Portugal" },
  { iata: "OPO", name: "Francisco de Sá Carneiro Airport", city: "Porto", country: "Portugal" },
  { iata: "FAO", name: "Faro Airport", city: "Faro", country: "Portugal" },
  { iata: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  { iata: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland" },
  { iata: "VIE", name: "Vienna International", city: "Vienna", country: "Austria" },
  { iata: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },
  { iata: "ATH", name: "Athens International", city: "Athens", country: "Greece" },
  { iata: "HER", name: "Heraklion International", city: "Heraklion", country: "Greece" },
  { iata: "SKG", name: "Thessaloniki Airport", city: "Thessaloniki", country: "Greece" },
  { iata: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { iata: "SAW", name: "Sabiha Gökçen International", city: "Istanbul", country: "Turkey" },
  { iata: "AYT", name: "Antalya Airport", city: "Antalya", country: "Turkey" },
  { iata: "ESB", name: "Esenboğa International", city: "Ankara", country: "Turkey" },
  { iata: "ADB", name: "Adnan Menderes Airport", city: "Izmir", country: "Turkey" },

  // Northern Europe
  { iata: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark" },
  { iata: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden" },
  { iata: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway" },
  { iata: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland" },
  { iata: "GOT", name: "Gothenburg Landvetter", city: "Gothenburg", country: "Sweden" },
  { iata: "BGO", name: "Bergen Airport Flesland", city: "Bergen", country: "Norway" },
  { iata: "RVK", name: "Rørvik Airport", city: "Rørvik", country: "Norway" },
  { iata: "KEF", name: "Keflavík International", city: "Reykjavik", country: "Iceland" },

  // Eastern Europe
  { iata: "WAW", name: "Warsaw Chopin Airport", city: "Warsaw", country: "Poland" },
  { iata: "KRK", name: "John Paul II International", city: "Krakow", country: "Poland" },
  { iata: "PRG", name: "Václav Havel Airport", city: "Prague", country: "Czech Republic" },
  { iata: "BUD", name: "Budapest Ferenc Liszt International", city: "Budapest", country: "Hungary" },
  { iata: "OTP", name: "Henri Coandă International", city: "Bucharest", country: "Romania" },
  { iata: "SOF", name: "Sofia Airport", city: "Sofia", country: "Bulgaria" },
  { iata: "KBP", name: "Boryspil International", city: "Kyiv", country: "Ukraine" },
  { iata: "SVO", name: "Sheremetyevo International", city: "Moscow", country: "Russia" },
  { iata: "LED", name: "Pulkovo Airport", city: "St. Petersburg", country: "Russia" },
  { iata: "VNO", name: "Vilnius Airport", city: "Vilnius", country: "Lithuania" },
  { iata: "RIX", name: "Riga International", city: "Riga", country: "Latvia" },
  { iata: "TLL", name: "Lennart Meri Tallinn Airport", city: "Tallinn", country: "Estonia" },
  { iata: "ZAG", name: "Zagreb Airport", city: "Zagreb", country: "Croatia" },
  { iata: "DBV", name: "Dubrovnik Airport", city: "Dubrovnik", country: "Croatia" },
  { iata: "LJU", name: "Ljubljana Jože Pučnik Airport", city: "Ljubljana", country: "Slovenia" },
  { iata: "BEG", name: "Belgrade Nikola Tesla Airport", city: "Belgrade", country: "Serbia" },
  { iata: "SKP", name: "Skopje International", city: "Skopje", country: "North Macedonia" },

  // Middle East
  { iata: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { iata: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "UAE" },
  { iata: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { iata: "AMM", name: "Queen Alia International", city: "Amman", country: "Jordan" },
  { iata: "BEY", name: "Rafic Hariri International", city: "Beirut", country: "Lebanon" },
  { iata: "TLV", name: "Ben Gurion International", city: "Tel Aviv", country: "Israel" },
  { iata: "KWI", name: "Kuwait International", city: "Kuwait City", country: "Kuwait" },
  { iata: "BAH", name: "Bahrain International", city: "Manama", country: "Bahrain" },
  { iata: "MCT", name: "Muscat International", city: "Muscat", country: "Oman" },
  { iata: "RUH", name: "King Khalid International", city: "Riyadh", country: "Saudi Arabia" },
  { iata: "JED", name: "King Abdulaziz International", city: "Jeddah", country: "Saudi Arabia" },
  { iata: "BGW", name: "Baghdad International", city: "Baghdad", country: "Iraq" },
  { iata: "IKA", name: "Imam Khomeini International", city: "Tehran", country: "Iran" },

  // Africa
  { iata: "CAI", name: "Cairo International", city: "Cairo", country: "Egypt" },
  { iata: "HRG", name: "Hurghada International", city: "Hurghada", country: "Egypt" },
  { iata: "SSH", name: "Sharm el-Sheikh International", city: "Sharm el-Sheikh", country: "Egypt" },
  { iata: "CMN", name: "Mohammed V International", city: "Casablanca", country: "Morocco" },
  { iata: "RAK", name: "Marrakesh Menara Airport", city: "Marrakesh", country: "Morocco" },
  { iata: "TNG", name: "Ibn Battouta Airport", city: "Tangier", country: "Morocco" },
  { iata: "JNB", name: "O.R. Tambo International", city: "Johannesburg", country: "South Africa" },
  { iata: "CPT", name: "Cape Town International", city: "Cape Town", country: "South Africa" },
  { iata: "DUR", name: "King Shaka International", city: "Durban", country: "South Africa" },
  { iata: "NBO", name: "Jomo Kenyatta International", city: "Nairobi", country: "Kenya" },
  { iata: "ADD", name: "Addis Ababa Bole International", city: "Addis Ababa", country: "Ethiopia" },
  { iata: "LOS", name: "Murtala Muhammed International", city: "Lagos", country: "Nigeria" },
  { iata: "ABV", name: "Nnamdi Azikiwe International", city: "Abuja", country: "Nigeria" },
  { iata: "ACC", name: "Kotoka International", city: "Accra", country: "Ghana" },
  { iata: "DKR", name: "Blaise Diagne International", city: "Dakar", country: "Senegal" },
  { iata: "DAR", name: "Julius Nyerere International", city: "Dar es Salaam", country: "Tanzania" },
  { iata: "EBB", name: "Entebbe International", city: "Entebbe", country: "Uganda" },
  { iata: "KGL", name: "Kigali International", city: "Kigali", country: "Rwanda" },
  { iata: "TNR", name: "Ivato International", city: "Antananarivo", country: "Madagascar" },
  { iata: "MRU", name: "Sir Seewoosagur Ramgoolam International", city: "Mauritius", country: "Mauritius" },

  // South & Southeast Asia
  { iata: "DEL", name: "Indira Gandhi International", city: "Delhi", country: "India" },
  { iata: "BOM", name: "Chhatrapati Shivaji Maharaj International", city: "Mumbai", country: "India" },
  { iata: "BLR", name: "Kempegowda International", city: "Bangalore", country: "India" },
  { iata: "MAA", name: "Chennai International", city: "Chennai", country: "India" },
  { iata: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata", country: "India" },
  { iata: "HYD", name: "Rajiv Gandhi International", city: "Hyderabad", country: "India" },
  { iata: "AMD", name: "Sardar Vallabhbhai Patel International", city: "Ahmedabad", country: "India" },
  { iata: "GOI", name: "Goa International", city: "Goa", country: "India" },
  { iata: "CMB", name: "Bandaranaike International", city: "Colombo", country: "Sri Lanka" },
  { iata: "KTM", name: "Tribhuvan International", city: "Kathmandu", country: "Nepal" },
  { iata: "DAC", name: "Hazrat Shahjalal International", city: "Dhaka", country: "Bangladesh" },
  { iata: "KHI", name: "Jinnah International", city: "Karachi", country: "Pakistan" },
  { iata: "LHE", name: "Allama Iqbal International", city: "Lahore", country: "Pakistan" },
  { iata: "ISB", name: "Islamabad International", city: "Islamabad", country: "Pakistan" },
  { iata: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
  { iata: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { iata: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { iata: "DMK", name: "Don Mueang International", city: "Bangkok", country: "Thailand" },
  { iata: "HKT", name: "Phuket International", city: "Phuket", country: "Thailand" },
  { iata: "CNX", name: "Chiang Mai International", city: "Chiang Mai", country: "Thailand" },
  { iata: "CGK", name: "Soekarno-Hatta International", city: "Jakarta", country: "Indonesia" },
  { iata: "DPS", name: "Ngurah Rai International", city: "Bali", country: "Indonesia" },
  { iata: "MNL", name: "Ninoy Aquino International", city: "Manila", country: "Philippines" },
  { iata: "CEB", name: "Mactan-Cebu International", city: "Cebu", country: "Philippines" },
  { iata: "SGN", name: "Tan Son Nhat International", city: "Ho Chi Minh City", country: "Vietnam" },
  { iata: "HAN", name: "Noi Bai International", city: "Hanoi", country: "Vietnam" },
  { iata: "DAD", name: "Da Nang International", city: "Da Nang", country: "Vietnam" },
  { iata: "RGN", name: "Yangon International", city: "Yangon", country: "Myanmar" },
  { iata: "PNH", name: "Phnom Penh International", city: "Phnom Penh", country: "Cambodia" },
  { iata: "REP", name: "Siem Reap International", city: "Siem Reap", country: "Cambodia" },
  { iata: "VTE", name: "Wattay International", city: "Vientiane", country: "Laos" },

  // East Asia
  { iata: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { iata: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
  { iata: "KIX", name: "Kansai International", city: "Osaka", country: "Japan" },
  { iata: "ITM", name: "Osaka Itami", city: "Osaka", country: "Japan" },
  { iata: "NGO", name: "Chubu Centrair International", city: "Nagoya", country: "Japan" },
  { iata: "CTS", name: "New Chitose Airport", city: "Sapporo", country: "Japan" },
  { iata: "FUK", name: "Fukuoka Airport", city: "Fukuoka", country: "Japan" },
  { iata: "OKA", name: "Naha Airport", city: "Okinawa", country: "Japan" },
  { iata: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { iata: "GMP", name: "Gimpo International", city: "Seoul", country: "South Korea" },
  { iata: "PUS", name: "Gimhae International", city: "Busan", country: "South Korea" },
  { iata: "PEK", name: "Beijing Capital International", city: "Beijing", country: "China" },
  { iata: "PKX", name: "Beijing Daxing International", city: "Beijing", country: "China" },
  { iata: "PVG", name: "Shanghai Pudong International", city: "Shanghai", country: "China" },
  { iata: "SHA", name: "Shanghai Hongqiao International", city: "Shanghai", country: "China" },
  { iata: "CAN", name: "Guangzhou Baiyun International", city: "Guangzhou", country: "China" },
  { iata: "SZX", name: "Shenzhen Bao'an International", city: "Shenzhen", country: "China" },
  { iata: "CTU", name: "Chengdu Tianfu International", city: "Chengdu", country: "China" },
  { iata: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "Hong Kong" },
  { iata: "TPE", name: "Taiwan Taoyuan International", city: "Taipei", country: "Taiwan" },
  { iata: "KHH", name: "Kaohsiung International", city: "Kaohsiung", country: "Taiwan" },
  { iata: "MFM", name: "Macau International", city: "Macau", country: "Macau" },
  { iata: "ULN", name: "Chinggis Khaan International", city: "Ulaanbaatar", country: "Mongolia" },

  // Oceania
  { iata: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { iata: "MEL", name: "Melbourne Airport", city: "Melbourne", country: "Australia" },
  { iata: "BNE", name: "Brisbane Airport", city: "Brisbane", country: "Australia" },
  { iata: "PER", name: "Perth Airport", city: "Perth", country: "Australia" },
  { iata: "ADL", name: "Adelaide Airport", city: "Adelaide", country: "Australia" },
  { iata: "CBR", name: "Canberra Airport", city: "Canberra", country: "Australia" },
  { iata: "OOL", name: "Gold Coast Airport", city: "Gold Coast", country: "Australia" },
  { iata: "CNS", name: "Cairns Airport", city: "Cairns", country: "Australia" },
  { iata: "AKL", name: "Auckland Airport", city: "Auckland", country: "New Zealand" },
  { iata: "CHC", name: "Christchurch Airport", city: "Christchurch", country: "New Zealand" },
  { iata: "WLG", name: "Wellington Airport", city: "Wellington", country: "New Zealand" },
  { iata: "ZQN", name: "Queenstown Airport", city: "Queenstown", country: "New Zealand" },
  { iata: "NAN", name: "Nadi International", city: "Nadi", country: "Fiji" },
  { iata: "PPT", name: "Faa'a International", city: "Papeete", country: "French Polynesia" },
];

export type CityResult = {
  key: string;
  label: string;
  country: string;
  airports: string[];
};

export function searchCities(query: string): CityResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 1) return [];

  const cityMap = new Map<string, CityResult>();
  for (const a of AIRPORTS) {
    if (a.city.toLowerCase().includes(q)) {
      const key = `${a.city}__${a.country}`;
      if (!cityMap.has(key)) {
        cityMap.set(key, { key, label: a.city, country: a.country, airports: [] });
      }
      cityMap.get(key)!.airports.push(a.iata);
    }
  }

  return Array.from(cityMap.values()).slice(0, 6);
}

export type CountryResult = {
  key: string;
  label: string;
  airports: string[];
};

export function searchCountries(query: string): CountryResult[] {
  const q = query.toLowerCase().trim();
  if (q.length < 1) return [];

  const countryMap = new Map<string, CountryResult>();
  for (const a of AIRPORTS) {
    if (a.country.toLowerCase().includes(q)) {
      const key = `country__${a.country}`;
      if (!countryMap.has(key)) {
        countryMap.set(key, { key, label: a.country, airports: [] });
      }
      countryMap.get(key)!.airports.push(a.iata);
    }
  }

  return Array.from(countryMap.values()).slice(0, 6);
}

export function searchAirports(query: string): Airport[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.iata.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, 8);
}

export function findAirportByIata(iata: string): Airport | null {
  return AIRPORTS.find((a) => a.iata === iata.toUpperCase()) ?? null;
}

export function searchAirportsByCodeOrName(query: string): Airport[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  return AIRPORTS.filter(
    (a) =>
      a.iata.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, 5);
}

function cityTokens(city: string): string[] {
  return city.split("/").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

export function getNearbyAirports(airport: Airport): Airport[] {
  const tokens = cityTokens(airport.city);
  return AIRPORTS.filter(
    (a) =>
      a.iata !== airport.iata &&
      cityTokens(a.city).some((t) => tokens.includes(t))
  );
}
