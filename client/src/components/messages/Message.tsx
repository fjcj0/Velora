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
          className={`w-8 h-8 rounded-full self-end ${markdowns &&
          markdowns.length > 0 ? 'mr-3' : ''}`}
        />
      )}
      <div className="flex flex-col gap-5 max-w-[70%]">
        <div
          className={`rounded-lg p-3 text-sm ${
            isAI ? "text-white" : "bg-[#6E62E4] text-white"
          }`}
        >
          <div
            className={`flex w-full max-md:items-start items-center justify-start gap-x-1.5 ${
              isAI ? "text-black/70" : ""
            } `}
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
              className="bg-black w-[22rem] p-3 text-white rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-center">
              <img
                src={car.image}
                alt={car.model}
                className="w-[20rem] object-cover rounded-t-2xl"
                />
                            </div>
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
                <div className="mt-4">
                  <Link
                    to={`/car/${car.id}`}
                    className="font-[300] cursor-pointer px-7 py-3 border border-white text-white hover:bg-white hover:text-black flex items-center justify-center gap-x-1 rounded-lg"
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