import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.place}>Место</Text>
    <Text style={styles.name}>Имя</Text>
    <Text style={styles.rating}>Рейтинг</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: `row`,
    backgroundColor: `rgb(242, 242, 242)`,
    justifyContent: `space-between`,
    paddingRight: 10,
    paddingVertical: 10,
  },
  place: {
    fontSize: 16,
    width: 50,
  },
  name: {
    fontSize: 16,
  },
  rating: {
    fontSize: 16,
    width: 70,
    textAlign: `center`,
  },
});

export default Header;
