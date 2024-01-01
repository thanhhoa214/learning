import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { CreateQuizRequest, getQuizById } from "./type";

export async function POST(request: NextRequest) {
  const body: CreateQuizRequest = await request.json();
  const quiz = await prisma.quiz.create({
    data: { ...body.quiz, authorId: "dacc9977-14e0-44b8-8e09-88013b4d2316" },
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
