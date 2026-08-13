import { NextFunction, Request, Response } from "express";
import multer from "multer";

import ApiError from "../../Utils/ApiError.js";
import customResponse from "../../Utils/customResponse.js";
import HTTP_STATUS from "../../Utils/httpStatus.js";

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ApiError) {
    return customResponse.error(req, res, {
      statusCode: error.statusCode,
      message: error.message,
      errorKey: error.errorKey,
    });
  }

  // Handle Multer upload errors
  if (error instanceof multer.MulterError) {
    let message = "File upload failed.";
    let errorKey = "FILE_UPLOAD_ERROR";

    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        message = "File too large. Maximum file size is 20 MB.";
        errorKey = "FILE_TOO_LARGE";
        break;

      case "LIMIT_UNEXPECTED_FILE":
        message = "Unsupported file type or unexpected file.";
        errorKey = "INVALID_FILE";
        break;

      case "LIMIT_FILE_COUNT":
        message = "Only one file can be uploaded at a time.";
        errorKey = "TOO_MANY_FILES";
        break;

      case "LIMIT_PART_COUNT":
        message = "Too many form fields.";
        errorKey = "TOO_MANY_FORM_FIELDS";
        break;

      case "LIMIT_FIELD_KEY":
      case "LIMIT_FIELD_VALUE":
      case "LIMIT_FIELD_COUNT":
        message = "Invalid upload request.";
        errorKey = "INVALID_UPLOAD_REQUEST";
        break;
    }

    return customResponse.error(req, res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      errorKey,
    });
  }

  // Unexpected errors
  console.error(error);

  return customResponse.error(req, res, {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
    errorKey: "INTERNAL_SERVER_ERROR",
  });
}
