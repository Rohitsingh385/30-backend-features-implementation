import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

import { JWT_SECRET } from "./user.controller.js";

declare global {
    namespace Express {
        interface Request {
            id?: any
        }
    }
}
export const authMiddleware = (req : Request,res: Response , next: NextFunction)=> {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "No token provided"
        })
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        console.log(decoded.id)
        req.id = decoded.id;
        next()
    }catch(error){
        res.status(401).json({
            message: 'invalid token'
        })
    }
}