import { PrismaClient } from "@/lib/generated/prisma";

// Create a type for the global prisma instance (for TypeScript)
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Initialize prisma based on environment
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;