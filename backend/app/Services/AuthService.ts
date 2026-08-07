import bcrypt from "bcrypt";

import AuthRepository from "../Repositories/AuthRepository.js";
import type { LoginRequest, RegisterRequest } from "../Http/Requests/auth.request.js";
import HTTP_STATUS from "../Utils/httpStatus.js";
import ApiError from "../Utils/ApiError.js";
import jwtUtil from "../Utils/jwt.js";

const AuthService = {
    // Register User
    async register(data: RegisterRequest) {
        const existingUser = await AuthRepository.findByEmail(data.email);
        // check email
        if (existingUser) {
            throw new ApiError("Email already exists", HTTP_STATUS.CONFLICT, "EMAIL_ALREADY_EXISTS");
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
            throw new ApiError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED, "INVALID_CREDENTIALS");
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!isPasswordValid) {
            // throw new Error("Invalid email or password");
            throw new ApiError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED, "INVALID_CREDENTIALS");
        }

        const accessToken = jwtUtil.generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            accessToken,
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
            throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND, "USER_NOT_FOUND");
        }
        return user;
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