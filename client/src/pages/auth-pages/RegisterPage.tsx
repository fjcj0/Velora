import { useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
import { emailRegex, nameRegex, passwordRegex, usernameRegex } from "../../regax.global";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] =
    useState("");
  const [
    errorConfirmationPassword,
    setErrorConfirmationPassword,
  ] = useState("");
  const validateUsername = (value: string) => {
    setUsername(value);
    if (!value) {
      setErrorUsername("Username is required");
      return;
    }
    if (!usernameRegex.test(value)) {
      setErrorUsername(
        "Username must start with a letter and contain at least 4 characters"
      );
    } else {
      setErrorUsername("");
    }
  };
  const validateName = (value: string) => {
    setName(value);
    if (!value.trim()) {
      setErrorName("Name is required");
      return;
    }
    if (!nameRegex.test(value.trim())) {
      setErrorName(
        "Name must contain valid Arabic or English words (minimum 3 letters per word)"
      );
    } else {
      setErrorName("");
    }
  };
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
    if (
      confirmationPassword &&
      value !== confirmationPassword
    ) {
      setErrorConfirmationPassword(
        "Passwords do not match"
      );
    } else {
      setErrorConfirmationPassword("");
    }
  };
  const validateConfirmPassword = (
    value: string
  ) => {
    setConfirmationPassword(value);
    if (!value) {
      setErrorConfirmationPassword(
        "Please confirm your password"
      );
      return;
    }
    if (value !== password) {
      setErrorConfirmationPassword(
        "Passwords do not match"
      );
    } else {
      setErrorConfirmationPassword("");
    }
  };
  const isFormValid =
    usernameRegex.test(username) &&
    nameRegex.test(name.trim()) &&
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    password === confirmationPassword;
  const handleRegister = async () => {
    if (!isFormValid) return;
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <AuthInput
        icon="/username.png"
        label="Username"
        placeholder="Enter username please"
        type="text"
        isPassword={false}
        value={username}
        onChange={validateUsername}
        error={errorUsername}
      />
      <AuthInput
        icon="/name.png"
        label="Name"
        placeholder="Enter name please"
        type="text"
        isPassword={false}
        value={name}
        onChange={validateName}
        error={errorName}
      />
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
        placeholder="Enter password please"
        type="password"
        isPassword={true}
        value={password}
        onChange={validatePassword}
        error={errorPassword}
      />
      <AuthInput
        icon=""
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        isPassword={true}
        value={confirmationPassword}
        onChange={validateConfirmPassword}
        error={errorConfirmationPassword}
      />
      <AuthButton
        onClick={handleRegister}
        title="Create an account"
        isLoading={false}
      />
    </div>
  );
};
export default RegisterPage;