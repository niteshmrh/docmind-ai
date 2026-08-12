'use client';

import { useQuery } from '@tanstack/react-query';

import ChatService from '../api/chat.service';

export function useChatHistory(sessionId?: string) {
  return useQuery({
    queryKey: ['chat-history', sessionId],

    queryFn: async () => {
      if (!sessionId) {
        return null;
      }
      const response = await ChatService.getHistory(sessionId);
      return response.data.result;
    },

    enabled: Boolean(sessionId),
  });
}
