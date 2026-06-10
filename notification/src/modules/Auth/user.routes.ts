import Router from "express"
import { register, login , me , logout } from "./user.controller.js"
import { authMiddleware } from "./user.middleware.js"
const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)

router.get('/auth/me',authMiddleware, me)
router.post('/auth/logout', logout)

export  default router