import type { Request, Response } from "express";
import { friendRequestModel } from "./friendsRequest.model.js";
import { friendModel } from "./friend.model.js";
import { signUpModel } from "../auth/user.model.js";
export const addFriend = async(req: Request, res: Response)=> {
    try{
        const receiverId = req.params.id
        const senderId = req.id

        const receiver = await signUpModel.findById(receiverId)
        if(!receiver){
            return res.status(200).json({
                message: 'user not found'
            })
        }
        if(receiverId === senderId){
            return res.status(409).json({
                message: 'cannot send request to yourself'
            })
        }

        const checkFriend = await friendModel.find({
            senderId: senderId,
            receiverId: receiverId,
            status: "ACCEPTED"
        })
        if(checkFriend){
            return res.status(409).json({
                message: 'already friends'
            })
        }
        const checkRequestsExists = await friendRequestModel.findOne({
            $or: [
                {
                    receiverId: senderId,
                    senderId: receiverId,
                    status: "PENDING"
                },
                {
                    receiverId: receiverId,
                    senderId: senderId,
                    status: "PENDING"
                }
            ]
        })
        if(checkRequestsExists){
            return res.status(409).json({
                message: 'request already exists'
            })
        }

        await friendModel.create({
            senderId: senderId,
            receiverId: receiverId,
            status: "PENDING"
        })

        return res.status(200).json({
            message: 'request send'
        })


    }catch(error){
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}