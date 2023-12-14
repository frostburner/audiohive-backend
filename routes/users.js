import express from "express"
import userController from "../controllers/userController.js";
const usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
// usersRouter.post('/add/admin', userController.addAdminUser);
usersRouter.post('/add', userController.addUser);
usersRouter.post('/register', userController.registerUser);
usersRouter.post('/login', userController.loginUser);

export default usersRouter;