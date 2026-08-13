export interface SearchChunk {
    id: string;
    documentId: string;
    chunkIndex: number;
    content: string;
    tokens: number;
    distance: number;
}