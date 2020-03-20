import React from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   Text
} from 'react-native'
import EventCard from '../components/EventCard'

export default function Home() {

   return (
      <>
         <ScrollView>
            <View style={styles.container}>
               <EventCard />
               <EventCard />
               <EventCard />
               <EventCard />

            </View>
         </ScrollView>
      </>
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