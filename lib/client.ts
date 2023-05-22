// initialize a prisma client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Export the prisma client instance for use in other files.
// Prefer defining and exposing functions that use the client
// rather than making direct calls to the client.
export function GetClient() {
  return prisma;
}
