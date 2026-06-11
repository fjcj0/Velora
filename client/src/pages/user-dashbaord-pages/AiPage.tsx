import { useState, useRef, useEffect } from "react";
import Message from "../../components/messages/Message";

import { ArrowUp } from "lucide-react";
import api from "../../utils/api.utils";
import SpinnerAi from "../../tools/SpinnerAi";

const AiPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const currentMessage = value;
    setMessages((prev) => [
      ...prev,
      { type: "user", message: currentMessage, markdowns: [] },
    ]);
    setValue("");
    setIsLoading(true);
    try {
      const response = await api.post("/ask-ai", {
        type: "user",
        message: currentMessage,
      });
      const data = response?.data?.result;
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          message: data?.message || data.result || "No response",
          markdowns: data?.markdowns || [],
        },
      ]);
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
    <div className="w-full h-full relative">
      <div className="w-full h-full p-5 overflow-y-auto flex flex-col pb-20 gap-y-14">
        {
          messages.length === 0
          &&
          <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-black text-[40px] md:text-[55px] font-poppins font-bold">Hey how can i help you?</h1>
          </div>
        }
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
          <div className="flex items-start justify-start gap-x-3 w-full">
                <img
          src={'logo.jpg'}
          alt="AI"
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
            <SpinnerAi/>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <div className="relative md:w-[50%] w-[90%] py-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="ask anything"
            className="w-full pl-5 pr-14 py-4 bg-white backdrop-blur-xs rounded-4xl outline-none border-1 border-gray-300 text-black font-[200] resize-none overflow-y-auto max-h-[200px]"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className={`right-3 bottom-6.5 absolute flex rounded-full items-center justify-center w-10 h-10 transition ${
              isLoading
                ? "bg-black/70"
                : "bg-black hover:bg-black/70"
            }`}
          >
            <ArrowUp size={20} color="white"/>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AiPage;