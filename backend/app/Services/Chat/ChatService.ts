import SearchService from "../Search/SearchService.js";
import OllamaService from "../Embedding/OllamaService.js";

const ChatService = {

    async ask(documentId: string, question: string,) {
        const chunks = await SearchService.search(documentId, question, 5,);
        const context = chunks.map((chunk) => chunk.content).join("\n\n");
        const prompt = `You are DocMind AI.
            Answer ONLY using the context below.
            If the answer is not present in the context, say:
            "I couldn't find that information in the uploaded document."
            Context:${context}
            Question:${question}
            Answer:`;
        return OllamaService.chat(prompt);
    },
};

export default ChatService;