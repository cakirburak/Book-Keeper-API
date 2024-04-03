import validator from "validator";
import { errorHandler } from "./errorHandler.js";

export const validateId = (req, res, next) => {

  const { user_id, book_id } = req.params;

  const isUserIdExist = user_id ? true : false;
  const isBookIdExist = book_id ? true : false;

  const isUserIdValid = isUserIdExist ? validator.isInt(user_id, { gt: 0 }) : true;
  const isBookIdValid = isBookIdExist ? validator.isInt(book_id, { gt: 0 }) : true;

  if (isUserIdValid && isBookIdValid) {
    next();
  } else {
    if (!isUserIdValid && !isBookIdValid) {
      res.status(400).json({ "message" : `invalid user_id, book_id : ${req.params.user_id}, ${req.params.book_id}` });
    } else if (!isUserIdValid) {
      res.status(400).json({ "message": `invalid user_id : ${req.params.user_id}` });
    } else {
      res.status(400).json({ "message": `invalid book_id : ${req.params.book_id}` });
    }
  }
};
