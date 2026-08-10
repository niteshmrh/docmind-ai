import ChatRepository from "../../Repositories/ChatRepository.js";
import ChatService from "./ChatService.js";

const ChatHistoryService = {

    async createSession(userId: string, documentId: string, title?: string,) {
        return ChatRepository.createSession({
            userId,
            documentId,
            title,
        });
    },

    async sendMessage(sessionId: string, userId:string, question: string,) {

        const session = await ChatRepository.findSession(sessionId);

        if (!session) {
            throw new Error("Chat session not found");
        }

        // Save user message
        await ChatRepository.saveMessage({
            sessionId,
            role: "USER",
            content: question,
        });

        // Generate AI response
        const answer = await ChatService.ask(
            session.documentId,
            question,
        );

        // Save AI message
        await ChatRepository.saveMessage({
            sessionId,
            role: "ASSISTANT",
            content: answer,
        });

        return {
            answer,
        };
    },

    async listSessions(userId: string) {
        return ChatRepository.findUserSessions(userId);
    },

    async getHistory(sessionId: string, userId:string,) {
        const session = await ChatRepository.findSession(sessionId);
        if (!session) {
            throw new Error("Chat session not found.");
        }
        if (session.userId !== userId) {
            throw new Error("Unauthorized.");
        }
        const messages = await ChatRepository.getMessages(sessionId);
        return {
            session,
            messages,
        };
    },

    async deleteSession(sessionId: string, userId:string,) {
        const session = await ChatRepository.findSession(sessionId);
        if (!session) {
            throw new Error("Chat session not found.");
        }
        if (session.userId !== userId) {
            throw new Error("Unauthorized.");
        }
        await ChatRepository.deleteSession(sessionId);
        return true;
    },

};

export default ChatHistoryService;