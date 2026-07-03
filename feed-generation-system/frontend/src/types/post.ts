export interface PostRequest{
    content: string
}

export interface Post {
    _id: string;
    author: PostAuthor;
    content: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
}
export interface PostAuthor{
    _id: string;
    username: string
}