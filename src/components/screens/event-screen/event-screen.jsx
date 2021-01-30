import React, { useState, useReducer } from 'react';
import { Text, ScrollView, StyleSheet, View, Button, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getDurationString, getRandomId } from "../../../utils/common";
import Picker from "../../ui/picker/picker";

const CHANGE_DATE = `CHANGE_DATE`;
const CHANGE_END_DATE = `CHANGE_END_DATE`;

const calendarReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_DATE: {
      const oldBeginDate = moment(state.date);
      const beginDate = moment(action.payload);
      const oldEndDate = moment(state.end);
      const endDate = moment(oldEndDate.add(beginDate.diff(oldBeginDate, `d`), `d`));

      return {
        ...state,
        date: action.payload,
        end: endDate.toISOString(),
        duration: endDate.diff(beginDate, `m`),
      };
    }
    case CHANGE_END_DATE: {
      const endDate = moment(action.payload);
      console.log(`wtf`);
      return { ...state, end: action.payload, duration: moment(endDate).diff(state.date, `m`) };
    }
    default: {
      return state;
    }
  }
};

const EventScreen = ({ route, services }) => {
  const { registration } = route.params;
  const { begin, duration } = registration;

  const [clientServices, setClientServices] = useState(registration.services);
  console.log(clientServices);

  const handleServiceAdd = () => {
    setClientServices((prevState) => [...prevState, `Новая услуга`]);
  };

  const [calendarState, dispatchCalendarState] = useReducer(calendarReducer, {
    date: moment(begin).toISOString(),
    end: moment(begin).add(duration, `m`).toISOString(),
    duration: duration,
  });

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || moment();
    dispatchCalendarState({ type: CHANGE_DATE, payload: currentDate });
  };
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || moment();
    dispatchCalendarState({ type: CHANGE_END_DATE, payload: currentDate });
  };

  const onItemChange = (newItem, oldItem) => {
    console.log(`newItem`, newItem);
    console.log(`oldItem`, oldItem);
  };

  return (
      <>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            {registration.clientName}
          </Text>
          <View style={styles.dateControlsContainer}>
            {Platform.OS === `android` && <TouchableOpacity onPress={showDatepicker}>
              <View style={[styles.dateControl, styles.beginDate]}>
                <Text style={styles.date}>{moment(registration.begin).format(`D MMMM YYYY`)}</Text>
                <AntDesign style={styles.dateIcon} name="calendar" size={20} color="#808080"/>
              </View>
            </TouchableOpacity>}
            {Platform.OS === `ios` && <View style={{ width: `40%` }}>
              <DateTimePicker
                  testID="datePicker"
                  value={new Date(calendarState.date) || moment()}
                  mode="date"
                  locale="ru"
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
              />
            </View>}
            <View style={styles.dateContainer}>
              <View style={styles.intervalContainer}>
                {Platform.OS === `android` && <TouchableOpacity onPress={showTimepicker}>
                  <View style={[styles.dateControl, styles.durationControl]}>
                    <Text style={styles.date}>{begin}</Text>
                    <FontAwesome style={styles.dateIcon} name="unsorted" size={15} color="#808080"/>
                  </View>
                </TouchableOpacity>}
                {Platform.OS === `ios` && <View style={{ width: 75 }}>
                  <DateTimePicker
                      style={{ width: 70, height: 35 }}
                      testID="datePicker1"
                      value={new Date(calendarState.date) || moment()}
                      mode={`time`}
                      locale="ru"
                      is24Hour={true}
                      display="default"
                      onChange={onDateChange}
                      minuteInterval={15}
                      maximumDate={new Date(moment(calendarState.end).subtract(15, `m`).toISOString())}
                  />
                </View>}
                <Text style={{ paddingTop: 8, paddingRight: 9 }}>&mdash;</Text>
                {Platform.OS === `ios` && <View style={{ width: 75 }}>
                  <DateTimePicker
                      style={{ width: 70, height: 35 }}
                      testID="datePicker2"
                      value={new Date(calendarState.end) || moment()}
                      mode={`time`}
                      locale="ru"
                      is24Hour={true}
                      display="default"
                      onChange={onEndDateChange}
                      minuteInterval={15}
                      minimumDate={new Date(moment(calendarState.date).add(15, `m`).toISOString())}
                  />
                </View>}
              </View>
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{getDurationString(calendarState.duration)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.servicesContainer}>
            <Text style={styles.cost}>&#8381; {registration.cost}</Text>
            {clientServices.map(service => (
                <Picker
                    key={getRandomId()}
                    data={services}
                    initialValue={service}
                    onItemChange={onItemChange}
                />
            ))}
          </View>
          <View style={styles.controls}>
            <Button title="Добавить услугу" onPress={handleServiceAdd}/>
          </View>
        </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    width: `100%`,
    height: `100%`,
    position: `absolute`,
    top: 0,
    left: 0,
    backgroundColor: `rgba(0, 0, 0, .7)`,
    // zIndex: 100,
    paddingTop: 30,
    alignItems: `center`,
  },
  container: {
    margin: 10,
    height: `100%`,
    // backgroundColor: `blue`,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    marginBottom: 10,
    color: `grey`,
    fontSize: 18,
  },
  servicesContainer: {
    marginBottom: 15,
  },
  infoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: `#808080`,
    paddingBottom: 15,
    marginBottom: 15,
  },
  costContainer: {
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  cost: {
    fontSize: 22,
    marginBottom: 20,
  },
  controls: {
    flexDirection: `row`,
    width: `100%`,
    justifyContent: `space-around`,
    zIndex: -1,
  },
  dateContainer: {
    alignItems: `center`,
  },
  dateControlsContainer: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    flexWrap: `wrap`,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: `#d6d6d6`,
  },
  intervalContainer: {
    flexDirection: `row`,
    justifyContent: `center`,
  },
  dateControl: {
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `white`,
    borderRadius: 5,
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderColor: `#808080`,
  },
  durationControl: {
    width: 68,
    backgroundColor: `rgb(228, 228, 228)`,
    borderWidth: 0,
  },
  date: {
    fontSize: 16,
    textAlign: `center`,
    width: `100%`,
  },
  dateIcon: {
    marginLeft: 10,
  },
  beginDate: {},
  durationContainer: {
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 5,
    backgroundColor: `rgb(228, 228, 228)`,
    marginTop: 10,
    padding: 5,
    width: 75,
  },
  durationText: {
    fontSize: 16,
  },
});

EventScreen.propTypes = {
  route: PropTypes.any,
};

const mapStateToProps = (state) => ({
  services: state.STORE.services,
});

export { EventScreen };
export default connect(mapStateToProps, null)(EventScreen);
