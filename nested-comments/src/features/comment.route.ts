import {Router} from "express"

import { commentController, reply } from "./comment.controller.js";

const router = Router();

router.get('/comments', commentController)
router.post('/reply', reply)

export default router;