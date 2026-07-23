import { Product } from "./product.model"
import { createProductInput, updateProductInput } from "./product.validation"
import { ApiError } from "../../utils/ApiError"
export const createProduct = async (data: createProductInput["body"]) => {

    return await Product.create(data)
}

export const getProducts = async (filters: {category?: string}) => {

    const query = {}
    if(filters.category){
        query.category = filters.category
    }
    const products = Product
        .find(query)
        .sort({ createdAt: -1 })

    return products
}
export const getProductById = async (productId: string) => {

    const product = await Product.findById(productId)
    
    return product
}

export const updateProductById = async(productId:  string, data: updateProductInput["body"]) => {

    const product = await Product.findByIdAndUpdate(productId, data, {new: true, runValidators: true})
    if(!product){
        throw new ApiError(
            404,
            'product not found'
        )
    }
    return product
}
