import { Book } from "../../db/models/book.model.js";
import { validateBookName } from "../utils/validateName.js"

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ['id', 'name'],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ "Internal Server Error" : error.message});
  }
}

export const getBook = async (req, res) => {
  const { book_id: bookId } = req.params

  try {
    const book = await Book.findByPk(bookId)
    if (book)
      res.status(200).json(book);
    else
      res.status(404).json({ "Not Found": `book id not found : ${bookId}` });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
}

export const createBook = async (req, res) => {
  const { book_id: bookId } = req.params

  if (req.body.name) {
    if (!validateBookName(req.body.name)) {
      res.status(400).json({ "Invalid book name": `${req.body.name}` });
      return;
    }
  } else {
    res.status(400).json({ "Error" : "No book name provided in the body"});
    return;
  }

  try {
    const book = await Book.findByPk(bookId)
    if (!book) {
      const newBook = await Book.create({ id: bookId, name: req.body.name });
      res.status(201).json({ "New Book": newBook });
    } else {
      res.status(409).json({ "Book Already Exist" : `id : ${bookId}` });
    }
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
}
