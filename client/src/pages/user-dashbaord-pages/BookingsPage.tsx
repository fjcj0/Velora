import { useEffect, useState } from "react";
import api from "../../utils/api.utils";
import Spinner from "../../tools/Spinner";
type Car = {
    _id: string;
    image: string;
    brand: string;
    model: string;
};
type Booking = {
    _id: string;
    carId: Car;
    startedAt: string;
    endAt: string;
    total: number;
    status: "Pending" | "Approved" | "Rejected" | string;
};
type BookingsResponse = {
    user_bookings: Booking[];
};
const BookingsPage = () => {
    const endpoint = "/book";
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    useEffect(() => {
        const getBookings = async () => {
            setIsLoading(true);
            try {
                const response = await api.get<BookingsResponse>(
                    `${endpoint}/user-bookings`
                );
                setBookings(response.data.user_bookings);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getBookings();
    }, []);
    if (isLoading) return <Spinner />;
    return (
        <div className="p-4 font-nunito">
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            <div className="flex flex-col gap-3">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={booking.carId.image}
                                    className="w-12 rounded-full object-contain"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold">
                                        {booking.carId.brand} {booking.carId.model} 
                                    </h1>
                                    <p className="text-xs text-black/50">
                                        {new Date(booking.startedAt).toLocaleDateString()} →{" "}
                                        {new Date(booking.endAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div>
                                {booking.status === "Pending" ? (
                                    <div className="flex flex-col items-center justify-center gap-y-3">
                                        <button className="w-[8rem] py-3 cursor-pointer border-1 rounded-xl hover:bg-black hover:border-black hover:text-white duration-300 border-gray-300">Pay Online</button>
                                         <button className="w-[8rem] py-3 cursor-pointer border-1 rounded-xl hover:bg-black hover:border-black hover:text-white duration-300 border-gray-300">Cancel</button>
                                    </div>
                                ) : booking.status === "Approved" ? (
                                    <span className="px-3 py-1 rounded-3xl text-xs bg-green-400/20 text-green-600">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-3xl text-xs bg-red-400/20 text-red-600">
                                        Rejected
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black/50">
                        No bookings found
                    </p>
                )}
            </div>
        </div>
    );
};
export default BookingsPage;