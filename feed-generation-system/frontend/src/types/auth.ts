export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
export interface User {
    _id: string;
    username: string;
    passoword: string;
}
export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token?: string;
    }
}