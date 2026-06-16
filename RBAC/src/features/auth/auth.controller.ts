import type {Request, Response} from "express"
import User from "./auth.model.js"
import { generateAccessToken, generateRefreshToken } from "./util.token.js"
import jwt from 'jsonwebtoken'
import type { RegisterInput, loginInput } from "./auth.schema.js"

export const register = async (req: Request<{}, {}, RegisterInput['body']>, res: Response): Promise<any>=> {
    try{
        const { email, password}= req.body;
        const existingUser = await User.findOne({ email})
        if(existingUser) return res.status(400).json({
            message: 'email already exists'
        })
        const user = new User({email, password})
        
        await user.save()
        return res.status(201).json({
            message: 'User registered successfully'
        })
    }catch(error: any){
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

export const login = async (req: Request<{}, {}, loginInput['body']>, res: Response): Promise<any> => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email})
        if(!user || !(user.comparePassword(password))){
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({ accessToken, userId: user._id})
    }catch(error: any){
        return res.status(500).json({
            message: 'server error',
            error: error.message
        })
    }
}

export const refresh = async (req: Request, res: Response): Promise<any> => {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.status(401).json({
        message: 'Unauthorized'
    })
    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
        const user = await User.findById(decoded.userId);
        if(!user) return res.status(401).json({
            message: 'User no longer exists'
        })
        const newAccessToken = generateAccessToken(user);
        return res.status({ accessToken: newAccessToken})
    }catch(error){
        return res.status(403).json({
            message: 'Forbideen or expired refresh Token'
        })
    }
}

export const logout = (req: Request, res: Response): void => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:'strict'
    })
    res.json({
        message: 'Logged out successfully'
    })
}