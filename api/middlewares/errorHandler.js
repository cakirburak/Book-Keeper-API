export const errorHandler = (res, satatusCode, message) => {
  res.status(satatusCode).json({
    message: message,
  });;
}