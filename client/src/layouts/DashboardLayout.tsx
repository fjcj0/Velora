import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/headers/DashboardHeader";
import Slider from "../components/sliders/Slider";
const DashboardLayout = () => {
    return (
        <div className="w-screen h-screen flex">
           <Slider/>
           <div className="flex-1 transition-all duration-300 ease bg-[#020711] overflow-y-auto">
           <DashboardHeader />
           <hr className="border-none h-[0.1px] opacity-30 bg-[#969696] w-full" />
                <div className="p-4 mt-2 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default DashboardLayout;