import { prisma } from "@/lib/prisma";
import { IdParamsProp } from "@/types/missing.type";
import { redirect } from "next/navigation";

export default async function QuizDetailPage({ params: { id } }: IdParamsProp) {
  const { questions } = await prisma.quiz.findFirstOrThrow({
    where: { id },
    include: { questions: { take: 1, include: { answers: true } } },
  });
  redirect(`/quiz/${id}/question/${questions[0]?.id}`);
}
