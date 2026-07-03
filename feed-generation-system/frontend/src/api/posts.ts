import { api } from "./axios";
import type { Post, PostRequest } from "../types/post";

export const createPost = (data: PostRequest)=> {
    return api.post("/posts", data)
}
export const getPost = () => {
    return api.get("/posts")
}