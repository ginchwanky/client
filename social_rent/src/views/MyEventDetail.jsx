import React from 'react';
import {
   StyleSheet,
   View,
} from 'react-native'
import {
   Block,
   Text,
   theme
} from 'galio-framework'
import Constants from 'expo-constants'

export default function MyEventDetail({ route, navigation }) {

   return (
      <>
         <View style={styles.statusBar} />
         <Text h1>Ini  My event detail. nanti buat component applicant untuk di loop</Text>
      </>
   )
}

const styles = StyleSheet.create({
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   },
})