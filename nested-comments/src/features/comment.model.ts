import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Post',
        required: true
    }
}, {timestamps: true})

export const commentModel = mongoose.model('Comment', commentSchema)