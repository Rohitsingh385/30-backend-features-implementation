import type { Request, Response, NextFunction } from "express"
import { ZodType, ZodError } from "zod"

export const validate = (schema: ZodType) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validateData = schema.parse(req.query)
            req.query = validateData as typeof req.query
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    message: 'invalid query param',
                    errors: err.errors
                })
            }
        }
    }

}