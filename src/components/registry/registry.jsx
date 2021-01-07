import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import moment from 'moment';

import CalendarStrip from './components/calendar-strip/calendar-strip';
import { getActiveDate } from '../../store/reducers/app-state/selectors';
import Agenda from './components/agenda/agenda';

import events from './events-data.js';

// todo рефакторинг! Проп тайпсы!
// todo добавить обрезание длинных названий событий
// todo добавить возможность перехода к конкретной дате по клику на описание дня (прямо под строкой календаря)?

const Registry = ({ navigation, activeDate }) => {
  const today = moment();
  const daysToWeekStart = moment(today).weekday() - 1; // moment().day(0) - воскресенье, значит надо отнять 1 день
  const [calStripLeft, setCurrentDates] = useState(moment(today).subtract(daysToWeekStart, `d`));

  console.log(moment(calStripLeft).format(`D dd MMM YYYY`));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stripContainer}>
        <CalendarStrip setCurrentDates={setCurrentDates} activeDate={activeDate} calStripLeft={calStripLeft} today={today}/>
      </View>
      <View style={styles.agendaContainer}>
        <Agenda activeDate={activeDate} events={events} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `rgba(0, 122, 255, .3)`,
  },
  stripContainer: {
    marginBottom: 10,
  },
  agendaContainer: {
    backgroundColor: `rgb(242, 242, 242)`,
    flexGrow: 1,
  },
});

Registry.propTypes = {
  navigation: PropTypes.any.isRequired,
  activeDate: PropTypes.object,
};

const mapStateToProps = state => ({
  activeDate: getActiveDate(state),
});

export { Registry };
export default connect(mapStateToProps, null)(Registry);
