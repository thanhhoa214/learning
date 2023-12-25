import { prisma } from "@/lib/prisma";

export async function GET() {
  const res = await prisma.question.findMany();
  return Response.json(res);
}
