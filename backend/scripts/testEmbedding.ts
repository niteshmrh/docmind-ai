import AIService from "../app/Services/Embedding/AIService.js";

async function main() {
  console.log("Testing AI embedding...");

  const embedding = await AIService.embedding("Hello DocMind AI");

  console.log("Provider:", process.env.AI_PROVIDER);
  console.log("Dimensions:", embedding.length);
  console.log("First 10 values:", embedding.slice(0, 10));
}

main().catch((error) => {
  console.error("Embedding test failed:");
  console.error(error);
  process.exit(1);
});
