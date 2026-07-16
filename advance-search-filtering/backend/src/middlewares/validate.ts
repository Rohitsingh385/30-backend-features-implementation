import type { Request, Response, NextFunction } from "express";
import { type ZodType, ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            req.body = parsed.body;
            req.query = parsed.query;
            req.params = parsed.params;
            return next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: "fail",
                    errors: error
                });
            } else {
                throw new ApiError(400, error);
            }
        }
    };
};