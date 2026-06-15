import mongoose from "mongoose"


const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

likeSchema.index(
    {
        postId: 1,
        likedBy: 1
    },{
        unique: true
    }
)

export const LikeModel = mongoose.model('Like', likeSchema)