import express from "express"
import userController from "../controllers/userController.js";
var usersRouter = express.Router();

usersRouter.get('/', userController.getUsers);
usersRouter.post('/', userController.addUser);