import { useState } from "react";
import Message from "../../components/messages/Message";
import { messages } from "../../constants/data";
import SpinnerAi from "../../components/spinners/SpinnerAi";
const AiPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-y-4 p-4">
      <div className="w-full flex flex-col flex-1 min-h-0 overflow-y-auto gap-y-24">
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            type={msg.type as 'ai' || 'user'}
            message={msg.message}
            markdowns={msg.markdowns}
            profilePic={msg.type === "ai" ? "/logo.jpg" : undefined}
          />
        ))}
        {
          isLoading &&
          <div className="flex items-center justify-start gap-x-1">
              <img src="/logo.jpg" className="w-8 h-8 rounded-full" alt="" />
              <SpinnerAi/>
          </div>
        }
      </div>
      <div className="w-full mt-2">
  
      </div>
    </div>
  );
};
export default AiPage;