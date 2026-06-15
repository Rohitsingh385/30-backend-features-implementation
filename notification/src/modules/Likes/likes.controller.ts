import type { Request, Response } from "express";
import { Post } from "../Posts/Post.model.js";
import { LikeModel } from "./Likes.model.js";
import {createNotification} from "../Notification/notification.service.js"
export const like = async (req: Request, res: Response) => {
    try {
        console.log('1')
        const postId = req.params.postId
        const post = await Post.findById(postId).populate('author')
        if (!post) {
            return res.status(404).json({
                message: 'not found'
            })
        }
        console.log('2')
        const user = req.id;
        console.log(user)
        console.log(post.author._id.toString())
        if(user === post.author._id.toString()){
            return res.status(409).json({
                message: 'caacnot liked you own post'
            })
        }
        console.log('3')
        console.log(postId)
        console.log(user)
        const checkStatus = await LikeModel.findOne({
            postId: postId,
            likedBy: user
        })
        console.log(checkStatus)
        if (checkStatus) {
            return res.status(200).json({
                message: 'liked'
            })
        }
        await LikeModel.create({
            postId: postId,
            likedBy: user
        })
        console.log('4')

        await Post.findByIdAndUpdate(
            {_id: postId},
            {$inc: {
                likesCount: 1
            }}
        )
        console.log('5')
        await createNotification(post.author._id.toString(), user, "POST_LIKE", postId)
        return res.status(201).json({
            message: 'liked'
        })
      
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const unlike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                message: 'not found'
            })
        }
        const currentUser = req.id;
        const checkStatus = await LikeModel.findOne({
            postId: postId,
            likedBy: currentUser
        })
        if (checkStatus) {
            await LikeModel.deleteOne({
                postId: postId,
                likedBy: currentUser
            })
            await Post.findByIdAndUpdate(
                {_id: postId},
                {$inc: {
                    likesCount: -1
                }}
            )
            return res.status(200).json({message: 'unliked'})
        }

        return res.status(409).json({
            message: 'doesnt make sense'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}