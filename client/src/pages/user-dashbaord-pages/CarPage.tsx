import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api.utils";
import axios from "axios";
import { toast } from 'sonner';
import Spinner from "../../tools/Spinner";
import BookingButton from "../../components/buttons/BookingButton";
import { Fuel,Type,Users} from 'lucide-react';
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
    <div className="w-full h-full font-nunito">
      <div className="w-full h-full grid md:grid-cols-2 grid-cols-1">
        <div className="flex flex-col items-center justify-center w-full md:border-r-1 border-b-1 md:border-gray-300 relative">
                  <p className="bg-black absolute top-[15rem] left-5 rotate-[-30deg] text-white px-3 py-1 rounded-md">{car.price*days} $</p>
        <img src={car.image} alt="car" className="w-[30rem] rotate-[-10deg]" />
      </div>
        <div className="w-full h-full flex flex-col items-start justify-center p-3 gap-3">
          <div className="flex items-center justify-center gap-x-3">
            <h1 className="font-bold text-3xl">{car.brand} {"("}{car.model} {car.year}{")"}</h1> 
             <p className="flex items-center justify-center"><Users size={20}/>{car.capacity}</p>
                </div>
          <p className="text-xs">{car.description}, located on {car.location}</p> 
          <div className="flex items-center justify-center gap-x-3">
            <button type="button" onClick={() => { 
              if(days > 1)
              setDays(prev => prev-1);
            }}>-</button>
            <p>{days}</p>
            <button type="button"  onClick={() => { 
              setDays(prev => prev+1);
            }}>+</button>
          </div> 
          <div className="w-full flex items-center justify-between">
            <p className="flex items-center justify-center gap-x-1 px-3 py-1 bg-black text-white rounded-md"><Fuel size={20}/>{car.fuel}</p>
            <p className="flex items-center justify-center gap-x-1 px-3 py-1 bg-black text-white rounded-md"><Type size={20}/>{car.transmission}</p>
          </div>
          <p className="font-bold">Type: {car.category}</p>
          <BookingButton title="Book" isLoading={bookingLoading} onClick={borrow}/>
      </div>
      </div>
    </div>
  );
};
export default CarPage;