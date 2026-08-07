import { Router } from "express";

import AuthController from "../Controllers/AuthController.js";
import { validate } from "../Middlewares/validation.middleware.js";
import { registerSchema } from "../Requests/auth.request.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", AuthController.login);

export default router;