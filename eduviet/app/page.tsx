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

export default async function Home() {
  const quizes = await prisma.quiz.findMany({ include: { _count: true } });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
        <Button className="ml-auto" size="sm">
          New Quiz
        </Button>
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
