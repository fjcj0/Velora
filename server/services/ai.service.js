import axios from "axios";
export async function completion_ai(systemPrompt, message) {
  try {
    const response = await axios.post(
      process.env.AI_URL,
      {
        model: "qwen2.5:14b",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 250,
          top_k: 30,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 60000,
      }
    );
    return response.data.message.content;
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : error}`
    );
  }
}