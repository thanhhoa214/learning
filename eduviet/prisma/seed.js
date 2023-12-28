const prismaLib = require("@prisma/client");
const faker = require("@faker-js/faker").faker;

const prisma = new prismaLib.PrismaClient();
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
      Object.values(prismaLib.QuestionType).map((type) =>
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

  console.log("Seeding done!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
