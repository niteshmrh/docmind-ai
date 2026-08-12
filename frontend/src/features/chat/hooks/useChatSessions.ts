'use client';

import { useQuery } from '@tanstack/react-query';

import ChatService from '../api/chat.service';

export function useChatSessions() {
  return useQuery({
    queryKey: ['chat-sessions'],

    queryFn: async () => {
      const response = await ChatService.listSessions();
      return response.data.result;
    },
  });
}
