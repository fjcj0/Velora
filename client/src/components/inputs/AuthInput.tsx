import { useState } from "react";
interface AuthInputProps {
    label: string;
    placeholder: string;
    icon: string;
    type: string;
    isPassword: boolean;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}
const AuthInput = ({
    label,
    placeholder,
    icon,
    type,
    isPassword,
    value,
    onChange,
    error,
}: AuthInputProps) => {
    const [isOpenEye, setIsOpenEye] = useState(false);
    const inputType = isPassword
        ? isOpenEye
            ? "text"
            : "password"
        : type;
    return (
        <div className="w-full flex flex-col gap-1">
            <label className="text-xs text-[#4B4C53] font-poppins">
                {label}
            </label>
            <div className="relative w-full">
                <img
                    src={
                        isPassword
                            ? isOpenEye
                                ? "/open-eye.png"
                                : "/close-eye.png"
                            : icon
                    }
                    alt="icon"
                    onClick={() =>
                        isPassword && setIsOpenEye((prev) => !prev)
                    }
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer  transition-all ease duration-500 ${
                        isPassword ? "right-4" : "left-4"
                    }`}
                />
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-lg py-2 border
                        ${
                            error
                                ? "border-red-500"
                                : "border-[#E4E5E7]"
                        }
                        placeholder:text-sm placeholder:font-300
                        focus:placeholder:text-black outline-none
                        ${isPassword ? "pr-12 pl-5" : "pl-12 pr-5"}
                     transition-all ease duration-500`}
                />
            </div>
            {error && (
                <span className="text-red-500 text-xs  transition-all ease duration-500">
                    {error}
                </span>
            )}
        </div>
    );
};
export default AuthInput;