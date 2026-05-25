import express from "express"
import userRoutes from "./features/users/user.routes.js"
const app = express();
app.use(express.json())

app.use("/users", userRoutes)

export default app;