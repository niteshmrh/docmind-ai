import { getDatabase } from "../../config/database.js";

const prisma = getDatabase();

const DocumentRepository = {

    // Create a new document
    async create(data: any) {
        return prisma.document.create({
            data,
        });
    },

    // Find all documents by user ID
    async findAllByUser(userId: string) {
        return prisma.document.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // Find a document by its ID
    async findById(id: string) {
        return prisma.document.findUnique({
            where: {
                id,
            },
        });
    },

    // Delete a document by its ID
    async delete(id: string) {
        return prisma.document.delete({
            where: {
                id,
            },
        });
    },

    // Rename a document by its ID
    async rename(id: string, originalName: string) {
        return prisma.document.update({
            where: {
                id,
            },
            data: {
                originalName,
            },
        });
    }

};

export default DocumentRepository;