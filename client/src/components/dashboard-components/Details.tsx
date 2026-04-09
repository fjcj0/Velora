import { useState, useRef, useEffect } from "react";
import { carsDetails } from "../../constants/data";
import Autoplay from "embla-carousel-autoplay";
const Details = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const emblaRef = useRef<any>(null);
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  useEffect(() => {
    if (!emblaRef.current) return;
    const onSelect = () => {
      const index = emblaRef.current.selectedScrollSnap();
      setCurrentIndex(index);
      autoplay.current.reset();
    };
    emblaRef.current.on("select", onSelect);
    return () => {
      emblaRef.current.off("select", onSelect);
    };
  }, []);
  const currentCar = carsDetails[currentIndex];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-3">
      <div className="md:col-span-2 rounded-xl flex flex-col gap-4"></div>
      <div className="md:col-span-4"></div>
    </div>
  );
};
export default Details;