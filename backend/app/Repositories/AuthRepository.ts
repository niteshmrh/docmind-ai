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

  async findByEmailWithPassword(email: string) {
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

  async updateRefreshToken(id: string, refreshToken: string | null) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
      select: {
        id: true,
      },
    });
  },

  async findByRefreshToken(refreshToken: string) {
    return prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });
  },

  async updateProfile(id: string, data: { name: string; email: string }) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
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

  async updatePassword(id: string, password: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
      select: {
        id: true,
      },
    });
  },

  async findByIdWithPassword(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
      },
    });
  },
};

export default AuthRepository;
