import type { Request, Response } from "express";
import { Post } from "./Post.model.js";
export const post = async (req: Request, res: Response) => {
    try {

        const { title, content } = req.body as {
            title: String,
            content: String
        }
        if (!title || !content) {
            return res.status(404).json({
                message: 'input field validation failed'
            })
        }
        const userId = req.id;

        const post = await Post.create({
            title: title,
            content: content,
            author: userId
        })

        return res.status(201).json({
            message: 'post created',
            post
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(403).json({
                message: 'post not found'
            })
        }
        return res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const post = await Post.find()
        return res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {

        const { title, content } = req.body as {
            title?: string,
            content?: string

        }
        const postId = req.params.id

        const updateData: Record<string, any> = {}

        if(title !== undefined){
            updateData.title = title
        }
        if(content !== undefined){
            updateData.content = content
        }
        const post = await Post.findByIdAndUpdate(postId, updateData, {new: true})
        if (post) {
            return res.status(201).json({
                message: 'post updated'
            })
        }
        return res.status(404).json({
            message: 'post not found'
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}


export const delPost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.id

        const post = await Post.findByIdAndDelete(postId)
        if(post){
            return res.status(200).json({
                message: 'post deleted'
            })
        }
        return res.status(404).json({
            message: 'post not found'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}