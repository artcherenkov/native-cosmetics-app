import React from 'react';
import {View, Text, Button} from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, marginBottom: 40 }}>Главная страница</Text>
      <Button
        title="Перейти к базе знаний"
        onPress={() => navigation.navigate('KnowledgeBase')}
      />
      <View style={{ height: 20 }}/>
      <Button
        title="Перейти к журналу записей"
        onPress={() => navigation.navigate('Registry')}
      />
    </View>
  );
}

export default MainScreen;
