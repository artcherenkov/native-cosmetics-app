import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = `INPUT_CHANGE`;
const INPUT_BLUR = `INPUT_BLUR`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  console.log(props.initiallyValid);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : ``,
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const shouldShowError = (!props.initiallyValid && !inputState.touched) || (!inputState.isValid && inputState.touched);

  return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <TextInput
            {...props}
            style={styles.input}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
            ref={inputState.ref}
        />
        {shouldShowError && (
            <Text style={styles.errorMessage}>{props.error}</Text>
        )}
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
