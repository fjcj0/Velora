import { useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
import { emailRegex, passwordRegex } from "../../regax.global";
import useUserStore from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validateEmail = (value: string) => {
    setEmail(value);
    if (!value) {
      setErrorEmail("Email is required");
      return;
    }
    if (!emailRegex.test(value)) {
      setErrorEmail("Invalid email address");
    } else {
      setErrorEmail("");
    }
  };
  const validatePassword = (value: string) => {
    setPassword(value);
    if (!value) {
      setErrorPassword("Password is required");
      return;
    }
    if (!passwordRegex.test(value)) {
      setErrorPassword(
        "Password must contain uppercase, lowercase, number, special character and be at least 8 characters"
      );
    } else {
      setErrorPassword("");
    }
  };
  const isFormValid = emailRegex.test(email) && passwordRegex.test(password);
  const handleLogin = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (typeof (result) === 'string') {
        navigate(`/check-code/${result}`);
      }
    } catch (error) {
      console.log(error);
    } finally { 
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setErrorEmail('');
      setErrorPassword('');
    }
  };
  return (
    <div className="w-full flex items-start justify-start flex-col gap-3">
      <AuthInput
        icon="/email.png"
        label="Email"
        placeholder="Enter email address"
        type="email"
        isPassword={false}
        value={email}
        onChange={validateEmail}
        error={errorEmail}
      />
      <AuthInput
        icon=""
        label="Password"
        placeholder="Enter the password please"
        type="password"
        isPassword={true}
        value={password}
        onChange={validatePassword}
        error={errorPassword}
      />
      <AuthButton
        onClick={handleLogin}
        title="Login"
        isLoading={isLoading}
      />
    </div>
  );
};
export default LoginPage;