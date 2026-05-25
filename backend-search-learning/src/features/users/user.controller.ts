import { Request, Response } from "express";

import { User } from "./user.model.js"
import { searchUsersQuerySchema } from "./user.validation.js";

export const searchUsers = async(req: Request, res: Response)=> {

    try{
        const validatedQuery = searchUsersQuerySchema.parse(req.query);

        const {q, page, limit} = validatedQuery;

        const users = await User.find({
            username: {
                $regex: q,
                $options: "i"
            }
        });
        res.json({
            data: users
        })
    }catch(err){
        res.status(500).json({
            message: "something went wrong"
        })
    }   
}