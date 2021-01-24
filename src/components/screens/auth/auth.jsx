import React, { useState, useCallback, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { register, login } from '../../../store/api-action';
import { connect } from 'react-redux';
import { setLoading, toggleAuthType } from "../../../store/action";
import { AuthType } from "../../../store/reducers/app-user/app-user";
import Input from "../../ui/input/input";

const FormInput = {
  REGISTER: {
    login: {
      label: `Логин (email)`,
      error: `Некорректный логин`,
      required: true,
    },
    password: {
      label: `Пароль`,
      error: `Некорректный пароль`,
      secureTextEntry: true,
      minLength: 4,
      required: true,
    },
    password_again: {
      label: `Пароль ещё раз`,
      error: `Пароли не совпадают`,
      secureTextEntry: true,
      minLength: 4,
      required: true,
    },
    id_ycl: {
      label: `ID работника`,
      error: `Ошибка`,
      number: true,
      required: true,
    },
    id_branch: {
      label: `ID предприятия`,
      error: `Ошибка`,
      number: true,
      required: true,
    },
    leader: {
      label: `Руководитель`,
      error: `Ошибка`,
      required: true,
    },
    role: {
      label: `Должность`,
      error: `Ошибка`,
      required: true,
    },
  },
  LOGIN: {
    login: {
      label: `Логин (email)`,
      error: `Неверный логин`,
      required: true,
    },
    password: {
      label: `Пароль`,
      error: `Неверный пароль`,
      secureTextEntry: true,
      minLength: 4,
      required: true,
    },
  },
};

const FORM_INPUT_UPDATE = `FORM_INPUT_UPDATE`;
const CHANGE_AUTH_TYPE = `CHANGE_AUTH_TYPE`;
const SET_FIELD_ERROR = `SET_FIELD_ERROR`;

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        ...state,
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    }
    case CHANGE_AUTH_TYPE: {
      const isSignup = !state.isSignup;
      const filteredInputs = Object.keys(FormInput[isSignup ? AuthType.REGISTER : AuthType.LOGIN]);
      return {
        ...state,
        inputValues: filteredInputs.reduce((acc, key) => {
          acc = { ...acc, [key]: `` };
          return acc;
        }, {}),
        inputValidities: filteredInputs.reduce((acc, key) => {
          acc = { ...acc, [key]: false };
          return acc;
        }, {}),
        formIsValid: false,
        isSignup,
      };
    }
    case SET_FIELD_ERROR: {
      const { isSignup } = state;
      const filteredInputs = Object.keys(FormInput[isSignup ? AuthType.REGISTER : AuthType.LOGIN]);
      return {
        ...state,
        customValidities: filteredInputs.reduce((acc, key) => {
          if (action.invalidFields.includes(key)) {
            acc = { ...acc, [key]: false };
            return acc;
          }
          acc = { ...acc, [key]: true };
          return acc;
        }, {}),
      };
    }
  }
  return state;
};

const Auth = ({ login, register, isLoading }) => {
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: Object.keys(FormInput[AuthType.REGISTER]).reduce((acc, key) => {
      acc = { ...acc, [key]: `` };
      return acc;
    }, {}),
    inputValidities: Object.keys(FormInput[AuthType.REGISTER]).reduce((acc, key) => {
      acc = { ...acc, [key]: false };
      return acc;
    }, {}),
    customValidities: Object.keys(FormInput[AuthType.REGISTER]).reduce((acc, key) => {
      acc = { ...acc, [key]: true };
      return acc;
    }, {}),
    formIsValid: false,
    isSignup: true,
  });

  useEffect(() => {
    if (error) {
      dispatchFormState({ type: SET_FIELD_ERROR, invalidFields: error.invalidFields });
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const handleChangeAuthTypePress = () => dispatchFormState({ type: CHANGE_AUTH_TYPE });
  const handleThrowErrorClick = () => setError({ invalidFields: [`login`, `password`] });
  const handleAuthButtonClick = () => {
    if (formState.formIsValid) {
      formState.isSignup
        ? register(formState.inputValues)
        : login(formState.inputValues);
    }
  };

  return (
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.header}>{formState.isSignup ? `Регистрация` : `Вход`}</Text>
            {Object.entries(FormInput[formState.isSignup ? AuthType.REGISTER : AuthType.LOGIN]).map(([key, value]) => (
                <Input
                    {...value}
                    id={key}
                    key={`input-${key}-${formState.isSignup}`}
                    name={key}
                    autoCapitalize="none" onInputChange={inputChangeHandler}
                    initialValue=""
                    initiallyValid={formState.customValidities[key]}
                />
            ))}
            <View style={styles.controlsContainer}>
              {isLoading
                ? <ActivityIndicator/>
                : <Button title={formState.isSignup ? `Зарегистрироваться` : `Войти`} onPress={handleAuthButtonClick}/>
              }
              <TouchableOpacity style={styles.changeAuthType} onPress={handleChangeAuthTypePress}>
                <Text style={styles.changeAuthTypeText}>
                  {formState.isSignup ? `Уже есть аккаунт? Войти` : `Ещё нет аккаунта? Зарегистрироваться`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.changeAuthType} onPress={handleThrowErrorClick}>
                <Text style={styles.changeAuthTypeText}>Set fake error</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  formContainer: {
    justifyContent: `center`,
    // alignItems: `center`,
    // flex: 1,
    width: `70%`,
    // height: 300,
  },
  header: {
    fontSize: 24,
    textAlign: `center`,
    marginBottom: 40,
  },
  controlsContainer: {
    marginTop: 10,
  },
  changeAuthType: {
    marginTop: 20,
    alignItems: `center`,
  },
  changeAuthTypeText: {
    color: `blue`,
    fontSize: 12,
  },
});

const mapStateToProps = (state) => ({
  authType: state.USER.authType,
  isLoading: state.STATE.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthStatusTogglePress() {
    dispatch(toggleAuthType());
  },
  login(credentials) {
    dispatch(setLoading(true));
    dispatch(login(credentials))
      .then(() => dispatch(setLoading(false)));
  },
  register(credentials) {
    dispatch(setLoading(true));
    dispatch(register(credentials))
      .then(() => dispatch(setLoading(false)));
  },
});

export { Auth };
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
