import {
  LayoutDashboardIcon,
  CarIcon,
  CalendarIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
export const dashboardLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/",
  },
  {
    name: "Cars",
    icon: CarIcon,
    path: "/cars",
  },
  {
    name: "Bookings",
    icon: CalendarIcon,
    path: "/bookings",
  },
  {
    name: "AI",
    icon: SparklesIcon,
    path: "/ai",
  },
  {
    name: "Profile",
    icon: UserIcon,
    path: "/profile",
  },
];
export const carsDetails: {
  brand: string;
  description: string;
  image: string;
  logo: string;
  location: [number, number];
}[] = [
  {
    brand: "Ford Mustang EGT",
    description: "4591 cc, 8 Cylinders In V Shape 4 Valves/Cylinder DOHC",
    image: "/cars/car1.png",
    logo: "/logos/logo1.png",
    location: [37.7749, -122.4194],
  },
  {
    brand: "Chevrolet Camaro ZL1",
    description: "6162 cc, 8 Cylinders V Shape 4 Valves/Cylinder DOHC",
    image: "/cars/car2.png",
    logo: "/logos/logo2.png",
    location: [34.0522, -118.2437],
  },
  {
    brand: "Dodge Challenger SRT",
    description: "6166 cc, 8 Cylinders V Shape 4 Valves/Cylinder DOHC",
    image: "/cars/car3.png",
    logo: "/logos/logo3.png",
    location: [40.7128, -74.006],
  },
  {
    brand: "BMW M4 Competition",
    description: "2993 cc, 6 Cylinders In Line 4 Valves/Cylinder DOHC",
    image: "/cars/car4.png",
    logo: "/logos/logo4.png",
    location: [51.5074, -0.1278],
  },
];
export const messages = [
  {
    type: "user",
    message: "What cars do you have?",
  },
  {
    type: "ai",
    message: "Here are some great options for you Which one do you like?",
    markdowns: [
      {
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        price: 19000,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        location: "Nablus",
        description: "Reliable, fuel-efficient, and perfect for daily driving",
      },
      {
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
        brand: "Hyundai",
        model: "Tucson",
        year: 2023,
        price: 27000,
        category: "SUV",
        fuel: "Petrol",
        transmission: "Automatic",
        location: "Ramallah",
        description: "Spacious SUV with modern features and great comfort",
      },
    ],
  },
  {
    type: "user",
    message: "I prefer something affordable",
  },
  {
    type: "ai",
    message:
      "Got it I recommend this budget-friendly option. Would you like to book it?",
    markdowns: [
      {
        image:
          "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        price: 19000,
        category: "Sedan",
        fuel: "Petrol",
        transmission: "Automatic",
        location: "Nablus",
        description: "Great value for money with excellent fuel efficiency",
      },
    ],
  },
];
