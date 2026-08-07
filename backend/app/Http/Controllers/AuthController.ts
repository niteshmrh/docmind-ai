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

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthService.login(req.body);
            return customResponse.success(req, res, {
                statusCode: HTTP_STATUS.OK,
                message: "Login successful",
                result,
            });
        } catch (error) {
            next(error);
        }
    },

    async me(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthService.me(req.user!.id);
            return customResponse.success(req, res, {
                message: "Authenticated user",
                result: user,
            });
        } catch (error) {
            next(error);
        }
    },
    
};

export default AuthController;