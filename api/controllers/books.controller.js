
export const getBooks = async (req, res) => {
  res.json({
    message: 'Get Books!',
  });
}

export const getBook = async (req, res) => {
  const { book_id: bookId } = req.params

  res.json({
    message: `Get Book : ${bookId}`,
  });
}

export const createBook = async (req, res) => {
  const { book_id: bookId } = req.params

  res.json({
    message: `Create Book : ${bookId}`,
  });
}