import mongoose, { Schema} from "mongoose";
import { ROLES, type Role} from "./auth.type.js";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true 
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
        required: true
    }
}, {
    timestamps: true 
})

export const User = mongoose.model<IUser>("User", userSchema)