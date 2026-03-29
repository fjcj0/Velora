import AuthButton from "../../components/buttons/AuthButton";
import AuthInput from "../../components/inputs/AuthInput";
const ForgetPasswordPage = () => {
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
          type="email"
          icon="/email.png"
          isPassword={false}
          placeholder="Enter your email address"
          label="Email"
        />
        <AuthButton
          title="Send Link"
          isLoading={false}
          onClick={async () => console.log("Hello")}
        />
      </div>
    </div>
  );
};
export default ForgetPasswordPage;