import { z } from "zod";

export const ChatMessageRequest = z.object({
    sessionId: z.string().cuid(),
    question: z.string().min(1),
});

export type ChatMessageRequestType = z.infer<typeof ChatMessageRequest>;