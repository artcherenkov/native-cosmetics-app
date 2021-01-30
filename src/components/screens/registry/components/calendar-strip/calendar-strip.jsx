import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { setActiveDate as setActiveDateAction } from '../../../../../store/action';
import DayNumber from '../day-number/day-number';
import Controls from '../controls/controls';

/**
 * Заполняет массив элементами, каждый из которых - день из промежутка [beg, end].
 * @param beg
 * @param end
 * @returns {[]}
 */
const fillDaysArray = (beg, end) => {
  const duration = moment.duration(end.diff(beg)).asDays();
  const days = [];
  for (let i = 0; i <= duration; i++) {
    const date = moment(beg).add(i, `d`);
    days.push({ date, day: date.format(`D`), dayOfWeek: date.format(`dd`) });
  }

  return days;
};

/**
 * Возвращает название месяца (месяцев) для отображения над строкой календаря
 * @param calStripLeft
 * @returns {string}
 */
const getMonths = (calStripLeft) => {
  const from = moment(calStripLeft);
  const to = moment(calStripLeft).add(6, `d`);
  if (moment(from).month() === moment(to).month()) {
    return moment(from).format(`MMMM`);
  }

  return moment(from).format(`MMMM`) + ` / ` + moment(to).format(`MMMM`);
};

/**
 * Возвращает индекс ближайшего понедельника к дате из аргумента
 * @param date
 * @param beg
 * @param dayOffset
 * @returns {number}
 */
const getWeekStartIndex = (date, { beg, dayOffset }) => {
  const index = moment.duration(moment(date).diff(beg)).asDays();
  let weekStartIndex = index - index % 7 + dayOffset;
  if (index < dayOffset) {
    return 0;
  } else if (index % 7 < dayOffset) {
    weekStartIndex -= 7;
  }

  return weekStartIndex;
};

/**
 * Cколько дней до пн (если считать, что getDaysOffset(Понедельник) = 0)
 * @param days
 * @returns {number}
 */
const getDaysOffset = (days) => 7 % moment(days[0].date).weekday();

/**
 * Функция для рендера FlatList
 * @param size
 * @returns {function(*, *): {offset, length: *, index: *}}
 */
const getItemLayout = ({ size }) => (data, index) => ({ length: size, offset: size * index, index });

/**
 * Функция для рендера элемента FlatList
 * @param size
 * @param today
 * @param activeDate
 * @param dayOfWeek
 * @param setActiveDate
 * @returns {function({item: *}): *}
 */
const renderDay = ({ size, today, activeDate, setActiveDate }) => ({ item }) => (
  <DayNumber
    day={item.day}
    size={size}
    date={item.date}
    dayOfWeek={item.dayOfWeek}
    setActiveDate={setActiveDate}
    isToday={moment(item.date).isSame(today, `day`)}
    isActive={moment(item.date).isSame(activeDate, `day`)}
  />
);

const CalendarStrip = ({ registrations, activeDate, calStripLeft, today, setCurrentDates, setActiveDate, isLoading }) => {
  const { fullCost, numberOfClients } = registrations[moment(activeDate).format(`YYYY-MM-DD`)] || {};

  const listRef = useRef(null);
  const beg = moment(`2021-01-01`);
  const end = moment(`2022-01-01`);

  const days = fillDaysArray(beg, end);
  const dayOffset = getDaysOffset(days);

  const windowWidth = Dimensions.get(`window`).width;
  const size = (windowWidth - 70) / 7;

  const componentData = { beg, end, days, dayOffset, calStripLeft, size, today, activeDate, setActiveDate };

  const scrollLeft = () => {
    let date = moment(calStripLeft).subtract(7, `d`);
    if (moment(date).isBefore(beg)) {
      date = beg;
    }
    setCurrentDates(date);
  };
  const scrollRight = () => {
    let date;
    if (moment(calStripLeft).isSame(beg, `days`)) {
      date = moment(calStripLeft).add(dayOffset, `d`);
    } else {
      date = moment(calStripLeft).add(7, `d`);
    }
    setCurrentDates(date);
  };

  useEffect(() => {
    listRef.current.scrollToIndex({ index: getWeekStartIndex(calStripLeft, componentData) });
  }, [calStripLeft]);

  return (
    <>
      <Text style={styles.monthName}>{getMonths(calStripLeft)}</Text>
      <View style={styles.listWrapper}>
        <FlatList
          style={styles.list}
          scrollEnabled={true}
          data={days}
          horizontal={true}
          ref={listRef}
          getItemLayout={getItemLayout(componentData)}
          initialNumToRender={10}
          initialScrollIndex={getWeekStartIndex(today, componentData)}
          keyExtractor={(item, i) => i.toString()}
          renderItem={renderDay(componentData)}
        />
      </View>

      <Controls scrollLeft={scrollLeft} scrollRight={scrollRight}/>
      <Text style={styles.selectedDate}>
        {activeDate && activeDate.format(`dddd D MMMM YYYY`)}
      </Text>
      <View style={styles.dayStats}>
        <View>
          <Text style={styles.dayStatTitle}>Клиентов: </Text>
          {!isLoading
            ? <Text style={styles.dayStat}>{numberOfClients || 0}</Text>
            : <ActivityIndicator />}
        </View>
        <View>
          <Text style={styles.dayStatTitle}>Услуг на сумму: </Text>
          {!isLoading
            ? <Text style={styles.dayStat}>&#8381;{fullCost || 0}</Text>
            : <ActivityIndicator />}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  monthName: {
    textAlign: `center`,
    fontSize: 24,
  },
  listWrapper: {
    paddingHorizontal: 35,
    position: `relative`,
  },
  list: {
    height: 100,
    paddingTop: 20,
  },
  selectedDate: {
    textAlign: `center`,
    marginVertical: 5,
    fontSize: 18,
  },
  dayStats: {
    margin: 10,
    flexDirection: `row`,
    justifyContent: `space-around`,
  },
  dayStatTitle: {
    color: `#434343`,
  },
  dayStat: {
    fontSize: 20,
    textAlign: `center`,
  },
});

const mapStateToProps = state => ({
  registrations: state.STORE.registrations,
  isLoading: state.STATE.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setActiveDate(date) {
    dispatch(setActiveDateAction(date));
  },
});

export { CalendarStrip };
export default connect(mapStateToProps, mapDispatchToProps)(CalendarStrip);
