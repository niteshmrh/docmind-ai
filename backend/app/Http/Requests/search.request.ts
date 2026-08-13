import { z } from "zod";

export const SearchRequest = z.object({
    query: z.string().min(1),
    limit: z.number().optional().default(5),
});

export type SearchRequestType = z.infer<typeof SearchRequest>;