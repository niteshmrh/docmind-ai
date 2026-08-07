import { NextFunction, Request, Response } from "express";

import ApiError from "../../Utils/ApiError.js";
import customResponse from "../../Utils/customResponse.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";

export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiError) {
        return customResponse.error(req, res, {
            statusCode: error.statusCode,
            message: error.message,
            errorKey: error.errorKey,
        });
    }
    console.log(error);

    return customResponse.error(req, res, {
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        errorKey: "INTERNAL_SERVER_ERROR",
    });
}