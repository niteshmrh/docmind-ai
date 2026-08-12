'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ChatService from '../api/chat.service';

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ChatService.sendMessage,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['chat-history', variables.sessionId],
      });

      queryClient.invalidateQueries({
        queryKey: ['chat-sessions'],
      });
    },
  });
}
