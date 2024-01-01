import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export function queryQuestionDetail(id: string) {
  return prisma.question.findFirst({
    where: { id },
    include: { children: { include: { answers: true } }, answers: true },
  });
}

export type QueryQuestionDetailType = Prisma.PromiseReturnType<
  typeof queryQuestionDetail
>;
