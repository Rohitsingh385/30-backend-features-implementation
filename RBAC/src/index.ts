import express from "express"
import Auth from "./features/auth/auth.route.js"
import Post from "./features/post/post.route.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/", Auth)
app.use("/api/v1/", Post)
export default app 