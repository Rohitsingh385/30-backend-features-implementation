import type { Request, Response } from "express";
import { signUpModel } from "../auth/user.model.js";
import { followModel } from "./follow.model.js";
import { querySchema } from "./query.validation.js";
export const follow = async (req: Request, res: Response) => {

    try {

        const followerId = req.user.id;
        const followingId = req.params.id

        const follower = await signUpModel.findById(followerId);
        const following = await signUpModel.findById(followingId);
        if (!follower || !following) {
            return res.status(404).json({
                message: 'user does not exists'
            })
        }
        if (followerId === followingId) {
            return res.status(400).json({
                message: 'cannot follow themself'
            })
        }
        const checkFollowing = await followModel.findOne({
            followerId: followerId,
            followingId: followingId
        })
        if (checkFollowing) {
            return res.status(400).json({
                message: 'cannot follow a user twice'
            })
        }

        await followModel.create({
            followerId: followerId,
            followingId: followingId
        })

        return res.status(201).json({
            message: 'followed'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const delFollow = async (req: Request, res: Response) => {
    try {
        const followerId = req.id;
        const followingId = req.params.id;
        console.log(followerId)
        console.log(followingId)
        const follower = await signUpModel.findById(followerId)
        const following = await signUpModel.findById(followingId)
        
        if (!follower || !following) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const checkFollowing = await followModel.findOne({
            followerId: followerId,
            followingId: followingId
        })

        if (!checkFollowing) {
            return res.status(200).json({
                message: 'you are not following '
            })
        }

        await followModel.deleteOne({
            followerId: followerId,
            followingId: followingId
        })
        return res.status(200).json({
            message: 'user unfollowed'
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const followers = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const query = querySchema(req.query);
        const { page, limit } = query as {
            page: number,
            limit: number
        }
        let following;

        if (page === undefined || limit === undefined) {
            following = await followModel.find({
                followingId: userId
            })
        } else {
            const skip = (page - 1) * limit;
            following = await followModel.find({
                followingId: userId
            })
            .limit(limit)
            .skip(skip)
        }

        return res.status(200).json({
            following
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const following = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const followers = await followModel.find({
            followerId: userId
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
export const followersCount = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id;

        const count = await followModel.countDocuments({ followingId: userId }).populate("followerId")
        return res.status(200).json({
            count
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const followingCount = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const count = await followModel.countDocuments({ followerId: userId }).populate("followingId")
        return res.status(200).json({
            count
        })
    } catch (error) {
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}