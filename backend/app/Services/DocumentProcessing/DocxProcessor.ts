import mammoth from "mammoth";

import type { DocumentProcessor } from "./DocumentProcessor.js";

export default class DocxProcessor implements DocumentProcessor {
    async extractText(filePath: string): Promise<string> {
        const result = await mammoth.extractRawText({
            path: filePath,
        });
        return result.value;
    }
}