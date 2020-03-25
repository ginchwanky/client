import React, { useEffect, useState } from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
} from 'react-native'
import {
   Text,
   theme,
   Block
} from 'galio-framework'
import axiosInstance from '../instances/axiosInstance'

export default function EventCard(props) {
   const {id, location, name, numOfRent, statusEvent, date, description} = props.data

   return (
      // NANTI KALO DIA ADD EVENT YANG DIA BUAT MAKA REDIRECT KE MY EVENT DETAIL
      <>
         <TouchableOpacity onPress={() => props.navigation.navigate('Event Detail', {id})}>
            <View style={{
               marginTop: 10, marginBottom: 20, shadowOpacity: 0.8, shadowRadius: 2
            }}>
               <Image
                  source={{
                     uri: 'https://i0.wp.com/mojok.co/terminal/wp-content/uploads/2019/08/sweet-ice-cream-photography-ASti7dxf8CM-unsplash.jpg?resize=800%2C540&ssl=1',
                     height: 150, width: 300
                  }}
                  style={{ borderRadius: 15 }}
               />
               <Block middle style={{ marginTop: 10, marginHorizontal: 5, flexDirection: 'row' }}>
                  {/* <TouchableOpacity onPress={() => props.navigation.navigate('People Profile')}>
                     <Image
                        source={{
                           uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg',
                           height: 40, width: 40
                        }}
                        style={{ borderRadius: 100 }}
                     />
                  </TouchableOpacity> */}
                  <Block middle style={{ marginHorizontal: 0, width: 250 }}>
                     <Text center bold>{name}</Text>
                     <Text muted center>{description.slice(0, 70)}...</Text>
                  </Block>
               </Block>
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