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
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    }
}, {timestamps: true})

export const friendRequestModel = mongoose.model('FriendRequest', friendRequest)