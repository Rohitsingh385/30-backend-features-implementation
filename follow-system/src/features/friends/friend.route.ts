import Router from "express"
import { authMiddleware } from "../auth/auth.middleware.js"
import {addFriend}  from "./friend.controller.js"
const router = Router()

router.post('/request/:id/send',authMiddleware,  addFriend)

export default router;