import type { Post } from "../types/post";
import { useState } from "react";
import axios from "axios";
import { deletePost, likePost, unlikePost } from "../api/posts";
import {BookmarkButton} from "../components/BookmarkButton"
import { saveBookmark, removeBookmark } from "../api/bookmark";

interface PostCardProps {
    post: Post;
    currentUserId?: string;
    onPostDeleted: (postId: string) => void
}

export default function PostCard({ post, currentUserId, onPostDeleted }: PostCardProps) {

    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likesCount, setLikesCount] = useState(post.likesCount)
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)
    const [isLoadingBookmark, setIsLoadingBookmark] = useState(false)
    const handleBookmarkToggle = async () => {
        if (isLoadingBookmark) return;

        const previousValue = isBookmarked;
        setIsLoadingBookmark(true)
        setIsBookmarked(!previousValue)
        try {
            if (previousValue) {
                await removeBookmark(post._id)
            } else {
                await saveBookmark(post._id)
            }
        } catch (error) {
            setIsBookmarked(previousValue)
            console.error(error)
        } finally {
            setIsLoadingBookmark(false)
        }
    }
    const handleDelete = async () => {
        setError("");
        setDeleting(true)

        try {
            await deletePost(post._id)
            onPostDeleted(post._id)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ?? "Failed to delete Post"
                )
            } else {
                setError("Unexpected error")
            }
        } finally {
            setDeleting(false)
        }
    }

    const handleLikeToggle = async () => {

        if (isLiked) {
            await unlikePost(post._id)
            setIsLiked(false)
            setLikesCount((prevCount) => prevCount - 1)
        } else {
            await likePost(post._id)
            setIsLiked(true)
            setLikesCount((prevCount) => prevCount + 1)
        }
    }
    const isOwner = currentUserId === post.author._id;
    return (
        <article className="border rounded-lg p-4">
            <p className="font-semibold">
                {post.author.username}
            </p>
            <p className="mt-2">
                {post.content}
            </p>
            <div className="mt-3 text-sm text-gray-500">
                {likesCount} likes .{" "}
                {post.commentsCount} comments
            </div>
            <button
                type="button"
                onClick={handleLikeToggle}>

                {isLiked ? "Unlike" : "Like"}
            </button>
            {isOwner && (
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            )}
            {
                error && (
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                )
            }
            <BookmarkButton
                isBookmarked={isBookmarked}
                onToggle={handleBookmarkToggle}
                disabled={isLoadingBookmark}
            />
        </article>
    )
}
