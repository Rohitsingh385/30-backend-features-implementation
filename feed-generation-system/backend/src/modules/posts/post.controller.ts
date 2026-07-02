import { Request, Response } from "express";
import { createPost } from "./post.service.js";

export const createPostController = async(req: Request, res: Response)=> {
    const post = await createPost({
        authorId: req.user._id,
        content: req.body.content
    })

    return res.status(201).json({
        success: true,
        data: post
    })
}