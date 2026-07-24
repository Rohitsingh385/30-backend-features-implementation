import { ApiError } from "../../utils/ApiError"
import { Category } from "./category.model"
import { saveCategoryInput, updateCategoryInput } from "./category.valdiation"

export const getCategory = async() => {
    const result = await Category.find().sort({ createdAt: -1 })

    return result
}
export const addCategory = async (data: saveCategoryInput["body"]) => {

    const result = await Category.create(data)
    return result
}


export const updateCategory = async (id: string, data: updateCategoryInput["body"]) => {

    const result = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true })

    if (!result) {
        throw new ApiError(
            404,
            "Category not found"
        )
    }
    return result
}