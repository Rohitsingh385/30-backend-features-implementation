import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 10,
        maxLength: 50,
        required: true
    },
    content: {
        type: String,
        minLength: 30,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likesCount: {
        type: Number,
        default: 0
    }
})

export const Post = mongoose.model('Post', postSchema)