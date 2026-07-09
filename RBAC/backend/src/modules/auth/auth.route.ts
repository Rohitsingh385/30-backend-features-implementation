import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { loginController, registerController } from "./auth.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router()

router.post("/register", validate(registerSchema), registerController)
router.post("/login", validate(loginSchema), loginController)
router.get(
  "/me",
  authenticate,
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);
export default router