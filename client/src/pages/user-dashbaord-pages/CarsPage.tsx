import { useEffect, useRef, useState } from "react";
import api from "../../utils/api.utils";
import { Spinner } from "../../components/ui/spinner";
import { motion } from "framer-motion";
import { Fuel, Users, MapPin, Settings } from "lucide-react";
type Car = {
  _id: string;
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  fuel: string;
  capacity: number;
  location: string;
  description: string;
  transmission: string;
  available: boolean;
  quantity: number;
};
const CarsPage = () => {
  const endpoint = "/car";
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchCars = async (pageNumber: number, searchValue: string) => {
    setLoading(true);
    try {
      const res = await api(
        `${endpoint}/get-cars?page=${pageNumber}&limit=10&search=${searchValue}`,
      );
      const newCars = res.data.cars;
      if (pageNumber === 1) {
        setCars(newCars);
      } else {
        setCars((prev) => [...prev, ...newCars]);
      }
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCars([]);
    setPage(1);
  }, [search]);
  useEffect(() => {
    const delay = setTimeout(
      () => {
        fetchCars(page, search);
      },
      search ? 500 : 0,
    );
    return () => clearTimeout(delay);
  }, [page, search]);
  const lastCarRef = (node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };
  return (
    <div className="p-3">
      <input
        type="text"
        className="w-[90%] bg-white px-3 py-2 border border-gray-300 rounded-3xl text-xs outline-none"
        placeholder="Search for car..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && cars.length === 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-2xl p-4 bg-white animate-pulse"
            >
              <div className="h-52 bg-gray-200 rounded-lg"></div>
              <div className="mt-4 h-8 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between mt-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded"></div>
                <div className="h-5 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-4 h-12 bg-gray-200 rounded"></div>
              <div className="mt-5 border-t pt-4">
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 font-poppins grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => {
            const isLast = cars.length === index + 1;
            return (
              <motion.div
                key={car._id}
                ref={isLast ? lastCarRef : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                className="border border-gray-300 rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs">
                    {car.year}
                  </div>
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    loading="lazy"
                    className="w-full h-52 object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold">
                    {car.brand} {car.model}
                  </h3>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {car.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      car.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {car.available
                      ? `${car.quantity} Available`
                      : "Not Available"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
                  <div className="flex items-center gap-2">
                    <Fuel size={16} className="text-green-600" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-green-600" />
                    <span>{car.capacity} Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings size={16} className="text-green-600" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-green-600" />
                    <span>{car.location}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                  {car.description}
                </p>
                <div className="mt-5 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${car.price}
                    </span>
                  </div>
                  <button className="w-full mt-4 h-10 rounded-lg border border-green-600 font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                    Rent Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      {loading && cars.length > 0 && (
        <div className="w-full flex items-center justify-center py-6">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default CarsPage;