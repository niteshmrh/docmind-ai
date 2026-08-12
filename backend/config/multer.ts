import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import multer from "multer";

const tempDir = path.resolve("storage/temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
        recursive: true,
    });
}

export default multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, tempDir);
        },
        filename(req, file, callback) {
            const uniqueName =`${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),

    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});