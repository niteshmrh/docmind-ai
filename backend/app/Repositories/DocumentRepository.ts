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
    },

    // Update the content of a document by its ID
    // async updateContent(id: string, content: string) {
    //     await prisma.document.update({
    //         where: {
    //             id,
    //         },
    //         data: {
    //             status: "READY",
    //         },
    //     });

    //     return prisma.documentAnalysis.upsert({
    //         where: {
    //             documentId: id,
    //         },
    //         update: {
    //             content,
    //             processedAt: new Date(),
    //             errorMessage: null,
    //         },
    //         create: {
    //             documentId: id,
    //             content,
    //             processedAt: new Date(),
    //         },
    //     });
    // },

    // Mark a document as failed by its ID
    // async markFailed(id: string, message: string) {

    //     await prisma.document.update({
    //         where: {
    //             id,
    //         },
    //         data: {
    //             status: "FAILED",
    //         },
    //     });

    //     return prisma.documentAnalysis.upsert({
    //         where: {
    //             documentId: id,
    //         },
    //         update: {
    //             errorMessage: message,
    //         },
    //         create: {
    //             documentId: id,
    //             errorMessage: message,
    //         },
    //     });
    // },

    // Update the content of a document by its ID
    async updateContent(id: string, content: string) {
        return prisma.document.update({
            where: {
                id,
            },
            data: {
                content,
                processedAt: new Date(),
                status: "READY",
                errorMessage: null,
            },
        });
    },

    // Mark a document as failed by its ID
    async markFailed(id: string, message: string) {
        return prisma.document.update({
            where: {
                id,
            },
            data: {
                status: "FAILED",
                errorMessage: message,
            },
        });
    },

    // Update the status of a document by its ID
    async updateStatus(id: string, status: "PROCESSING" | "READY" | "FAILED",) {
        return prisma.document.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    },
};

export default DocumentRepository;