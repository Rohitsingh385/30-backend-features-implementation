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

export const Product = model("Product", ProductSchema)