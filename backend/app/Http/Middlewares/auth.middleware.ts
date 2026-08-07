import type { NextFunction, Request, Response, } from "express";

import jwtUtil from "../../Utils/jwt.js";
import ApiError from "../../Utils/ApiError.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new ApiError("Authorization header is missing", HTTP_STATUS.UNAUTHORIZED, "UNAUTHORIZED");
        }

        if (!authorization.startsWith("Bearer ")) {
            throw new ApiError("Invalid authorization token", HTTP_STATUS.UNAUTHORIZED, "INVALID_TOKEN");
        }

        const token = authorization.split(" ")[1];

        const payload = jwtUtil.verifyAccessToken(token);
        req.user = payload;
        // (req as any).user = payload;                                 Those work, but they're hacks. We should fix the type declaration properly.
        // (req as Request & { user: JwtPayload }).user = payload;
        next();
    } catch (error) {
        next(error);
    }
}