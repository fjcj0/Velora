import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth-pages/LoginPage";
import RegisterPage from "./pages/auth-pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import PageNotFound from "./tools/PageNotFound";
import ForgetPasswordPage from "./pages/auth-pages/ForgetPasswordPage";
import CodePage from "./pages/auth-pages/CodePage";
import ResetPasswordPage from "./pages/auth-pages/ResetPasswordPage";
import { useEffect } from "react";
import { protectServer } from "./utils/protection.utils";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/user-dashbaord-pages/DashboardPage";
import CarsPage from "./pages/user-dashbaord-pages/CarsPage";
import CarPage from "./pages/user-dashbaord-pages/CarPage";
import AiPage from "./pages/user-dashbaord-pages/AiPage";
import BookingsPage from "./pages/user-dashbaord-pages/BookingsPage";
import ProfilePage from "./pages/user-dashbaord-pages/ProfilePage";
function App() {
  useEffect(() => {
    const init = async () => {
      await protectServer();
    };
    init();
  }, []);
  return (
    <>
      <Routes>
        {/*Authntication Pages*/}
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/check-code/:verificationToken" element={<CodePage />} />
        <Route
          path="/reset-password/:resetPasswordToken"
          element={<ResetPasswordPage />}
        />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<PageNotFound />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/*Authntication Pages*/}
        {/*Dashboard Pages*/}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/car/:id" element={<CarPage />} />
          <Route path="/bookings" element={<BookingsPage/>} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>
        {/*Dashboard Pages*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default App;