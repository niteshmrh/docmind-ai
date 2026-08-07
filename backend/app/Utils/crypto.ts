import crypto from "crypto";

const cryptoUtil = {
    randomString(length: number = 24): string {
        return crypto.randomBytes(length).toString("hex").slice(0, length);
    },
};

export default cryptoUtil;