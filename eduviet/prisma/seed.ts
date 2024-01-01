import { PrismaClient, QuestionType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const answersForQuestionTypes = [
  [
    { text: "Option 1", isCorrect: true },
    { text: "Option 2", isCorrect: false },
    { text: "Option 3", isCorrect: false },
  ],
  [
    { text: "Item 1", isCorrect: true },
    { text: "Item 2", isCorrect: false },
    { text: "Item 3", isCorrect: false },
  ],
  [
    { text: "Option 1", isCorrect: true },
    { text: "Option 2", isCorrect: true },
    { text: "Option 3", isCorrect: false },
  ],
  [
    { text: "True", isCorrect: true },
    { text: "False", isCorrect: false },
  ],
  [
    { text: "Answer 1", isCorrect: true },
    { text: "Answer 2", isCorrect: false },
  ],
  [
    { text: "Option 1", isCorrect: true },
    { text: "Option 2", isCorrect: false },
  ],
  [
    { id: "a1", text: "Word 1", isCorrect: true },
    { id: "a2", text: "Word 2", isCorrect: false },
  ],
];

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: { name: "Hoa Nguyen" },
  });

  // Create some quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "Math Quiz",
      description: faker.lorem.words(15),
      author: { connect: { id: user1.id } },
    },
  });

  // Seed questions

  const questionsIds = (
    await prisma.$transaction(
      Object.values(QuestionType)
        .filter((t) => t !== "crossword" && t !== "shortAnswer")
        .map((type) =>
          prisma.question.create({
            data: {
              title: faker.lorem.words(5),
              explanation: faker.lorem.sentence(),
              type,
              quizId: quiz1.id,
            },
          })
        )
    )
  ).map((b) => b.id);

  await prisma.$transaction(
    questionsIds.map((questionId, index) =>
      prisma.answer.createMany({
        data: answersForQuestionTypes[index].map((a) => ({ ...a, questionId })),
      })
    )
  );

  const shortAnswerQuestionsIds = (
    await prisma.$transaction(
      ["Python", "for loop", "try catch", "do while"].map((answer) =>
        prisma.question.create({
          data: {
            title: faker.lorem.words(5),
            explanation: faker.lorem.sentence(),
            type: QuestionType.shortAnswer,
            quizId: quiz1.id,
            answers: { create: { text: answer, isCorrect: true } },
          },
        })
      )
    )
  ).map((b) => b.id);
  const crosswordQuestion = await prisma.question.create({
    data: {
      title: "Crossword",
      explanation: faker.lorem.sentence(),
      type: QuestionType.crossword,
      quizId: quiz1.id,
      children: { connect: shortAnswerQuestionsIds.map((id) => ({ id })) },
    },
  });

  console.log("Seeding done!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
