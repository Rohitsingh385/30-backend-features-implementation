import cookieParser from "cookie-parser";
import  express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import cors from "cors"
import Auth from "./modules/auth/auth.route.js"
import PostRouter from "./modules/posts/post.routes.js"
import likeRouter from "./modules/like/like.routes.js"
import FollowRouter from "./modules/follows/follow.routes.js"

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
app.use('/api/v1/posts', PostRouter)
app.use('/api/v1/likes', likeRouter)
app.use('/api/v1/follows', FollowRouter)
app.use((req,res)=> {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(globalErrorHandler)
export default app