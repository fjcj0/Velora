import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth-pages/LoginPage';
import RegisterPage from './pages/auth-pages/RegisterPage';
import VerificationPage from './pages/auth-pages/VerificationPage';
import AuthLayout from './layouts/AuthLayout';
import PageNotFound from './tools/PageNotFound';
function App() {
  return (
    <>
      <Routes>
        {/*Authntication Pages*/}
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<PageNotFound/>} />
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='verification/:verification-token' element={<VerificationPage/>}/>
        </Route>
        <Route path='*' element={
         <PageNotFound/>
        } />
      </Routes>
    </>
  );
}
export default App;