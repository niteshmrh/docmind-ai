import OllamaService from "../app/Services/Embedding/OllamaService.js";

async function main() {
    const embedding = await OllamaService.embedding("Hello DocMind AI");

    console.log("Dimensions:", embedding.length);
    console.log("First 10 values:", embedding.slice(0, 10));
}

main().catch(console.error);