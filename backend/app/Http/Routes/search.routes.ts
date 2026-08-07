import { Router } from "express";

import SearchController from "../Controllers/SearchController.js";
import authMiddleware from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, SearchController.search);

export default router;