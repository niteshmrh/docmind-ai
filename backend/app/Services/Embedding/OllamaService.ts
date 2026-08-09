import ollama from "ollama";

const OllamaService = {
    async embedding(text: string): Promise<number[]> {
        const response = await ollama.embeddings({
            model: "nomic-embed-text",
            prompt: text,
        });
        return response.embedding;
    },

    async chat(prompt: string): Promise<string> {
        const response = await ollama.chat({
            model: "llama3.2:3b", // or llama3.2, qwen2.5, mistral, etc.
            messages: [
                {
                    role: "system",
                    content: "You are DocMind AI. Answer ONLY from the provided document context. If the answer is not found in the context, say 'I couldn't find that information in the uploaded document.' Do not make up information.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        return response.message.content;
    },

};

export default OllamaService;