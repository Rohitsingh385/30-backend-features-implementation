import { AnyZodObject, ZodError } from "zod/v3";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
type RequestSource = "body" | "params";
export const validate = (schema: AnyZodObject, source: RequestSource = "body") => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req[source]);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
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