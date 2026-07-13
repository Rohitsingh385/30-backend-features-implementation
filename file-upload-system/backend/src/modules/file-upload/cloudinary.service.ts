import cloudinary from "../../config/cloudinary.js";

export const uploadToCloudinary = (buffer: Buffer) => {
    return new Promise((resolve, reject) => {

        const signature = buffer.subarray(0, 4).toString("hex")
        const isJpeg = signature?.startsWith("ffd8ff")
        const isPng = signature === "89504e47"

        if (!isJpeg && !isPng) {
            throw new Error("file is required")
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "file-upload-system"
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result)
            }
        )
        uploadStream.end(buffer)
    })
}

export const deleteFromCloudinary = async (publicId: string) => {
    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result !== "ok" && result.result !== "not found") {
        throw new Error("Failed to delete file from cloudinary")
    }
}