import { Router } from "express";

import AuthController from "../Controllers/AuthController.js";
import { validate } from "../Middlewares/validation.middleware.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../Requests/auth.request.js";
import authMiddleware from "../Middlewares/auth.middleware.js";
import {
  loginRateLimiter,
  authRateLimiter,
  registerRateLimiter,
} from "../Middlewares/rateLimit.middleware.js";

const router = Router();

router.post(
  "/register",
  registerRateLimiter,
  validate(registerSchema),
  AuthController.register,
);

router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  AuthController.login,
);

router.get("/me", authMiddleware, AuthController.me);

router.patch(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  AuthController.updateProfile,
);

router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  AuthController.changePassword,
);

router.post("/refresh-token", authRateLimiter, AuthController.refreshToken);

router.post("/logout", authMiddleware, AuthController.logout);

export default router;
