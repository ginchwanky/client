import React from 'react';
import {
   StyleSheet,
   View,
   Text
} from 'react-native'

export default function Home() {

   return (
      <View style={styles.container}>
         <Text style={styles.test}>KONTOL!</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   test: {
      fontSize: 20,
      fontWeight: 'bold'
   }
})