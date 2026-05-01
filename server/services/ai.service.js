import Groq from "groq-sdk";
export async function completion_ai(systemPrompt, message) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const response = await groq.chat.completions.create({
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
      model: "openai/gpt-oss-20b",
    });
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : error}`
    );
  }
}