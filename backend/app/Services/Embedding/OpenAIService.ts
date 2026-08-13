import OpenAI from "openai";
import env from "../../../config/env.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const OpenAIService = {
  async embedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: env.OPENAI_EMBEDDING_MODEL,
      input: text,
    });

    return response.data[0].embedding;
  },

  async chat(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: env.OPENAI_CHAT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are DocMind AI. Answer ONLY from the provided document context. If the answer is not found in the context, say 'I couldn't find that information in the uploaded document.' Do not make up information.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0]?.message?.content ?? "";
  },
};

export default OpenAIService;

// export default class OpenAIService {
//   async embedding(text: string): Promise<number[]> {
//     const response = await openai.embeddings.create({
//       model: env.OPENAI_EMBEDDING_MODEL,
//       input: text,
//     });

//     return response.data[0].embedding;
//   }

//   async chat(
//     messages: Array<{
//       role: "system" | "user" | "assistant";
//       content: string;
//     }>,
//   ): Promise<string> {
//     const response = await openai.chat.completions.create({
//       model: env.OPENAI_CHAT_MODEL,
//       messages,
//     });

//     return response.choices[0]?.message?.content ?? "";
//   }
// }
