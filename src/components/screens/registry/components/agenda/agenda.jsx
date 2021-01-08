import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

import ClientRegistration from '../client-registration/client-registration';
import { range } from '../../../../../utils/common';

const getActiveDateEvents = (events, activeDate) => (
  events[Object.keys(events).find(key => moment(key).isSame(activeDate, `d`))]
);

const getHourStyles = (index) => {
  const res = [styles.hourContainer];
  if (index === 24) {
    res.push({ height: 30 });
  }

  return res;
};

const formatWithLeadingZero = (number) => number < 10 ? `0${number}:00` : `${number}:00`;

// todo положить events в редакс, брать activeDate из редакса
const Agenda = (props) => {
  const { activeDate, events, navigation } = props;
  const activeDateEvents = getActiveDateEvents(events, activeDate);

  return (
    <ScrollView style={styles.agendaContainer}>
      {range(25).map((i) => (
        <View key={`hour-${i}`} style={getHourStyles(i)}>
          <Text style={styles.hour}>
            {formatWithLeadingZero(i)}
          </Text>
        </View>
      ))}
      {activeDateEvents && [...activeDateEvents].map((item, i) => (
        <ClientRegistration key={`event-${i}`} navigation={navigation} registration={item} activeDate={activeDate}/>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    height: 200,
    paddingLeft: 70,
    paddingTop: 15,
  },
  hourContainer: {
    borderTopWidth: 1,
    borderColor: `lightgrey`,
    position: `relative`,
    height: 60,
  },
  hour: {
    position: `absolute`,
    left: -45,
    top: -8,
    fontSize: 12,
  },
});

export default Agenda;
