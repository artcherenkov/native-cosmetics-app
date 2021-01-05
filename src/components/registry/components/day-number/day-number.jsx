import React from 'react';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const DayNumber = ({ day, size, date, setActiveDate, isActive, isToday }) => {
  const styles = StyleSheet.create({
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
  });

  const getButtonStyles = () => {
    const combinedStyles = [styles.button];

    if (isToday) {
      combinedStyles.push(styles.buttonIsToday);
    }

    if (isActive) {
      combinedStyles.push(styles.buttonIsActive);
    }

    return combinedStyles;
  };

  const onPress = () => {
    setActiveDate(date);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getButtonStyles()}
    >
      <Text style={isToday || isActive ? [styles.text, styles.whiteText] : styles.text}>{day}</Text>
    </TouchableOpacity>
  );
};

export default DayNumber;
