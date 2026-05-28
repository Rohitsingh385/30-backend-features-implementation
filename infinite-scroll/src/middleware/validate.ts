import type { Request, Response, NextFunction } from "express"
import { ZodType, ZodError } from "zod"

export const validate = (schema: ZodType) => {
    console.log('middleware start')
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('before parse');
            
            const validateData = schema.parse(req.query)
            console.log('after parse');
            // req.query = validateData as typeof req.query
            console.log(validateData);
            next()
            console.log('after parse');
        } catch (err) {
            console.log('middleware got error')
            if (err instanceof ZodError) {
               return res.status(400).json({
                    message: 'invalid query param',
                    errors: err.issues
                })
            }
            return res.status(500).json({
                message: 'internal server error'
            })
        }
    }

}