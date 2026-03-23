export const CATEGORIES = [
  { id: 'trips', name: 'Trips' },
  { id: 'events', name: 'Events' },
  { id: 'camping', name: 'Camping' },
  { id: 'heritage', name: 'Heritage' },
];

export const EVENTS = [
  {
    id: 1,
    title: "Ancient Babylon Ruins",
    location: "Babil, Iraq",
    category: "heritage",
    rating: 4.9,
    reviews: 2450,
    price: 35,
    duration: "Full Day",
    distance: "100 km from Baghdad",
    image: "https://picsum.photos/id/1015/800/600",
    description: "Explore the legendary site of Babylon, home to the Hanging Gardens and the Ishtar Gate. Walk through the same streets as ancient kings and witness the pulse of Mesopotamian history.",
    gallery: ["https://picsum.photos/id/1016/800/600", "https://picsum.photos/id/1018/800/600"],
    coordinates: { lat: 32.54, lng: 44.42 }
  },
  {
    id: 2,
    title: "Great Ziggurat of Ur",
    location: "Dhi Qar, Iraq",
    category: "heritage",
    rating: 4.8,
    reviews: 1820,
    price: 30,
    duration: "Full Day",
    distance: "350 km from Baghdad",
    image: "https://picsum.photos/id/1019/800/600",
    description: "The Great Ziggurat of Ur is a magnificent Sumerian temple from the 21st century BC. It stands as a powerful symbol of the dawn of civilization in the heart of the desert.",
    gallery: ["https://picsum.photos/id/1020/800/600"],
    coordinates: { lat: 30.96, lng: 46.10 }
  },
  {
    id: 3,
    title: "Chibayish Marsh Camping",
    location: "Marshlands, Iraq",
    category: "camping",
    rating: 4.9,
    reviews: 3100,
    price: 55,
    duration: "2 Days",
    distance: "400 km from Baghdad",
    image: "https://picsum.photos/id/1021/800/600",
    description: "Sleep under the stars in a traditional Mudhif. This camping trip takes you deep into the Mesopotamian Marshes where you'll experience boat tours and local hospitality.",
    gallery: ["https://picsum.photos/id/1022/800/600"],
    coordinates: { lat: 31.0, lng: 47.0 }
  },
  {
    id: 4,
    title: "Taq Kasra (Ctesiphon)",
    location: "Salman Pak, Iraq",
    category: "heritage",
    rating: 4.7,
    reviews: 1250,
    price: 15,
    duration: "Half Day",
    distance: "35 km from Baghdad",
    image: "https://picsum.photos/id/1031/800/600",
    description: "Witness the largest single-span brick arch built without reinforcement. Taq Kasra is the only remaining structure of the ancient Sassanid capital of Ctesiphon.",
    gallery: ["https://picsum.photos/id/1032/800/600"],
    coordinates: { lat: 33.09, lng: 44.58 }
  },
  {
    id: 5,
    title: "Rawanduz Canyon Camping",
    location: "Erbil, Iraq",
    category: "camping",
    rating: 5.0,
    reviews: 890,
    price: 75,
    duration: "3 Days",
    distance: "450 km from Baghdad",
    image: "https://picsum.photos/id/1033/800/600",
    description: "Experience the majestic mountains and canyons of Rawanduz. This camping trip includes hiking, waterfall visits, and breathtaking views of the Kurdistan region.",
    gallery: ["https://picsum.photos/id/1035/800/600"],
    coordinates: { lat: 36.6, lng: 44.5 }
  },
  {
    id: 6,
    title: "Hatra Heritage Site",
    location: "Nineveh, Iraq",
    category: "heritage",
    rating: 4.8,
    reviews: 1100,
    price: 25,
    duration: "Full Day",
    distance: "290 km from Baghdad",
    image: "https://picsum.photos/id/1036/800/600",
    description: "A UNESCO World Heritage site, Hatra was a fortified caravan city and the capital of the first Arab Kingdom. Its temples are a unique blend of Greek, Roman, and Eastern architecture.",
    gallery: ["https://picsum.photos/id/1037/800/600"],
    coordinates: { lat: 35.58, lng: 42.71 }
  },
  {
    id: 7,
    title: "Duhok Valley Camping",
    location: "Duhok, Iraq",
    category: "camping",
    rating: 4.9,
    reviews: 1400,
    price: 60,
    duration: "2 Days",
    distance: "480 km from Baghdad",
    image: "https://picsum.photos/id/1038/800/600",
    description: "Camp in the lush valleys of Duhok near fresh springs and historic caves. A perfect escape for nature lovers and those seeking peace in the Iraqi wilderness.",
    gallery: ["https://picsum.photos/id/1039/800/600"],
    coordinates: { lat: 36.8, lng: 43.0 }
  },
  {
    id: 8,
    title: "Erbil Citadel",
    location: "Erbil, Iraq",
    category: "heritage",
    rating: 4.9,
    reviews: 4200,
    price: 0,
    duration: "Half Day",
    distance: "350 km from Baghdad",
    image: "https://picsum.photos/id/1040/800/600",
    description: "Visit the oldest continuously inhabited city in the world. The Erbil Citadel sits majestically overlooking the modern city, holding secrets that span over 6,000 years.",
    gallery: ["https://picsum.photos/id/1041/800/600"],
    coordinates: { lat: 36.19, lng: 44.01 }
  }
];

export const TICKET_TYPES = [
  { id: 'standard', name: 'Standard Pass', price: 1, description: 'Standard admission to the site' },
  { id: 'guided', name: 'Guided Tour', price: 1.8, description: 'Site admission + professional guide' },
  { id: 'vip', name: 'VIP Explorer', price: 3.5, description: 'Full access + transport + lunch included' },
];


