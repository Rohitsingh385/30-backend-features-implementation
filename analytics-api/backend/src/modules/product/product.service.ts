
import { ApiError } from "../../utils/ApiError"
import { Product } from "./product.model"
import { productIdInputs, addProductInput, updateProductInput } from "./product.validation"

export const getProduct = async () => {

    const product = await Product.find().sort({ createdAt: -1 })
    return product
}

export const getProductById = async (id: productIdInputs["params"]) => {

    const product = await Product.findById(id)

    if (!product) {
        throw new ApiError(
            404,
            'product not found'
        )
    }
    return product
}

export const addProduct = async (data: addProductInput["body"]) => {

    const product = await Product.create(data)

    return product
}
export const updateProduct = async (id: productIdInputs["params"], data: updateProductInput["body"]) => {

    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })

    if (!product) {
        throw new ApiError(
            404,
            'no product found'
        )
    }
    return product
}