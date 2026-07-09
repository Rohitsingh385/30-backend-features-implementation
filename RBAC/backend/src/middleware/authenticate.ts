import type { NextFunction } from "express";
import type { JwtPayload } from "../types/auth.js";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken"
import { User } from "../modules/auth/auth.model.js";
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }
       
        const token = authHeader.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }
       
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload
       
        const user = await User.findById(payload._id)
        // console.log(user)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication"
            })
        }
       
        req.user = {
            id: user._id.toString(),
            role: user.role
        }
        
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}