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
    tags: {
        type: [String],
        default: [],
        index: true
    }
}, {timestamps: true})

postSchema.index({
    author: 1,
    createdAt: -1
})
export const Post = model("Post", postSchema)