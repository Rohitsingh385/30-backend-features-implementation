import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod/v3";
import { ApiError } from "../utils/ApiError.js";

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            req.body = parsed.body
            req.query = parsed.query
            req.params = parsed.params
            return next()
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "fail",
                    errors: error.flatten().fieldErrors.body
                });
            } else {
                throw new ApiError(
                    400,
                    error
                )
            }
        }
    }
}