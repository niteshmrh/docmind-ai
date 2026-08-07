import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "../../Utils/httpStatus.js";
import customResponse from "../../Utils/customResponse.js";
import AuthService from "../../Services/AuthService.js";

const AuthController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.register(req.body);
            return customResponse.success(req, res, {
                statusCode: HTTP_STATUS.CREATED,
                message: "User registered successfully",
                result: user,
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response) {
        return customResponse.success(req, res, {
            message: "Login API coming soon",
        });
    },
};

export default AuthController;