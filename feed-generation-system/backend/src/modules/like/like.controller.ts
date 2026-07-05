import { Request, Response } from "express"
import { likePost, unlikePost } from "./like.service.js"
import { success } from "zod"

type LikePostParams ={
    id: string
}
export const likePostController = async(req: Request<LikePostParams>, res: Response)=> {
    
  await likePost({
    postId: req.params.id,
    userId: req.user._id
  })
  return res.status(201).json({
    success: true,
    message: "Post liked" 
  })
}

export const unlikePostController = async(req: Request<LikePostParams>, res: Response)=> {
  await unlikePost({
    postId: req.params.id,
    userId: req.user._id
  })
  return res.status(200).json({
    success: true,
    message: "Post unliked"
  })
}