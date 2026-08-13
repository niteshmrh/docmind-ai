import DocumentRepository from "../../Repositories/DocumentRepository.js";
import AIService from "./AIService.js";

const EmbeddingService = {
  async process(documentId: string) {
    const chunks = await DocumentRepository.findChunks(documentId);
    for (const chunk of chunks) {
      const embedding = await AIService.embedding(chunk.content);
      await DocumentRepository.updateEmbedding(chunk.id, embedding);
      console.log(`Embedded Chunk ${chunk.chunkIndex}`);
    }
  },
};

export default EmbeddingService;
