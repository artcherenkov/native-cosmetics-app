import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Registry from './components/registry';
import MainScreen from './components/main-screen';
import KnowledgeBase from './components/knowledge-base';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Главная' }} />
        <Stack.Screen name="Registry" component={Registry} options={{ title: 'Журнал записей' }} />
        <Stack.Screen name="KnowledgeBase" component={KnowledgeBase} options={{ title: 'База знаний' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
