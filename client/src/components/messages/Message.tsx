import {
  ArrowRight,
  Car,
  DollarSign,
  Type,
  MessageCircle,
  Fuel,
  Toolbox,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Message: React.FC<MessageType> = ({
  type,
  message,
  markdowns,
  profilePic,
}) => {
  const isAI = type === "ai";
  return (
    <div
      className={`w-full flex font-poppins ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      {isAI && profilePic && (
        <img
          src={profilePic}
          alt="AI"
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}
      <div className="flex flex-col gap-5 max-w-[70%]">
        <div
          className={`rounded-lg p-3 text-sm ${
            isAI ? "text-white" : "bg-blue-500 text-white"
          }`}
        >
          <div
            className={`flex w-full max-md:items-start items-center justify-start gap-x-1.5 ${
              isAI ? "text-white/70" : ""
            } hover:text-white duration-300 transition-all ease`}
          >
            {isAI && (
              <MessageCircle size={20} className="shrink-0 mt-0.5" />
            )}
            <p className="leading-snug">{message}</p>
          </div>
        </div>
        {markdowns &&
          markdowns.length > 0 &&
          markdowns.map((car, idx) => (
            <div
              key={idx}
              className="bg-black w-[22rem] md:hover:translate-x-7 duration-300 transition-all ease text-white rounded-2xl overflow-hidden"
            >
              <img
                src={car.image}
                alt={car.model}
                className="w-full h-[12rem] object-cover rounded-t-2xl"
              />
              <h1 className="text-sm p-3 mt-2 font-[400] flex items-center">
                <Car className="inline mr-1" size={18} />
                {car.brand} {car.model} ({car.year})
              </h1>
              <div className="w-full p-3 text-xs text-white flex flex-col gap-2 font-[300]">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1">
                    <DollarSign size={14} />
                    Price: ${car.price}
                  </p>
                  <p className="flex items-center gap-1">
                    <Type size={14} />
                    Category: {car.category}
                  </p>
                </div>
                <p className="flex items-center gap-1">
                  <Fuel size={14} />
                  Fuel: {car.fuel}
                </p>
                <p className="flex items-center gap-1">
                  <Toolbox size={14} />
                  Transmission: {car.transmission}
                </p>
                <p className="mt-1 text-white/80 line-clamp-3">
                  {car.description}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/car/${car.id}`}
                    className="font-[300] cursor-pointer px-7 py-3 border border-white text-white hover:bg-white hover:text-black duration-300 ease transition-all flex items-center justify-center gap-x-1 rounded-lg"
                  >
                    Borrow
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Message;