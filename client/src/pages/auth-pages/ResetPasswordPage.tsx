import { useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
import { passwordRegex } from "../../regax.global";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
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
  const onChangePassword = async () => {
    if (!passwordRegex.test(password)) return;
  };
  return (
    <div className="w-screen min-h-screen bg-[#F3F4F5] flex items-center justify-center">
      <div className="w-[20rem] max-sm:w-[95%] flex items-center justify-center flex-col gap-4 bg-white p-3 rounded-xl border-1 border-gray-300">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <img src="/star.png" className="w-13" />
          <h2 className="font-bold font-poppins text-xl">
            Recover Your Account!
          </h2>
          <p className="font-poppins font-[300] text-[10px]">
            Please Enter your new password
          </p>
        </div>
        <AuthInput
          onChange={validatePassword}
          type="password"
          icon=""
          isPassword={true}
          placeholder="Enter your new password"
          label="New Password"
          error={errorPassword}
          value={password}
        />
        <AuthButton
          title="Confirm"
          isLoading={false}
          onClick={onChangePassword}
        />
      </div>
    </div>
  );
};
export default ResetPasswordPage;