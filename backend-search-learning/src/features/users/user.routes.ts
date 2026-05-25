import {Router} from "express"

import { searchUsers } from "./user.controller.js"

import { validate } from "../../middleware/validate.js"

import { searchUsersQuerySchema } from "./user.validation.js"

const router = Router()

router.get('/search', validate(searchUsersQuerySchema) ,searchUsers);

export default router;