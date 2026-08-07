import type {NextFunction, Request, Response, } from "express";

import ApiError from "../../Utils/ApiError.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";

export default function roleMiddleware(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError("Unauthorized", HTTP_STATUS.UNAUTHORIZED, "UNAUTHORIZED"));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("Forbidden", HTTP_STATUS.FORBIDDEN, "FORBIDDEN"));
        }
        next();
    };
}