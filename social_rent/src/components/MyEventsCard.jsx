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
         <TouchableOpacity onPress={() => {props.navigation.navigate('My Event Detail')}}>
            <View style={{
               marginTop: 10, marginBottom: 20, shadowOpacity: 0.8, shadowRadius: 2
            }}>
               <Image
                  source={{
                     uri: 'https://thoughtcatalog.files.wordpress.com/2016/08/bffs-2.jpg?w=1140&h=760',
                     height: 150, width: 300, borderRadius: 25
                  }}
                  style={{ borderRadius: 20 }}
               />
               <View style={{ marginTop: 10, marginHorizontal: 5, flexDirection: 'row' }}>
                  <View style={{ marginHorizontal: 10, width: 250 }}>
                     <Text muted style={{ marginTop: 0, fontWeight: 'bold', fontStyle: 'italic', fontSize: 20 }}>Kondangan</Text>
                     <Text muted style={{ color: 'grey', marginTop: 5 }}>Ini adalah deskripsi dari event. sasasasjkajskajs ini bertujuan untuk bla bla</Text>
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