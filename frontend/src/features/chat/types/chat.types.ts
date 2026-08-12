export interface ChatSession {
  id: string;
  userId: string;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatSessionListItem extends ChatSession {
  _count: {
    messages: number;
  };
  document: {
    id: string;
    originalName: string;
  };
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
}

export interface ChatHistory {
  session: ChatSession;
  messages: ChatMessage[];
}

export interface CreateSessionRequest {
  documentId: string;
  title: string;
}

export interface SendMessageRequest {
  sessionId: string;
  question: string;
}

export interface ChatAnswer {
  answer: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
  count: number;
  responseId: string;
}
