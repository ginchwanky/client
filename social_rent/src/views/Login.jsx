import React, { useState, useEffect } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Image,
   Dimensions,
   TouchableOpacity
} from 'react-native'
import { Asset } from 'expo-asset'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

const { Value, event, block, cond, eq, set } = Animated
const { height, width } = Dimensions.get('window')

export default function login() {
   let buttonOpacity = new Value(1)

   let onStateChange =
      event([
         {
            nativeEvent:({state})=>block([
               cond(eq(state,State.END), set(buttonOpacity, 0))
            ])
         }
      ])



   return (
      <>
         <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
            <View style={{ ...StyleSheet.absoluteFill }}>
               <Image
                  source={require('../../assets/login-bg.jpg')}
                  style={{ flex: 1, height: null, width: null }}
               />
            </View>
            <View style={{ height: height / 3 }}>
               <TouchableOpacity>
                  <Animated.View style={{...styles.button, opacity: buttonOpacity}}>
                     <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                  </Animated.View>
               </TouchableOpacity>
               <TouchableOpacity>
                  <View style={{ ...styles.button, backgroundColor: '#0ae' }}>
                     <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>REGISTER</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
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
   button: {
      backgroundColor: 'white',
      height: 70,
      marginHorizontal: 25,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5
   }
});
