import { Product } from "./product.model.js"
import type { ProductCreateInput, ProductQueryInput } from "./product.validation.js"
import { buildFilter, buildSort } from "./product.query.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const addProduct = async (productData: ProductCreateInput) => {

    const product = await Product.create(productData)

    return product
}

export const getProductsService = async (query: ProductQueryInput["query"])=> {

    const filter = buildFilter(query)
    const sort = buildSort(query.sort)

    const limit = query.limit ?? 20

    const products = await Product.find(filter)
        .sort(sort)
        .limit(limit)

    return products
}