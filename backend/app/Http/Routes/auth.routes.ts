import { Router } from "express";

import AuthController from "../Controllers/AuthController.js";
import { validate } from "../Middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../Requests/auth.request.js";
import authMiddleware from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.get("/me", authMiddleware, AuthController.me);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;