import type { Request, Response } from "express"
import type { createPostInput, deletePostInput, updatePostInput } from "./post.validate.js"
import Post from "./post.model.js"
export const create = async (req: Request<{}, {}, createPostInput['body']>, res: Response): Promise<any> => {

    try {
        const { title, content } = req.body

        if (!req.user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        const user = req.user;

        const post = await Post.create({
            title,
            content,
            author: user.userId
        })

        return res.status(201).json({
            message: 'created'
        });
    } catch (error: any) {
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

export const update = async (req: Request<updatePostInput['params'], {}, updatePostInput['body']>, res: Response): Promise<any> => {
    try {

        const user = req.user?.userId
        const postId = req.params.postId

        const { title, content } = req.body

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                message: 'post not found'
            })
        }
        if (post.author.toString() !== user) {
            return res.status(403).json({
                message: 'unauthorized'
            })
        }
        await Post.findByIdAndUpdate(postId, {
            $set: {
                title,
                content
            }
        })
        return res.status(200).json({
            message: 'updated'
        })

    } catch (error: any) {
        return res.status(500).json({
            message: 'sever error',
            error: error.message
        })
    }
}

export const deletePost = async (req: Request<deletePostInput['params'], {}, {}>, res: Response): Promise<any> => {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: 'unauthorized'
            })
        }
        const postId = req.params.postId

        const post = await Post.findByIdAndDelete(postId)
        if(!post){
            return res.status(404).json({
                message: 'post not found'
            })
        }
        if(post?.author.toString() !== req.user.userId){
            return res.status(403).json({
                message: 'Forbidden'
            })
        }
        return res.status(200).json({
            message: 'deleted'
        })

    } catch (error: any) {
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

export const posts = async(req: Request<{},{},{}>, res: Response): Promise<any> => {
    try{
        if(!req.user){
            return res.status(401).json({
                message: 'unauthorized'
            })
        }

        const posts = await Post.find({
            author: req.user.userId
        })
        return res.status(200).json({
            author: req.user.userId,
            posts
        })
    }catch(error: any){
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}