'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ChatService from '../api/chat.service';

export function useCreateChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ChatService.createSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat-sessions'],
      });
    },
  });
}
