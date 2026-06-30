import { AnyZodObject, ZodError } from "zod/v3";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction)=> {
    try{
        req.body = schema.parse(req.body)
        next()
    }catch(error){
        if(error instanceof ZodError){
            return next(
                new ApiError(
                    400,
                    error.issues[0]?.message
                )
            )
        }
        next(error)
    }
}