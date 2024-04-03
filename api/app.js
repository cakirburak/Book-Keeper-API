import express from "express";
import morgan from "morgan";

import usersRouter from "./routes/users.route.js"
import booksRouter from "./routes/books.route.js"
import { notFound } from "./middlewares/notFound.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.use(notFound);

export default app;