import { AnyZodObject, ZodError } from "zod"
import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError"


export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
       const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
       })
       req.body = parsed.body
       req.params = parsed.params
       req.query = parsed.params
       next()
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