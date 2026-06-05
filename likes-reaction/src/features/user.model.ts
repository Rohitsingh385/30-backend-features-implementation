import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

export const userModel = mongoose.model('User', userSchema)