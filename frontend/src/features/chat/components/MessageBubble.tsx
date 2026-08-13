'use client';

import { Bot, Check, Copy, User } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';
import { ChatMessage } from '../types/chat.types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'USER';
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Ignore clipboard errors
    }
  }

  return (
    <div className={cn('flex w-full gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {/* AI avatar */}
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={cn(
          'group max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[80%]',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
        ) : (
          <div className="max-w-none text-sm leading-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="mb-3 text-xl font-bold">{children}</h1>,

                h2: ({ children }) => <h2 className="mb-3 text-lg font-bold">{children}</h2>,

                h3: ({ children }) => <h3 className="mb-2 text-base font-semibold">{children}</h3>,

                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,

                ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,

                ol: ({ children }) => (
                  <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>
                ),

                li: ({ children }) => <li>{children}</li>,

                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,

                blockquote: ({ children }) => (
                  <blockquote className="mb-3 border-l-2 pl-4 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),

                code: ({ className, children, ...props }) => {
                  const isBlock = Boolean(className);

                  if (isBlock) {
                    return (
                      <pre className="mb-3 overflow-x-auto rounded-lg bg-background p-4 text-xs">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  }

                  return (
                    <code className="rounded bg-background/70 px-1.5 py-0.5 text-xs" {...props}>
                      {children}
                    </code>
                  );
                },

                table: ({ children }) => (
                  <div className="mb-3 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),

                th: ({ children }) => (
                  <th className="border px-3 py-2 text-left font-semibold">{children}</th>
                ),

                td: ({ children }) => <td className="border px-3 py-2">{children}</td>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Footer */}
        <div
          className={cn('mt-2 flex items-center gap-2', isUser ? 'justify-end' : 'justify-between')}
        >
          <p
            className={cn(
              'text-[10px]',
              isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>

          {!isUser && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-background hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
              title={copied ? 'Copied' : 'Copy response'}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span className="text-[10px]">Copied</span>
                </>
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
