import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Asset } from 'expo-asset'

import Login from './src/views/Login'
import Coba from './src/views/Coba'

export default function App() {
  return (
      // <Login />
      <Coba />
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
