import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Coba2 from './src/views/Coba2'
import Home from './src/views/Home'
import Profile from './src/views/Profile'
import EventDetail from './src/views/EventDetail'
import Chats from './src/views/Chats'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2E71DC',
        inactiveTintColor: 'gray',
        showIcon: true,
        showLabel: true
      }}
      initialRouteName='Events'
    >
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Events" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Landing Page'
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: 'black',
        //   },
        //   headerTintColor: 'white'
        // }}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Landing Page' component={Coba2} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Event Detail' component={EventDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
