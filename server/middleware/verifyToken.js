import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
export const verifyToken = async (request, response, next) => {
  try {
    const token = request.cookies.token;
    if (!token) {
      return response.status(401).json({
        success: false,
        message: 'Unauthorized - No token provided',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return response.status(401).json({
        success: false,
        message: 'Unauthorized - User not found',
      });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid token',
    });
  }
};