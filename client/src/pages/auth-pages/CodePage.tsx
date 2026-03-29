import { useEffect, useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import InputCode from "../../components/inputs/InputCode";
const CodePage = () => {
  const [timer, setTimer] = useState(60);
  const handleCodeChange = (code: string) => {
    console.log("Code:", code);
  };
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const handleResend = () => {
    console.log("Resend code");
    setTimer(60);
  };
  return (
    <div className="w-screen min-h-screen bg-[#F3F4F5] flex items-center justify-center">
      <div className="w-[25rem] max-sm:w-[95%] flex items-center justify-center flex-col gap-4 bg-white p-3 rounded-xl border-1 border-gray-300">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <img src="/star.png" className="w-13" />
          <h2 className="font-bold font-poppins text-xl">
            Verify Your Account!
          </h2>
          <p className="font-poppins font-[300] text-[10px]">
            Please enter the code sent to your email
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 flex-row">
          <InputCode length={6} onChange={handleCodeChange} />
        </div>
        <AuthButton
          title="Confirm"
          isLoading={false}
          onClick={async () => console.log("Hello")}
        />
        <div className="w-full font-poppins text-[12px] font-[300] flex items-center justify-between">
          <button
            type="button"
            onClick={handleResend}
            disabled={timer !== 0}
          >
            Resend Code
          </button>
          <div>
            {timer > 0 && <span>00:{timer.toString().padStart(2, "0")}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodePage;