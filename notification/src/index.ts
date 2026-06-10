import express from "express"
import User from "./modules/Auth/user.routes.js"
import Post from "./modules/Posts/post.route.js"
import Follow from "./modules/Follow/follow.route.js";
const app = express();

app.use(express.json())
app.use('/api/v1/', User)
app.use('/api/v1/', Post)
app.use('/api/v1/', Follow)

export default app;