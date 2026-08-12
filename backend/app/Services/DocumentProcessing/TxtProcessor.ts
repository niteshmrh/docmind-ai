import fs from "node:fs/promises";

import type { DocumentProcessor } from "./DocumentProcessor.js";

export default class TxtProcessor implements DocumentProcessor {
    async extractText(filePath: string): Promise<string> {
        return fs.readFile(filePath, "utf8");
    }
}