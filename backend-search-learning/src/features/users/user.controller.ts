import { Request, Response } from "express";

import { User } from "./user.model.js"

import { escapeRegex } from "../../utils/escape-regex.js";

export const searchUsers = async(req: Request, res: Response)=> {

    try{

        const {q, page, limit, status, role, sort} = req.query as unknown as {
            q: string;
            page: number;
            limit: number;
            status? : string;
            role?: string;
            sort: string;
        };
        const  escapedQuery = escapeRegex(q)
        const skip = (page-1) * limit;
        const query: any = {
            username: {
                $regex: escapedQuery,
                $options: "i"
            }
        }
        if(status){
            query.status = status;
        }
        if(role){
            query.role = role;
        }
        let sortOption = []
        if(sort === "newest"){
            sortOption = {
                createdAt: -1
            }
        }
        if(sort === "oldest"){
            sortOption = {
                createdAt: 1
            }
        }
        const [users, total] = await Promise.all([
            User.find(query)
            .sort(sortOption)
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