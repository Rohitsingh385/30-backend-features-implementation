import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs"

import { RegisterInput } from "./auth.schema.js";

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

userSchema.pre<IUser>('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword  = async function(password: strign): Promise <boolean>{
    return bcrypt.compare(password, this.password)
};

export default model<IUser>('User', userSchema)