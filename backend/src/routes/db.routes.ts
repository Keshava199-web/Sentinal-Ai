import { Router, Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("[DB_TEST_ERROR]", error);
    next(error);
  }
});

export default router;
