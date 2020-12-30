import React from 'react';

import { View, Text, Button } from 'react-native';

export const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Main</Text>
      <Button
        title="Go to Knowledge Base"
        onPress={() => navigation.navigate('KnowledgeBase')}
      />
      <Button
        title="Go to Registry"
        onPress={() => navigation.navigate('Registry')}
      />
    </View>
  );
}

export default MainScreen;
