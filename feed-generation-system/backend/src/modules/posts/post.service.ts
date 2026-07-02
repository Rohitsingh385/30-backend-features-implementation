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
    return post
}