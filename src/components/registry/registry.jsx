import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CalendarStrip from './components/calendar-strip/calendar-strip';

const range = (number) => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }

  return res;
};

const Registry = () => {
  const today = moment();
  const [currentDates, setCurrentDates] = useState({ from: today, to: moment(today).add(6, `d`) });
  const [activeDate, setActiveDate] = useState(today);
  console.log(currentDates.from.format(`D dd MMM YYYY`), currentDates.to.format(`D dd MMM YYYY`));

  const events = [
    {
      begin: moment().hour(15).minute(0).second(0),
      duration: 90, // минут
    },
    {
      begin: moment().hour(8).minute(0).second(0),
      duration: 30, // минут
    },
  ];

  console.log(events);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `lightblue` }}>
      <View style={{ marginBottom: 10 }}>
        <CalendarStrip setCurrentDates={setCurrentDates} setActiveDate={setActiveDate} activeDate={activeDate} currentDates={currentDates} today={today}/>
      </View>
      <View style={{ backgroundColor: `rgb(242, 242, 242)`, flexGrow: 1 }}>
        <ScrollView style={{ height: 200, paddingLeft: 45, paddingTop: 15 }}>
          {range(25).map((i) => (
            <View key={`hour-${i}`} style={ i === 24 ? [{ borderTopWidth: 1, borderColor: `lightgrey`, height: 25, position: `relative`, zIndex: 2 }] : { borderTopWidth: 1, borderColor: `lightgrey`, height: 60, position: `relative`, zIndex: 1, elevation: 1 }}>
              <Text style={{ position: `absolute`, left: -40, top: -8, fontSize: 12 }}>
                { i < 10 ? `0${i}:00` : `${i}:00` }
              </Text>
            </View>
          ))}
          {events.map((item, i) => {
            console.log();
            return <TouchableOpacity key={`event-${i}`} style={{
              backgroundColor: `tomato`,
              top: item.begin.hours() * 60,
              height: item.duration,
              width: 200,
              position: `absolute`,
              zIndex: 2,
              elevation: 3,
              opacity: 0.6,
              borderRadius: 5,
              overflow: `scroll`,
            }}>
              <Text>Событие!</Text>
              <Text>Событие!</Text>
              <Text>Событие!</Text>
              <Text>Событие!</Text>
              <Text>Событие!</Text>
              <Text>Событие!</Text>
            </TouchableOpacity>;
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

Registry.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Registry;
