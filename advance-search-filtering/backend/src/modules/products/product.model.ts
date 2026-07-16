import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    category: {
        type: String,
        trim: true,
        lowercase: true
    },
    brand: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
})

export const Product = model('Product' , ProductSchema)