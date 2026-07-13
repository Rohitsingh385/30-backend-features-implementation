
import { File, StorageProvider } from "./file.model.js"
import { uploadToCloudinary , deleteFromCloudinary } from "./cloudinary.service.js";

interface UploadFileInput {
    file: Express.Multer.File;
    ownerId: string

}

interface DeleteFileInput {
    fileId: string,
    ownerId: string
}
export const uploadFile = async ({ file, ownerId }: UploadFileInput) => {

    let cloudinaryResult;

    try {
        cloudinaryResult = await uploadToCloudinary(file.buffer)
        const uploadedFile = await File.create({
            ownerId,
            originalName: file.originalname,
            publicId: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url,
            mimeType: file.mimetype,
            size: file.size,
            resourceType: cloudinaryResult.resource_type,
            storageProvider: StorageProvider.CLOUDINARY
        })
        return uploadedFile
    } catch (error) {
        if (cloudinaryResult?.public_id) {
            await deleteFromCloudinary(cloudinaryResult.public_id)
        }

        throw error
    }
}

export const deleteFile = async({fileId, ownerId}: DeleteFileInput)=> {

    const file = await File.findById(fileId)

    if(!file){
        throw new Error("File not found")
    }

    if(file.ownerId.toString() !== ownerId){
        throw new Error("You are not authorized to delete this file")
    }

    await deleteFromCloudinary(file.publicId)

    await file.deleteOne()

    return
}

export const getMyFiles = async(ownerId: string) => {
    return await File.find({ ownerId })
        .sort({ createdAt: -1 })
        .select("-__v")
}

export const getFileById = async(fileId: string, ownerId: string)=> {
    const file =  File.find({
        _id: fileId,
        ownerId
    })

    if(!file){
        throw new Error("File not found")
    }

    return file
}