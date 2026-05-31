import { dashboardLinks } from "../../constants/data";
import useSlideStore from "../../store/dashboard.store";
import DashboardLink from "../links/DashboardLink";
import { LogOut } from "lucide-react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
const Slider = () => {
  const location = useLocation();
  const { toggleSlide, isSlideOpen } = useSlideStore();
  return (
    <div
      className={`w-[13rem] flex flex-col font-poppins items-center pt-5 pb-7 justify-between h-full bg-[#FFFFFF] transition-transform duration-300 ease overflow-y-auto
  max-md:fixed max-md:z-10 max-md:transform
  ${isSlideOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
    >
      <button
        onClick={toggleSlide}
        type="button"
        className="md:hidden cursor-pointer absolute top-3 left-1"
      >
        <X size={18} color="#969696" />
      </button>
      <div className="w-full flex flex-col ">
        <div className="pl-3">
        <img src="/logo.jpg" alt="" className="w-14 rounded-full mb-10" />
          <p className="text-xs mb-5 text-gray-400 font-[300]">OVERVIEW</p>
                </div>
        <div className="w-full flex flex-col gap-y-4 items-start justify-center text-sm font-poppins ">
          {dashboardLinks.map((link: any, index: number) => (
            <DashboardLink
              key={index}
              path={link.path}
              icon={link.icon}
              isActive={location.pathname === link.path}
              title={link.title}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-start mt-10">
        <p className="text-xs mb-3 text-gray-400 font-[300] pl-3">SETTINGS</p>
        <div className=" flex items-start justify-start w-full">
          <button
            type="button"
            className="cursor-pointer w-full hover:bg-[#6E62E4]/30 text-black p-3 duration-300 transition-all ease flex items-center justify-start text-sm gap-x-1"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Slider;