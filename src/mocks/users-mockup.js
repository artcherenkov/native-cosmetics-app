import { getRandomArrayItem, getRandomInt } from '../utils/common';

const CITIES = [
  `Новосибирск`,
  `Москва`,
  `Казань`,
  `Краснодар`,
  `Сочи`,
];

const ROLES = [
  `Косметолог`,
  `Массажист`,
  `Администратор`,
];

const getUniqueRandomItems = (arr) => {
  const items = [];

  const count = getRandomInt(1, arr.length);
  for (let i = 0; i < count; i++) {
    items.push(ROLES[getRandomInt(0, ROLES.length)]);
  }

  const set = new Set(items);

  const uniqueItems = [];
  set.forEach(value => uniqueItems.push(value));

  return uniqueItems;
};

export const mockupUserData = (arr) => (
  arr.reduce((acc, item, i) => {
    acc.push({
      id: i,
      ...item,
      city: getRandomArrayItem(CITIES),
      roles: getUniqueRandomItems(ROLES).map((role, i) => ({ role, i: i + 1 })),
      rating: getRandomInt(10, 100) * 10,
    });
    return acc;
  }, [])
);
