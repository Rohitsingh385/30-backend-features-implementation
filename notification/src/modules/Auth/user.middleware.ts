import type {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
const SECRET = 'SUPERSECRETKEY'
declare global {
    namespace Express {
        interface Request {
            id?: any
        }
    }
}
export const authMiddleware = async(req: Request, res: Response, next: NextFunction)=>{
    
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: 'token missing'
        })
    }
    try{
        const decoded = await jwt.verify(token, SECRET );
        req.id = decoded._id
        next()
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong on middleware'
        })
    }
}