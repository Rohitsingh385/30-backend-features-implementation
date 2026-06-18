import Router from "express"
import {register, login, refresh, logout} from "./auth.controller.js"
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.put('/refresh', refresh)
router.delete('/logout', logout)
export default router;