import { Router } from "express";
import { deleteFileController, getMyfilesController, uploadFileController ,getMyfilesByIdController} from "./file.controller.js";
import { upload } from "./upload.middleware.js"

const router = Router()

router.post("/upload", upload.single("file"), uploadFileController)
router.delete("/:id", deleteFileController)
router.get("/", getMyfilesController)
router.get("/:id", getMyfilesByIdController)


export default router