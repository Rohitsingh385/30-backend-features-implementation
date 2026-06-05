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
        } else {
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

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id as string;
        const userId = req.body.userId;

        const deletedlike = await likeModel.findOneAndDelete({
            userId: userId,
            postId: postId
        })

        if (deletedlike) {

            await postModel.findOneAndDelete({
                _id: postId
            }, {
                $inc: {
                    likesCount: -1
                }
            })
            return res.status(200).json({
                message: 'unliked',
                isLiked: false
            })
        } else {
            await likeModel.create({
                userId: userId,
                postId: postId
            })
            await postModel.findOneAndUpdate({
                postId: postId
            }, {
                $inc: {
                    likesCount: 1
                }
            })
            return res.status(201).json({
                messaged: 'liked',
                isLiked: true
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const getLikedUsers = async (req: Request, res: Reponse) => {
    try {
        const postId = req.params.id;

        const response = await likeModel.find({
            postId: postId
        })
            .populate('userId')
            .populate('postId')

        return res.status(200).json({
            users: response
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const checkLiked = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const userId = req.query.userId;

        const response = await likeModel.findOne({
            postId: postId,
            userId: userId
        })

        if (response) {
            return res.status(200).json({
                isLiked: true
            })
        } else {
            return res.status(200).json({
                isLiked: false
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong '
        })
    }
}

export const likeData = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const userId = req.query.userId;

        const like = await likeModel.findOne({
            postId: postId,
            userId: userId
        })

        const response = await postModel.findOne({
            _id: postId
        })

        if (like) {
            return res.status(200).json({
                response,
                isLiked: true
            })
        } else {
            return res.status(200).json({
                response,
                isLiked: false
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}