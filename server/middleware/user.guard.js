import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
export const verifyUser = async (request, response, next) => {
    try {
        const token = request.cookies?.token || request.headers['authorization']?.split(' ')[1];
        if (!token) {
            return response.status(401).json({
                success: false,
                error: '401 Unauthorized user'
            });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return response.status(401).json({
                success: false,
                error: '401 Unauthorized user'
            });
        }
        const existingUser = await User.findById(decoded.user._id);
        if (!existingUser) {
            return response.status(401).json({
                success: false,
                error: '401 Unauthorized user'
            });
        }
        request.user = { ...existingUser._doc, password: undefined };
        next();
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
};