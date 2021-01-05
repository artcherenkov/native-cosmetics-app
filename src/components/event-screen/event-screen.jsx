import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import moment from 'moment';
moment.locale(`ru`);

const EventScreen = ({ route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>{item.title}</Text>
      <Text style={{ marginBottom: 10, color: `grey` }}>{moment(item.begin).format(`dddd, D MMM YYYY`)}</Text>
      <Text style={{ marginBottom: 10, color: `grey` }}>c {item.begin.format(`kk:mm`)} до {moment(item.begin).add(item.duration, `m`).format(`kk:mm`)}</Text>
    </SafeAreaView>
  );
};

export default EventScreen;
