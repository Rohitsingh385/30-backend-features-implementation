import type { FilterQuery, SortOrder } from "mongoose"  
import { Product } from "./product.model.js"

import type { ProductQueryInput} from "./product.validation.js"

export const buildFilter = (query: ProductQueryInput["query"]): FilterQuery<typeof Product> => {

    const { brand, category, search, minPrice, maxPrice, minRating, maxRating, inStock} = query

    const filter: FilterQuery<typeof Product> = {}
    if(brand){
        filter.brand = brand;
    }

    if(category){
        filter.category = category
    }
    if(search){
        filter.$or = [
            {name: { $regex: search, $options: "i" }},
            {description: { $regex: search, $options: "i"}}
        ]
    }

    if(minPrice !== undefined || maxPrice !== undefined){
        filter.price = {}

        if(minPrice !== undefined){
            filter.price.$gte = minPrice
        }
        if(maxPrice !== undefined){
            filter.price.$lte = maxPrice
        }
    }

    if(minRating !== undefined || maxRating !== undefined){
        filter.rating = {}
        if(minRating !== undefined){
            filter.rating.$gte = minRating
        }
        if(maxRating !== undefined){
            filter.rating.$lte = maxRating 
        }
    }
    if(inStock){
        filter.stock = { $gt: 0}
    }
    return filter
}

export const buildSort = (sort?: string): Record<string, SortOrder> => {
    switch(sort){
        case "priceAsc":
            return {price: 1}
        case "priceDesc":
            return {price: -1}
        case "rating":
            return { rating: -1}
        case "newest":
            default:
                return { createdAt: -1}
    }
}