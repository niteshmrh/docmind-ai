import { Router } from "express";

import ChatController from "../Controllers/ChatController.js";
import authMiddleware from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, ChatController.ask,);

export default router;