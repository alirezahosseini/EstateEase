export interface Property {
  id: string;
  title: string;
  location: string;
  address: string;
  price: number;
  period: "month" | "year" | "day";
  rating: number;
  reviews: number;
  type: "Home" | "Apartment" | "Villa" | "Condo" | "Bungalow";
  placeType: "single-family" | "condo" | "apartment" | "bungalow";
  beds: number;
  baths: number;
  rooms: number;
  kitchens: number;
  garage: number;
  area: number; // sqft
  amenities: string[];
  description: string;
  images: string[];
  coordinates: { lat: number; lng: number };
  agent: {
    name: string;
    phone: string;
    avatar: string;
  };
}

export interface FilterState {
  locations: string[];
  priceRange: "under-1000" | "1000-15000" | "over-15000" | "custom" | null;
  customMin: number;
  customMax: number;
  areaMin: string;
  areaMax: string;
  placeTypes: string[];
  amenities: string[];
}

export type Page =
  | "buy"
  | "rent"
  | "favorites"
  | "help"
  | "services"
  | "blog"
  | "property";
