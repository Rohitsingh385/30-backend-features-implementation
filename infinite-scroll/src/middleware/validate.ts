import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"

export const validate = (schema: ZodSchema) => {

    return (req: Request, res: Response, next:  NextFunction )=>{
        try {
            const validateData = schema.parse(req.query)
            req.query = validateData as typeof req.query
            next()
        } catch (error) {
            res.status(400).json({
                message: 'invalid query param'
            })
        }
    }

}