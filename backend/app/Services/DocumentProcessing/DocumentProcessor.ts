export interface DocumentProcessor {
    extractText(filePath: string): Promise<string>;
}