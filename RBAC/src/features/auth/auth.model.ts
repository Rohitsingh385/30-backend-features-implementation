import { Schema, model, Document, Types  } from "mongoose";
import bcrypt from "bcryptjs"
import type { NextFunction } from "express";
import type { RegisterInput}  from "./auth.schema.js";

export interface IUser extends Document{
    email: RegisterInput['body']['email']
    password: RegisterInput['body']['password']
    comparePassword(password: string): Promise<boolean>
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre<IUser>('save', async function(){
    if(!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10)
    
})

userSchema.methods.comparePassword  = async function(password: string): Promise <boolean>{
    return bcrypt.compare(password, this.password)
};

export default model<IUser>('User', userSchema)