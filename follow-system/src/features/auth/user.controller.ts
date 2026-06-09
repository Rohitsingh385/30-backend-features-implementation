import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { signupSchema, loginSchema } from "./user.validation.js"
import { signUpModel } from "./user.model.js"
import bcrypt from "bcryptjs"
export const JWT_SECRET = 'donotStoreJwtLikeThis'

export const signup = async (req: Request, res: Response) => {

    try {
        const body = signupSchema.parse(req.body)
        
        const { name, email, password } = body;

        const checkExisting = await signUpModel.findOne({
            email
        })
        if (checkExisting) {
            return res.status(409).json({
                message: 'user already exists'
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await signUpModel.create({
            name: name,
            email: email,
            password: hashPassword
        })

        
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
        return res.status(201).json({
            message: 'user registered',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'something went wrong'
        })
    }


}
export const signin = async (req: Request, res: Response) => {
    try {

        const body = loginSchema.parse(req.body);
        const { email, password } = body;

        const user = await signUpModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch || email === undefined){
            return res.status(401).json({
                message: 'invalid password'
            })
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: 'user logged in',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}