import { api } from "./axios";

export const registerUser = (data: RegisterRequest)=> {
    return api.post("/auth/register", data)
}
export const loginUser = (data: LoginRequest)=> {
    return api.post("/auth/login", data)
}
export const getCurrentUser = () => {
    return api.get("/auth/me")
}

export const logoutUser = () => {
    return api.post("/auth/logout")
}