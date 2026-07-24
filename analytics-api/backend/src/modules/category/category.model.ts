import {Schema, model} from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    description: {
        type: String,
        trim: true,
        default: "",
    }
}, {
    timestamps: true
})

export const Category = model("Category", categorySchema)