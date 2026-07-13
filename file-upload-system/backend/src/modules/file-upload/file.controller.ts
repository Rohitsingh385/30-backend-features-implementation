import type { Request, Response } from "express";
import mongoose from "mongoose";
import { deleteFile, getMyFiles, uploadFile } from "./file.service.js";

export const uploadFileController = async (req: Request, res: Response) => {
    
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File is required"
        })
    }

    const ownerId = new mongoose.Types.ObjectId().toString()

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

    const { id } = req.params;

    const ownerId = new mongoose.Types.ObjectId().toString()

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