import { api } from "./axios";
import type { Post, PostRequest } from "../types/post";

export const createPost = (data: PostRequest)=> {
    return api.post("/posts", data)
}
export const getPost = () => {
    return api.get("/posts")
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