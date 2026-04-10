import { dashboardLinks } from "../../constants/data";
import useSlideStore from "../../store/dashboard.store";
import DashboardLink from "../links/DashboardLink";
import { LogOut } from "lucide-react";
import {X } from 'lucide-react';
import { useLocation } from "react-router-dom"; 
const Slider = () => {
  const location = useLocation();
  const { toggleSlide,isSlideOpen } = useSlideStore();
  return (
    <div className={`w-[3.5rem] flex flex-col items-center pt-5 pb-7 justify-between max-md:fixed max-md:z-10 max-md:${isSlideOpen ? 'translate-x-0' : '-translate-x-14'} h-full bg-[#212121] transition-all duration-300 ease overflow-y-auto`}>
        <button onClick={toggleSlide} type="button" className="md:hidden cursor-pointer absolute top-3 left-1" >
           <X size={18} color="#969696"/>
        </button>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-center px-3 mt-8">
          <img src="/logo.jpg" alt="logo" className="rounded-full" />
        </div>
        <div className="w-full flex flex-col gap-y-10 items-center justify-center mt-32">
          {dashboardLinks.map((link: any, index: number) => (
            <DashboardLink
              key={index}
              path={link.path}
              icon={link.icon}
              isActive={location.pathname === link.path} 
            />
          ))}
        </div>
      </div>
      <div className="mt-10">
      <button type="button" className="cursor-pointer">
        <LogOut size={18} color="#969696" />
        </button>
      </div>
    </div>
  );
};
export default Slider;