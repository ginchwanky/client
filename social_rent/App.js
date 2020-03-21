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

import Coba from './src/views/Coba'
import Home from './src/views/Home'
import Profile from './src/views/Profile'
import EventDetail from './src/views/EventDetail'
import Chats from './src/views/Chats'
import PeopleProfile from './src/views/PeopleProfile'
import GenerateBarcode from './src/views/GenerateBarcode'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2E71DC',
        inactiveTintColor: 'grey',
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
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Landing Page' component={Coba} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Event Detail' component={EventDetail} />
        <Stack.Screen name='People Profile' component={PeopleProfile} />
        <Stack.Screen name='Generate Barcode' component={GenerateBarcode} />

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
