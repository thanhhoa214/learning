import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push(
        await prisma.user.create({
          data: {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            kycStatus: faker.helpers.arrayElement(["completed", "pending"]),
            twoFAStatus: faker.datatype.boolean(),
          },
        })
      );
    }
    // Seed transactions
    for (let i = 0; i < 1000; i++) {
      const randomUser = faker.helpers.arrayElement(users);
      const randomDate = faker.date.between({
        from: "2023-01-01",
        to: "2024-01-01",
      });
      const randomAmount = faker.number.float({ min: -1000, max: 1000 });

      await prisma.stablecoinTransaction.create({
        data: {
          amount: randomAmount,
          transactionType: randomAmount < 0 ? "Redemption" : "Issuance",
          createdAt: randomDate,
          updatedAt: randomDate,
          userId: randomUser.id,
        },
      });
    }

    // Seed invoices
    await prisma.invoice.createMany({
      data: [
        {
          amount: 200.3,
          description: "Invoice 1",
          dueDate: new Date(),
          userId: users[0].id,
        },
        {
          amount: 75.8,
          description: "Invoice 2",
          dueDate: new Date(),
          userId: users[1].id,
        },
        // Add more invoices as needed
      ],
    });

    // Seed Ethereum wallets
    await prisma.ethereumWallet.createMany({
      data: [
        {
          address: "0xWallet1",
          privateKey: "privateKey1",
          publicKey: "publicKey1",
          userId: users[0].id,
        },
        {
          address: "0xWallet2",
          privateKey: "privateKey2",
          publicKey: "publicKey2",
          userId: users[1].id,
        },
        // Add more wallets as needed
      ],
    });

    // Seed stablecoin transactions
    await prisma.stablecoinTransaction.createMany({
      data: [
        { amount: 500.0, transactionType: "Issuance", userId: users[0].id },
        { amount: 200.0, transactionType: "Redemption", userId: users[1].id },
        // Add more transactions as needed
      ],
    });

    // Seed notifications
    await prisma.notification.createMany({
      data: [
        {
          message: "Notification 1",
          isEmailSent: true,
          isPushSent: false,
          userId: users[0].id,
        },
        {
          message: "Notification 2",
          isEmailSent: false,
          isPushSent: true,
          userId: users[1].id,
        },
        // Add more notifications as needed
      ],
    });

    // Seed event logs
    await prisma.eventLog.createMany({
      data: [
        { eventType: "Log 1", details: "Details 1" },
        { eventType: "Log 2", details: "Details 2" },
        // Add more logs as needed
      ],
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error during seed:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
