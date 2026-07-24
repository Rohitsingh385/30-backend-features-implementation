import { addReviewInput, ReviewIdInput } from "./review.validation"
import { Review } from "./review.model"
import { Product } from "../product/product.model"
import { ApiError } from "../../utils/ApiError"

export const addReview = async (productId: string, data: addReviewInput["body"]) => {

    const checkExists = await Product.findById(productId)
    if (!checkExists) {
        throw new ApiError(
            404,
            'no product exists'
        )
    }
    const review = await Review.create({
        product: productId,
        ...data
    })

    return review

}

export const getReviewById = async (productId: string) => {
   // console.log(productId)
    const review = await Review.find({product: productId })
        .sort({ createdAt: -1 })
    return review
}
export const updateReview = async (reviewId: string, data: addReviewInput["body"]) => {

    const checkExists = await Review.findById(reviewId)
    if (!checkExists) {
        throw new ApiError(
            404,
            'no review exists'
        )
    }
    const review = await Review.findByIdAndUpdate(reviewId, data, { new: true, runValidators: true })
    if (!review) {
        throw new ApiError(
            404,
            'review not found'
        )
    }
    return review
}

