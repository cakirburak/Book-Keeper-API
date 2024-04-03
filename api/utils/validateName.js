import validator from "validator";

export const validateUserName = (name) => {
  // check if name is not empty and contains letters a-zA-Z and white space
  console.log((/\s/) instanceof RegExp);
  return !validator.isEmpty(name) && validator.isAlpha(name, "tr-TR", {ignore: (/\s/)});
}

export const validateBookName = (name) => {
  // check if name is not empty and contains letters a-zA-Z0-9 and white space
  return !validator.isEmpty(name) && validator.isAlphanumeric(name, "tr-TR", { ignore: (/\s/) });
}