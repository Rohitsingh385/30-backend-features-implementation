import { Request, Response } from "express"
import { createProduct, getProductById, getProducts, updateProductById } from "./product.service"
import { asyncHandler } from "../../utils/asyncHandler"
import { getProductByIdInput, updateProductInput, getProductsInput } from "./product.validation"
export const createProductController = asyncHandler(async (req, res) => {

    const result = await createProduct(req.body)
    return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: result
    })
})

export const getProductsController = asyncHandler(async (req: Request<{},{},{}, getProductsInput["query"]>, res: Response) => {
    console.log(req.query)
    const result = await getProducts(req.query)

   // console.log(result)
    return res.status(200).json({
        success: true,
        message: 'success',
        data: result.products,
        pagination: result.pagination
    })
})

export const getProductByIdController = asyncHandler(async (req: Request<getProductByIdInput["params"]>, res: Response) => {
    const { productId } = req.params
    const result = await getProductById(productId)
    return res.status(200).json({
        success: true,
        message: 'success',
        data: result
    })
})

export const updateProductByIdController = asyncHandler(async(req: Request<getProductByIdInput["params"],{}, updateProductInput["body"]>, res: Response)=> {
    const { productId } = req.params

    const result = await updateProductById(productId, req.body)
    return res.status(200).json({
        success: true,
        message: 'product updated',
        data: result
    })
})