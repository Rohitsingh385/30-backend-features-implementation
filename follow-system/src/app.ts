import express from "express"
import authentication from "./features/auth/user.route.js"

const app = express()
app.use(express.json())
app.use('/api/v1', authentication)

export default app
