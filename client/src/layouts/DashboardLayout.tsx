import { Outlet } from "react-router-dom";
import Slider from "../components/sliders/Slider";
const DashboardLayout = () => {
    return (
   <div className="w-screen h-screen flex">
           <Slider/>
   <div className="flex-1 flex flex-col min-h-0 bg-[#F6F7FB]">
  <div className="flex-1 min-h-0 mt-2">
    <Outlet />
  </div>
</div>
        </div>
    );
}
export default DashboardLayout;