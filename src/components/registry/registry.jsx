import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { SafeAreaView, View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DayNumber from './components/day-number/day-number';

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

const Registry = () => {
  const listRef = useRef(null);
  const windowWidth = Dimensions.get(`window`).width;
  const size = (windowWidth - 70) / 7;

  const beg = moment(`2021-01-01`);
  const end = moment(`2022-01-01`);
  const today = moment();

  const days = fillDaysArray(beg, end);

  const [currentDates, setCurrentDates] = useState({ from: today, to: moment(today).add(6, `d`) });
  const [activeDate, setActiveDate] = useState(today);

  console.log(currentDates.from.format(`D dd MMM YYYY`), currentDates.to.format(`D dd MMM YYYY`));

  useEffect(() => {
    const index = moment.duration(currentDates.from.diff(beg)).asDays();
    const realIndex = getWeekStartIndex(index);
    listRef.current.scrollToIndex({ index: realIndex });

    getMonths(currentDates);
  }, [currentDates]);

  const getWeekStartIndex = (index) => {
    const dayOffset = 7 % moment(days[0].date).weekday() + 1; // сколько дней до пн (если считать, что от пт до пн 3 дня)
    let realIndex = index - index % 7 + dayOffset;
    if (index <= dayOffset) {
      realIndex = index;
    } else if (index % 7 < dayOffset) {
      realIndex -= 7;
    }

    return realIndex;
  };

  const getItemLayout = (data, index) => ({ length: size, offset: size * index, index });
  const initialIndex = moment.duration(today.diff(beg)).asDays();
  return (
    <SafeAreaView style={{ backgroundColor: `lightblue` }}>
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
          initialScrollIndex={getWeekStartIndex(initialIndex)}
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

      <TouchableOpacity style={{ position: `absolute`, top: 130, right: 10 }} title="next" onPress={() => {
        const date = moment(currentDates.from).add(7, `d`);
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }}>
        <AntDesign name="right" size="20"/>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: `absolute`, top: 130, left: 10 }} title="prev" onPress={() => {
        let date = moment(currentDates.from).subtract(7, `d`);
        if (moment(date).isBefore(beg)) {
          date = beg;
        }
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }}>
        <AntDesign name="left" size="20"/>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => { */}
      {/*  setCurrentDates({ from: moment(today), to: moment(today).add(6, `d`) }); */}
      {/* }}> */}
      <Text style={{ textAlign: `center`, marginVertical: 30, fontSize: 18 }}>{activeDate && activeDate.format(`dddd D MMMM YYYY`)}</Text>
      {/* </TouchableOpacity> */}

      <View style={{ backgroundColor: `rgb(242, 242, 242)`, paddingTop: 30 }}>
        <Text style={{ fontSize: 24, textAlign: `center` }}>Выбранная дата: {activeDate && activeDate.format(`DD.MM.YYYY`)}</Text>
      </View>
    </SafeAreaView>
  );
};

Registry.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Registry;
