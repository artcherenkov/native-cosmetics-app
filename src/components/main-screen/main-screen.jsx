import React from 'react';
import {View, Text, Button} from 'react-native';
import { connect } from 'react-redux';
import {increment} from '../../store/action';
import {getCounter} from '../../store/reducers/app-store/selectors';

const MainScreen = ({ navigation, onButtonClick, counter }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, marginBottom: 40 }}>Главная страница, счётчик: {counter}</Text>
      <Button
        title="Перейти к базе знаний"
        onPress={() => navigation.navigate('KnowledgeBase')}
      />
      <View style={{ height: 20 }}/>
      <Button
        title="Перейти к журналу записей"
        onPress={() => navigation.navigate('Registry')}
      />
      <Button
        title="Увеличить счетчик"
        onPress={() => onButtonClick()}
      />
    </View>
  );
}
const mapStateToProps = state => ({
  counter: getCounter(state),
});

const mapDispatchToProps = dispatch => ({
  onButtonClick() {
    dispatch(increment());
  }
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
