import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";

const getTransactions = (
  page: number,
  pageSize: number,
  where: Prisma.StablecoinTransactionWhereInput
) =>
  prisma.stablecoinTransaction.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { user: true },
    where,
  });

export interface TransactionsGetResponse {
  total: number;
  page: number;
  pageSize: number;
  records: Prisma.PromiseReturnType<typeof getTransactions>;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query: Record<string, string> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      query[key] = value;
    }

    const {
      page = "1",
      pageSize = "10",
      userId,
      transactionType,
      startDate,
      endDate,
    } = query;
    const parsedPage = parseInt(page as string, 10);
    const parsedPageSize = parseInt(pageSize as string, 10);

    const where: Prisma.StablecoinTransactionWhereInput = {};

    if (userId) where.userId = parseInt(userId as string, 10);
    if (transactionType) where.transactionType = transactionType as string;
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const total = await prisma.stablecoinTransaction.count({ where });
    const transactions = await getTransactions(
      parsedPage,
      parsedPageSize,
      where
    );

    return Response.json({
      total,
      page: parsedPage,
      pageSize: parsedPageSize,
      records: transactions,
    } as TransactionsGetResponse);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return Response.error();
  } finally {
    await prisma.$disconnect();
  }
}
