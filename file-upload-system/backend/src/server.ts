import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import multer from "multer"
import cloudinary from "./config/cloudinary.js"
const app = express()
app.use(cors({

}))
app.use(express.json())


const uploadToCloudinary = (buffer: Buffer) => {
    return new Promise((resolve, reject)=> {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "file-upload-system"
            },
            (error, result)=> {
                if(error){
                    reject (error)
                    return
                }
                resolve(result)
            }
        )
        uploadStream.end(buffer)
    })
}
const storage = multer.memoryStorage()

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png"]

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only jpeg and PNG files are allowed"))
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})


app.get("/health", (req, res) => {
    //console.log(req)

    return res.status(200).json({
        success: true,
        message: 'health ok'
    })
})


app.post("/upload", upload.single("file"), async(req, res) => {
    const signature = req.file?.buffer.subarray(0, 4).toString("hex")
    const isJpeg = signature?.startsWith("ffd8ff")
    const isPng = signature === "89504e47"
    // console.log("First 4 bytes:", firstBytes)
    // console.log("hex signature:", firstBytes?.toString("hex"))

    // console.log("Content-Type:", req.headers["content-type"])
    // console.log("req.body:", req.body)
    // console.log('req.file:', req.file)

    if(!isJpeg && !isPng){
        return res.status(400).json({
            success: false,
            message: "Invalid file content"
        })
    }
    const result = await uploadToCloudinary(req.file.buffer)
    console.log("Cloudinary result:", result)
    res.status(200).json({
        success: true,
        body: req.body
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})