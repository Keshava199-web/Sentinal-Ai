import multer from "multer";

import path from "path";

import crypto from "crypto";

/**
 * Allowed MIME Types
 */
const allowedMimeTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/plain",
  "application/zip",
] as const;

/**
 * Storage Configuration
 */
const storage = multer.diskStorage({
  destination: (
    _req,
    _file,
    cb,
  ) => {
    cb(
      null,
      "uploads/evidence",
    );
  },

  filename: (
    _req,
    file,
    cb,
  ) => {
    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}${path.extname(
        file.originalname,
      )}`;

    cb(
      null,
      uniqueName,
    );
  },
});

/**
 * MIME Type Validation
 */
const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb,
) => {
  if (
    allowedMimeTypes.includes(
      file.mimetype as
        (typeof allowedMimeTypes)[number],
    )
  ) {
    return cb(
      null,
      true,
    );
  }

  cb(
    new Error(
      "Unsupported file type",
    ),
  );
};

/**
 * Upload Middleware
 */
export const uploadEvidence =
  multer({
    storage,

    fileFilter,

    limits: {
      fileSize:
        20 * 1024 * 1024,
    },
  });