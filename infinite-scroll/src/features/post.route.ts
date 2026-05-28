import { Router } from "express";

import { validate } from "../middleware/validate.js";

import { postPaginationQuery } from "./post.validation.js"

import { postController} from "./post.controller.js"

const router = Router();

console.log('router start');

router.get('/', validate(postPaginationQuery), postController)

export default router;