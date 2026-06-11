import { useEffect, useRef, useState } from "react";
import api from "../../utils/api.utils";
import { Spinner } from "../../components/ui/spinner";
import { motion } from "framer-motion";
import { Fuel, DollarSign, Car, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingButton from "../../components/buttons/BookingButton";
type CarType = {
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
  const navigate = useNavigate();
  const endpoint = "/car";
  const [cars, setCars] = useState<CarType[]>([]);
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
                className="border border-gray-200 rounded-2xl p-4 bg-white relative"
              >
                <div className="flex items-center justify-center">
                  <img src={car.image} alt="" />
                </div>
                <div className="absolute top-8 right-5 text-xs px-4 py-2 bg-black rounded-sm rotate-[30deg] flex items-center justify-center flex-col">
                  <p className="text-gray-300 flex items-center justify-center gap-x-1">
                    <Fuel size={14} />
                    {car.brand}
                  </p>
                </div>
                <div className="absolute top-8 left-5 text-xs px-4 py-2 bg-black rounded-sm rotate-[-30deg] flex items-center justify-center flex-col">
                  <h1 className="font-light text-gray-300 flex items-center justify-center gap-x-1">
                    <Car size={16} />
                    {car.model}
                  </h1>
                </div>
                <div className="w-full flex items-center justify-center gap-x-3">
                  <p className="font-light flex items-center justify-center">
                    {car.price} <DollarSign size={14} />
                  </p>
                  <BookingButton
                    title="Book"
                    Icon={ArrowRight}
                    onClick={() => {
                      navigate(`/car/${car._id}`);
                    }}
                    isLoading={false}
                  />
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