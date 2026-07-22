import { Request, Response, NextFunction } from "express";

import { z } from "zod";

/**
 * Generic validation middleware
 */
const validate = (
  schema: z.ZodSchema,
  source: "body" | "query" | "params" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Validate source
     */
    const validated = schema.safeParse(req[source]);

    /**
     * Validation failed
     */
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validated.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    /**
     * Attach sanitized data
     */
    Object.assign(req[source], validated.data);

    next();
  };
};

export default validate;
