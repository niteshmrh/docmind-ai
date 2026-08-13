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
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
        <div
          className="
          flex h-14 w-14
          items-center justify-center
          rounded-2xl
          bg-primary/10
          text-primary
        "
        >
          <MessageSquare className="h-6 w-6" />
        </div>

        <h2 className="mt-5 font-heading text-xl font-semibold">Start a conversation</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Ask a question about your document and DocMind AI will help you find the answer.
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
