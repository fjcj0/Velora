import { ArrowRight } from "lucide-react";
import React from "react";
const Message: React.FC<MessageType> = ({
  type,
  message,
  markdowns,
  profilePic,
}) => {
  const isAI = type === "ai";
  return (
    <div
      className={`flex font-poppins ${
        isAI ? "justify-start" : "justify-end"
      } w-full`}
    >
      {isAI && profilePic && (
        <img
          src={profilePic}
          alt="AI"
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}
      <div className="flex flex-col gap-3 max-w-[70%]">
        <div
          className={`rounded-lg p-3 text-sm ${
            isAI ? " text-white" : "bg-blue-500 text-white"
          }`}
        >
          {message}
        </div>
        {
          markdowns &&
          markdowns.length > 0 &&
          markdowns.map((car, idx) => (
            <div
              key={idx}
              className="p-3 bg-black text-white rounded-2xl overflow-hidden"
            >
              <img
                src={car.image}
                alt={car.model}
                className=" object-contain w-[20rem] ml-3 rounded-lg"
              />
                  <h1 className="text-lg p-3 font-[50]">
                {car.brand} {car.model} ({car.year})
              </h1>
                <div className="w-full p-3 text-xs text-white mt-5 flex flex-col gap-1 font-[100]">
               <div className="flex items-center justify-between">
                <p>Price: ${car.price}</p>
                <p>Category: {car.category}</p>
                </div>
                <p>
                  Fuel: {car.fuel} | Transmission: {car.transmission}
                </p>
                <p>Location: {car.location}</p>
                <p className="mt-1">
                  {car.description}
                </p>
                <div className="mt-4">
                  <button type="button" className="font-[300] px-7 py-3 border-1 broder-white text-white hover:bg-white hover:text-black duration-300 ease transition-all flex items-center justify-center gap-x-1">
                    Borrow
                    <ArrowRight size={13}/>
                   </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Message;