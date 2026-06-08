import mongoose from "mongoose";

const friendRequest = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        enum: ["PENDING", "ACCEPTED", "REJECTED"]
    }
}, {timestamps: true})

export const friendRequestModel = mongoose.model('Friend', friendRequest)