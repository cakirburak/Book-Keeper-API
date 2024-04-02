export const errorHandler = (res, satatusCode, message) => {
  res.status(satatusCode);
  res.json({
    message: message,
  });
}