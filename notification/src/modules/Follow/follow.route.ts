import Router from "express"
import { authMiddleware } from "../Auth/user.middleware.js"
import {follow, unfollow, getFollowers, getFollowing} from "./follow.controller.js"
const Follow = Router()

Follow.post('/users/:userId/follow',authMiddleware, follow)
Follow.delete('/users/:userId/follow',authMiddleware, unfollow)

Follow.get('/users/:userId/followers', authMiddleware, getFollowers)
Follow.get('/users/:userId/following',authMiddleware,  getFollowing)
export default Follow