import express from "express"
import userController from "../controllers/userController.js";
const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.post('/add/admin', userController.addUser);
usersRouter.post('/addUser', userController.addUserProfile);

export default usersRouter;