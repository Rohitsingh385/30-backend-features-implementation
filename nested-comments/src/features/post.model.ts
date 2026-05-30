import mongoose, { mongo } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

const postModel = mongoose.model('Post', postSchema)

export  default postModel;