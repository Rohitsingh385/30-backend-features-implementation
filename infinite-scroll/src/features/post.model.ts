import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    content: {
        type: String,
        required: true,
        minLength: 10
    },
    author: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        }
    }

}, { timestamps: true })

const postModel = mongoose.model('Post', postSchema);

export default postModel