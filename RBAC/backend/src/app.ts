import {env} from "./config/env.js"
import express from "express"
import cors from "cors"
import authRoutes from "./modules/auth/auth.route.js"
const app = express()
app.use(cors({
    origin: env.FRONTEND_URL
}))
app.use(express.json())


app.get("/", (req,res)=> {
    res.status(200).json({
        success: true,
        message: "health ok"
    })
})

app.use("/api/v1/", authRoutes)
export default app