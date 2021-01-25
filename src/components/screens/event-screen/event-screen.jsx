import React from 'react';
import PropTypes from 'prop-types';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
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
      <View style={styles.servicesContainer}>
        <Text style={styles.subtitle}>Услуги: </Text>
        {registration.services.map(service => <Text style={styles.servicesItem} key={Math.random()}>{`\t` + service}</Text>)}
      </View>
      <View style={styles.costContainer}>
        <Text style={styles.subtitle}>Стоимость:</Text>
        <Text style={styles.cost}>{`\t`}&#8381;{registration.cost}</Text>
      </View>
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
  servicesContainer: {
    marginVertical: 15,
  },
  costContainer: {
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  servicesItem: {
    fontSize: 16,
  },
  cost: {
    fontSize: 20,
  },
});

EventScreen.propTypes = {
  route: PropTypes.any,
};

export default EventScreen;
