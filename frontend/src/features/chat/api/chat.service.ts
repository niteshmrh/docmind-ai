import api from '@/lib/axios';

import {
  ApiResponse,
  ChatAnswer,
  ChatHistory,
  ChatSession,
  ChatSessionListItem,
  CreateSessionRequest,
  SendMessageRequest,
} from '../types/chat.types';

const ChatService = {
  createSession(data: CreateSessionRequest) {
    return api.post<ApiResponse<ChatSession>>('/chat/session', data);
  },

  listSessions() {
    return api.get<ApiResponse<ChatSessionListItem[]>>('/chat/session');
  },

  getHistory(sessionId: string) {
    return api.get<ApiResponse<ChatHistory>>(`/chat/session/${sessionId}`);
  },

  deleteSession(sessionId: string) {
    return api.delete<ApiResponse<null>>(`/chat/session/${sessionId}`);
  },

  sendMessage(data: SendMessageRequest) {
    return api.post<ApiResponse<ChatAnswer>>('/chat/message', data);
  },
};

export default ChatService;
