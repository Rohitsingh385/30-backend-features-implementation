import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction)=> {
    if(err instanceof ApiError) {
        console.log(err)
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })
    }
    return res.status(500).json({
        success: false,
        message: "Internal server Error"
    })
}