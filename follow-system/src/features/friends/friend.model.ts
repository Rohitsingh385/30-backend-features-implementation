import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        enum: ["PENDING", "ACCEPTED", "REJECTED"]
    }
})

export const friendModel = mongoose.model('Friend', friendSchema)