import cookieParser from "cookie-parser";
import  express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import cors from "cors"
import Auth from "./modules/auth/auth.route.js"

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req,res)=> {
    res.status(200).json({
        success: true,
        message: "API running"
    })
})

app.use('/api/v1/auth', Auth)

app.use((req,res)=> {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(globalErrorHandler)
export default app