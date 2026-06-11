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
    <div>

    </div>
  );
};
export default CarPage;