import { ApiError } from "../../utils/ApiError.js";
import { Post } from "./post.model.js";
import { DeletePostData, createPostData } from "./post.types.js";
import { Like } from "../like/like.model.js";
import { Follow } from "../follows/follow.model.js";


export const createPost = async ({ authorId, content }: createPostData) => {
    const post = await Post.create({
        author: authorId,
        content,
    })
    await post.populate("author", "username")
    return post
}



export const getPosts = async (userId: string) => {
    const followRelationships = await Follow.find({
        followerId: userId
    }).select("followingId")

    const followedUserIds = followRelationships.map(
        (relationship) => relationship.followingId
    )

    const feedAuthorIds = [
        userId,
        ...followedUserIds
    ]

    const posts = await Post.find({
        author: {
            $in: feedAuthorIds
        }
    }).populate("author", "username")
      .sort({ createdAt: -1 })
    
    const postIds = posts.map((post)=> post._id)
    const userLikes = await Like.find({
        userId,
        postId: {
            $in: postIds
        }
    }).select("postId")

    const likedPostIds = new Set(
        userLikes.map((like) => like.postId.toString())
    )

    const postWithLikeStatus = posts.map((post)=> ({
        ...post.toObject(),
        isLiked: likedPostIds.has(post._id.toString())
    }))
    return postWithLikeStatus
}

export const deletePost = async({postId, userId}: DeletePostData) => {

    const post = await Post.findById(postId)

    if(!post){
        throw new ApiError(
            404,
            'post not found'
        )
    }
    if(!post.author.equals(userId)){
        throw new ApiError(
            403,
            'unauthorized'
        )
    }
    await post.deleteOne()
}


