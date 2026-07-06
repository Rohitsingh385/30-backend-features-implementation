import { Request, Response } from "express";
import { followUser, unfollowUser } from "./follow.service.js";
import { FollowUserParams } from "./follow.schema.js";

export const followUserController = async(req: Request<FollowUserParams>, res: Response) => {

    await followUser({
        followerId: req.user._id,
        followingId: req.params.id 
    })

    return res.status(201).json({
        success: true,
        message: "User followed successfully"
    })
} 

export const unfollowUserController = async(req: Request<FollowUserParams>, res: Response)=> {
    await unfollowUser({
        followerId: req.user._id,
        followingId: req.params.id
    })

    return res.status(200).json({
        success: true,
        message: "User unfollowed sucessfully"
    })
}
