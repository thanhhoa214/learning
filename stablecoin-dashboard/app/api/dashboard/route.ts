import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";

const query = () =>
  prisma.stablecoinTransaction.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

export type DashboardGetResponse = {
  topRecentTransactions: Prisma.PromiseReturnType<typeof query>;
  weeklyActivity: {
    date: string;
    numbers: Omit<Activity, "date">;
  }[];
};

type Activity = {
  date: string;
  issuance: number;
  redemption: number;
  transfer: number;
};

export async function GET() {
  try {
    const topRecentTransactions = await query();
    const activities: Activity[] = await prisma.$queryRaw`  
      SELECT
        date_trunc('day', "createdAt") AS date,
        SUM(CASE WHEN "transactionType" = 'Issuance' THEN "amount" ELSE 0 END) AS issuance,
        SUM(CASE WHEN "transactionType" = 'Redemption' THEN "amount" ELSE 0 END) AS redemption,
        SUM(CASE WHEN "transactionType" = 'Transfer' THEN "amount" ELSE 0 END) AS transfer
      FROM public."StablecoinTransaction"
      WHERE
        "createdAt" >= current_date - interval '7 days'
      GROUP BY
        date
      ORDER BY
        date;
 `;

    const weeklyActivity = activities.map(({ date, ...numbers }) => ({
      numbers,
      date,
    }));
    const response: DashboardGetResponse = {
      topRecentTransactions,
      weeklyActivity,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    return Response.error();
  }
}
