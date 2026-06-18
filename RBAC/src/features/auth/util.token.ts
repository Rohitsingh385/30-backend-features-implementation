import jwt from "jsonwebtoken"
import User, {type IUser} from "./auth.model.js"

export interface TokenPayload {
    userId: string;
    email?: string;
}

export const generateAccessToken = (user: IUser): string => {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn: '15m'}
    )
}

export const generateRefreshToken = (user: IUser): string => {
    return jwt.sign(
        {userId: user._id},
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn: '7d'}
    )
}