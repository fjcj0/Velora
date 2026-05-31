import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth-pages/LoginPage";
import RegisterPage from "./pages/auth-pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import PageNotFound from "./tools/PageNotFound";
import ForgetPasswordPage from "./pages/auth-pages/ForgetPasswordPage";
import CodePage from "./pages/auth-pages/CodePage";
import ResetPasswordPage from "./pages/auth-pages/ResetPasswordPage";
import { useEffect, type ReactNode } from "react";
import { protectServer } from "./utils/protection.utils";
import DashboardLayout from "./layouts/DashboardLayout";
import CarsPage from "./pages/user-dashbaord-pages/CarsPage";
import CarPage from "./pages/user-dashbaord-pages/CarPage";
import AiPage from "./pages/user-dashbaord-pages/AiPage";
import BookingsPage from "./pages/user-dashbaord-pages/BookingsPage";
import ProfilePage from "./pages/user-dashbaord-pages/ProfilePage";
import { Toaster } from 'sonner';
import useUserStore from "./store/auth.store";
import SplashScreen from "./tools/SplashScreen";
function App() {
  const { checkAuth, isCheckingAuth,user } = useUserStore();
  const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
    if (isCheckingAuth) {
      return <SplashScreen />;
    }
    if (!user) {
      return <Navigate to="/auth/login" replace />;
    }
    if (user && !user.isVerified) { 
       return <Navigate to="/auth/login" replace />;
    }
    return <>{children}</>;
  };
  const RedirectAuthnticatedUser = ({ children }: { children: ReactNode }) => {
    if (isCheckingAuth) {
      return <SplashScreen />;
    }
    if (user && user.isVerified) {
      return <Navigate to="/cars" replace />;
    }
    return <>{children}</>;
  };
  useEffect(() => {
    const init = async () => {
      await protectServer();
      await checkAuth(); 
    };
    init();
  }, [checkAuth]);
  return (
    <>
       <Toaster/>
      <Routes>
        {/*Authntication Pages*/}
        <Route path="/forget-password" element={
          <RedirectAuthnticatedUser>
            <ForgetPasswordPage />
          </RedirectAuthnticatedUser>
        }
        />
        <Route path="/check-code/:verificationToken" element={
          <RedirectAuthnticatedUser>
            <CodePage />
          </RedirectAuthnticatedUser>
            } />
        <Route
          path="/reset-password/:resetPasswordToken"
          element={
            <RedirectAuthnticatedUser>
              <ResetPasswordPage />
            </RedirectAuthnticatedUser>
          }
        />
        <Route path="/auth" element={
          <RedirectAuthnticatedUser>
            <AuthLayout />
          </RedirectAuthnticatedUser>
          }>
          <Route index element={
            <PageNotFound />} />
          <Route path="login" element={
            <RedirectAuthnticatedUser>
              <LoginPage />
            </RedirectAuthnticatedUser>
            } />
          <Route path="register" element={
            <RedirectAuthnticatedUser>
              <RegisterPage />
            </RedirectAuthnticatedUser>
          } />
        </Route>
        {/*Authntication Pages*/}
        {/*Dashboard Pages*/}
        <Route path="/" element={
          <ProtectedUserRoute>
            <DashboardLayout />
          </ProtectedUserRoute>
          }>
          <Route index element={
            <ProtectedUserRoute>
              <PageNotFound />
            </ProtectedUserRoute>
          } />
          <Route path="/cars" element={
            <ProtectedUserRoute>
              <CarsPage />
            </ProtectedUserRoute>
          } />
          <Route path="/car/:id" element={
            <ProtectedUserRoute>
              <CarPage />
            </ProtectedUserRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedUserRoute>
              <BookingsPage />
            </ProtectedUserRoute>
          } />
          <Route path="/ai" element={
            <ProtectedUserRoute>
              <AiPage />
            </ProtectedUserRoute>
            } />
          <Route path="/profile" element={
            <ProtectedUserRoute>
              <ProfilePage />
            </ProtectedUserRoute>
            } />
        </Route>
        {/*Dashboard Pages*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default App;