import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { JwtPayload } from "../modules/auth/auth.types.js";
import { User } from "../modules/auth/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authMiddleware = asyncHandler(async(req,res,next) =>{
    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new ApiError(
            401,
            'Authentication required'
        )
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        throw new ApiError(
            401,
            'Invalid authorization header'
        )
    }
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload
    const { userId } = decoded
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(
            401,
            "user no longer exists"
        )
    }

    req.user = {
        _id: user._id.toString(),
        username: user.username,
        email: user.email
    }
    next()
    
})