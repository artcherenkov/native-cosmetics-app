import moment from "moment";

export const addIds = (arr) => (
  arr
    .slice()
    .map((item, i) => ({ id: i, ...item }))
);

export const getRandomInt = (min = 0, max = 1) => Math.floor(Math.random() * max) + min;

export const getRandomArrayItem = (arr) => arr[getRandomInt(0, arr.length)];

export const range = (number) => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }

  return res;
};

export const getDurationString = (duration = 61) => {
  const minutes = moment.duration(duration, `m`).minutes();
  const hours = moment.duration(duration, `m`).hours();
  let result = ``;
  if (hours) {
    result += `${hours}ч`;
  }
  if (minutes) {
    result += ` ${minutes}м`;
  }
  return result.trim();
};

export const getDuration = ({ begin, duration }) => ({
  begin: moment(begin).format(`kk:mm`),
  end: moment(begin).add(duration, `m`).format(`kk:mm`),
});

export const getRandomId = () => `${moment().unix() + Math.random()}`;
