import type { Request, Response } from "express";
import {User} from "../Auth/User.model.js"
import { Friend } from "./Friend.model.js";
import { FriendRequest } from "./FriendRequest.model.js";

export const sendReq = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
    
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        const currentUser = req.id
        if (userId === currentUser) {
            return res.status(409).json({
                message: 'cannot send friend to yourself'
            })
        }
        const checkStatus = await FriendRequest.findOne({
            $or: [
                {
                    senderId: currentUser,
                    receiverId: userId,
                    status: "PENDING"
                },
                {
                    senderId: userId,
                    receiverId: currentUser,
                    status: "PENDING"
                }
            ]
        })
      
        if (checkStatus) {
            return res.status(200).json({
                message: 'request already there'
            })
        }

        await FriendRequest.create({
            senderId: currentUser,
            receiverId: userId,
            status: "PENDING"
        })
        
        return res.status(200).json({
            message: 'req sent'
        })

    } catch (error) {
        console.log('something went wrong')
    }
}


export const acceptReq = async (req: Request, res: Response) => {
    try {
        const requestId = req.params.requestId

        const checkReq = await FriendRequest.findOne({
            _id: requestId,
            status: "PENDING"
        })
        if (!checkReq) {
            return res.status(409).json({
                message: 'either request has been accepted or deletd'
            })
        }
        await FriendRequest.findByIdAndUpdate(
            { _id: requestId },
            { status: "ACCEPTED" }
        )
        await Friend.create({
            user1: checkReq.senderId,
            user2: req.id
        })
        return res.status(201).json(
            {
                message: 'accepted'
            }
        )
    } catch (error) {
        console.log('something went wrong')
    }
}


export const rejectReq = async (req: Request, res: Response) => {
    try {
        const requestId = req.params.requestId

        const checkReq = await FriendRequest.findOne({
            _id: requestId,
            status: "PENDING"
        })
        if (!checkReq) {
            return res.status(409).json({
                message: 'either request has been accepted or deletd'
            })
        }
        await FriendRequest.findByIdAndUpdate(
            { _id: requestId },
            { status: "REJECTED" }
        )
        return res.status(201).json(
            {
                message: 'rejected'
            }
        )
    } catch (error) {
        console.log('something went wrong')
    }
}


export const incomingReq = async (req: Request, res: Response) => {
    try {

        const user = req.id
 
        const incoming = await FriendRequest.findOne({
            receiverId: user,
            status: "PENDING"
        })
    
        return res.status(200).json({
            incoming
        })

    } catch (error) {
        console.log('something went wrong')
    }
}


export const outgoingReq = async (req: Request, res: Response) => {
    try {
        const user = req.id

        const outoging = await FriendRequest.findOne({
            senderId: user,
            status: "PENDING"
        })
        return res.status(200).json({
            outoging
        })
    } catch (error) {
        console.log('something went wrong')
    }
}

