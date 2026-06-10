import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    }
}, {timestamps: true})

userSchema.index({
    email: 1
},{
    unique: true,
})

export const User = mongoose.model('User', userSchema);