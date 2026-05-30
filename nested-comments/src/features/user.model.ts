import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 40,
    },
    email: {
        type: String,
        trim: true,
        toLowerCase: true,
        required: true
    }
}, {timestamps: true})

export const userModel = mongoose.model('User', userSchema)