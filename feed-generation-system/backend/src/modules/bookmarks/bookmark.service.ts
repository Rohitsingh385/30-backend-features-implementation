import { BookMark } from "./bookmark.model.js";
import { Post } from "../posts/post.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const saveBookmark = async (userId: string, postId: string) => {

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        )
    }

    try {
        const bookmark = await BookMark.create({
            userId,
            postId
        })
        return bookmark
    } catch (error: any) {
        if (error.code === 11000) {
            throw new ApiError(
                409,
                "Post already bookmarked"
            )
        }
        throw error
    }

}
export const removeBookmark = async (userId: string, postId: string) => {

    const bookmark = await BookMark.findOneAndDelete({
        userId,
        postId
    })

    if (!bookmark) {
        throw new ApiError(
            404,
            "Bookmark not found"
        )
    }
    return bookmark
}

export const getBookmark = async ({ userId, cursor, limit = 10 }: { suerId: string, cursor?: string, limit?: number }) => {

    const query: any = { userId }
    if (cursor) {
        query._id = { $lt: cursor }
    }
    const bookmarks = await BookMark.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .populate({
            path: "postId",
            populate: {
                path: "author",
                select: "username"
            }
        })

    const hasNextPage = bookmarks.length > limit
    if (hasNextPage) {
        bookmarks.pop()
    }
    const nextCursor = hasNextPage ? bookmarks[bookmarks.length - 1]._id : null

    const transformedBookmarks = bookmarks.map((bookmark) => ({
        ...bookmark.toObject(),
        postId: {
            ...bookmark.postId.toObject(),
            isBookmarked: true
        }
    }))
    return {
        bookmarks: transformedBookmarks,
        nextCursor,
        hasNextPage,
    };
}