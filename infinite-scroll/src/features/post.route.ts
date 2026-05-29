import { Router } from "express";

import { validate } from "../middleware/validate.js";

import { postPaginationQuery } from "./post.validation.js"

import { postController} from "./post.controller.js"

import { cursorPaginationQuery } from "./post.cursor.validation.js";

import { cursorController } from "./post.cursor.controller.js";

const router = Router();

console.log('router start');

router.get('/', validate(postPaginationQuery), postController)

router.get('/cursor-posts', validate(cursorPaginationQuery), cursorController)

export default router;