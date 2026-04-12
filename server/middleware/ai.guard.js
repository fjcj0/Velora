import xss from "xss";
export const checkAiAccess = async (request, response, next) => {
    try {
        let { type } = request.body;
        type = xss(type);
        if (!request.user) {
            return response.status(401).json({ success: false, error: "401 Unauthorized user" });
        }
        if (type !== 'user' && type !== 'admin') {
            return response.status(400).json({
                error: 'Invalid type',
                success: false
            });
        }
        if ((type === 'user' && request.user.isAdmin === true) || (type === 'admin' && request.user.isAdmin === false)) {
            return response.status(403).json({
                error: 'Forbidden',
                success: false
            });
        }
        next(); 
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
};