import AuthLink from "../components/links/AuthLink";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const AuthLayout = () => {
  const location = useLocation();
  if (location.pathname === '/auth') {
    return <Outlet/>
  }
  return (
    <div className="w-screen min-h-screen bg-[#F3F4F5] flex items-center justify-center p-3">
      <div className="w-[80%] grid md:grid-cols-2 grid-cols-1 bg-white border border-[#E6E8E9] rounded-3xl h-[60rem] md:h-[44rem]">
<div className="w-full h-full flex flex-col items-start justify-start">
  <img
    src="/logo.jpg"
    alt="logo"
    className="w-full h-full object-cover max-md:rounded-t-3xl md:rounded-l-3xl"
  />
</div>
        <div className="w-full flex flex-col items-center justify-center px-5 py-5 ">
          <div className="bg-[#FCFBFE] flex items-center justify-center gap-1 px-3 py-1 mb-4">
            <AuthLink
              icon={
                location.pathname === "/auth/login"
                  ? "/active-login.png"
                  : "/unactive-login.png"
              }
              title="Login"
              direction="/auth/login"
              isActive={location.pathname === "/auth/login"}
            />
            <AuthLink
              icon={
                location.pathname === "/auth/register"
                  ? "/active-register.png"
                  : "/unactive-register.png"
              }
              title="Sign Up"
              direction="/auth/register"
              isActive={location.pathname === "/auth/register"}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <Outlet />
              <div className="w-full mt-3 flex items-center justify-center flex-col gap-3">
                <div className="w-full flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-gray-300" />
                  <p className="text-gray-500 font-poppins text-sm font-[300]">
                    OR
                  </p>
                  <div className="flex-1 h-[1px] bg-gray-300" />
                </div>
                <button
                  type="button"
                  className="font-poppins font-[500] w-full flex items-center justify-center gap-1 p-3 rounded-xl border-[1px] border-gray-200"
                >
                  <img src="/google.png" alt="google icon" className="w-5" />
                  Continue with Google
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;