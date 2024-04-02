export const notFound = (req, res, next) => {
  res.status(404);
  const error = `Not Found - ${req.originalUrl}`;
  res.json({
    message: error
  })
}