
import mongoose, {Schema} from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
}
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true ,
        trim: true,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}) 
export const User =  mongoose.model('User', userSchema)