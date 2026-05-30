import type { Request, Response } from "express";
import { commentModel } from "./comment.model.js";

export const commentController = async(req: Request, res: Response)=> {
    try{
        
        const { postId } = req.query as {
            postId: string
        }

       const comments =  await commentModel.find({
            postId: postId
        })
       

        return res.status(200).json({
            comments
        })

    }catch(err){
        return res.status(500).json({
            message: 'something went wrong',
            err
        })
    }
}