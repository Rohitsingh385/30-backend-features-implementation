import type { Request, Response } from "express";

import postModel from "./post.model.js";
export const cursorController = async (req: Request, res: Response) => {
    try {

        const { cursor, limit } = req.query as unknown as {
            cursor?: string,
            limit: number
        }
        let response: any;
        if (cursor !== undefined) {
            response = await postModel.find({
                _id: {
                    $lt: cursor
                }
            })
                .sort({ _id: -1 })
                .limit(limit)
        } else {
            response = await postModel.find({})
                .sort({ _id: -1 })
                .limit(limit)
        }
        const lastItem = response[response.length -1];
        const nextCursor = lastItem?._id;

        return res.status(200).json({
            data: response,
            nextCursor,
            hasNextPage: response.length === limit
        })

    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}