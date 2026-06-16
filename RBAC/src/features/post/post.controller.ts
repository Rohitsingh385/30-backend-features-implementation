import type {Request, Response} from "express"
import { createPostInput } from "./post.validate.js"
export const create = async(req: Request<{},{}, createPostInput['body']>, res: Response): Promise<any>=>{
    try{
        const {title, content} = req.body

        const userId = req.user
    }catch(error: any){
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}