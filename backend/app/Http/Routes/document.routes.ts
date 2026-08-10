import { Router } from "express";
import multer from "../../../config/multer.js";
import authMiddleware from "../Middlewares/auth.middleware.js";
import DocumentController from "../Controllers/DocumentController.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  multer.single("file"),
  DocumentController.upload,
);
router.get("/", authMiddleware, DocumentController.list);
router.get("/:id", authMiddleware, DocumentController.get);
router.get("/:id/download", authMiddleware, DocumentController.download);
router.patch("/:id", authMiddleware, DocumentController.rename);
router.delete("/:id", authMiddleware, DocumentController.delete);

export default router;
