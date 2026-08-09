import { getDatabase } from "../../config/database.js";
import type { SearchChunk } from "../Types/search.types.js";

const prisma = getDatabase();

const SearchRepository = {

    async similaritySearch(documentId: string, embedding: number[], limit: number,) {
        const vector = `[${embedding.join(",")}]`;
        return prisma.$queryRawUnsafe<SearchChunk[]>(`
            SELECT
                id,
                "documentId",
                "chunkIndex",
                content,
                tokens,
                embedding <=> '${vector}'::vector AS distance
            FROM "DocumentChunk"
            WHERE "documentId" = '${documentId}'
            ORDER BY embedding <=> '${vector}'::vector
            LIMIT ${limit};
        `);
    },
};

export default SearchRepository;