'use client';

import { useMutation } from '@tanstack/react-query';
import ChatService from '../api/chat.service';

export function useChat() {
  return useMutation({
    mutationFn: ChatService.sendMessage,
  });
}
