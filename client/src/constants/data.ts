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
