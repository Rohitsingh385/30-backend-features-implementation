import { Product } from "./product.model.js"
import type { ProductValidateInput } from "./product.validation.js"

export const addProduct = async (productData: ProductValidateInput) => {

    await Product.create({
        name: productData.body.name,
        description:  productData.body.description,
        category: productData.body.category,
        brand: productData.body.brand,
        price: productData.body.price,
        rating: productData.body.rating,
        stock:productData.body.stock
    })
}