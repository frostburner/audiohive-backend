import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import path from "path"
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const logger = morgan;
const app = express();
const port = process.env.PORT || 5001

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter)
app.use("/posts", postsRouter)

const server = app.listen(port, () => 
console.log("🚀 Server is running. Server: " + port));

export default server;
