import express from "express"
import authentication from "./features/auth/user.route.js"
import users from "./features/follow/follow.route.js"
import friends from "./features/friends/friend.route.js"
const app = express()
app.use(express.json())

app.use('/api/v1', authentication)
app.use('/api/v1', users)
app.use('/api/v1', friends)
export default app
