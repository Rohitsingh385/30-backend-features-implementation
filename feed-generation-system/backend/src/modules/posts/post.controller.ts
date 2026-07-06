import { Request, Response } from "express";
import { createPost, getPosts, deletePost } from "./post.service.js";

type DeletePostParams = {
    id: string;
};
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
    const posts = await getPosts(req.user._id);

    return res.status(200).json({
        success: true,
        data: posts 
    })
}

export const deletePostController = async(req: Request<DeletePostParams>, res: Response) => {
    await deletePost({
        postId: req.params.id,
        userId: req.user._id,
    });

    return res.status(200).json({
        success: true,
        message: "Post deleted succesfully"
    })
}