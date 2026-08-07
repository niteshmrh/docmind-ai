import bcrypt from "bcrypt";

import AuthRepository from "../Repositories/AuthRepository.js";
import type { RegisterRequest } from "../Http/Requests/auth.request.js";
import HTTP_STATUS from "../Utils/httpStatus.js";
import ApiError from "../Utils/ApiError.js";

const AuthService = {
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