import { NextFunction, Request, Response } from "express";
import HTTP_STATUS from "../../Utils/httpStatus.js";
import customResponse from "../../Utils/customResponse.js";
import AuthService from "../../Services/AuthService.js";

const AuthController = {
  // Register User
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

  // Login User
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

  // Get Authenticated User
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

  // Update authenticated user's profile
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.updateProfile(req.user!.id, req.body);

      return customResponse.success(req, res, {
        message: "Profile updated successfully",
        result: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Change authenticated user's password
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.changePassword(req.user!.id, req.body);

      return customResponse.success(req, res, {
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // Refresh Token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      return customResponse.success(req, res, {
        message: "Token refreshed successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  // Logout User
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.user!.id);
      return customResponse.success(req, res, {
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
