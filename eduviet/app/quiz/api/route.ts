import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { CreateQuizRequest, getQuizById } from "./type";

export async function POST(request: NextRequest) {
  const body: CreateQuizRequest = await request.json();
  const quiz = await prisma.quiz.create({
    data: { ...body.quiz, authorId: "b737e5f8-f551-4e1b-bc31-83933ab99642" },
  });
  await Promise.all(
    body.questions.map((question) =>
      prisma.question
        .create({
          data: { ...question.question, quizId: quiz.id },
        })
        .then((createdQuestion) =>
          prisma.answer.createMany({
            data: question.answers.map((answer) => ({
              ...answer,
              questionId: createdQuestion.id,
            })),
          })
        )
    )
  );

  const createdQuiz = await getQuizById(quiz.id);
  return Response.json(createdQuiz);
}
