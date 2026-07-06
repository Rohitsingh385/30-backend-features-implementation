import { Schema, model } from "mongoose";

const followSchema = new Schema(
    {
        followerId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"

        },
        followingId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },{
        timestamps: true
    }
)

followSchema.index(
    {
        followerId: 1,
        followingId: 1
    },{
        unique: true
    }
)

export const Follow = model("Follow", followSchema)