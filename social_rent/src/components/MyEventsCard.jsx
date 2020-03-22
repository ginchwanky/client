import React from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
} from 'react-native'
import {
   Text,
   Block,
   theme
} from 'galio-framework'

export default function MyEventCard(props) {

   return (
      <>
         <TouchableOpacity onPress={() => { props.navigation.navigate('My Event Detail') }}>
            <View style={{
               marginTop: 10, marginBottom: 20, shadowOpacity: 0.8, shadowRadius: 2
            }}>
               <Image
                  source={{
                     uri: 'https://i0.wp.com/mojok.co/terminal/wp-content/uploads/2019/08/sweet-ice-cream-photography-ASti7dxf8CM-unsplash.jpg?resize=800%2C540&ssl=1',
                     height: 150, width: 300, borderRadius: 25
                  }}
                  style={{ borderRadius: 20 }}
               />
               <View style={{ marginTop: 10, marginHorizontal: 5, flexDirection: 'row' }}>
                  <View style={{ marginHorizontal: 10, width: 250 }}>
                     <Text
                        muted
                        style={{ marginTop: 0, fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}
                     >Kondangan</Text>
                     <Text
                        center
                        style={{ color: 'grey', marginTop: 5 }}
                     >Ini adalah deskripsi dari event. ini bertujuan untuk bla </Text>
                     <Text
                        center
                        muted
                        italic
                        style={{ color: 'grey', marginTop: 5 }}
                     >Status: pending</Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      </>
   )
}

const styles = StyleSheet.create({
   shadow: {
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
         height: 1,
         width: 0
      }
   }
})