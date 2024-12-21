import { Utensils, ShoppingBag, Briefcase, Heart, Car, Home, Dumbbell, Scissors } from "lucide-react";

export type Tool = {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  pricing: "Budget" | "Moderate" | "Premium";
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  dealUrl?: string;
  visitUrl: string;
  bookmarks: number;
  // New fields for enhanced business details
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  establishedYear: number;
  specialties: string[];
  acceptedPayments: string[];
  languages: string[];
};

export const categories = [
  { name: "Restaurants & Cafes", icon: Utensils },
  { name: "Souks & Markets", icon: ShoppingBag },
  { name: "Professional Services", icon: Briefcase },
  { name: "Healthcare", icon: Heart },
  { name: "Transportation", icon: Car },
  { name: "Real Estate", icon: Home },
  { name: "Wellness & Fitness", icon: Dumbbell },
  { name: "Beauty & Spa", icon: Scissors },
];

// Sample data with enhanced details
export const tools: Tool[] = [
  {
    id: "1",
    name: "Al-Safeer Restaurant",
    logo: "https://placehold.co/60x60",
    rating: 4.5,
    reviews: 128,
    pricing: "Moderate",
    description: "Authentic Arabian cuisine featuring traditional recipes passed down through generations. Specializing in grilled meats, fresh seafood, and homemade bread.",
    tags: ["arabic", "halal", "grills"],
    category: "Restaurants & Cafes",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 37,
    address: "123 Al Wasl Road, Dubai",
    phone: "+971 4 123 4567",
    email: "info@alsafeer.com",
    workingHours: "Daily 10:00 AM - 11:00 PM",
    establishedYear: 1995,
    specialties: ["Grilled Meats", "Fresh Seafood", "Traditional Bread"],
    acceptedPayments: ["Cash", "Cards", "Digital Wallets"],
    languages: ["Arabic", "English", "Urdu"]
  },
  {
    id: "2",
    name: "Al-Madina Souk",
    logo: "https://placehold.co/60x60",
    rating: 4.8,
    reviews: 200,
    pricing: "Budget",
    description: "A vibrant market offering a variety of local goods, spices, and handicrafts. Experience the essence of Arabian culture.",
    tags: ["market", "local", "handicrafts"],
    category: "Souks & Markets",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 50,
    address: "456 Market Street, Dubai",
    phone: "+971 4 654 3210",
    email: "info@almadina.com",
    workingHours: "Daily 9:00 AM - 10:00 PM",
    establishedYear: 2010,
    specialties: ["Spices", "Handicrafts", "Local Goods"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "3",
    name: "Al-Hekma Clinic",
    logo: "https://placehold.co/60x60",
    rating: 4.6,
    reviews: 75,
    pricing: "Moderate",
    description: "Providing comprehensive healthcare services with a focus on patient care and wellness.",
    tags: ["healthcare", "clinic", "wellness"],
    category: "Healthcare",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 20,
    address: "789 Health Ave, Dubai",
    phone: "+971 4 789 1234",
    email: "info@alhekma.com",
    workingHours: "Daily 8:00 AM - 8:00 PM",
    establishedYear: 2015,
    specialties: ["General Medicine", "Pediatrics", "Dermatology"],
    acceptedPayments: ["Cash", "Cards", "Insurance"],
    languages: ["Arabic", "English"]
  },
  {
    id: "4",
    name: "Al-Farasha Spa",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 60,
    pricing: "Premium",
    description: "A luxurious spa offering a range of beauty treatments and relaxation therapies.",
    tags: ["spa", "beauty", "wellness"],
    category: "Beauty & Spa",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 15,
    address: "321 Relaxation Road, Dubai",
    phone: "+971 4 321 9876",
    email: "info@alfarasha.com",
    workingHours: "Daily 10:00 AM - 10:00 PM",
    establishedYear: 2018,
    specialties: ["Massage Therapy", "Facials", "Body Treatments"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "5",
    name: "Al-Masjid Real Estate",
    logo: "https://placehold.co/60x60",
    rating: 4.9,
    reviews: 90,
    pricing: "Moderate",
    description: "Expert real estate services for buying, selling, and renting properties in Dubai.",
    tags: ["real estate", "properties", "investment"],
    category: "Real Estate",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 30,
    address: "654 Property Lane, Dubai",
    phone: "+971 4 654 9876",
    email: "info@almasjid.com",
    workingHours: "Daily 9:00 AM - 6:00 PM",
    establishedYear: 2005,
    specialties: ["Residential", "Commercial", "Investment Properties"],
    acceptedPayments: ["Cash", "Bank Transfer"],
    languages: ["Arabic", "English"]
  },
  {
    id: "6",
    name: "Al-Mahra Transport",
    logo: "https://placehold.co/60x60",
    rating: 4.4,
    reviews: 50,
    pricing: "Budget",
    description: "Reliable transportation services for individuals and businesses across Dubai.",
    tags: ["transportation", "services", "local"],
    category: "Transportation",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 10,
    address: "987 Transport Blvd, Dubai",
    phone: "+971 4 987 6543",
    email: "info@almahra.com",
    workingHours: "Daily 24/7",
    establishedYear: 2012,
    specialties: ["Taxi Services", "Airport Transfers", "Local Tours"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "7",
    name: "Al-Mawrid Grocery",
    logo: "https://placehold.co/60x60",
    rating: 4.8,
    reviews: 120,
    pricing: "Budget",
    description: "Your local grocery store offering fresh produce, meats, and everyday essentials.",
    tags: ["grocery", "local", "fresh"],
    category: "Souks & Markets",
    featured: true,
    visitUrl: "https://example.com",
    bookmarks: 40,
    address: "135 Grocery St, Dubai",
    phone: "+971 4 135 2468",
    email: "info@almawrid.com",
    workingHours: "Daily 7:00 AM - 11:00 PM",
    establishedYear: 2010,
    specialties: ["Fresh Produce", "Meats", "Bakery"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "8",
    name: "Al-Nasr Fitness Center",
    logo: "https://placehold.co/60x60",
    rating: 4.5,
    reviews: 80,
    pricing: "Moderate",
    description: "A state-of-the-art fitness center offering a variety of classes and personal training.",
    tags: ["fitness", "gym", "health"],
    category: "Wellness & Fitness",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 25,
    address: "246 Fitness Ave, Dubai",
    phone: "+971 4 246 1357",
    email: "info@alnasr.com",
    workingHours: "Daily 6:00 AM - 10:00 PM",
    establishedYear: 2015,
    specialties: ["Personal Training", "Group Classes", "Nutrition Coaching"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "9",
    name: "Al-Farooq Bakery",
    logo: "https://placehold.co/60x60",
    rating: 4.6,
    reviews: 40,
    pricing: "Budget",
    description: "Freshly baked goods made daily with traditional recipes and local ingredients.",
    tags: ["bakery", "fresh", "local"],
    category: "Restaurants & Cafes",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 5,
    address: "159 Bakery Rd, Dubai",
    phone: "+971 4 159 7531",
    email: "info@alfarooq.com",
    workingHours: "Daily 7:00 AM - 9:00 PM",
    establishedYear: 2000,
    specialties: ["Bread", "Pastries", "Cakes"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  },
  {
    id: "10",
    name: "Al-Mansour Electronics",
    logo: "https://placehold.co/60x60",
    rating: 4.7,
    reviews: 70,
    pricing: "Moderate",
    description: "Your one-stop shop for all electronic needs, from gadgets to home appliances.",
    tags: ["electronics", "gadgets", "local"],
    category: "Souks & Markets",
    featured: false,
    visitUrl: "https://example.com",
    bookmarks: 12,
    address: "753 Electronics St, Dubai",
    phone: "+971 4 753 1598",
    email: "info@almansour.com",
    workingHours: "Daily 10:00 AM - 10:00 PM",
    establishedYear: 2018,
    specialties: ["Gadgets", "Home Appliances", "Accessories"],
    acceptedPayments: ["Cash", "Cards"],
    languages: ["Arabic", "English"]
  }
];
