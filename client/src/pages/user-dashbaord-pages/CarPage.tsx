import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api.utils";
import axios from "axios";
import { toast } from 'sonner';
import Spinner from "../../tools/Spinner";
type Car = {
  _id: string;
  image: string;
  public_id: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
};
const CarPage = () => {
 const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [days, setDays] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [car, setCar] = useState<Car | null>(null);
  const endpoint = "/car";
    const { id } = useParams<{ id: string }>();
const borrow = async () => {
  if (!car || !id) return;

  try {
    setBookingLoading(true);

    const response = await api.post(`/book/create-booking-car`, {
      carId: id,
      total: car.price * days,
      numberOfDay: days,
    });

    toast.success(response.data.message || "Booking created successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } else {
      toast.error("Unexpected error");
    }
  } finally {
    setBookingLoading(false);
  }
};
  useEffect(() => {
    const get_car = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`${endpoint}/get-car/${id}`);
        setCar(response.data.car);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (id) get_car();
  }, [id]);
  if (isLoading) {
    return <Spinner />;
  }
  if (!car) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-5xl font-bold font-poppins">
          404 Page not found
        </h1>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-4xl mx-auto font-poppins">
      <h1 className="text-3xl font-bold mb-6">Car Details</h1>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-72 object-cover"
        />
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold">
            {car.brand} {car.model}
          </h2>
          <p><span className="font-semibold">Year:</span> {car.year}</p>
          <p><span className="font-semibold">Price:</span> ${car.price}</p>
          <p><span className="font-semibold">Category:</span> {car.category}</p>
          <p><span className="font-semibold">Fuel:</span> {car.fuel}</p>
          <p><span className="font-semibold">Transmission:</span> {car.transmission}</p>
          <p><span className="font-semibold">Capacity:</span> {car.capacity}</p>
          <p><span className="font-semibold">Location:</span> {car.location}</p>
          <p className="text-gray-600 mt-4">{car.description}</p>
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-white ${
                car.available ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {car.available ? "Available" : "Not Available"}
            </span>
                  </div>
        <div className="mt-6 flex items-center gap-4">
  <span className="font-semibold">Rental Days:</span>

  <div className="flex items-center gap-3">
    <button
      onClick={() => setDays((prev) => (prev > 1 ? prev - 1 : 1))}
      className="bg-gray-300 px-3 py-1 rounded-md text-xl"
    >
      -
    </button>
    <span className="text-lg font-bold">{days}</span>
    <button
      onClick={() => setDays((prev) => prev + 1)}
      className="bg-gray-300 px-3 py-1 rounded-md text-xl"
    >
      +
    </button>
  </div>
</div>
        <button
  onClick={borrow}
  disabled={bookingLoading}
  className="bg-green-600 p-3 text-white rounded-md mt-4 disabled:opacity-50"
>
  {bookingLoading ? "Booking..." : `Book for ${days} days`}
</button>
        </div>
          </div>
    </div>
  );
};
export default CarPage;