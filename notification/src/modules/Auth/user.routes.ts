import Router from "express"
import { register, login , me , logout } from "./user.controller.js"
import { authMiddleware } from "./user.middleware.js"
const User = Router()

User.post('/auth/register', register)
User.post('/auth/login', login)

User.get('/auth/me',authMiddleware, me)
User.post('/auth/logout', logout)

export  default User