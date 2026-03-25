import jwt from 'jsonwebtoken';
export const generateTokenAndSetCookie = async (response, user) => {
    try {
        const { password, ...userData } = user._doc;
        const token = jwt.sign({ user: userData }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};