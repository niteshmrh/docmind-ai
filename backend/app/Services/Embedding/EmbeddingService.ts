import DocumentRepository from "../../Repositories/DocumentRepository.js";
import OllamaService from "./OllamaService.js";

const EmbeddingService = {

    async process(documentId: string) {
        const chunks = await DocumentRepository.findChunks(documentId);
        for (const chunk of chunks) {
            const embedding = await OllamaService.embedding(chunk.content);
            await DocumentRepository.updateEmbedding(
                chunk.id,
                embedding,
            );
            console.log(`Embedded Chunk ${chunk.chunkIndex}`);
        }
    },

};

export default EmbeddingService;