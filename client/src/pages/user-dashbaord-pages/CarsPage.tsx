import { useEffect, useRef, useState } from "react";
import api from "../../utils/api.utils";
import { Spinner } from "../../components/ui/spinner";
import { div } from "framer-motion/client";
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
        `${endpoint}/cars?page=${pageNumber}&limit=10&search=${searchValue}`
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
    const delay = setTimeout(() => {
      fetchCars(page, search);
    }, search ? 500 : 0);
    return () => clearTimeout(delay);
  }, [page, search]);
  const lastCarRef = (node: HTMLDivElement | null) => {
    if (loading) return;
    if (!hasMore) return;
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
        placeholder="search for car.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-4 grid gap-3">
        {cars.map((car, index) => {
          const isLast = cars.length === index + 1;
          return (
            <div
              key={car._id}
              ref={isLast ? lastCarRef : null}
              className="p-3 border rounded"
            >
              <img
                src={car.image}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="font-bold">
                {car.brand} {car.model}
              </h2>
              <p>{car.price}$</p>
              <p>{car.location}</p>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="w-full flex items-center justify-center">  
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default CarsPage;