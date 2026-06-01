import type { Request, Response } from "express";
import { commentModel } from "./comment.model.js";
import { userModel } from "./user.model.js";
import postModel from "./post.model.js";
export const commentController = async (req: Request, res: Response) => {
    try {

        const { postId } = req.query as {
            postId: string
        }


        const comments = await commentModel.find({
            postId: postId,
            parentComment: null
        })
            .populate("author")
            .populate("postId")

        const nestedComments: any[] = [];

        for (const comment of comments) {
            const replies = await commentModel.find({
                parentComment: comment._id
            })
                .populate("author")

            nestedComments.push({
                ...comment.toObject(),
                replies: replies
            })
        }

        return res.status(200).json({
            comments: nestedComments
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const reply = async (req: Request, res: Response) => {
    try {
        const { content, author, postId, parentComment } = req.body;
        if (!parentComment) {
            return res.json('invalid parent comment id')
        }
        const findComment = await commentModel.findById(parentComment)
        if (!findComment) {
            return res.json({ message: 'comment doesnt exists' })
        }
        const reply = await commentModel.create({
            content,
            author,
            postId,
            parentComment
        })
        return res.status(200).json({
            message: 'reply added'
        })
    } catch (err) {
        console.log(err)
        return res.json({
            message: 'something went wrong'
        })
    }
}

export const getreply = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.query as {
            commentId: string
        }
        const replies = await commentModel.find({
            parentComment: commentId
        })

        return res.status(200).json({
            replies
        })
    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const getBachData = async (req: Request, res: Response) => {
    try {

        const { postId } = req.query as {
            postId: string
        }


        const comments = await commentModel.find({
            postId: postId,
            parentComment: null
        })
            .populate("author")
            .populate("postId")

        const commentIds = comments.map(comment => comment._id)
        //console.log(commentIds);

        const response = await commentModel.find({
            parentComment: {
                $in: commentIds
            }
        })

        const groupedReplies: any = {};

        for (const reply of response) {
            const parentId = reply.parentComment.toString()
            if (!groupedReplies[parentId]) {
                groupedReplies[parentId] = []
            }
            groupedReplies[parentId].push(reply)

        }

        const nestedComments = [];

        for (const comment of comments) {
            const commentId = comment._id.toString()
            nestedComments.push({
                ...comment.toObject(),
                replies: groupedReplies[commentId] || []
            })
        }
        //console.log(response);

        return res.status(200).json({
            nestedComments
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}