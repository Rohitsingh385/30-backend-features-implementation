import {Schema, Document, model} from "mongoose"

import { createPostInput } from "./post.validate.js"
export interface IPost extends Document{
    title: createPostInput['body']['title'];
    content: createPostInput['body']['content'];
    author: Types.ObjectId
}

const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

export default model<IPost>('Post', postSchema)