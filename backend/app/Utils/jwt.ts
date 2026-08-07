import jwt, { SignOptions } from "jsonwebtoken";
import env from "../../config/env.js";
import type { JwtPayload } from "../Types/index.js";

const jwtUtil = {
    generateAccessToken( payload: string | object | Buffer, expiresIn: SignOptions["expiresIn"] = "1h"): string {
        return jwt.sign(payload, env.TOKEN_SECRET as string, {
            expiresIn,
        });
    },

    verifyAccessToken(token: string): JwtPayload {
        // const decoded = jwt.verify(token, env.TOKEN_SECRET as string);
        // if (typeof decoded === "string") {
        //     throw new Error("Invalid JWT payload");
        // }
        // return decoded as JwtPayload;
        return jwt.verify(token, env.TOKEN_SECRET as string) as JwtPayload;
    },

    generateRefreshToken(payload: string | object | Buffer, expiresIn: SignOptions["expiresIn"] = "1h"): string {
        return jwt.sign(payload, env.TOKEN_REFRESH_SECRET as string, {
            expiresIn,
        });
    },

    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, env.TOKEN_REFRESH_SECRET as string) as JwtPayload;
    },
};

export default jwtUtil;