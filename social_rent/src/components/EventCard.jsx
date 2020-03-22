import React from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   Text
} from 'react-native'

export default function EventCard(props) {

   return (
      <>
         <TouchableOpacity onPress={() => props.navigation.navigate('Event Detail')}>
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
               {/* nanti diterusin disini buat bikin  card */}
               <View style={{ marginTop: 10, marginHorizontal: 5, flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('People Profile')}>
                     <Image
                        source={{
                           uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg',
                           height: 40, width: 40, borderRadius: 100
                        }}
                        style={{ borderRadius: 20 }}
                     />
                  </TouchableOpacity>
                  <View style={{ marginHorizontal: 10 }}>
                     <Text style={{ marginTop: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Niki prakoso</Text>
                     <Text style={{ color: 'grey' }}>Ini adalah deskripsi dari event...</Text>
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