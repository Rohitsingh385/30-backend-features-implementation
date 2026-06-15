import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    actorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ["POST_LIKE", "USER_FOLLOW", "USER_COMMENT", "USER_REQUEST", "REQUEST_ACCEPTED"],
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        
    },
    isRead: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

notificationSchema.index({
    recipientId: 1,
    createdAt: -1
})
export const Notification = mongoose.model('Notification', notificationSchema)