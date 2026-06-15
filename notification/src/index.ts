import express from "express"
import User from "./modules/Auth/user.routes.js"
import Post from "./modules/Posts/post.route.js"
import Follow from "./modules/Follow/follow.route.js";
import Friend  from "./modules/Friends/friend.route.js";
import Like from "./modules/Likes/likes.route.js";
const app = express();

app.use(express.json())
app.use('/api/v1/', User)
app.use('/api/v1/', Post)
app.use('/api/v1/', Follow)
app.use('/api/v1/', Friend)
app.use('/api/v1/', Like)

export default app;