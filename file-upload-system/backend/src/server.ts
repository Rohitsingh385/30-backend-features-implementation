import express from "express"
import cors from "cors"
import multer from "multer"
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "uploads/")
    },
    filename: (req,file, cb)=> {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})

const fileFilter : multer.Options["fileFilter"] = (req, file, cb)=> {
    const allowedMimeTypes = ["image/jpeg", "image/png"]

    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
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
app.use(cors({
    
}))
app.use(express.json())

app.get("/health", (req,res)=> {
    //console.log(req)
    return res.status(200).json({
        success:true,
        message: 'health ok'
    })
})


app.post("/upload", upload.single("file"),(req,res)=> {
    console.log("Content-Type:", req.headers["content-type"])
    console.log("req.body:", req.body)
    console.log('req.file:', req.file)

    res.status(200).json({
        success: true,
        body: req.body
    })
})

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`app is listening on port ${PORT}`)
})