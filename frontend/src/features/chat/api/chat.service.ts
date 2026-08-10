import api from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { ChatRequest, ChatResponse, ChatMessage, ChatSession } from '../types/chat.types';

const ChatService = {
  sendMessage(data: ChatRequest) {
    return api.post<ApiResponse<ChatResponse>>('/chat', data);
  },

  getSessions(documentId: string) {
    return api.get<ApiResponse<ChatSession[]>>(`/chat/sessions/${documentId}`);
  },

  getMessages(sessionId: string) {
    return api.get<ApiResponse<ChatMessage[]>>(`/chat/messages/${sessionId}`);
  },
};

export default ChatService;
