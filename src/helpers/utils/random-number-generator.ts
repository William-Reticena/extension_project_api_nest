export const generateRandomNumber = (start = 0, end = 1) =>
  Math.floor(Math.random() * (end - start + 1)) + start;
