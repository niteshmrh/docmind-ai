import OllamaService from "../app/Services/Embedding/OllamaService.js";

async function main() {
    const response = await OllamaService.chat(
        "What is Node.js?"
    );
    console.log(response);
}

main().catch(console.error);