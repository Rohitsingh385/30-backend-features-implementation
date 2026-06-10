import type { Request, Response } from "express"
import { User } from "../Auth/User.model.js"
import { Follow } from "./Follow.model.js"
export const follow = async (req: Request, res: Response) => {
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
                message: 'cannot folow yourself'
            })
        }
        const checkStatus = await Follow.findOne({
            followingId: userId,
            followerId: currentUser
        })
        if (checkStatus) {
            return res.status(409).json({
                message: 'already followed'
            })
        }
        await Follow.create({
            followingId: userId,
            followerId: currentUser
        })
        return res.status(201).json({
            message: 'followed'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }

}

export const unfollow = async (req: Request, res: Response) => {
    try {

        const userId = req.params.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        const currentUser = req.id;

        const checkStatus = await Follow.findOne({
            followingId: userId,
            followerId: currentUser
        })

        if (!checkStatus) {
            return res.status(409).json({
                message: 'already unfollwed'
            })
        }
        await Follow.findOneAndDelete({
            followingId: userId,
            followerId: currentUser
        })
        return res.status(200).json({
            message: 'unfollowed'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }

}

export const getFollowers = async (req: Request, res: Response) => {
    try {

        const currentUser = query.params.userId
        const followers = await Follow.findOne({
            followingId: currentUser
        })
        return res.status(200).json({
            followers
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}

export const getFollowing = async (req: Request, res: Response) => {
    try {
        const currentUser = query.params.userId
        const followers = await Follow.findOne({
            followerId: currentUser
        })
        return res.status(200).json({
            followers
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}