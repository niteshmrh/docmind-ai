import DocumentRepository from "../../Repositories/DocumentRepository.js";
import ApiError from "../../Utils/ApiError.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";
import ProcessorFactory from "./ProcessorFactory.js";

const DocumentProcessingService = {
    async process(documentId: string) {
        const document = await DocumentRepository.findById(documentId);
        if (!document) {
            // throw new Error("Document not found");
            throw new ApiError("Document not found", HTTP_STATUS.NOT_FOUND, "DOCUMENT_NOT_FOUND",);
        }
        try {
            // Mark processing
            await DocumentRepository.updateStatus(document.id, "PROCESSING");
            const processor = ProcessorFactory.create(document.type);
            const content = await processor.extractText(document.path);
            await DocumentRepository.updateContent(document.id,content,);
        } catch (error) {
            await DocumentRepository.markFailed(
                document.id, 
                error instanceof Error ? error.message : "Processing failed",
            );
            throw error;
        }
    },
};

export default DocumentProcessingService;