import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
    name: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    rating: Number,
    stock: Number,
    discount: Number,
    isPublished: Boolean,

}, {
    timestamps: true
})

ProductSchema.index({
    category: 1
})
ProductSchema.index({
    brand: 1
})
ProductSchema.index({
    price: 1
})

ProductSchema.index({
    category: 1,
    brand: 1
})

export const Product = model("Product", ProductSchema)