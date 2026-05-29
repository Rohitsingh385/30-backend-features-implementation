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
                .limit(limit+1)
        }
        const lastItem = response[response.length -1];
        const nextCursor = lastItem?._id;
        const hasNextPage = response.length === limit + 1;
        if(hasNextPage){
            response.pop()
        }
        return res.status(200).json({
            data: response,
            nextCursor,
            hasNextPage 
        })

    } catch (error) {
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}