

import { Request, Response } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import { productIdInputs, addProductInput, updateProductInput } from "./product.validation"
import { getProduct, getProductById, addProduct, updateProduct } from "./product.service"

export const getProductController = asyncHandler(async (req: Request, res: Response) => {

    const result = await getProduct()
    return res.status(200).json({
        success: true,
        message: "all products",
        data: result
    })
})

export const getProductByIdController = asyncHandler(async (req: Request<productIdInputs["params"]>, res: Response) => {
    console.log(req.params.id)
    const result = await getProductById(req.params.id)
    //console.log(result)
    return res.status(200).json({
        success: true,
        message: 'record found',
        data: result
    })
})
export const addProductController = asyncHandler(async (req: Request<{}, addProductInput["body"]>, res: Response) => {

    const result = await addProduct(req.body)

    return res.status(201).json({
        success: true,
        message: "product added",
        data: result
    })
})
export const updateProductController = asyncHandler(async (req: Request<productIdInputs["params"], {}, updateProductInput["body"]>, res: Response) => {

    const result = await updateProduct(req.params.id, req.body)


    return res.status(201).json({
        success: true,
        message: "product updated",
        data: result
    })
})
