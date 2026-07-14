import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import FileUpload from "./modules/file-upload/file.routes.js"

const app = express()

app.use(cors({}))
app.use(express.json())

app.get("/health", (req, res) => {
    //console.log(req)

    return res.status(200).json({
        success: true,
        message: 'health ok'
    })
})

app.use("/api/v1/", FileUpload)

const startServer = async () => {
    await connectDB()

    app.listen(process.env.PORT, () => {
        console.log(`app is listening on port ${process.env.PORT}`)
    })
}

startServer()