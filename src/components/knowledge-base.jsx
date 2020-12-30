import React from 'react';

import { View, Text, Button } from 'react-native';

export const KnowledgeBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Knowledge Base</Text>
      <Button
        title="Go to Main"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
}

export default KnowledgeBase;
