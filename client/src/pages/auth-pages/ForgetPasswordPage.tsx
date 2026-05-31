import { useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
import { emailRegex } from "../../regax.global";
const ForgetPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
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
  const onSendEmail = async () => {
    if (!email) return;
  };
  return (
    <div className="w-screen min-h-screen bg-[#F3F4F5] flex items-center justify-center">
      <div className="w-[20rem] max-sm:w-[95%] flex items-center justify-center flex-col gap-4 bg-white p-3 rounded-xl border-1 border-gray-300">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <img src="/star.png" className="w-13" />
          <h2 className="font-bold font-poppins text-xl">Check Identity!</h2>
          <p className="font-poppins font-[300] text-[10px]">
            Please Enter your email to check your identity
          </p>
        </div>
        <AuthInput
          onChange={validateEmail}
          type="email"
          icon="/email.png"
          isPassword={false}
          placeholder="Enter your email address"
          label="Email"
          error={errorEmail}
          value={email}
        />
        <AuthButton
          title="Send Link"
          isLoading={false}
          onClick={onSendEmail}
        />
      </div>
    </div>
  );
};
export default ForgetPasswordPage;