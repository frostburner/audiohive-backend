import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();

async function seed() {
  const password = "1234";
  try {
    const users = await prisma.users.createMany({
      data: [
        {
          id: "1",
          username: "@testuser1",
          email: "user1@mail.com",
          firstname: "User1",
          lastname: "User1",
          password: password,
          categpry: "Musician",
        },
        {
          id: "2",
          username: "@testuser2",
          email: "user2@mail.com",
          firstname: "User2",
          lastname: "User2",
          password: password,
          categpry: "Event Organizer",
        },

        {
          id: "3",
          username: "@testuser3",
          email: "user3@mail.com",
          firstname: "User3",
          lastname: "User3",
          password: password,
          categpry: "Enthusiast",
        },
      ],
    });

    console.log("users are:", users.data);
  } catch (err) {
    console.log("Error in seed file", err);
  } finally {
    await prisma.$disconnect();
  }
}
