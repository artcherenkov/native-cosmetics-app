import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Registry from './screens/registry/registry';
import Profile from './screens/profile/profile';
import Rating from './screens/rating/rating';
import EventScreen from './screens/event-screen/event-screen';
import KnowledgeBase from './screens/knowledge-base/knowledge-base';
import Auth from './screens/auth/auth';

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
    activeTintColor: `rgb(0, 122, 255)`,
    inactiveTintColor: `gray`,
  },
};

const ProfileNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ title: `Профиль` }}/>
      <Stack.Screen name="Rating" component={Rating} options={{ title: `Рейтинги` }}/>
    </Stack.Navigator>
);

const RegistryNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="Registry" component={Registry} options={{ title: `Журнал записей`, headerShown: false }}/>
      <Stack.Screen name="EventScreen" component={EventScreen} options={{
        title: `Событие`,
        headerRight: () => (
            <Button onPress={() => alert(`This is a button!`)} title="Править"/>
        ),
      }}/>
    </Stack.Navigator>
);

const MainNavigator = () => (
    <Tab.Navigator {...NAVIGATOR_OPTIONS}>
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{ title: `Профиль` }}/>
      <Tab.Screen name="Registry" component={RegistryNavigator} options={{ title: `Журнал записей` }}/>
      <Tab.Screen name="KnowledgeBase" component={KnowledgeBase} options={{ title: `База знаний` }}/>
    </Tab.Navigator>
);

const App = ({ isLoggedIn }) => {
  return (
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator/> : <Auth />}
      </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.USER.isLoggedIn,
});

export { App };
export default connect(mapStateToProps, null)(App);
