import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const quizes = await prisma.quiz.findMany({ include: { _count: true } });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <ul>
        {quizes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{quiz.description}</p>
              <strong>Questions Count: {quiz._count.questions}</strong>
            </CardContent>
            <CardFooter>
              <Link href={"/quiz/" + quiz.id}>
                <Button>Detail</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </main>
  );
}
