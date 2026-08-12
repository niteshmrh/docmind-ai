import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

import customResponse from "../../Utils/customResponse.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return customResponse.error(req, res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Validation failed",
        errorKey: "VALIDATION_ERROR",
        result: result.error.issues,
      });
    }
    req.body = result.data;
    next();
};