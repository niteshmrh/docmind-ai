import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const jwtUtil = {
    generateAccessToken( payload: string | object | Buffer, expiresIn: SignOptions["expiresIn"] = "1h"): string {
        return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
            expiresIn,
        });
    },

    verifyAccessToken(token: string): JwtPayload | string {
        return jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload | string;
    },
};

export default jwtUtil;