import { AnyZodObject, ZodError } from "zod/v3";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
type RequestSource = "body" | "params" | "query";
export const validate = (schema: AnyZodObject, source: RequestSource = "body") => (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log(req[source]);
        schema.parse(req[source]);
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
            return next(
                new ApiError(
                    400,
                    error.issues[0]?.message
                )
            )
        }else{
            return next(
                new ApiError(
                    500,
                    'something went wrong with vaildate middleware'
                )
            )
        }
        next(error)
    }
}