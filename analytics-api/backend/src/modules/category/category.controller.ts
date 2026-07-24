
import { Request, Response } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import { saveCategoryInput, valiateObjectInput } from "./category.valdiation"
import { addCategory, updateCategory, getCategory } from "./category.service"


export const getCategoryController = asyncHandler(async(req: Request, res: Response)=> {

    const result = await getCategory()

    return res.status(200).json({
        success: true,
        message: 'all category',
        data: result
    })
})  
export const addCategoryController = asyncHandler(async (req: Request<{}, {}, saveCategoryInput["body"]>, res: Response) => {
    const result = await addCategory(req.body)

    return res.status(201).json({
        success: true,
        message: 'success',
        data: result
    })

})

export const updateCategoryController = asyncHandler(async (req: Request<valiateObjectInput["params"], {}, saveCategoryInput["body"]>, res: Response) => {
    const { id } = req.params;
    const result = await updateCategory(id, req.body,)

    return res.status(201).json({
        success: true,
        message: 'success',
        data: result
    })

})