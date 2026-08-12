import type {NextFunction, Request, Response, } from "express";

import customResponse from "../../Utils/customResponse.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";
import DocumentService from "../../Services/DocumentService.js";
import ApiError from "../../Utils/ApiError.js";
import { IdParams } from "../../Types/index.js";

const DocumentController = {
    
    // Upload a document for a user
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                // throw new Error("No file uploaded");
                throw new ApiError("No file uploaded", HTTP_STATUS.BAD_REQUEST, "NO_FILE_UPLOADED");
            }

            const result = await DocumentService.upload(req.user!.id, req.file);
            return customResponse.success(req, res, {
                statusCode: HTTP_STATUS.CREATED,
                message: "Document uploaded successfully",
                result,
            });
        } catch (error) {
            next(error);
        }
    },

    // List all documents for a user
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const documents = await DocumentService.list(req.user!.id);
            return customResponse.success(req, res, {
                message: "Documents fetched successfully",
                result: documents,
                totalCount: documents.length,
            });
        } catch (error) {
            next(error);
        }
    },

    // Get a document by its ID
    async get(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const document = await DocumentService.get(req.params.id, req.user!.id);
            return customResponse.success(req, res, {
                message: "Document fetched successfully",
                result: document,
            });
        } catch (error) {
            next(error);
        }
    },

    // Delete a document by its ID
    async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            await DocumentService.delete(req.params.id, req.user!.id);
            return customResponse.success(req, res, {
                message: "Document deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    },

    // Download a document by its ID
    async download(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const document = await DocumentService.download(req.params.id, req.user!.id);
            return res.download(document.path, document.originalName);
        } catch (error) {
            next(error);
        }
    },

    // Rename a document by its ID
    async rename(req: Request<{id: string}, {}, {originalName: string}>, res: Response, next: NextFunction) {
        try {
            const document = await DocumentService.rename(
                req.params.id,
                req.user!.id,
                req.body.originalName,
            );
            return customResponse.success(req, res, {
                message: "Document renamed successfully",
                result: document,
            });
        } catch (error) {
            next(error);
        }
    }

};

export default DocumentController;