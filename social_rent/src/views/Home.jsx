import React from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView
} from 'react-native'
import { Text, Card, Block, theme } from 'galio-framework'

export default function Home() {

   return (
      <>
         <ScrollView>
            <View style={styles.container}>

               <View style={{  marginTop: 30 }}>
                  <Image
                     source={{
                        uri: 'https://topnotchtalent.com/wp-content/uploads/holiday-party-entertainment-top-notch-talent.jpg',
                        height: 250, width: 300, borderRadius: 25
                     }}
                     style={{ borderRadius: 20 }}
                  />
                  {/* nanti diterusin disini buat bikin  card */}
               </View>

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