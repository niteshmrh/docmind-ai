import ChatRepository from "../../Repositories/ChatRepository.js";
import ChatService from "./ChatService.js";

const ChatHistoryService = {
  async createSession(userId: string, documentId: string, title?: string) {
    // First try to reuse an existing session.
    const existingSession = await ChatRepository.findSessionByDocument(
      userId,
      documentId,
    );

    if (existingSession) {
      return existingSession;
    }

    try {
      // Create a new session.
      return await ChatRepository.createSession({
        userId,
        documentId,
        title,
      });
    } catch (error: any) {
      // Another request may have created the session between our lookup and create operation.
      if (error?.code === "P2002") {
        const session = await ChatRepository.findSessionByDocument(
          userId,
          documentId,
        );

        if (session) {
          return session;
        }
      }

      throw error;
    }
  },

  async sendMessage(sessionId: string, userId: string, question: string) {
    const session = await ChatRepository.findSession(sessionId);

    if (!session) {
      throw new Error("Chat session not found");
    }

    if (session.userId !== userId) {
      throw new Error("Unauthorized.");
    }

    // Generate AI response first.
    // If this fails, nothing is saved to the database.
    const answer = await ChatService.ask(session.documentId, question);

    // Save both messages and update the session
    // timestamp in one database transaction.
    await ChatRepository.saveConversation(sessionId, question, answer);

    return {
      answer,
    };
  },

  async listSessions(userId: string) {
    return ChatRepository.findUserSessions(userId);
  },

  async getHistory(sessionId: string, userId: string) {
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

  async deleteSession(sessionId: string, userId: string) {
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
