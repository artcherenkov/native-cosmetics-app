import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { register, auth } from '../../../store/api-action';
import { useDispatch, connect } from 'react-redux';
import { toggleAuthStatus, toggleAuthType } from "../../../store/action";
import { AuthType } from "../../../store/reducers/app-user/app-user";
import Input from "../../ui/input/input";

const Auth = ({ authType, handleAuthStatusTogglePress }) => {
  const [credentials, setCredentials] = useState({ login: ``, password: `` });
  const dispatch = useDispatch();

  const handleChangeText = (name) => (text) => setCredentials({ ...credentials, [name]: text });

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>{authType === AuthType.REGISTER ? `Регистрация` : `Вход`}</Text>
          <Input name="login" label="Логин" error="Неверный логин" handleChangeText={handleChangeText} />
          <Input name="password" label="Пароль" error="Неверный пароль" handleChangeText={handleChangeText} />
          {authType === AuthType.REGISTER && <>
            <Input name="password_again" label="Пароль" error="Пароли не совпадают" handleChangeText={handleChangeText} />
            <Input name="id_ycl" label="ID работника" error="Неверный пароль" handleChangeText={handleChangeText} />
            <Input name="id_branch" label="ID предприятия" error="Ошибка" handleChangeText={handleChangeText} />
            <Input name="leader" label="Руководитель" error="Ошибка" handleChangeText={handleChangeText} />
            <Input name="role" label="Должность" error="Ошибка" handleChangeText={handleChangeText} />
          </>}
          <View style={styles.controlsContainer}>
            <Button
                title={authType === AuthType.REGISTER ? `Зарегистрироваться` : `Войти`}
                onPress={() => {
                  console.log(credentials);
                  dispatch(toggleAuthStatus());
                }}
            />
            <TouchableOpacity style={styles.changeAuthType} onPress={handleAuthStatusTogglePress}>
              <Text style={styles.changeAuthTypeText}>
                {authType === AuthType.REGISTER ? `Уже есть аккаунт? Войти` : `Ещё нет аккаунта? Зарегистрироваться`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  formContainer: {
    width: `70%`,
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
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthStatusTogglePress() {
    dispatch(toggleAuthType());
  },
});

export { Auth };
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
