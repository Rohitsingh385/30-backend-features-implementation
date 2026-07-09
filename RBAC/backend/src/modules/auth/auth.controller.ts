import type { Request, Response } from "express";
import type { LoginInput, RegisterInput } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";

export const registerController = async (req: Request<{}, {}, RegisterInput>, res: Response) => {
    try {
        const user = await registerUser(req.body)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const loginController = async (req: Request<{}, {}, LoginInput>, res: Response) => {
    try {
        const result = await loginUser(req.body)
        return res.status(200).json({
            success: true,
            message: "User login Succesfully",
            data: {
                token: result.token,
                user: {
                    id: result.user._id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role
                }
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}