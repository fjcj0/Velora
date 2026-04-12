import xss from "xss";
import { getUserPrompt, getAdminPrompt } from "../prompts/ai.prompt.js";
import { completion_ai } from "../services/ai.service.js";
export const AskAi = async (request, response) => {
  try {
    let { message, type } = request.body;
    message = xss(message);
    type = xss(type);
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
    let parsedResult;
try {
  parsedResult = JSON.parse(result);
} catch (error) {
  parsedResult = result;
}
    return response.status(200).json({
      success: true,
      result: parsedResult,
    });
  } catch (error) {
    return response.status(500).json({
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};