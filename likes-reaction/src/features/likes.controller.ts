import type { Request, Response } from "express";

import { likeModel } from "./likes.model.js";
import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";

export const likeController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id as string
        const userId = req.body.userId

        try {
            await likeModel.create({
                postId,
                userId
            })
        } catch (error) {
            if ((error as any).code === 11000) {
                return res.status(409).json({
                    message: 'already liked'
                })
            }
        }
        await postModel.updateOne(
            { _id: postId },
            {
                $inc: {
                    likesCount: 1
                }
            }
        )
        return res.status(201).json({
            message: 'liked'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const unlikeController = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;

        const checkLike = await likeModel.findOne({
            userId: userId,
            postId: postId
        })



        await likeModel.findOneAndDelete({
            userId: userId,
            postId: postId
        })

        if (checkLike) {
            await postModel.updateOne(
                { _id: postId },
                {
                    $inc: {
                        likesCount: -1
                    }
                }
            )
        }else{
            return res.status(400).json({ message: 'please like it first' })
        }

        return res.status(200).json({
            message: 'unliked'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}