
export const getUsers = async (req, res) => {
  res.json({
    message: 'Get Users!',
  });
}

export const getUser = async (req, res) => {
  const { use_id: userId } = req.params

  res.json({
    message: `Get User : ${userId}`,
  });
}

export const createUser = async (req, res) => {
  const { user_id: userId } = req.params;
  res.status(200).json({
    message: `Create User : ${userId}`,
  });
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
