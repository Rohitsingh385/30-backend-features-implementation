import mongoose from "mongoose"

const followSchema = new mongoose.Schema({
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

followSchema.index({
    followingId: 1,
    followerId: 1
}, {unique: true})

export const Follow = mongoose.model('Follow', followSchema)