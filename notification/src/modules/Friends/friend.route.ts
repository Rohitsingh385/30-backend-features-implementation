import Router from "express"
import { authMiddleware } from "../Auth/user.middleware.js"
import {sendReq, acceptReq, rejectReq, incomingReq, outgoingReq} from "./friend.controller.js"
const Friend = Router()

Friend.post('/friend-requests/:userId',authMiddleware, sendReq)
Friend.patch('/friend-requests/:requestId/accept', authMiddleware, acceptReq)
Friend.patch('/friend-requests/:requestId/reject',authMiddleware, rejectReq)
Friend.get('/friend-requests/incoming', authMiddleware, incomingReq)
Friend.get('/friend-requests/outgoing', authMiddleware,outgoingReq)

export default Friend 