import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  borrowBook,
  returnBook
} from "../controllers/users.controller.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.get("", getUsers);
router.get("/:user_id", validateId, getUser);
router.post("/:user_id", validateId, createUser);
router.post("/:user_id/borrow/:book_id", validateId, borrowBook);
router.post("/:user_id/return/:book_id", validateId, returnBook);

export default router;