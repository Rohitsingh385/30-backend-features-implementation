import { ApiError } from "../../utils/ApiError.js";
import { Like } from "./like.model.js";
import { LikePostInput } from "./like.types.js";
import { Post } from "../posts/post.model.js";
export const likePost = async ({ userId, postId }: LikePostInput) => {

    const checkExists = await Post.findById(postId)
    if (!checkExists) {
        throw new ApiError(
            404,
            'post doesnt exists'
        )
    }
    try {
        await Like.create({
            userId,
            postId,
        })
    } catch (error: any){
        if(error.code === 11000){
            throw new ApiError(
                409,
                'Post aready liked'
            )
        }
    }

    await Post.findByIdAndUpdate(postId, {
        $inc: {
            likesCount: 1
        }
    })

}

export const unlikePost = async({userId, postId}: LikePostInput) => {

    const post = await Post.findById(postId)
    if(!post){
        throw new ApiError(
            404,
            "Post doesn't exists"
        )
    }
    const deletedLike = await Like.findOneAndDelete({
        userId,
        postId
    })
    // console.log(deletedLike)
    // console.log(userId)
    // console.log(postId)
    if(!deletedLike){
        throw new ApiError(
            404,
            'Post not liked'
        )
    }

    await Post.findByIdAndUpdate(
        postId,
        {
            $inc: {
                likesCount: -1
            }
        }
    )
}