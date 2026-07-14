import type { Request, Response } from "express";
import { deleteFile, getMyFiles, uploadFile ,getFileById } from "./file.service.js";

const DEMO_USER_ID = "68700123456789abcdef1234";

export const uploadFileController = async (req: Request, res: Response) => {
    
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File is required"
        })
    }

    const ownerId = DEMO_USER_ID

    const uploadedFile = await uploadFile({
        file: req.file,
        ownerId
    })

    return res.status(201).json({
        success: true,
        data: uploadedFile
    })
}


export const deleteFileController = async(req: Request, res: Response)=> {

    console.log('dasdasd')
    const { id } = req.params;
    console.log(id)
    const ownerId = DEMO_USER_ID
    
  
    await deleteFile({
        fileId: id,
        ownerId
    })

    return res.status(200).json({
        success: true,
        message: "File deleted successfully"
    })
}

export const getMyfilesController = async(req: Request, res: Response)=> {
    
    const ownerId = DEMO_USER_ID

    const files = await getMyFiles(ownerId)
    return res.status(200).json({
        success: true ,
        data: files
    })
}

export const getMyfilesByIdController = async(req: Request, res: Response)=>{

    const ownerId = DEMO_USER_ID

    const file = await getFileById(req.params.id, ownerId)

    res.json({
        success: true,
        data: file
    })
}