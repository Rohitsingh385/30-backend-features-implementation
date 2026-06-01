import {Router} from "express"

import { commentController, reply, getreply , getBachData} from "./comment.controller.js";

const router = Router();

router.get('/comments', commentController)
router.post('/reply', reply)
router.get('/replies', getreply)
router.get('/batch', getBachData)

export default router;