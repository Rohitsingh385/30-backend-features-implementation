export type createPostData = {
    authorId: string;
    content: string;
}

export type DeletePostData = {
    postId: string;
    userId: string;
}

export type getPostData = {
    userId: string;
    cursor?: string | undefined;
    limit: number
}