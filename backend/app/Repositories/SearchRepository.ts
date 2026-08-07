import { getDatabase } from "../../config/database.js";

const prisma = getDatabase();

const SearchRepository = {

    async similaritySearch(embedding: number[], limit: number,) {
        const vector = `[${embedding.join(",")}]`;
        return prisma.$queryRawUnsafe(`
            SELECT
                id,
                "documentId",
                "chunkIndex",
                content,
                tokens,
                embedding <=> '${vector}'::vector AS distance
            FROM "DocumentChunk"
            ORDER BY embedding <=> '${vector}'::vector
            LIMIT ${limit};
        `);
    },
};

export default SearchRepository;