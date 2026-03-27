import { useState } from "react";

const AuthInput = ({
    label,
    placeholder,
    icon,
    type,
    isPassword,
}: {
    label: string,
    placeholder: string,
    icon: string,
    type: string,
    isPassword: boolean;
}) => {
    const [isOpenEye, setIsOpenEye] = useState(false);

    const inputType = isPassword
        ? (isOpenEye ? "text" : "password")
        : type;

    return (
        <div className="w-full relative flex flex-col gap-1">
            <label className="text-xs text-[#4B4C53] font-poppins">
                {label}
            </label>

            <div className="relative w-full">
                {/* Icon */}
                <img
                    src={
                        isPassword
                            ? (isOpenEye
                                ? "/open-eye.png"
                                : "/close-eye.png")
                            : icon
                    }
                    alt="icon"
                    onClick={() => isPassword && setIsOpenEye(prev => !prev)}
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer ${
                        isPassword ? "right-4" : "left-4"
                    }`}
                />

                {/* Input */}
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full rounded-lg py-2 border border-[#E4E5E7]
                        placeholder:text-sm placeholder:font-300
                        focus:placeholder:text-black focus:border-black outline-none
                        ${isPassword ? "pr-12 pl-5" : "pl-12 pr-5"}
                    `}
                />
            </div>
        </div>
    );
};

export default AuthInput;