import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//GET User Function
async function getUsers(req,res,next){
    try {
        const users = await prisma.users.findMany()

        if (users){
            res.send(users)

        }
    } catch(err){
        res.send(err, "Service Error")
    }
}

//ADD User Function
async function addUser(res,req,next){
    const { username, email, firstname, lastname, password, category } = req.body;
    console.log(req.body)

    try{
        const createdUser = await prisma.users.create({
            data: {
                username,
                email,
                firstname,
                lastname,
                password,
                category,

            },
        });

        res.json(createdUser);
    } catch(err) {
        res.status(500).json({error: "Failed to create User"});
    }
}




const userController = { getUsers, addUser }

export default userController;