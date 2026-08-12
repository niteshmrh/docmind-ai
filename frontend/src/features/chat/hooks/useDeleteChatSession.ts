'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ChatService from '../api/chat.service';

export function useDeleteChatSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ChatService.deleteSession,

    onSuccess: (_, deletedSessionId) => {
      queryClient.setQueryData(['chat-sessions'], (sessions: any[] | undefined) =>
        (sessions ?? []).filter((session) => session.id !== deletedSessionId)
      );

      queryClient.removeQueries({
        queryKey: ['chat-history', deletedSessionId],
      });
    },
  });
}
