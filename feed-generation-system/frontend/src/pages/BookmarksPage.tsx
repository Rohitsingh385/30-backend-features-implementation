import { useEffect, useState } from "react";
import { getBookmark } from "../api/bookmark";
import PostCard from "./PostCard";

const BookmarksPage = ()=> {
    const [bookmarks, setBookmarks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const fetchBookmarks = async() => {
        try{
            const response = await getBookmark();
            setBookmarks(response.data.bookmarks)
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=> {
        fetchBookmarks()
    })
    if(loading){
        return (
            <div className="p-4">
                Loading bookmarks...
            </div>
        )
    }
    return (
        <div className="mx-auto max-w-2xl p-4">
            <h1 className="mb-6 text-2xl font-bold">
                Bookmarks
            </h1>
            {bookmarks.map((bookmark)=> (
                    <PostCard 
                    key={bookmark._id}
                    post={bookmark.postId} onPostDeleted={function (postId: string): void {
                        throw new Error("Function not implemented.");
                    } }                    />
            ))}
        </div>
    )
}

export default BookmarksPage