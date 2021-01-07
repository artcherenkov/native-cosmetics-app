import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

// todo упростить компонент DayNumber

const DayNumber = ({ day, size, date, dayOfWeek, setActiveDate, isActive, isToday }) => {
  const styles = createStyles(size);

  const getButtonStyles = () => {
    const combinedStyles = [styles.button];

    isToday && combinedStyles.push(styles.buttonIsToday);
    isActive && combinedStyles.push(styles.buttonIsActive);

    return combinedStyles;
  };

  const onPress = () => setActiveDate(date);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={getButtonStyles()}>
        <Text style={isToday || isActive ? [styles.text, styles.whiteText] : styles.text}>{day}</Text>
      </TouchableOpacity>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
    </View>
  );
};

const createStyles = (size) => StyleSheet.create({
  container: {
    width: size,
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  button: {
    width: size * 3 / 4,
    height: size * 3 / 4,
    backgroundColor: `bisque`,
    borderRadius: (size * 3 / 4) / 2,
  },
  buttonIsToday: {
    backgroundColor: `rgba(0, 125, 255, .3)`,
  },
  buttonIsActive: {
    backgroundColor: `rgb(0, 125, 255)`,
  },
  text: {
    lineHeight: size * 3 / 4,
    textAlign: `center`,
  },
  whiteText: {
    color: `white`,
  },
  dayOfWeek: {
    textAlign: `center`,
    marginTop: 5,
  },
});

export default DayNumber;
