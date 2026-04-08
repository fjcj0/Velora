import { getUserPrompt, getAdminPrompt } from "../prompts/ai.prompt.js";
import { completion_ai } from "../services/ai.service.js";
export const AskAi = async (request, response) => {
  try {
    const { message, type } = request.body;
    if (!type || !message) {
      return response.status(400).json({
        error: "All fields are required..",
        success: false,
      });
    }
    let systemPrompt;
    if (type === "user") {
      systemPrompt = await getUserPrompt();
    } else {
      systemPrompt = await getAdminPrompt();
    }
    const result = await completion_ai(systemPrompt, message);
    return response.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return response.status(500).json({
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};