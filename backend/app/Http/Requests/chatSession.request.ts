import { z } from "zod";

export const ChatSessionRequest = z.object({
    documentId: z.string().cuid(),
    title: z.string().optional(),
});

export type ChatSessionRequestType = z.infer<typeof ChatSessionRequest>;