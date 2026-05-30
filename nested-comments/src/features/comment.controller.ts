import type { Request, Response } from "express";
import { commentModel } from "./comment.model.js";
import { userModel } from "./user.model.js";
import postModel from "./post.model.js";
export const commentController = async(req: Request, res: Response)=> {
    try{
        
        const { postId } = req.query as {
            postId: string
        }

       const comments =  await commentModel.find({
            postId: postId
        })
        .populate("author")
        .populate("postId")
       

        return res.status(200).json({
            comments
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}