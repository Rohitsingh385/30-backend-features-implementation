import { User } from "./auth.model.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";
import bcrypt from "bcrypt"
import { ROLES } from "./auth.type.js";
import { env } from "../../config/env.js";
import jwt from "jsonwebtoken"
export const registerUser = async(input: RegisterInput)=> {
    const existingUser = await User.findOne({
        email: input.email
    })

    if(existingUser){
        throw new Error("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)

    const user = await User.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        role: ROLES.USER
    })
    return user
}

export const loginUser = async(input: LoginInput)=> {

    try{
        const user = await User.findOne({
            email : input.email
        })
        if(!user){
            throw new Error("Invalid credentials")
        }
        const password = await bcrypt.compare(input.password, user.password)
        if(!password){
            throw new Error("Invalid credentials")
        }
        const token = jwt.sign({_id: user._id}, env.JWT_SECRET, {expiresIn: '1d'} )

        return {
            token ,
            user
        }
    }catch(error){

    }
}