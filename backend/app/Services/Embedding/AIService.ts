import env from "../../../config/env.js";

import OllamaService from "./OllamaService.js";
import OpenAIService from "./OpenAIService.js";

const AIService =
  env.AI_PROVIDER.toLowerCase() === "openai" ? OpenAIService : OllamaService;

export default AIService;
