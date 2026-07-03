import { Post } from "./post.model.js";

type createPostData = {
    authorId: string;
    content: string;    
}

export const createPost = async({authorId, content}: createPostData) => {
    const post = await Post.create({
        author: authorId,
        content, 
    })
    await post.populate("author", "username")
    return post
}

export const getPosts = async() => {
    const posts = await Post.find()
        .populate("author", "username")
        .sort({ createdAt: -1})
    return posts
}




