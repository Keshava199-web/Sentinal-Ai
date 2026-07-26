import fs from "fs";

import crypto from "crypto";

/**
 * Generate SHA-256 hash
 */
export const generateFileHash = (
  filePath: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");

    const stream = fs.createReadStream(filePath);

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};