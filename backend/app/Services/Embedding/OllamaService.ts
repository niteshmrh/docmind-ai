import ollama from "ollama";

const OllamaService = {
    async embedding(text: string): Promise<number[]> {
        const response = await ollama.embeddings({
            model: "nomic-embed-text",
            prompt: text,
        });
        return response.embedding;
    },
};

export default OllamaService;