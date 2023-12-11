import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET User Function
async function getUsers(req,res,next){
    try {
        const users = await prisma.users.findMany({
            include:{
                profile: true
            },

        })

        if (users){
            res.send(users)

        }
    } catch(err){
        res.send(err, "Service Error")
    }
}


//ADD User Function
async function addUserProfile(req,rse){
    const formData = req.body;
    console.log(req.body);

    try{
        const createdUserProfile = await prisma.users.create({
          data: {
            username: formData.username,
            password: formData.password,
          }
        });
        res.status(200).json({ message: 'Login successful!', userId: createdUserProfile.id });
    } catch (err) {
              console.error(err);
              res.status(500).json({ error: 'Error' });
    }
}

//ADD AdminUser Function
// async function addUser(req, res){
//     const formData = req.body;
//     console.log(req.body);

//     try{
//         const createdUser = await prisma.users.create({
//             data: {
//                 profile: {
//                     create: {
//                 username: formData.username,
//                 email: formData.email,
//                 firstname: formData.firstname,
//                 lastname: formData.lastname,
//                 password: formData.password,
//                 category: formData.category,
            
//             },
//         },
//     },
//         });
//         res.status(200).json({ message: 'Admin Signup successful!', userId: createdUser.id });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

  //ADD MusicianUser Function
async function addUser(req, res){
    const formData = req.body;
    console.log(req.body);

    try{
        const createdUser = await prisma.users.create({
            data: {
                profile: {
                    create: {
                username: formData.username,
                email: formData.email,
                firstname: formData.firstname,
                lastname: formData.lastname,
                password: formData.password,
                category: formData.category,
            
            },
        },
    },
        });
        res.status(200).json({ message: 'Admin Signup successful!', userId: createdUser.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

//DELETE User Function
async function deleteUser(res, req, next){
    const { id } = req.body;

    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: id,
            },
        });

        res.json(deletedUser);
    } catch (err){
        console.log("Failed to delete User", err);
        res.status(500).json({error: "Failed to delete user."});
    }
}



const userController = { getUsers, addUser , deleteUser, addUserProfile }

export default userController;