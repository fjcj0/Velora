import { useState } from "react";
const Input = ({
    placeholder,
    onChange,
    value,
    type,
    isDisabled = false
}: {
    placeholder: string,
    onChange: (value: any) => void,
    value: any,
    type: string,
    isDisabled?: boolean
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative">
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isDisabled}
                className={`w-full px-4 pt-5 pb-2 font-nunito text-sm text-black  focus:text-blue-500 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-200 peer`}
            />
            <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${isFocused || value
                    ? "top-1.5 text-[10px] text-blue-500 font-medium"
                    : "top-[0.8rem] text-sm text-gray-500"
                    }`}
            >
                {placeholder}
            </label>
        </div>
    );
}
export default Input;