import React, { useRef } from "react";
type InputCodeProps = {
  length?: number;
  onChange?: (code: string) => void;
};
const InputCode: React.FC<InputCodeProps> = ({ length = 6, onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = inputsRef.current.map((input, i) =>
      i === index ? value : input?.value || ""
    );
    onChange?.(newCode.join(""));
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center border border-gray-300 rounded-md outline-none focus:border-black font-poppins"
        />
      ))}
    </div>
  );
};
export default InputCode;