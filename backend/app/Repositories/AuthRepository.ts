import { getDatabase } from "../../config/database.js";
import type { RegisterRequest } from "../Http/Requests/auth.request.js";

const prisma = getDatabase();

const AuthRepository = {
    async findByEmail(email: string, db: "db1" | "db2" = "db1") {
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

    async findByEmailWithPassword(email: string){
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    async findById(id: string) {
        return prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
};

export default AuthRepository;