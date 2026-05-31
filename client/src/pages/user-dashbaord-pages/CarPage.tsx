import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api.utils";
import axios from 'axios';
import Spinner from "../../tools/Spinner";
const CarPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = '/car';
    const { id } = useParams();
    const [car, setCar] = useState(null);
    useEffect(() => {
        const get_car = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`${endpoint}/get-car/${id}`);
                setCar(response.data.car);
            } catch (error) {
                if (axios.isAxiosError(error))
                    console.log(error.response?.data.error);
            } finally { 
                setIsLoading(false);
            }
        }
        get_car();
    }, [id]);
    if (isLoading) { 
        return (
          <Spinner/>  
        );
    }
    if (!car) { 
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-5xl font-bold font-poppins">404 Page not found</h1>
            </div>  
        );
    }
    return (
        <div className="p-3">
            <h1 className="text-3xl text-black font-bold font-poppins">Car Page</h1>
        </div>
    );
}
export default CarPage;