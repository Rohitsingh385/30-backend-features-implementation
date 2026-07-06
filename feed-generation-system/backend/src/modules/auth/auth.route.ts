import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { register, login, getMe, logout, getUsersController } from "./auth.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', authMiddleware , getMe)
router.get('/', authMiddleware , getUsersController)
router.get('/logout', authMiddleware , logout)

export default router