
import multer from "multer"

const storage = multer.memoryStorage()

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"]

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only jpeg and PNG files are allowed"))
    }
}
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})






