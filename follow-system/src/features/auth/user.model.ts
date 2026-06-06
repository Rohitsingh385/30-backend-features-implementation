import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,

    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})


export const signUpModel = mongoose.model('User', signupSchema);

