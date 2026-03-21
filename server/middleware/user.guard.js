import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
export const verifyUser = async (request, response, next) => {
    try {
        const token = request.cookies?.token; 
        if (!token) {
            return response.status(401).json({
                success: false,
                error: '401 Unauthorized user'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const existingUser = await User.findById(decoded.id);
        if (!existingUser) {
            return response.status(401).json({
                success: false,
                error: '401 Unauthorized user'
            });
        }
        request.user = {
            ...existingUser,
            password: undefined
        };
        next(); 
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
};