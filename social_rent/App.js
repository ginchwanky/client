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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux'
import store from './store/index'

import testLandingPage from './src/views/testLandingPage'
import testLoginPage from './src/views/testLoginPage'
import testRegisterPage from './src/views/testRegisterPage'

import Coba2 from './src/views/Coba2'
import Coba from './src/views/Coba'
import Home from './src/views/Home'
import Profile from './src/views/Profile'
import EventDetail from './src/views/EventDetail'
import Chats from './src/views/Chats'
import PeopleProfile from './src/views/PeopleProfile'
import GenerateBarcode from './src/views/GenerateBarcode'
import BarcodeScanner from './src/views/BarcodeScanner'
import MyEvents from './src/views/MyEvents'
import MyEventDetail from './src/views/MyEventDetail'
import TransitionRegister from './src/components/transitionRegister'
import TransitionLogin from './src/components/transitionLogin'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
console.disableYellowBox = true;

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Events') {
            iconName = focused ? 'ios-apps' : 'ios-apps';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'md-person' : 'md-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2E71DC',
        inactiveTintColor: 'grey',
        showIcon: true,
        showLabel: true
      }}
      initialRouteName='Events'
    >
      {/* <Tab.Screen name="Chats" component={Chats} /> */}
      <Tab.Screen name="Events" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Landing Page'
          screenOptions={{
            headerShown: false
          }}
        >
          {/* <Stack.Screen name='Landing Page' component={Coba2} /> */}
          {/* <Stack.Screen name='Register' component={Coba2} /> */}
          <Stack.Screen name='Landing Page' component={testLandingPage} />
          {/* <Stack.Screen name='Login Page' component={testLoginPage} /> */}
          <Stack.Screen name='Register Page' component={testRegisterPage} />

          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Event Detail' component={EventDetail} />
          <Stack.Screen name='People Profile' component={PeopleProfile} />
          <Stack.Screen name='Generate Barcode' component={GenerateBarcode} />
          <Stack.Screen name='Barcode Scanner' component={BarcodeScanner} />
          <Stack.Screen name='My Events' component={MyEvents} />
          <Stack.Screen name='My Event Detail' component={MyEventDetail} />
          <Stack.Screen name='Transition Register' component={TransitionRegister} />
          <Stack.Screen name='Transition Login' component={TransitionLogin} />
          <Stack.Screen name='Chats' component={Chats} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
