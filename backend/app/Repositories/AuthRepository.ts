import prisma from "../../config/database.js";

import type { RegisterRequest } from "../Http/Requests/auth.request.js";

const AuthRepository = {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    async createUser(data: RegisterRequest) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                createdAt: true,
            },
        });
    },
};

export default AuthRepository;