import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});
// app.use("/api/user", userRouter)

export default app;