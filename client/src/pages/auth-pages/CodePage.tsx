import { useEffect, useState } from "react";
import AuthButton from "../../components/buttons/AuthButton";
import InputCode from "../../components/inputs/InputCode";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../store/auth.store";
import { toast } from "sonner";
import SplashScreen from "../../tools/SplashScreen";
const CodePage = () => {
  const { verificationToken } = useParams();
  const { checkPage, resendCode, checkCode } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [code, setCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  useEffect(() => {
    const checkPageVerification = async () => {
      try {
        setIsChecking(true);
        const result = await checkPage(verificationToken as string);
        if (!result || result.success === false) {
          toast.error("The token is invalid");
          navigate("/auth/login");
          return;
        }
        if (result.resendAfterSeconds > 0) {
          setTimer(result.resendAfterSeconds);
        }
      } catch (error) {
        console.log(error);
      } finally { 
        setIsChecking(false);
      }
    };
    checkPageVerification();
  }, []);
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  const handleCodeChange = (value: string) => {
    setCode(value);
  };
  const handleResend = async () => {
    await resendCode(verificationToken as string);
    setTimer(60);
  };
  if (isChecking) { 
    return <SplashScreen/>
  }
  return (
    <div className="w-screen min-h-screen bg-[#F3F4F5] flex items-center justify-center">
      <div className="w-[25rem] max-sm:w-[95%] flex flex-col gap-4 bg-white p-3 rounded-xl border border-gray-300">
        <div className="flex flex-col gap-1">
          <img src="/star.png" className="w-13" />
          <h2 className="font-bold font-poppins text-xl">
            Verify Your Account!
          </h2>
          <p className="font-poppins font-light text-[10px]">
            Please enter the code sent to your email
          </p>
        </div>
        <InputCode length={6} onChange={handleCodeChange} />
        <AuthButton
          title="Confirm"
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await checkCode(verificationToken as string, code);
            setIsLoading(false);
            setCode('');
          }}
        />
        <div className="w-full text-[12px] font-poppins font-light flex justify-between items-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={timer !== 0}
            className={timer !== 0 ? "opacity-50 cursor-not-allowed" : ""}
          >
            Resend Code
          </button>
          <div>
            {timer > 0 && (
              <span>
                00:{timer.toString().padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodePage;