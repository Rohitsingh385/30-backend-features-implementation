import type{ Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod"
import jwt from "jsonwebtoken"
import type { TokenPayload } from "./util.token.js";
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


export const Auth = async function(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization']
    if(!authHeader){
        return res.status(401).json({
            message: 'No Token'
        })
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message: "missing token"
        })
    }
    try{    
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown as TokenPayload
        if(typeof decoded === "string"){
            return res.status(403).json({ message: 'Invalid token'})
        }
        req.user = decoded
        next()
    }catch(error){
        next(error)
        return res.status(403).json({
            message: 'invalid token'
        })
    }
}