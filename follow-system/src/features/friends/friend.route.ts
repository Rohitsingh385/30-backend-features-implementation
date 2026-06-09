import Router from "express"
import { authMiddleware } from "../auth/auth.middleware.js"
import {acceptFriend, addFriend, rejectRequest, incomingRequest, outgoingRequests
    , FriendList
}  from "./friend.controller.js"
const router = Router()

router.post('/request/:id/send',authMiddleware,  addFriend)
router.post('/request/:id/add',authMiddleware,  acceptFriend)
router.post('/request/:id/reject',authMiddleware,  rejectRequest)
router.post('/request/incoming',authMiddleware,  incomingRequest)
router.post('/request/outgoing',authMiddleware,  outgoingRequests)
router.post('/request/list',authMiddleware,  FriendList)

export default router;