import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 10
    },
    content: {
        type: String,
        required: true,
        minLength: 10
    },
    likesCount: {
        type: Number,
        min: 0
    }
})

export const postModel = mongoose.model('Post', PostSchema)