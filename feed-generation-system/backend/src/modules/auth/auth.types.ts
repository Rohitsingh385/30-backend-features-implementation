export interface JwtPayload {
    userId: string
}

export interface AuthUser {
    _id: string;
    username: string;
    email: string;
}