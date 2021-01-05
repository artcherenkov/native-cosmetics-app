import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaView, View, Text } from 'react-native';
import moment from 'moment';
import CalendarStrip from './components/calendar-strip/calendar-strip';

const Registry = () => {
  const today = moment();

  const [currentDates, setCurrentDates] = useState({ from: today, to: moment(today).add(6, `d`) });
  const [activeDate, setActiveDate] = useState(today);

  console.log(currentDates.from.format(`D dd MMM YYYY`), currentDates.to.format(`D dd MMM YYYY`));

  return (
    <SafeAreaView style={{ backgroundColor: `lightblue` }}>
      <CalendarStrip
        setCurrentDates={setCurrentDates}
        setActiveDate={setActiveDate}
        activeDate={activeDate}
        currentDates={currentDates}
        today={today}
      />
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
