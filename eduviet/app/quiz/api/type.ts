import { prisma } from "@/lib/prisma";
import { PrismaOmitId } from "@/types/missing.type";
import { Prisma } from "@prisma/client";

export const getQuizById = (id: string) => {
  return prisma.quiz.findFirstOrThrow({
    where: { id },
    include: { questions: { include: { answers: true } } },
  });
};
export const deleteQuizById = (id: string) => {
  return prisma.quiz.delete({ where: { id } });
};

export interface CreateQuizRequest {
  quiz: PrismaOmitId<Prisma.QuizCreateManyAuthorInput>;
  questions: Array<{
    question: PrismaOmitId<Prisma.QuestionCreateManyQuizInput>;
    answers: Array<PrismaOmitId<Prisma.AnswerCreateManyQuestionInput>>;
  }>;
}
export type CreateQuizResponse = Prisma.PromiseReturnType<typeof getQuizById>;

export type DeleteQuizResponse = Prisma.PromiseReturnType<
  typeof deleteQuizById
>;
