import { DocumentType } from "@prisma/client";

import type { DocumentProcessor } from "./DocumentProcessor.js";

import PdfProcessor from "./PdfProcessor.js";
import DocxProcessor from "./DocxProcessor.js";
import TxtProcessor from "./TxtProcessor.js";

export default class ProcessorFactory {
    static create(type: DocumentType): DocumentProcessor {
        switch (type) {
            case DocumentType.PDF:
                return new PdfProcessor();
            case DocumentType.DOCX:
                return new DocxProcessor();
            case DocumentType.TXT:
                return new TxtProcessor();
            default:
                throw new Error(`Unsupported document type: ${type}`);
        }
    }
}