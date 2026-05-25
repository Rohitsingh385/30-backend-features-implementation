import { Request, Response } from "express";

import { User } from "./user.model.js"

export const searchUsers = async(req: Request, res: Response)=> {

    try{
        const q = req.query.q as string;

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