import { api } from "./axios";

export const getUsers = ()=> {
    return api.get("/auth")
}

export const followUser = (userId: string) => {
    return api.post(`/follows/${userId}`)
}

export const unfollowUser = (userId: string) => {
    return api.delete(`/follows/${userId}`)
}
