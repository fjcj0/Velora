import { useState, useRef, useEffect } from "react";
import Message from "../../components/messages/Message";
import { messages as messagesData } from "../../constants/data";
import SpinnerAi from "../../components/spinners/SpinnerAi";
import { ArrowUp } from "lucide-react";
const AiPage = () => {
const [messages, setMessages] = useState<MessageType[]>(
  messagesData as MessageType[]
);  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };
  const handleSend = async () => {
    if (!value.trim()) return;
    const userMessage: MessageType = {
      type: "user",
      message: value,
      markdowns: [],
    };
    setMessages((prev) => [...prev, userMessage]);
    setValue("");
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const aiMessage: MessageType = {
        type: "ai",
        message: "This is ai response",
        markdowns: [],
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-y-4 p-4">
      <div className="w-full flex flex-col flex-1 min-h-0 overflow-y-auto gap-y-14">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            type={msg.type}
            message={msg.message}
            markdowns={msg.markdowns}
            profilePic={msg.type === "ai" ? "/logo.jpg" : undefined}
          />
        ))}
        {isLoading && (
          <div className="flex items-center justify-start gap-x-1">
            <img src="/logo.jpg" className="w-8 h-8 rounded-full" alt="" />
            <SpinnerAi />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full mt-2">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="ask anything"
            className="w-full pl-5 pr-14 py-4 bg-[#212121] rounded-4xl outline-none border-none text-white font-[200] resize-none overflow-y-auto max-h-[200px]"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading}
            className={`right-3 hover:bg-white/70 duration-300 bottom-3.5 absolute flex rounded-full items-center justify-center w-10 h-10 ${
              isLoading
                ? "bg-white/70 cursor-default"
                : "bg-white cursor-pointer"
            }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default AiPage;