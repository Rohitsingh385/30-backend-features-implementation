import express from "express"
import User from "./modules/Auth/user.routes.js"
import Post from "./modules/Posts/post.route.js"
const app = express();

app.use(express.json())
app.use('/api/v1/', User)
app.use('/api/v1/', Post)

export default app;