import {Router} from "express"

import { commentController } from "./comment.controller.js";

const router = Router();

router.get('/comments', commentController)

export default router;