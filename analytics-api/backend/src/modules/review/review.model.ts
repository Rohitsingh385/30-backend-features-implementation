import {Schema, model} from "mongoose"

const reviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    reviewerName : {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
        default: ""
    }
}, {
    timestamps: true
})

export const Review = model('Review', reviewSchema)