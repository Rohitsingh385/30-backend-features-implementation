import { ApiError } from "../../utils/ApiError.js";
import { FollowUserData } from "./follow.types.js";
import { User } from "../auth/auth.model.js";
import { Follow } from "./follow.model.js";
export const followUser = async ({ followerId, followingId }: FollowUserData) => {

    if (followerId === followingId) {
        throw new ApiError(
            400,
            "You cannot follow yourseld"
        )
    }
    const targetUser = await User.findById(followingId)
    if (!targetUser) {
        throw new ApiError(
            404,
            "User not found"
        )
    }

    try {
        await Follow.create({
            followerId,
            followingId
        })
    }catch(error: any){
        if(error.code === 11000){
            throw new ApiError(
                409,
                "User already followed"
            )
        }else{
            console.log(error)
        }
    }
}

export const unfollowUser = async({followerId, followingId}: FollowUserData)=> {
    const deletedFollow = await Follow.findOneAndDelete({
        followerId,
        followingId 
    })

    if(!deletedFollow){
        throw new ApiError(
            404,
            "User is not followed"
        )
    }
}
