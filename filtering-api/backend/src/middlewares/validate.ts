import { AnyZodObject, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"

type RequestSource = "body" | "params" | "query"

export const validate = (schema: AnyZodObject, source: RequestSource = "body") => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req[source])
    } catch (error) {
        if (error instanceof ZodError) {
            return next(
                new ApiError(
                    400,
                    error.issues[0]?.message
                )
            )
        } else {
            return next(
                new ApiError(
                    500,
                    'something went wrong with validate middleware'
                )
            )
        }
    }
}