import React from 'react';
import {
   StyleSheet,
   View,
   Text
} from 'react-native'

import Constants from 'expo-constants'


export default function EventDetail(props) {

   return (
      <>
         <View style={styles.statusBar} />

         <Text style={{fontSize: 30}}>INI DETAIL EVENT</Text>
      </>
   )
}

const styles = StyleSheet.create({
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   }
})