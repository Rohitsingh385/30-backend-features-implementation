import type { Request, Response } from "express"
import { addProduct, getProductsService } from "./product.service.js"
import { sendResponse } from "../../utils/sendResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
export const addProductController = asyncHandler(async (req: Request,  res: Response) => {
  
    const data = await addProduct(req.body)

    return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Product added",
        data
    })
})
export const getProductController = asyncHandler(async (req: Request, res: Response) => {
    const products = await getProductsService(req.query);

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Products fetched successfully",
        data: products
    })
})