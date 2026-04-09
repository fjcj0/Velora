import { dashboardLinks } from "../../constants/data";
import DashboardLink from "../links/DashboardLink";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router-dom"; 
const Slider = () => {
  const location = useLocation();
  return (
    <div className="w-[3.5rem] flex flex-col items-center pt-5 pb-7 justify-between max-md:fixed max-md:-translate-x-14 h-full bg-[#212121] transition-all duration-300 ease">
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-center px-3">
          <img src="/logo.jpg" alt="logo" className="rounded-full" />
        </div>
        <div className="w-full flex flex-col gap-y-11 items-center justify-center mt-17">
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
      <button type="button">
        <LogOut size={18} color="#969696" />
      </button>
    </div>
  );
};
export default Slider;