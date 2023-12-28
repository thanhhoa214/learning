import { prisma } from "@/lib/prisma";

import QuizCard from "./components/QuizCard";

export default async function DashboardPage() {
  const quizes = await prisma.quiz.findMany({ include: { _count: true } });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizes.map(({ _count, ...quiz }) => (
          <QuizCard
            quiz={quiz}
            questionCount={_count.questions}
            key={quiz.id}
          />
        ))}
      </ul>
    </main>
  );
}
