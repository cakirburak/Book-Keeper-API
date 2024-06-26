import { randomInt } from 'crypto';
import { User } from "../../db/models/user.model.js"
import { Book } from "../../db/models/book.model.js";
import { BorrowStats } from "../../db/models/borrowStats.model.js"
import { validateUserName, validateUserScore } from "../utils/validateReqBody.js"

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name'],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ "Interval Server Error" : error.message });
  }
}

export const getUser = async (req, res) => {
  const { user_id: userId } = req.params;
  const books = {
    "past": [],
    "present": [],
  }

  try {
    const borrowStats = await BorrowStats.findAll({
      attributes: ['userId', 'bookId', 'isReturned', 'score'],
      where: { userId: userId },
    });

    const processBorrow = async (borrow) => {
      const book = await Book.findByPk(borrow.bookId);
      if (borrow.isReturned) {
        books["past"].push({ "name": book.name, "userScore": borrow.score });
      } else {
        books["present"].push({ "name": book.name, "userScore": borrow.score });
      }
    };

    await Promise.all(borrowStats.map(processBorrow));
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }

  try {
    const user = await User.findByPk(userId);
    if(user)
      res.status(200).json({ ...user.dataValues, books });
    else
      res.status(404).json({"Not Found" : `user id not found : ${userId}`});
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
}

export const createUser = async (req, res) => {
  const { user_id: userId } = req.params;
  
  if (req.body.name) {
    if (!validateUserName(req.body.name)) {
      res.status(400).json({ "Invalid user name": `${req.body.name}` });
      return;
    }
  } else {
    res.status(400).json({ "Error": "No user name provided in the body" });
    return;
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      const newUser = await User.create({ id: userId, name: req.body.name });
      res.status(201).json({ "New User": newUser });
    } else {
      res.status(409).json({ "User Already Exist": `id : ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
}

export const borrowBook = async (req, res) => {
  const { user_id: userId, book_id: bookId } = req.params;
  let user = null, book = null;

  try {
    user = await User.findByPk(userId);
    if (!user)
      res.status(404).json({ "Not Found": `user id not found : ${userId}` });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }

  try {
    book = await Book.findByPk(bookId);
    if (!book)
      res.status(404).json({ "Not Found": `book id not found : ${bookId}` });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }

  if (book.isAvailable) {
    // book.isAvailable = false
    book.update({ isAvailable: false });
    await BorrowStats.create({
      id: randomInt(8,8000),
      userId: user.id,
      bookId: book.id,
      isReturned: false,
    });
    res.status(204).json({});
  } else {
    res.status(424).json({ "Failed" : `book ${book.id} is not available`})
  }
}

export const returnBook = async (req, res) => {
  const { user_id: userId, book_id: bookId } = req.params;
  let user = null, book = null;

  if (req.body.score) {
    if (!validateUserScore(req.body.score)) {
      res.status(400).json({ "Invalid user score": `${req.body.score}` });
      return;
    }
  } else {
    res.status(400).json({ "Error": "No user name provided in the body" });
    return;
  }

  try {
    user = await User.findByPk(userId);
    if (!user)
      res.status(404).json({ "Not Found": `user id not found : ${userId}` });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }

  try {
    book = await Book.findByPk(bookId);
    if (!book)
      res.status(404).json({ "Not Found": `book id not found : ${bookId}` });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }

  try {
    const borrowStat = await BorrowStats.findOne({
      where: { userId: userId, bookId: bookId, isReturned: false },
    });
    console.log(borrowStat);
    if (borrowStat) {
      borrowStat.update({ isReturned: true, score: req.body.score });
      res.status(204).json({});
    } else {
      res.status(424).json({ "Failed": `book ${book.id} has not borrowed by user ${user.id}` })
    }
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
}
