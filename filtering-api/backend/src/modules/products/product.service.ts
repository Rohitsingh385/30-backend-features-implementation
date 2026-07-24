import { Product } from "./product.model"
import { createProductInput, updateProductInput, getProductsInput } from "./product.validation"
import { ApiError } from "../../utils/ApiError"
import { ProductQueryBuilder } from "./product.query.builder"
export const createProduct = async (data: createProductInput["body"]) => {

    return await Product.create(data)
}

export const getProducts = async (filters: getProductsInput["query"]) => {

    const builder = new ProductQueryBuilder(
        Product.find(),
        filters
    )
    builder.filter().search()

    const total = await Product.countDocuments(builder.getFilter())

    builder.sort().paginate()

    const products = await builder
        .build()
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const totalPages = Math.ceil(total / limit);
    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
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



