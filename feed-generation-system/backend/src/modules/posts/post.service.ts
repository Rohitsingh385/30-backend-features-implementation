import { ApiError } from "../../utils/ApiError.js";
import { Post } from "./post.model.js";
import { DeletePostData, createPostData } from "./post.types.js";

export const createPost = async ({ authorId, content }: createPostData) => {
    const post = await Post.create({
        author: authorId,
        content,
    })
    await post.populate("author", "username")
    return post
}

export const getPosts = async () => {
    const posts = await Post.find()
        .populate("author", "username")
        .sort({ createdAt: -1 })
    return posts
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


