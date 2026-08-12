import fs from "node:fs/promises";
import { PDFParse } from "pdf-parse";

import type { DocumentProcessor } from "./DocumentProcessor.js";

export default class PdfProcessor implements DocumentProcessor {
    async extractText(filePath: string): Promise<string> {
        const buffer = await fs.readFile(filePath);
        const parser = new PDFParse({
            data: new Uint8Array(buffer),
        });
        try {
            const result = await parser.getText();
            return result.text;
        } finally {
            await parser.destroy();
        }
    }
}