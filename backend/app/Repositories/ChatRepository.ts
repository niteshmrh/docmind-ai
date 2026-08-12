import { getDatabase } from "../../config/database.js";

const prisma = getDatabase();

const ChatRepository = {
  // Create a new chat session
  async createSession(data: {
    userId: string;
    documentId: string;
    title?: string;
  }) {
    return prisma.chatSession.create({
      data,
    });
  },

  // Find session by id
  async findSession(id: string) {
    return prisma.chatSession.findUnique({
      where: {
        id,
      },
    });
  },

  // Find an existing session for a user's document
  async findSessionByDocument(userId: string, documentId: string) {
    return prisma.chatSession.findFirst({
      where: {
        userId,
        documentId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },

  // Get all sessions of a user
  async findUserSessions(userId: string) {
    return prisma.chatSession.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
        document: {
          select: {
            id: true,
            originalName: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },

  // Save a chat message
  async saveMessage(data: {
    sessionId: string;
    role: "USER" | "ASSISTANT";
    content: string;
  }) {
    return prisma.chatMessage.create({
      data,
    });
  },

  // Get complete conversation
  async getMessages(sessionId: string) {
    return prisma.chatMessage.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  // Update session timestamp
  async touchSession(sessionId: string) {
    return prisma.chatSession.update({
      where: {
        id: sessionId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  },

  // Delete session
  async deleteSession(id: string) {
    return prisma.chatSession.delete({
      where: {
        id,
      },
    });
  },

  // Save USER message + AI message + update session
  async saveConversation(sessionId: string, question: string, answer: string) {
    return prisma.$transaction([
      prisma.chatMessage.create({
        data: {
          sessionId,
          role: "USER",
          content: question,
        },
      }),

      prisma.chatMessage.create({
        data: {
          sessionId,
          role: "ASSISTANT",
          content: answer,
        },
      }),

      prisma.chatSession.update({
        where: {
          id: sessionId,
        },
        data: {
          updatedAt: new Date(),
        },
      }),
    ]);
  },
};

export default ChatRepository;
