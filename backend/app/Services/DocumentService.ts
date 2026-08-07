import path from "node:path";
import fs from "node:fs/promises";

import LocalStorageService from "./Storage/LocalStorageService.js";
import DocumentRepository from "../Repositories/DocumentRepository.js";
import ApiError from "../Utils/ApiError.js";
import HTTP_STATUS from "../Utils/httpStatus.js";

const storage = new LocalStorageService();

const DocumentService = {

    // Upload a document for a user
    async upload(userId: string, file: Express.Multer.File) {
        const savedPath = await storage.save(file);
        return DocumentRepository.create({
            userId,
            originalName: file.originalname,
            fileName: file.filename,
            mimeType: file.mimetype,
            extension: path.extname(file.originalname).replace(".", ""),
            size: file.size,
            path: savedPath,
            status: "READY",
            type: path.extname(file.originalname).replace(".", "").toUpperCase(),
        });
    },

    // List all documents for a user
    async list(userId: string) {
        return DocumentRepository.findAllByUser(userId);
    },

    // Get a document by its ID
    async get(id: string) {
        const document = await DocumentRepository.findById(id);
        if (!document) {
            throw new ApiError("Document not found", HTTP_STATUS.NOT_FOUND, "DOCUMENT_NOT_FOUND");
        }
        return document;
    },

    // Delete a document by its ID
    async delete(id: string) {
        const document = await DocumentRepository.findById(id);
        if (!document) {
            throw new ApiError("Document not found", HTTP_STATUS.NOT_FOUND, "DOCUMENT_NOT_FOUND");
        }
        try {
            await fs.unlink(document.path);
        } catch {
            // Ignore missing file
        }
        await DocumentRepository.delete(id);
    },

    // download a document by its ID
    async download(id: string, userId: string,) {
        const document = await DocumentRepository.findById(id);
        if (!document || document.userId !== userId) {
            throw new ApiError("Document not found", HTTP_STATUS.NOT_FOUND, "DOCUMENT_NOT_FOUND");
        }
        return document;
    },

    // Rename a document by its ID
    async rename(id: string, userId: string, originalName: string,) {
        const document = await this.download(id, userId);
        return DocumentRepository.rename(document.id, originalName);
    }

};

export default DocumentService;