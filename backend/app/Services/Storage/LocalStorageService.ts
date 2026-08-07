import fs from "node:fs/promises";
import path from "node:path";

import type { StorageService } from "./StorageService.js";

export default class LocalStorageService implements StorageService {
    async save(file: Express.Multer.File): Promise<string> {
        const uploadDir = path.resolve("storage/uploads");
        await fs.mkdir(uploadDir, {
            recursive: true,
        });
        const destination = path.join(
            uploadDir,
            file.filename
        );
        await fs.rename(file.path, destination);
        return destination;
    }

    async delete(filePath: string): Promise<void> {
        try {
            await fs.unlink(filePath);
        } catch {
            // Ignore if file doesn't exist
        }
    }

}