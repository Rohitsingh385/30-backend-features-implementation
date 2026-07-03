import { useEffect, useState } from "react"
import type { Post } from "../types/post"
import { getPost } from "../api/posts";
import axios from "axios";
import CreatePost from "./CreatePost";
export default function Feed(){

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchPosts = async()=> {
        setLoading(true);
        setError("")

        try{
            const response = await getPost()
            setPost(response.data.data)
        }catch(error){
            if(axios.isAxiosError(error)){
                setError(
                    error.response?.data?.message ? "Failed to load posts"
                )
            }else{
                setError("Unexpected Error")
            }
        }finally{
            setLoading(false)
        }
    }
    useEffect (()=>{
        fetchPosts()
    },[])

    if(loading){
        return <p>Loading posts..</p>
    }
    if(error){
        return <p>{error}</p>
    }

    const handlePostCreated = (newPost: Post) => {
        setPosts((prevPosts)=> [
            newPost,
            ...prevPosts
        ])
    }
    return (
        <main className="max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Feed</h1>
        {posts.length === 0  && (
            <p>No posts yet.</p>
        )}
        {posts.map((post)=> (
            <article
             key={post._id}
             className="border rounded-lg p-4"
            >

                <p className="font-semibold">
                    {post.author.username}
                </p>
                <p className="font-semibold">
                    {post.author.username}
                </p>
                <p className="mt-2">
                    {post.content}
                </p>

                <div className="mt-3 text-sm text-gray-500">
                    {post.likesCount} likes. {" "}
                    {post.commentsCount} comments
                </div>
            </article>
        ))}
        <CreatePost onPostCreated={handlePostCreated}/>
        </main>
    )
}
onPos