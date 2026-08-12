import { Router } from "express";

import ChatHistoryController from "../Controllers/ChatHistoryController.js";
import authMiddleware from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/session", authMiddleware, ChatHistoryController.createSession);
router.get("/session", authMiddleware, ChatHistoryController.listSessions);
router.get("/session/:id", authMiddleware, ChatHistoryController.getHistory);
router.delete(
  "/session/:id",
  authMiddleware,
  ChatHistoryController.deleteSession,
);
router.post("/message", authMiddleware, ChatHistoryController.sendMessage);

export default router;
