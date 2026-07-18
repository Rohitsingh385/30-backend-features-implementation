import { api } from "./axios"

export const getBookmark = async({cursor , limit = 10}: {cursor?: string, limit: number}) => {

    const response = await api.get("/bookmarks" ,
        {
        params: {
            cursor,
            limit
        }
    })
    return response.data
}

export const removeBookmark = async(postId: string) => {
    const response = await api.delete(`/bookmarks/${postId}`)
    return response.data
}

export const saveBookmark = async(postId: string)=> {
    const response = await api.post(`/bookmarks/${postId}`)
    return response.data
}