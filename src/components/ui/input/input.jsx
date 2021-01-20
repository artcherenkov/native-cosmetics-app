import React from 'react';
import { Text, TextInput, View, StyleSheet } from "react-native";

const Input = ({ name, label, error, handleChangeText }) => {
  return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} onChangeText={handleChangeText(name)}/>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 20,
  },
  inputContainer: {
    position: `relative`,
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 12,
    color: `red`,
    position: `absolute`,
    bottom: 3,
  },
});

export default Input;
