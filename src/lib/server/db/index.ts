import { PrismaClient } from "@/lib/server/db/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const accelerateUrl = process.env.PRISMA_DATABASE_URL as string;
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: accelerateUrl,
  }).$extends(withAccelerate());
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
