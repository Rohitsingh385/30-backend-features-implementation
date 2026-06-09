import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

friendSchema.index(
    {
        user1: 1,
        user2: 1
    },
    {
        unique: true
    }
)

export const friendModel = mongoose.models.Friend || mongoose.model('Friend', friendSchema)