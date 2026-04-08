import { getUserPrompt,getAdminPrompt } from "../prompts/ai.prompt.js";
export const AskAi = async (request, response) => {
    try {
        const { message, type } = request.body;
    } catch (error) {
        return response.status(500).json({
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
};