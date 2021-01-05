import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import DayNumber from '../day-number/day-number';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setActiveDate as setActiveDateAction } from '../../../../store/action';

const fillDaysArray = (beg, end) => {
  const duration = moment.duration(end.diff(beg)).asDays();
  const days = [];
  for (let i = 0; i <= duration; i++) {
    const date = moment(beg).add(i, `d`);
    days.push({ date, text: date.format(`D dd MMM`), day: date.format(`D`), dayOfWeek: date.format(`dd`) });
  }

  return days;
};
const getMonths = (dates) => {
  const { from, to } = dates;
  if (moment(from).month() === moment(to).month()) {
    return moment(from).format(`MMMM`);
  }

  return moment(from).format(`MMMM`) + ` / ` + moment(to).format(`MMMM`);
};
const getWeekStartIndex = (dayOffset, index) => {
  let realIndex = index - index % 7 + dayOffset;
  if (index <= dayOffset) {
    realIndex = index;
  } else if (index % 7 < dayOffset) {
    realIndex -= 7;
  }

  return realIndex;
};

const CalendarStrip = ({ activeDate, currentDates, today, setCurrentDates, setActiveDate }) => {
  const listRef = useRef(null);
  const beg = moment(`2021-01-01`);
  const end = moment(`2022-01-01`);

  const days = fillDaysArray(beg, end);
  const dayOffset = 7 % moment(days[0].date).weekday() + 1; // сколько дней до пн (если считать, что от пт до пн 3 дня)

  const windowWidth = Dimensions.get(`window`).width;
  const size = (windowWidth - 70) / 7;

  useEffect(() => {
    const index = moment.duration(currentDates.from.diff(beg)).asDays();
    const realIndex = getWeekStartIndex(dayOffset, index);
    listRef.current.scrollToIndex({ index: realIndex });

    getMonths(currentDates);
  }, [currentDates]);

  const getItemLayout = (data, index) => ({ length: size, offset: size * index, index });
  const initialIndex = moment.duration(today.diff(beg)).asDays();
  return (
    <>
      <Text style={{ textAlign: `center`, fontSize: 24 }}>{getMonths(currentDates)}</Text>
      <View style={{ paddingHorizontal: 35, position: `relative` }}>
        <FlatList
          style={{ height: 100, paddingTop: 20 }}
          scrollEnabled={true}
          data={days}
          horizontal={true}
          ref={listRef}
          getItemLayout={getItemLayout}
          initialNumToRender={10}
          initialScrollIndex={getWeekStartIndex(dayOffset, initialIndex)}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={{ width: size, flex: 1, alignItems: `center`, justifyContent: `center` }}>
              <DayNumber
                day={item.day}
                size={size}
                date={item.date}
                setActiveDate={setActiveDate}
                isToday={moment(item.date).isSame(today, `day`)}
                isActive={moment(item.date).isSame(activeDate, `day`)}
              />
              <Text style={{ textAlign: `center`, marginTop: 5 }}>{item.dayOfWeek}</Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={{ position: `absolute`, top: 80, right: 10 }} title="next" onPress={() => {
        let date;
        if (currentDates.from.isSame(beg, `days`)) {
          date = moment(currentDates.from).add(dayOffset, `d`);
        } else {
          date = moment(currentDates.from).add(7, `d`);
        }
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }}>
        <AntDesign name="right" size="20"/>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: `absolute`, top: 80, left: 10 }} title="prev" onPress={() => {
        let date = moment(currentDates.from).subtract(7, `d`);
        if (moment(date).isBefore(beg)) {
          date = beg;
        }
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }}>
        <AntDesign name="left" size="20"/>
      </TouchableOpacity>
      <Text style={{ textAlign: `center`, marginVertical: 5, fontSize: 18 }}>{activeDate && activeDate.format(`dddd D MMMM YYYY`)}</Text>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setActiveDate (date) {
    dispatch(setActiveDateAction(date));
  },
});

export { CalendarStrip };
export default connect(null, mapDispatchToProps)(CalendarStrip);
