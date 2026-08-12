'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (question: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [question, setQuestion] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = question.trim();

    if (!value || disabled) {
      return;
    }

    onSend(value);
    setQuestion('');
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();

      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="border-t bg-background px-4 py-4 md:px-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
        <div className="flex items-end gap-2 rounded-xl border bg-muted/30 p-2 focus-within:border-primary/50">
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about your document..."
            className="min-h-[44px] max-h-40 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            disabled={disabled}
            rows={1}
          />

          <Button
            type="submit"
            size="icon"
            className="shrink-0"
            disabled={disabled || !question.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Enter to send · Shift + Enter for a new line
        </p>
      </form>
    </div>
  );
}
