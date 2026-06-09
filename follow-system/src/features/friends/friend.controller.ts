import type { Request, Response } from "express";
import { friendRequestModel } from "./friendsRequest.model.js";
import { friendModel } from "./friend.model.js";
import { signUpModel } from "../auth/user.model.js";
export const addFriend = async (req: Request, res: Response) => {
    try {
        const receiverId = req.params.id
        const senderId = req.id
        //console.log(receiverId)
        //console.log(senderId)
        const receiver = await signUpModel.findById(receiverId)
        if (!receiver) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        console.log('friend found')
        if (receiverId === senderId) {
            return res.status(409).json({
                message: 'cannot send request to yourself'
            })
        }
        console.log('friend is not myself')
        const checkFriend = await friendModel.findOne({
            $or: [
                {
                    user1: senderId,
                    user2: receiverId
                },
                {
                    user1: receiverId,
                    user2: senderId
                }
            ]
        })
        if (checkFriend) {
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
        if (checkRequestsExists) {
            return res.status(409).json({
                message: 'request already exists'
            })
        }
        console.log('request not alreaeayd exists')
        const data = await friendRequestModel.create({
            senderId: senderId,
            receiverId: receiverId,
            status: "PENDING"
        })

        console.log

        return res.status(200).json({
            message: 'request send'
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const acceptFriend = async (req: Request, res: Response) => {
    try {

        const requestId = req.params.id;

        const request = await friendRequestModel.findById(requestId);
        if (!request) {
            return res.status(404).json({
                message: 'no requests exists'
            })
        }

        if (request.status !== "PENDING") {
            return res.status(404).json({
                message: 'might be alrady accepted'
            })
        }
        const currentUser = req.id

        if (request?.receiverId.toString() !== currentUser) {
            return res.status(403).json({
                message: 'invalid credentials'
            })
        }

        await friendRequestModel.findByIdAndUpdate(requestId, {
            status: "ACCEPTED"
        })

        await friendModel.create({
            user1: request?.senderId,
            user2: request?.receiverId
        })
        return res.status(201).json({
            message: 'accepted'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const rejectRequest = async (req: Request, res: Response) => {
    try {

        const requestId = req.params.id;

        const request = await friendRequestModel.findById(requestId)
        if (!request) {
            return res.status(404).json({
                message: 'request doesnt exists'
            })
        }

        if (request.status !== "PENDING") {
            return res.status(404).json({
                message: 'request might be accepted'
            })
        }

        const currentUser = req.id

        if (request.receiverId.toString() !== currentUser) {
            return res.status(409).json({
                message: 'cannot self reject'
            })
        }

        await friendRequestModel.findByIdAndUpdate(requestId, {
            status: "REJECTED"
        })

        return res.status(200).json({
            message: 'rejected'
        })


    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}
export const incomingRequest = async (req: Request, res: Response) => {
    try {

        const currentUser = req.id;
        const response = await friendRequestModel.find({
            receiverId: currentUser
        })

        return res.status(200).json({
            response
        })

    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}
export const outgoingRequests = async (req: Request, res: Response) => {
    try {
        const currentUser = req.id;
        const response = await friendRequestModel.find({
            senderId: currentUser,
            status: "PENDING"
        })

        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}

export const FriendList = async (req: Request, res: Response) => {
    try {
        const currentUser = req.id;
        const response = await friendModel.find(
            {
                $or: [
                    { user1: currentUser },
                    { user2: currentUser }
                ]
            }
        )

        return res.status(200).json({
            response
        })

    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}
