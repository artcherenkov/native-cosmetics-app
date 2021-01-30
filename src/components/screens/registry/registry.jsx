import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import moment from 'moment';

import CalendarStrip from './components/calendar-strip/calendar-strip';
import { getActiveDate } from '../../../store/reducers/app-state/selectors';
import Agenda from './components/agenda/agenda';

import events from './events-data.js';
import { fetchRegistrations } from "../../../store/api-action";

// todo добавить обрезание длинных названий событий
// todo добавить возможность перехода к конкретной дате по клику на описание дня (прямо под строкой календаря)?

const Registry = ({ navigation, activeDate }) => {
  const today = moment();
  const daysToWeekStart = moment(today).weekday();
  const [calStripLeft, setCurrentDates] = useState(moment(today).subtract(daysToWeekStart, `d`));

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
  navigation: PropTypes.any,
  activeDate: PropTypes.object,
};

const mapStateToProps = state => ({
  activeDate: getActiveDate(state),
  token: state.USER.token,
});

const mapDispatchToProps = dispatch => ({
  fetchServices(date) {
    dispatch(fetchRegistrations(date));
  },
});

export { Registry };
export default connect(mapStateToProps, mapDispatchToProps)(Registry);
