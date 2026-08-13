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

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const allowedExtensions = new Set([
  ".pdf",
  ".docx",
  ".txt",
  ".csv",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

export default multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, tempDir);
    },
    filename(req, file, callback) {
      const extension = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
      callback(null, uniqueName);
    },
  }),

  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
    files: 1,
  },

  fileFilter(req, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    const isExtensionAllowed = allowedExtensions.has(extension);
    const isMimeTypeAllowed = allowedMimeTypes.has(file.mimetype);
    if (!isExtensionAllowed || !isMimeTypeAllowed) {
      return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
    callback(null, true);
  },
});

/**
 File upload
    │
    ├── > 20 MB
    │      ↓
    │    rejected
    │
    ├── More than 1 file
    │      ↓
    │    rejected
    │
    ├── Unsupported extension
    │      ↓
    │    rejected
    │
    ├── Unsupported MIME type
    │      ↓
    │    rejected
    │
    └── Valid file
           ↓
         temp/
*/
