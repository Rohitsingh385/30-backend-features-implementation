import type { Post } from "../types/post";
import { useState } from "react";
import axios from "axios";
import { deletePost } from "../api/posts";

interface PostCardProps {
    post: Post;
    currentUserId?: string;
    onPostDeleted: (postId: string) => void
}

export default function PostCard({ post, currentUserId, onPostDeleted }: PostCardProps) {

    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")

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
                {post.likesCount} likes .{" "}
                {post.commentsCount} comments
            </div>
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
        </article>
    )
}
