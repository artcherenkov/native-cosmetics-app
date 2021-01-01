export const addIds = (arr) => (
  arr
    .slice()
    .map((item, i) => ({ id: i, ...item }))
);

export const getRandomInt = (min = 0, max = 1) => Math.floor(Math.random() * max) + min;

export const getRandomArrayItem = (arr) => arr[getRandomInt(0, arr.length - 1)];
