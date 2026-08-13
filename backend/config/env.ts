// thses are the enviroment variable that are default and overrides by the .env file if present
import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_NAME: process.env.APP_NAME || "DocMind AI",
  API_PREFIX: process.env.API_PREFIX || "/api/v1",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/docmind_ai",

  TOKEN_SECRET: process.env.TOKEN_SECRET || "Nitesh_Kumar",
  TOKEN_SECRET_EXPIRES_IN: process.env.TOKEN_SECRET_EXPIRES_IN || "1d",
  TOKEN_REFRESH_SECRET:
    process.env.TOKEN_REFRESH_SECRET || "Nitesh_Kumar_Refresh",
  TOKEN_REFRESH_EXPIRES_IN: process.env.TOKEN_REFRESH_EXPIRES_IN || "1d",

  AI_PROVIDER: process.env.AI_PROVIDER || "ollama",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  OPENAI_CHAT_MODEL: process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
  OPENAI_EMBEDDING_MODEL:
    process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
};

export default env;
