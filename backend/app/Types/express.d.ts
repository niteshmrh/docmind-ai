import type { JwtPayload } from "./index.js";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export {};