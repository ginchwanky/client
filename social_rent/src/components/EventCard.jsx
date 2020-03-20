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
         <TouchableOpacity>
            <View style={{ marginTop: 30 }}>
               <Image
                  source={{
                     uri: 'https://topnotchtalent.com/wp-content/uploads/holiday-party-entertainment-top-notch-talent.jpg',
                     height: 200, width: 300, borderRadius: 25
                  }}
                  style={{ borderRadius: 20 }}
               />
               {/* nanti diterusin disini buat bikin  card */}
               <View style={{ marginTop: 5, marginHorizontal: 5, flexDirection: 'row' }}>
                  <Image
                     source={{
                        uri: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/03/Female_Smilling_Dimples_1296x728-header-1296x728.jpg?w=1155&h=1528',
                        height: 40, width: 40, borderRadius: 100
                     }}
                     style={{ borderRadius: 20 }}
                  />
                  <View style={{ marginHorizontal: 5 }}>
                     <Text style={{ marginTop: 0, fontWeight: 'bold', fontStyle: 'italic' }}>Niki prakoso</Text>
                     <Text style={{ color: 'grey' }}>Ini adalah deskripsi dari event...</Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      </>
   )
}