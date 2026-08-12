import type { NextFunction, Request, Response } from "express";

import ChatService from "../../Services/Chat/ChatService.js";
import customResponse from "../../Utils/customResponse.js";

class ChatController {

    async ask(req: Request, res: Response, next: NextFunction,) {
        try {
            const { documentId, question } = req.body;
            const answer = await ChatService.ask(documentId, question,);
            return customResponse.success(req, res, {
                message: "Answer generated successfully",
                result: {
                    answer,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ChatController();