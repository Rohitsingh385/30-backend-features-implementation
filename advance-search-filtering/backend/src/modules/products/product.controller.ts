import type { Request, Response } from "express"
import type { ProductValidateInput } from "./product.validation.js"
import { addProduct } from "./product.service.js"
import { sendResponse } from "../../utils/sendResponse.js"
export const addProductController = async (req: Request<ProductValidateInput>, res: Response) => {
    const productData = req.body
    const data = await addProduct({
        productData
    })

    return sendResponse(
        true,
        "Product added",
        data
    )
}
export const getProductController = async (req: Request, res: Response) => {

}