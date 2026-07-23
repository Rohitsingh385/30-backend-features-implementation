import { Product } from "./product.model"
import { createProductInput, updateProductInput, getProductsInput } from "./product.validation"
import { ApiError } from "../../utils/ApiError"
export const createProduct = async (data: createProductInput["body"]) => {

    return await Product.create(data)
}

export const getProducts = async (filters: getProductsInput["query"]) => {

    const query = {}

    if (filters.category) {
        query.category = filters.category
    }
    if (filters.brand) {
        query.brand = filters.brand
    }
    if (filters.minPrice || filters.maxPrice) {
        query.price = {}
    }
    if (filters.minPrice) {
        query.price.$gte = filters.minPrice
    }
    if (filters.maxPrice) {
        query.price.$lte = filters.maxPrice
    }
    if (filters.minRating) {
        query.rating = {
            $gte: filters.minRating
        }
    }
    // sort query
    //console.log(query)
    const sortQuery: Record<string, 1 | -1> = {
        createdAt: -1,
    }

    if (filters.sort === "price") {
        sortQuery.price = 1
    }
    if (filters.sort === "-price") {
        sortQuery.price = -1
    }
    if (filters.sort === "rating") {
        sortQuery.rating = 1
    }
    if (filters.sort === "-rating") {
        sortQuery.rating = -1
    }
    if (filters.sort === "createdAt") {
        sortQuery.rating = 1
    }
    if (filters.sort === "-createdAt") {
        sortQuery.rating = -1
    }
    
    if(filters.search){
        query.$or = [
            {
                name: {
                    $regex: filters.search,
                    $options: "i"
                },
            },
            {
                description: {
                    $regex: filters.search,
                    $options: "i"
                }
            }
        ]
    }
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page -1) * limit
    console.dir(query, {depth: null})
    const products = await Product
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
    return {
        page,
        limit,
        products
    }
}

export const getProductById = async (productId: string) => {

    const product = await Product.findById(productId)

    return product
}

export const updateProductById = async (productId: string, data: updateProductInput["body"]) => {

    const product = await Product.findByIdAndUpdate(productId, data, { new: true, runValidators: true })
    if (!product) {
        throw new ApiError(
            404,
            'product not found'
        )
    }
    return product
}



