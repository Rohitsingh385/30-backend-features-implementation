import { Request, Response } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import { addReviewInput, updateReviewInput, ReviewIdInput } from "./review.validation"
import { addReview, updateReview, getReviewById } from "./review.service"

export const addReviewController = asyncHandler(async (req: Request<addReviewInput["params"], {}, addReviewInput["body"]>, res: Response) => {

    const {productId} = req.params
   
    
    const result = await addReview(productId, req.body)

    return res.status(201).json({
        success: true,
        message: 'review added',
        data: result
    })
})


export const getReviewByIdController = asyncHandler(async (req: Request<addReviewInput["params"]>, res: Response) => {

    //console.log(req.params.reviewId)
    const result = await getReviewById(req.params.productId)

    return res.status(200).json({
        success: true,
        message: 'all reviews',
        data: result
    })
})


export const updateReviewController = asyncHandler(async (req: Request<ReviewIdInput["params"], {}, updateReviewInput["body"]>, res: Response) => {


    const result = await updateReview(req.params.reviewId, req.body)

    return res.status(201).json({
        success: true,
        message: 'product updated',
        data: result
    })
})
