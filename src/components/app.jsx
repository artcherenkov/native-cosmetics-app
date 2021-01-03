import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Registry from './registry/registry';
import MainScreen from './main-screen/main-screen';
import KnowledgeBase from './knowledge-base/knowledge-base';
import Profile from './profile/profile';
import Rating from './rating/rating';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getIcon = (route) => (params) => {
  const { size, color } = params;
  let iconName;
  switch (route.name) {
    case `MainScreen`: {
      iconName = `infocirlceo`;
      break;
    }
    case `Registry`: {
      iconName = `calendar`;
      break;
    }
    case `KnowledgeBase`: {
      iconName = `book`;
      break;
    }
    case `Profile`: {
      iconName = `user`;
      break;
    }
  }

  return <AntDesign name={iconName} size={size} color={color}/>;
};
const NAVIGATOR_OPTIONS = {
  screenOptions: ({ route }) => ({
    tabBarIcon: getIcon(route),
  }),
  tabBarOptions: {
    activeTintColor: `tomato`,
    inactiveTintColor: `gray`,
  },
};

const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={Profile} options={{ title: `Профиль` }} />
    <Stack.Screen name="Rating" component={Rating} options={{ title: `Рейтинги` }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator {...NAVIGATOR_OPTIONS}>
        <Tab.Screen name="MainScreen" component={MainScreen} options={{ title: `Главная` }}/>
        <Tab.Screen name="Registry" component={Registry} options={{ title: `Журнал записей` }}/>
        <Tab.Screen name="KnowledgeBase" component={KnowledgeBase} options={{ title: `База знаний` }}/>
        <Tab.Screen name="Profile" component={ProfileNavigator} options={{ title: `Профиль` }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
