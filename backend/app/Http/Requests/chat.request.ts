import { z } from "zod";

export const ChatRequest = z.object({
    documentId: z.string().cuid(),
    question: z.string().min(1),
});

export type ChatRequestType = z.infer<typeof ChatRequest>;