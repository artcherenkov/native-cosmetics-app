import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, SafeAreaView, View, Text, FlatList, Dimensions } from 'react-native';
import moment from 'moment';

const fillDaysArray = (beg, end) => {
  const duration = moment.duration(end.diff(beg)).asDays();
  const days = [];
  for (let i = 0; i <= duration; i++) {
    const date = moment(beg).add(i, `d`);
    days.push({ date, text: date.format(`D dd MMM`) });
  }

  return days;
};

const Registry = () => {
  const listRef = useRef(null);
  const windowWidth = Dimensions.get(`window`).width;
  const size = (windowWidth - 40) / 7;

  const beg = moment(`2020-01-02`);
  const end = moment(`2022-01-01`);
  const today = moment();

  const days = fillDaysArray(beg, end);

  const [currentDates, setCurrentDates] = useState({ from: today, to: moment(today).add(6, `d`) });

  const initialIndex = moment.duration(today.diff(beg)).asDays();

  console.log(currentDates.from.format(`D dd MMM YYYY`), currentDates.to.format(`D dd MMM YYYY`));

  useEffect(() => {
    const index = moment.duration(currentDates.from.diff(beg)).asDays();
    const realIndex = getWeekStartIndex(index);
    listRef.current.scrollToIndex({ index: realIndex });
  }, [currentDates]);

  const scrollToDate = (date) => {
    const index = moment.duration(date.diff(beg)).asDays();
    scrollToWeekStart(index);
  };
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
  const scrollToWeekStart = (index) => {
    const realIndex = getWeekStartIndex(index);
    setCurrentDates({ from: days[realIndex].date, to: moment(days[realIndex].date).add(6, `d`) });
  };

  const getItemLayout = (data, index) => ({ length: size, offset: size * index, index });
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20, backgroundColor: `lightblue` }}>
        <FlatList
          style={{ height: 100, paddingTop: 20 }}
          scrollEnabled={true}
          data={days}
          horizontal={true}
          ref={listRef}
          getItemLayout={getItemLayout}
          initialScrollIndex={getWeekStartIndex(initialIndex)}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => <View
            style={{ width: size, height: size, borderWidth: 1, borderColor: `red`, backgroundColor: `#8dfff5` }}>
            <Text>{item.text}</Text>
          </View>}
        />
      </View>
      <Button title="next" onPress={() => {
        const date = moment(currentDates.from).add(7, `d`);
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }} />
      <Button title="prev" onPress={() => {
        const date = moment(currentDates.from).subtract(7, `d`);
        setCurrentDates({ from: date, to: moment(date).add(6, `d`) });
      }}/>
      <Button title="Сегодня" onPress={() => scrollToDate(moment(today))}/>
    </SafeAreaView>
  );
};

Registry.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Registry;
