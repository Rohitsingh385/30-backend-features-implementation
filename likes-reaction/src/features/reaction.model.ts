import mongoose, { mongo } from "mongoose";

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    reactions: {
        type: String,
        enum: ["like", "heart", "laugh", "sad", "angry"]
    }
} , {timestamps: true})

reactionSchema.index({
    userId: 1,
    postId: 1
}, {
    unique: true
})

export const reactModel = mongoose.model('Reaction', reactionSchema)