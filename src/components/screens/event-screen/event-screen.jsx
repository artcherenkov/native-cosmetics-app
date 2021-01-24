import React from 'react';
import PropTypes from 'prop-types';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import moment from 'moment';

const getDurationString = ({ begin, duration }) => `c ${moment(begin).format(`kk:mm`)} до ${moment(begin).add(duration, `m`).format(`kk:mm`)}`;

const EventScreen = ({ route }) => {
  const { registration } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {registration.clientName}
      </Text>
      <Text style={styles.info}>
        {moment(registration.begin).format(`dddd, D MMM YYYY`)}
      </Text>
      <Text style={styles.info}>
        {getDurationString(registration)}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
    color: `grey`,
  },
});

EventScreen.propTypes = {
  route: PropTypes.any,
};

export default EventScreen;
