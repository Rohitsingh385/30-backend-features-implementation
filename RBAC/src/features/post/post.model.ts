import {Schema, Document, model} from "mongoose"


export interface IPost extends Document{
    title: string
    content: string
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