import { useState } from "react"
import type { PostRequest } from "../types/post"
import { createPost } from "../api/posts"
import axios from "axios"
export default function CreatePost(){

    const [formData, setFormData] = useState<PostRequest>({
        content: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        const {name, value} = e.target 
        setFormData((prev)=> ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        setError("")
        setLoading(true)

        try{
            const response = await createPost(formData)
            setFormData({
                content: ""
            })

        }catch(error){
            if(axios.isAxiosError(error)){
                setError(error.response?.data?.message ?? "something went wrong")
            }
        }finally{
            setLoading(false)
        }
    }

    return(
        <>
        {
            error &&  (
                <p>{error}</p>
            )
        }
            <form className="max-w-xl mx-auto space-y-4 " onSubmit={handleSubmit}>
                <textarea 
                 className="
                 w-full
                 border
                 rounded-lg
                 p-3
                 "
                 name="content"
                 id="content"
                 onChange={handleChange}
                 value={formData.content}
                 />

            <button
                className="
                 bg-blue-600
                 text-white
                 px-4
                 py-2
                 rounded-lg
                 disabled:opacity-50
                "
                type="submit" disabled={loading}>
                {loading ? "Publishing..." : "Publish"}
            </button>
            </form>
        </>
    )
}