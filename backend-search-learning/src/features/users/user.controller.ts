import { Request, Response } from "express";

import { User } from "./user.model.js"

export const searchUsers = async(req: Request, res: Response)=> {

    try{

        const {q, page, limit} = req.query as unknown as {
            q: string;
            page: number;
            limit: number;
        };

        const skip = (page-1) * limit;
        const query = {
            username: {
                $regex: q,
                $options: "i"
            }
        }
        const [users, total] = await Promise.all([
            User.find(query)
            .skip(skip)
            .limit(limit),
            
            User.countDocuments(query)
        ])

        res.json({
            data: users,

            pagination:{
                page,
                limit,
                total,
                pages: Math.ceil(total/limit)
            }
        })
    }catch(err){
        res.status(500).json({
            message: "something went wrong"
        })
    }   
}