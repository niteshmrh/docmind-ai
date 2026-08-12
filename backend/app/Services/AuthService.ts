import bcrypt from "bcrypt";

import AuthRepository from "../Repositories/AuthRepository.js";
import HTTP_STATUS from "../Utils/httpStatus.js";
import ApiError from "../Utils/ApiError.js";
import jwtUtil from "../Utils/jwt.js";
import type {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../Http/Requests/auth.request.js";

const AuthService = {
  // Register User
  async register(data: RegisterRequest) {
    const existingUser = await AuthRepository.findByEmail(data.email);
    // check email
    if (existingUser) {
      throw new ApiError(
        "Email already exists",
        HTTP_STATUS.CONFLICT,
        "EMAIL_ALREADY_EXISTS",
      );
    }
    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // save user
    const userCreated = await AuthRepository.createUser({
      ...data,
      password: hashedPassword,
    });
    // return user
    return userCreated;
  },

  // Login User
  async login(data: LoginRequest) {
    const user = await AuthRepository.findByEmailWithPassword(data.email);

    if (!user) {
      // throw new Error("Invalid email or password");
      throw new ApiError(
        "Invalid email or password",
        HTTP_STATUS.UNAUTHORIZED,
        "INVALID_CREDENTIALS",
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      // throw new Error("Invalid email or password");
      throw new ApiError(
        "Invalid email or password",
        HTTP_STATUS.UNAUTHORIZED,
        "INVALID_CREDENTIALS",
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // const accessToken = jwtUtil.generateAccessToken({
    //     id: user.id,
    //     email: user.email,
    //     role: user.role,
    // });

    const accessToken = jwtUtil.generateAccessToken(payload);

    const refreshToken = jwtUtil.generateRefreshToken(payload);

    await AuthRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    };
  },

  // Get Authenticated User
  async me(id: string) {
    const user = await AuthRepository.findById(id);
    if (!user) {
      throw new ApiError(
        "User not found",
        HTTP_STATUS.NOT_FOUND,
        "USER_NOT_FOUND",
      );
    }
    return user;
  },

  // refresh token
  async refreshToken(refreshToken: string) {
    const payload = jwtUtil.verifyRefreshToken(refreshToken);
    const user = await AuthRepository.findByRefreshToken(refreshToken);
    if (!user) {
      throw new ApiError(
        "Invalid refresh token",
        HTTP_STATUS.UNAUTHORIZED,
        "INVALID_REFRESH_TOKEN",
      );
    }

    const newPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwtUtil.generateAccessToken(newPayload);
    const newRefreshToken = jwtUtil.generateRefreshToken(newPayload);
    await AuthRepository.updateRefreshToken(user.id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  // Logout User
  async logout(userId: string) {
    await AuthRepository.updateRefreshToken(userId, null);
    return true;
  },

  // Update authenticated user's profile
  async updateProfile(userId: string, data: UpdateProfileRequest) {
    const existingUser = await AuthRepository.findByEmail(data.email);

    if (existingUser && existingUser.id !== userId) {
      throw new ApiError(
        "Email already exists",
        HTTP_STATUS.CONFLICT,
        "EMAIL_ALREADY_EXISTS",
      );
    }

    return AuthRepository.updateProfile(userId, {
      name: data.name,
      email: data.email,
    });
  },

  // Change authenticated user's password
  async changePassword(userId: string, data: ChangePasswordRequest) {
    const user = await AuthRepository.findByIdWithPassword(userId);

    if (!user) {
      throw new ApiError(
        "User not found",
        HTTP_STATUS.NOT_FOUND,
        "USER_NOT_FOUND",
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new ApiError(
        "Current password is incorrect",
        HTTP_STATUS.UNAUTHORIZED,
        "INVALID_CURRENT_PASSWORD",
      );
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await AuthRepository.updatePassword(userId, hashedPassword);
    await AuthRepository.updateRefreshToken(userId, null);

    return true;
  },
};

export default AuthService;

/**
   Register
      │
      ▼
findByEmail()
      │
      ▼
Already Exists?
      │
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Throw    Hash Password
Error        │
             ▼
        createUser()
             │
             ▼
        Return User
 */
