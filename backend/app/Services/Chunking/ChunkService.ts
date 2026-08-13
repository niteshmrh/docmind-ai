import splitter from "./TextSplitter.js";
import DocumentRepository from "../../Repositories/DocumentRepository.js";

const ChunkService = {

    async process(documentId: string, content: string) {
        const chunks = await splitter.splitText(content);
        await DocumentRepository.createChunks(
            chunks.map((chunk, index) => ({
                documentId, 
                chunkIndex: index,
                content: chunk,
                // Temporary token estimate
                tokens: chunk.length,
            })),
        );
    },
};

export default ChunkService;