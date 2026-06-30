import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { register, login, getMe } from "./auth.controller.js"
const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', getMe)
export default router