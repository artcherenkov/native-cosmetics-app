import React from 'react';

import { View, Text, Button } from 'react-native';

const KnowledgeBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 32, marginBottom: 40}}>База знаний</Text>
      <Button
        title="Вернуться на главную"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
}

export default KnowledgeBase;
