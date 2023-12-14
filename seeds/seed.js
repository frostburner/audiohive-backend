import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();

async function userSeed(){
  // const password = "1234";

  try {
    const deleteProfile = prisma.profile.deleteMany()
    const deleteUsers = prisma.adminusers.deleteMany()
    await prisma.$transaction([deleteProfile, deleteUsers])
    // const userData = [];

    // for (const user of userData) {
    //   await prisma.user.create({
    //     data: user,
    //   });
    // }
    //   console.log("User has been created.");
  } catch (err) {
    console.error("Error in seed file", err);
  } finally {
    await prisma.$disconnect();
  }
}

export default userSeed();