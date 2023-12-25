import { Prisma } from "@prisma/client";

export interface CreateQuizApi {
  quiz: Prisma.QuizCreateInput;
  questions: Prisma.QuestionCreateInput;
  answers: Prisma.AnswerCreateInput;
}
