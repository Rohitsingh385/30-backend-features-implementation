import { Request, Response } from "express";
import { createPost, getPosts, deletePost } from "./post.service.js";
import type { GetPostInputs } from "./post.schema.js";
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

export const getPostController = async(req: Request<{},{}, {}, GetPostInputs>, res: Response) => {
    
    const { cursor, limit} = req.query
    const result = await getPosts({
        userId: req.user._id,
        cursor,
        limit
    });

    return res.status(200).json({
        success: true,
        data: result.data,
        nextCursor: result.nextCursor,
        hasNextPage: result.hasNextPage 
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