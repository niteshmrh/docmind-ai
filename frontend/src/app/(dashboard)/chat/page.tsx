'use client';

import { Menu, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import ChatSidebar from '@/features/chat/components/ChatSidebar';
import MessageList from '@/features/chat/components/MessageList';
import ChatInput from '@/features/chat/components/ChatInput';

import { useChatSessions } from '@/features/chat/hooks/useChatSessions';
import { useChatHistory } from '@/features/chat/hooks/useChatHistory';
import { useCreateChatSession } from '@/features/chat/hooks/useCreateChatSession';
import { useSendMessage } from '@/features/chat/hooks/useSendMessage';
import { useDeleteChatSession } from '@/features/chat/hooks/useDeleteChatSession';
import { useDocuments } from '@/features/document/hooks/useDocuments';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const documentId = searchParams.get('documentId');
  const sessionId = searchParams.get('sessionId');

  const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>();
  const [optimisticMessage, setOptimisticMessage] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);

  const { data: sessions = [], isLoading: sessionsLoading } = useChatSessions();
  const { data: history, isLoading: historyLoading } = useChatHistory(selectedSessionId);

  const { data: documents = [] } = useDocuments();
  const createSession = useCreateChatSession();
  const sendMessage = useSendMessage();
  const deleteSession = useDeleteChatSession();

  /*
   * Select the correct session.
   *
   * Priority:
   * 1. sessionId from URL
   * 2. current selected session
   * 3. documentId from URL
   */

  useEffect(() => {
    if (!sessions.length) {
      setSelectedSessionId(undefined);
      return;
    }
    // Explicit session from URL
    if (sessionId) {
      const requestedSession = sessions.find((session) => session.id === sessionId);
      if (requestedSession) {
        setSelectedSessionId(requestedSession.id);
        return;
      }
      // Session from URL no longer exists
      setSelectedSessionId(undefined);
      router.replace('/chat');
      return;
    }

    // Keep current selection if it still exists
    if (selectedSessionId) {
      const selectedStillExists = sessions.some((session) => session.id === selectedSessionId);
      if (selectedStillExists) {
        return;
      }
      setSelectedSessionId(undefined);
    }

    // Existing document-based navigation
    if (documentId) {
      const documentSession = sessions.find((session) => session.documentId === documentId);
      if (documentSession) {
        setSelectedSessionId(documentSession.id);
        return;
      }
    }
  }, [sessions, selectedSessionId, documentId, sessionId, router]);

  /*
   * Select a session from the sidebar.
   */
  function handleSelectSession(id: string) {
    setSelectedSessionId(id);
    router.push(`/chat?sessionId=${id}`);
    setShowMobileSidebar(false);
  }

  /*
   * Create a new chat session.
   */
  async function handleCreateChat(documentId: string, title: string) {
    try {
      // Reuse an existing session for this document.
      const existingSession = sessions.find((session) => session.documentId === documentId);
      if (existingSession) {
        setSelectedSessionId(existingSession.id);
        router.push(`/chat?sessionId=${existingSession.id}`);
        setShowMobileSidebar(false);
        return;
      }
      const response = await createSession.mutateAsync({
        documentId,
        title,
      });
      const newSessionId = response.data.result.id;
      setSelectedSessionId(newSessionId);
      router.push(`/chat?sessionId=${newSessionId}`);
      setShowMobileSidebar(false);
      toast.success('Chat created');
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Unable to create chat session');
      throw error;
    }
  }

  /*
   * Send a message.
   */
  async function handleSend(question: string) {
    if (!selectedSessionId) {
      toast.error('Please select a conversation.');
      return;
    }

    setSendError(null);
    setFailedQuestion(null);
    setOptimisticMessage(question);

    try {
      await sendMessage.mutateAsync({
        sessionId: selectedSessionId,
        question,
      });

      setOptimisticMessage(null);
    } catch (error: any) {
      setOptimisticMessage(null);

      const message = error?.response?.data?.message ?? 'Unable to send message';

      /*
       * The session may have been deleted
       * between loading it and sending the message.
       */
      if (message.toLowerCase().includes('session not found')) {
        setSelectedSessionId(undefined);
        setFailedQuestion(null);
        setSendError(null);

        router.replace('/chat');

        toast.error('This conversation no longer exists.');

        return;
      }

      setSendError(message);
      setFailedQuestion(question);

      toast.error(message);
    }
  }

  /*
   * Retry a failed message.
   */
  async function handleRetry() {
    if (!failedQuestion || sendMessage.isPending) {
      return;
    }

    const question = failedQuestion;

    setSendError(null);
    setFailedQuestion(null);

    await handleSend(question);
  }

  /*
   * Delete a chat session.
   */
  async function handleDelete(sessionId: string) {
    try {
      await deleteSession.mutateAsync(sessionId);

      if (selectedSessionId === sessionId) {
        setSelectedSessionId(undefined);
        router.push('/chat');
      }

      toast.success('Conversation deleted');
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? 'Unable to delete conversation');
    }
  }
  return (
    <div
      className="
      docmind-page
      docmind-gradient
      flex
      h-[calc(100vh-4rem)]
      min-w-0
      overflow-hidden
      rounded-2xl
      border
      border-border
      bg-background
    "
    >
      {/* =====================================================
        DESKTOP SIDEBAR
    ===================================================== */}
      <div className="hidden h-full w-[320px] shrink-0 border-r border-border bg-card md:block">
        <ChatSidebar
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          isLoading={sessionsLoading}
          onSelect={handleSelectSession}
          onCreateChat={handleCreateChat}
          isCreating={createSession.isPending}
          onDelete={handleDelete}
        />
      </div>

      {/* =====================================================
        MOBILE SIDEBAR
    ===================================================== */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close chat sidebar"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setShowMobileSidebar(false)}
          />

          {/* Sidebar */}
          <div
            className="
            relative
            h-full
            w-[300px]
            max-w-[85vw]
            border-r
            border-border
            bg-card
            shadow-2xl
          "
          >
            <ChatSidebar
              sessions={sessions}
              selectedSessionId={selectedSessionId}
              isLoading={sessionsLoading}
              onSelect={handleSelectSession}
              onCreateChat={async (documentId, title) => {
                await handleCreateChat(documentId, title);
                setShowMobileSidebar(false);
              }}
              isCreating={createSession.isPending}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}

      {/* =====================================================
        MAIN CHAT
    ===================================================== */}
      <section className="flex min-w-0 flex-1 flex-col">
        {selectedSessionId ? (
          <>
            {/* =================================================
              CHAT HEADER
          ================================================= */}
            <header
              className="
              flex
              h-16
              shrink-0
              items-center
              justify-between
              border-b
              border-border
              bg-card/80
              px-4
              backdrop-blur
              md:px-6
            "
            >
              <div className="flex min-w-0 items-center gap-3">
                {/* Mobile menu */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                  h-9
                  w-9
                  shrink-0
                  rounded-lg
                  md:hidden
                "
                  onClick={() => setShowMobileSidebar(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Chat icon */}
                <div
                  className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>

                {/* Title */}
                <div className="min-w-0">
                  <h1 className="truncate text-sm font-semibold">
                    {history?.session.title ?? 'Conversation'}
                  </h1>

                  <p className="mt-0.5 text-xs text-muted-foreground">Chat with your document</p>
                </div>
              </div>

              {/* Session title */}
              {history?.session && (
                <div className="hidden max-w-[260px] truncate rounded-lg bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground lg:block">
                  {history.session.title}
                </div>
              )}
            </header>

            {/* =================================================
              MESSAGES
          ================================================= */}
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
                <MessageList
                  messages={history?.messages ?? []}
                  isLoading={historyLoading}
                  optimisticMessage={optimisticMessage}
                />

                {/* AI thinking indicator */}
                {sendMessage.isPending && (
                  <div className="flex justify-start gap-3 pb-4">
                    <div
                      className="
                      mt-1
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                    >
                      <MessageSquare className="h-4 w-4" />
                    </div>

                    <div
                      className="
                      rounded-2xl
                      border
                      border-border
                      bg-card
                      px-4
                      py-3
                      shadow-sm
                    "
                    >
                      <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
              ERROR
          ================================================= */}
            {sendError && (
              <div className="border-t border-border bg-background/80 px-4 py-3 backdrop-blur md:px-6">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-destructive">Message failed</p>

                    <p className="truncate text-xs text-destructive/80">{sendError}</p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSendError(null);
                        setFailedQuestion(null);
                      }}
                      disabled={sendMessage.isPending}
                    >
                      Dismiss
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      onClick={handleRetry}
                      disabled={sendMessage.isPending || !failedQuestion}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
              INPUT
          ================================================= */}
            <ChatInput onSend={handleSend} disabled={sendMessage.isPending} />
          </>
        ) : (
          /* ===================================================
           EMPTY CHAT STATE
        =================================================== */
          <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-10">
            <div className="w-full max-w-2xl text-center">
              <div
                className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-primary/10
                text-primary
                ring-1
                ring-primary/10
              "
              >
                <MessageSquare className="h-7 w-7" />
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-primary">
                DocMind AI
              </p>

              <h1 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Start chatting with your documents
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Select a document below to start a new conversation with your AI assistant.
              </p>

              {documents.length === 0 ? (
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground">You don't have any documents yet.</p>

                  <Button asChild className="mt-4 rounded-lg">
                    <Link href="/documents/upload">Upload Document</Link>
                  </Button>
                </div>
              ) : (
                <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
                  {documents
                    .filter((document) => document.status === 'READY')
                    .map((document) => (
                      <Button
                        key={document.id}
                        variant="outline"
                        className="
                        h-auto
                        justify-start
                        rounded-xl
                        border-border
                        bg-card
                        p-4
                        text-left
                        hover:border-primary/30
                        hover:bg-primary/[0.025]
                      "
                        onClick={() =>
                          handleCreateChat(document.id, `${document.originalName} Discussion`)
                        }
                        disabled={createSession.isPending}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{document.originalName}</p>

                          <p className="mt-1 text-xs text-muted-foreground">Start a conversation</p>
                        </div>
                      </Button>
                    ))}
                </div>
              )}

              {documents.length > 0 &&
                documents.every((document) => document.status !== 'READY') && (
                  <p className="mt-6 text-sm text-muted-foreground">
                    Your documents are still being processed.
                  </p>
                )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// return (
//   <div className="flex h-[calc(100vh-4rem)] min-w-0 overflow-hidden rounded-lg border bg-background">
//     {/* Desktop sidebar */}
//     <div className="hidden h-full md:block">
//       <ChatSidebar
//         sessions={sessions}
//         selectedSessionId={selectedSessionId}
//         isLoading={sessionsLoading}
//         onSelect={handleSelectSession}
//         onCreateChat={handleCreateChat}
//         isCreating={createSession.isPending}
//         onDelete={handleDelete}
//       />
//     </div>

//     {/* Mobile sidebar */}
//     {showMobileSidebar && (
//       <div className="fixed inset-0 z-50 md:hidden">
//         {/* Backdrop */}
//         <button
//           type="button"
//           aria-label="Close chat sidebar"
//           className="absolute inset-0 bg-black/40"
//           onClick={() => setShowMobileSidebar(false)}
//         />

//         {/* Sidebar */}
//         <div className="relative h-full w-80 max-w-[85vw] bg-background shadow-xl">
//           <ChatSidebar
//             sessions={sessions}
//             selectedSessionId={selectedSessionId}
//             isLoading={sessionsLoading}
//             onSelect={handleSelectSession}
//             onCreateChat={async (documentId, title) => {
//               await handleCreateChat(documentId, title);

//               setShowMobileSidebar(false);
//             }}
//             isCreating={createSession.isPending}
//             onDelete={handleDelete}
//           />
//         </div>
//       </div>
//     )}

//     {/* Main chat */}
//     <section className="flex min-w-0 flex-1 flex-col">
//       {selectedSessionId ? (
//         <>
//           {/* Header */}
//           <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
//             <div className="flex min-w-0 items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//                 onClick={() => setShowMobileSidebar(true)}
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>

//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
//                 <MessageSquare className="h-5 w-5 text-primary" />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="truncate font-semibold">
//                   {history?.session.title ?? 'Conversation'}
//                 </h1>

//                 <p className="text-xs text-muted-foreground">Chat with your document</p>
//               </div>
//             </div>

//             {history?.session && (
//               <span className="hidden text-xs text-muted-foreground lg:block">
//                 {history.session.title}
//               </span>
//             )}
//           </header>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 md:p-6">
//             <MessageList
//               messages={history?.messages ?? []}
//               isLoading={historyLoading}
//               optimisticMessage={optimisticMessage}
//             />

//             {/* AI thinking indicator */}
//             {sendMessage.isPending && (
//               <div className="mx-auto flex max-w-4xl justify-start gap-3 pb-4">
//                 <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
//                   <MessageSquare className="h-4 w-4" />
//                 </div>

//                 <div className="rounded-2xl bg-muted px-4 py-3">
//                   <div className="flex items-center gap-1">
//                     <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
//                     <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
//                     <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Error handling */}
//           {sendError && (
//             <div className="border-t px-4 py-3 md:px-6">
//               <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
//                 <div className="min-w-0">
//                   <p className="text-sm font-medium text-destructive">Message failed</p>

//                   <p className="truncate text-xs text-destructive/80">{sendError}</p>
//                 </div>

//                 <div className="flex shrink-0 gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       setSendError(null);
//                       setFailedQuestion(null);
//                     }}
//                     disabled={sendMessage.isPending}
//                   >
//                     Dismiss
//                   </Button>

//                   <Button
//                     type="button"
//                     size="sm"
//                     onClick={handleRetry}
//                     disabled={sendMessage.isPending || !failedQuestion}
//                   >
//                     Retry
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Input */}
//           <ChatInput onSend={handleSend} disabled={sendMessage.isPending} />
//         </>
//       ) : (
//         /* Empty state */
//         <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
//             <MessageSquare className="h-7 w-7 text-primary" />
//           </div>

//           <h1 className="mt-5 text-2xl font-bold">Start chatting with your documents</h1>

//           <p className="mt-2 max-w-md text-sm text-muted-foreground">
//             Select a document below to start a new conversation.
//           </p>

//           {documents.length === 0 ? (
//             <div className="mt-6">
//               <p className="text-sm text-muted-foreground">You don't have any documents yet.</p>

//               <Button asChild className="mt-4">
//                 <Link href="/documents/upload">Upload Document</Link>
//               </Button>
//             </div>
//           ) : (
//             <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
//               {documents
//                 .filter((document) => document.status === 'READY')
//                 .map((document) => (
//                   <Button
//                     key={document.id}
//                     variant="outline"
//                     className="h-auto justify-start p-4 text-left"
//                     onClick={() =>
//                       handleCreateChat(document.id, `${document.originalName} Discussion`)
//                     }
//                     disabled={createSession.isPending}
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate font-medium">{document.originalName}</p>

//                       <p className="mt-1 text-xs text-muted-foreground">Start a conversation</p>
//                     </div>
//                   </Button>
//                 ))}
//             </div>
//           )}

//           {documents.length > 0 && documents.every((document) => document.status !== 'READY') && (
//             <p className="mt-6 text-sm text-muted-foreground">
//               Your documents are still being processed.
//             </p>
//           )}
//         </div>
//       )}
//     </section>
//   </div>
// );
