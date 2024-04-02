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
      next(errorHandler(res, 400, `invalid user_id, book_id : ${req.params.user_id}, ${req.params.book_id}`));
    } else if (!isUserIdValid) {
      next(errorHandler(res, 400, `invalid user_id : ${req.params.user_id}`));
    } else {
      next(errorHandler(res, 400, `invalid book_id : ${req.params.book_id}`));
    }
  }
};
