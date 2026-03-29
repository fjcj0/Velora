import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth-pages/LoginPage';
import RegisterPage from './pages/auth-pages/RegisterPage';
import AuthLayout from './layouts/AuthLayout';
import PageNotFound from './tools/PageNotFound';
import ForgetPasswordPage from './pages/auth-pages/ForgetPasswordPage';
import CodePage from './pages/auth-pages/CodePage';
import ResetPasswordPage from './pages/auth-pages/ResetPasswordPage';
function App() {
  return (
    <>
      <Routes>
        {/*Authntication Pages*/}
        <Route path='/forget-password' element={<ForgetPasswordPage />} />
        <Route path='/check-code/:verificationToken' element={<CodePage />} />
        <Route path='/reset-password/:resetPasswordToken' element={<ResetPasswordPage />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<PageNotFound/>} />
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
        </Route>
        {/*Authntication Pages*/}
        <Route path='*' element={
         <PageNotFound/>
        } />
      </Routes>
    </>
  );
}
export default App;