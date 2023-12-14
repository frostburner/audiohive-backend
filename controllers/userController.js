import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET User Function
async function getUsers(req,res){
    try {
        const getusers = await prisma.users.findMany({
            include: {
                profile: true
            }
        })

        if (getusers){
           res.send(getusers)

        }
    } catch(err){
        // res.send(err, "Service Error")
        console.error(err)
        res.status(500).json({error: "error."})
    }
}


//ADD User Function << commented out 
async function addUser(req, res, next) {
    const { role, profile } = req.body;
    const { username, email, firstname, lastname, password, category } = profile;
  
    try {
      const createdUser = await prisma.users.create({
        data: {
          profile: {
            create: {
              username,
              email,
              firstname,
              lastname,
              password,
              category,
            },
          },
          role,
        },
      });
  
      res.status(200).json({ message: 'User created.', user_ID: createdUser.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
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

async function registerUser(req, res, next) {
  const { username, email, firstname, lastname, password, category, role } = req.body;

  // Check if the provided role is valid
  if (role !== 'MUSICIAN' && role !== 'EVENT_ORG') {
    return res.status(400).json({ error: 'Invalid role.' });
  }

  try {
    const createdUser = await prisma.users.create({
      data: {
        profile: {
          create: {
            username,
            email,
            firstname,
            lastname,
            password,
            category,
          },
        },
        role,
      },
    });

    res.status(200).json({ message: 'User registered.', user_ID: createdUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
}

async function loginUser(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        profile: {
          username,
        },
      },
      include: {
        profile: true,
      },
    });

    // Check if the user exists and if the provided password matches
    if (!user || user.profile.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'User logged in.', user_ID: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
}





const userController = { getUsers, addUser , deleteUser, registerUser, loginUser}

export default userController;