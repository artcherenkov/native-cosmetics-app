import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>
      <View style={styles.buttonContainer}>
        <Button title="Перейти к базе знаний" onPress={() => navigation.navigate(`KnowledgeBase`)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Перейти к журналу записей" onPress={() => navigation.navigate(`Registry`)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

MainScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default MainScreen;
