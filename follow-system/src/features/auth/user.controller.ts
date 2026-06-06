import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { signupSchema, loginSchema } from "./user.validation.js"
import { signUpModel } from "./user.model.js"
import bcrypt from "bcryptjs"
const JWT_SECRET = 'donotStoreJwtLikeThis'
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
         const hashPassword = bcrypt.hash(password, 10)
        const newUser = await signUpModel.create({
            name: name,
            email: email,
            password:
        })

        const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
            message: 'user registered',
            token: token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        })
    }


}
export const login = async (req: Request, res: Response) => {
    try {

        const body = loginSchema.parse(req.body);
        const { email, password } = body;

        const user = await signUpModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' })

        return res.status(200).json({
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
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}