import { Request, Response } from "express";
import { createPost, getPosts } from "./post.service.js";

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

export const getPostController = async(req: Request, res: Response) => {
    const posts = await getPosts();

    return res.status(200).json({
        success: true,
        data: posts 
    })
}