import express from "express";
import { getBooks, getBook, createBook } from "../controllers/books.controller.js";
import { validateId } from "../middlewares/validateId.js";

const router = express.Router();

router.get("", getBooks);
router.get("/:book_id", validateId, getBook);
router.post("/:book_id", validateId, createBook);

export default router;