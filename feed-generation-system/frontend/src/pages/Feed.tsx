import { useEffect, useState } from "react"
import type { Post } from "../types/post"
import { getPost } from "../api/posts";
import axios from "axios";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import type { User } from "../types/auth";
import { getCurrentUser } from "../api/auth";
export default function Feed() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [user, setUser] = useState<User | null>(null)
    const fetchPosts = async () => {
        setLoading(true);
        setError("")

        try {
            const response = await getPost()
            setPosts(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ?? "Failed to load posts"
                )
            } else {
                setError("Unexpected Error")
            }
        } finally {
            setLoading(false)
        }
    }
    const fetchCurrentUser = async () => {
        const response = await getCurrentUser();
        setUser(response.data.data)
    }
    useEffect(() => {
        fetchPosts();
        fetchCurrentUser();
    }, [])

    if (loading) {
        return <p>Loading posts..</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    const handlePostCreated = (newPost: Post) => {
        setPosts((prevPosts) => [
            newPost,
            ...prevPosts
        ])
    }
    const handlePostDeleted = (postId: string) => {
        setPosts((prevposts) =>
            prevposts.filter((post) => post._id !== postId)
        )
    }

    return (
        <main className="max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Feed</h1>
            {posts.length === 0 && (
                <p>No posts yet.</p>
            )}
            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={user?._id}
                    onPostDeleted={handlePostDeleted}
                />
            ))}
            <CreatePost onPostCreated={handlePostCreated} />
        </main>
    )
}