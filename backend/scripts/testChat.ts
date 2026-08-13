import AIService from "../app/Services/Embedding/AIService.js";

async function main() {
  console.log("Testing AI chat...");

  const response = await AIService.chat("What is Node.js?");

  console.log("Provider:", process.env.AI_PROVIDER);
  console.log("Response:", response);
}

main().catch((error) => {
  console.error("Chat test failed:");
  console.error(error);
  process.exit(1);
});
