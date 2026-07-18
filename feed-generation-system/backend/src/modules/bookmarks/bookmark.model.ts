import { Schema, model } from "mongoose"

const bookMarkSchema = new Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
        trim: true
    },
    postId: {
        type: String,
        ref: "Post",
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export const BookMark = model("Bookmark", bookMarkSchema)