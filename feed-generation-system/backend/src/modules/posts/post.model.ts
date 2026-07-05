import { Schema, model } from "mongoose";

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength:1000
    },
    likesCount: {
        type: Number,
        default: 0,
        min: 0
    },
    commentsCount: {
        type: Number,
        default: 0       
    },
}, {timestamps: true})

export const Post = model("Post", postSchema)