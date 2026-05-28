import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod"

export const validate = (schema: ZodSchema) => {

    return (req:Request, res: Response, next: NextFunction) => {
        try{
            const validatedData = schema.parse(req.query);
            req.query = validatedData as typeof req.query;
            next();

        }catch(err){
            res.status(400).json({
                message: 'invalid query param',
                err
            })
        }
    }
}