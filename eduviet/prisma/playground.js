const prismaLib = require("@prisma/client");
const prisma = new prismaLib.PrismaClient();

prisma.answer
  .findMany({ where: { questionId: "7d732206-2916-46df-b1aa-0349c65c2434" } })
  .then((users) => console.log(users));
