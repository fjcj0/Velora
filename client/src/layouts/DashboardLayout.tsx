import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
    return (
        <div className="w-screen h-screen flex bg-[#020711]">
            <div className="w-[3.5rem] h-full bg-[#212121]">
              
            </div>
            <div className="flex-1 p-5">
                <div className="">

                </div>
                <div className="mt-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default DashboardLayout;