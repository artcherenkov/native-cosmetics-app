import moment from 'moment';

export default {
  [moment().add(1, `d`).toISOString()]: [
    {
      begin: moment().add(1, `d`).hour(15).minute(0).second(0),
      duration: 90, // минут
      title: `Супер событие 3, 7 января`,
    },
    {
      begin: moment().add(1, `d`).hour(10).minute(30).second(0),
      duration: 60, // минут
      title: `Супер событие 2, 7 января`,
    },
    {
      begin: moment().add(1, `d`).hour(8).minute(0).second(0),
      duration: 45, // минут
      title: `Супер событие 1, 7 января`,
    },
  ],
  [moment().add(3, `d`).toISOString()]: [
    {
      begin: moment().add(3, `d`).hour(10).minute(0).second(0),
      duration: 90, // минут
      title: `Супер событие 1, 9 января`,
    },
    {
      begin: moment().add(3, `d`).hour(18).minute(0).second(0),
      duration: 60, // минут
      title: `Супер событие 2, 9 января`,
    },
  ],
};
