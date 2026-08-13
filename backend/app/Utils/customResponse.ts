import { Request, Response } from "express";
import type { ResponseOptions } from "../Types/index.js";

import cryptoUtil from "./crypto.js";
import HTTP_STATUS from "./httpStatus.js";

// interface ResponseOptions<T = unknown> {
//     statusCode?: number;
//     message?: string;
//     result?: T | null;
//     totalCount?: number;
//     errorKey?: string;
// }

const customResponse = {
    success<T>(req: Request,res: Response,{
        statusCode = HTTP_STATUS.OK,
        message = "Success",
        result = null,
        totalCount = 0,
    }: ResponseOptions<T>) {
        return res.status(statusCode).json({
            success: true,
            message,
            result,
            count: totalCount,
            responseId: cryptoUtil.randomString(),
        });
    },

    error(req: Request, res: Response,{
        statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message = "Something went wrong",
        errorKey = "",
        result = null,
    }: ResponseOptions) {
        return res.status(statusCode).json({
            success: false,
            message,
            errorKey,
            result,
            responseId: cryptoUtil.randomString(),
        });
    },
};

export default customResponse;