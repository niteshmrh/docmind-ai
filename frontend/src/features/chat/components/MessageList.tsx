'use client';

import { useEffect, useRef } from 'react';
import { MessageSquare } from 'lucide-react';

import MessageBubble from './MessageBubble';
import { ChatMessage } from '../types/chat.types';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  optimisticMessage?: string | null;
}

export default function MessageList({ messages, isLoading, optimisticMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isLoading, optimisticMessage]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <MessageSquare className="mb-4 h-10 w-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Start a conversation</h2>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Ask a question about your uploaded document.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
