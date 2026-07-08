import { api } from "./axios";
import type { Post, PostRequest, feedResponse } from "../types/post";

export const createPost = (data: PostRequest)=> {
    return api.post("/posts", data)
}
export const getPost = (cursor?: string) => {
    // return api.get("/posts")

    return api.get<feedResponse>("/posts", {
        params: {
            limit: 5,
            cursor
        }
    })
}

export const deletePost = (postId: string)=> {
    return api.delete(`/posts/${postId}`)
}

export const likePost = (postId: string)=> {
    return api.post(`/likes/${postId}`)
}
export const unlikePost = (postId: string)=> {
    return api.delete(`/likes/${postId}`)
}