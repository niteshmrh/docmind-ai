import type { NextFunction, Request, Response } from "express";

import ChatHistoryService from "../../Services/Chat/ChatHistoryService.js";
import customResponse from "../../Utils/customResponse.js";

class ChatHistoryController {

    async createSession(req: Request, res: Response, next: NextFunction,) {
        try {
            const { documentId, title } = req.body;

            const session = await ChatHistoryService.createSession(
                req.user.id,
                documentId,
                title,
            );

            return customResponse.success(req, res, {
                message: "Chat session created successfully",
                result: session,
            });

        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req: Request, res: Response, next: NextFunction,) {
        try {

            const { sessionId, question } = req.body;

            const result = await ChatHistoryService.sendMessage(
                sessionId,
                req.user.id,
                question,
            );

            return customResponse.success(req, res, {
                message: "Message sent successfully",
                result,
            });

        } catch (error) {
            next(error);
        }
    }

    async listSessions(req: Request, res: Response, next: NextFunction,) {
        try {

            const sessions = await ChatHistoryService.listSessions(
                req.user.id,
            );

            return customResponse.success(req, res, {
                message: "Chat sessions fetched successfully",
                result: sessions,
            });

        } catch (error) {
            next(error);
        }
    }

    async getHistory(req: Request<{ id: string }>, res: Response, next: NextFunction,) {
        try {

            const history = await ChatHistoryService.getHistory(
                req.params.id,
                req.user.id,
            );

            return customResponse.success(req, res, {
                message: "Chat history fetched successfully",
                result: history,
            });

        } catch (error) {
            next(error);
        }
    }

    async deleteSession(req: Request<{ id: string }>, res: Response, next: NextFunction,) {
        try {

            await ChatHistoryService.deleteSession(
                req.params.id,
                req.user.id,
            );

            return customResponse.success(req, res, {
                message: "Chat session deleted successfully",
            });

        } catch (error) {
            next(error);
        }
    }

}

export default new ChatHistoryController();