import 'dotenv/config'
import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "./User.model.js"
const SECRET = 'SUPERSECRETKEY'
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as {
            name: string,
            email: string,
            password: string
        }
        
        if (!email || !password || password.length < 6) {
            return res.status(400).json({
                message: 'validation error'
            })
        }

        const checkExists = await User.findOne({
            email: email
        })

        if (checkExists) {
            return res.status(404).json({
                message: 'email already registered'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        })
         await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || SECRET, { expiresIn: '1h' })

        return res.status(201).json({
            user: {
                name: user.name,
                email: user.email,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const {email, password} = req.body as {
            email: string,
            password: string
        }
        const user = await User.findOne({
            email: email
        })
        if(!user){
            return res.status(409).json({
                message: 'invalid credentials'
            })
        }

        const verifyPassword = bcrypt.compare(password, user.password)
        if(!verifyPassword){
            return res.status(409).json({
                message: 'invalid password'
            })
        }
        const token = jwt.sign({_id: user._id}, SECRET, {expiresIn: '1h'})
        return res.status(200).json({
            user: {
                name: user.email
            },
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}


export const me = async (req: Request, res: Response) => {
    try {
        const userId = req.id
        if(!userId){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        const user = await User.findOne({
            _id: userId
        })
        return res.status(200).json({
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}
export const logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: 'user logged out'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}