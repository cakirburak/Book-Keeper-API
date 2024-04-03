import { User } from "../../db/models/user.model.js"
import { BorrowStats } from "../../db/models/borrowStats.model.js"
import { validateUserName } from "../utils/validateName.js"

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
  const { user_id: userId } = req.params

  const borrowStats = await BorrowStats.findAll({
    attributes: ['userId', 'bookId', 'isReturned', 'score'],
  });
  console.log(borrowStats.every(borrow => borrow instanceof BorrowStats)); // true
  console.log("All users_books:", JSON.stringify(borrowStats, null, 2));

  try {
    const user = await User.findByPk(userId);
    if(user)
      res.status(200).json(user);
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

  res.json({
    message: `User : ${userId}, Borrow Book ${bookId}`,
  });
}

export const returnBook = async (req, res) => {
  const { user_id: userId, book_id: bookId } = req.params;

  res.json({
    message: `User : ${userId}, Returns Book ${bookId}`,
  });
}
