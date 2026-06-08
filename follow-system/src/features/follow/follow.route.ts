import Router from "express"

import {follow, delFollow, followers, following, followersCount, followingCount} from "./follow.controller.js"
import { authMiddleware } from "../auth/auth.middleware.js";
const router = Router()

router.post('/users/:id/follow',authMiddleware,  follow)
router.delete('/users/:id/follow' ,authMiddleware, delFollow)

router.get('/users/:id/followers', followers)
router.get('/users/:id/following', following)

router.get('/users/:id/followers/count', followersCount)
router.get('/users/:id/following/count', followingCount)

export default router