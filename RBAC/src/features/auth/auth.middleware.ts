import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod"

export const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,     
            })
            return next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: 'fail',
                    errors: error.errors.map((err) => ({
                        field: err.path[1],
                        message: err.message
                    })),
                })
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
    }