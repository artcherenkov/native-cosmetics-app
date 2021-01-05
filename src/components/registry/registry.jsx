import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import moment from 'moment';
import CalendarStrip from './components/calendar-strip/calendar-strip';
import { connect } from 'react-redux';
import { getActiveDate } from '../../store/reducers/app-state/selectors';

const range = (number) => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }

  return res;
};

const Registry = ({ navigation, activeDate }) => {
  const today = moment();
  // todo исправить баг с неправильным начальным определением currentDates
  const daysToWeekStart = moment(today).weekday() - 1; // moment().day(0) - воскресенье, значит надо отнять 1 день
  console.log(daysToWeekStart);
  const [currentDates, setCurrentDates] = useState({
    from: moment(today).subtract(daysToWeekStart, `d`),
    to: moment(today).add(6, `d`),
  });
  //

  console.log(currentDates.from.format(`D dd MMM YYYY`), currentDates.to.format(`D dd MMM YYYY`));

  const events = {
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

  console.log(JSON.stringify(events));

  const activeDateEvents = events[Object.keys(events).find(key => moment(key).isSame(activeDate, `d`))];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `rgba(0, 122, 255, .3)` }}>
      <View style={{ marginBottom: 10 }}>
        <CalendarStrip setCurrentDates={setCurrentDates} activeDate={activeDate} currentDates={currentDates} today={today}/>
      </View>
      <View style={{ backgroundColor: `rgb(242, 242, 242)`, flexGrow: 1 }}>
        <ScrollView style={{ height: 200, paddingLeft: 45, paddingTop: 15 }}>
          {range(25).map((i) => (
            <View key={`hour-${i}`} style={i === 24
              ? [{
                  borderTopWidth: 1,
                  borderColor: `lightgrey`,
                  height: 25,
                  position: `relative`,
                  zIndex: 2,
                }]
              : {
                  borderTopWidth: 1,
                  borderColor: `lightgrey`,
                  height: 60,
                  position: `relative`,
                  zIndex: 1,
                }}>
              <Text style={{ position: `absolute`, left: -40, top: -8, fontSize: 12 }}>
                {i < 10 ? `0${i}:00` : `${i}:00`}
              </Text>
            </View>
          ))}
          {activeDateEvents && [...activeDateEvents].map((item, i) => {
            return <TouchableOpacity key={`event-${i}`} style={{
              backgroundColor: `rgba(0, 122, 255, .2)`,
              top: item.begin.hours() * 60 + item.begin.minutes(),
              height: item.duration,
              width: 200,
              position: `absolute`,
              padding: 5,
              zIndex: 2,
              borderRadius: 5,
              borderLeftWidth: 3,
              borderColor: `rgb(0,121,255)`,
              overflow: `scroll`,
            }} onPress={() => {
              navigation.setOptions({
                title: activeDate.format(`MMM D`),
              });
              navigation.navigate(`EventScreen`, { item });
            }}
            >
              <Text style={{ color: `rgb(0,121,255)`, fontWeight: `bold` }}>{item.title}</Text>
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

const mapStateToProps = state => ({
  activeDate: getActiveDate(state),
});

export { Registry };
export default connect(mapStateToProps, null)(Registry);
