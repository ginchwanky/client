import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
   StyleSheet,
   View,
   ImageBackground,
   TouchableOpacity,
   Dimensions,
   ScrollView
} from 'react-native'
import {
   Text,
   Block,
   theme
} from 'galio-framework'
import Constants from 'expo-constants'

import MyEventsCard from '../components/MyEventsCard'

const { width, height } = Dimensions.get("screen");


export default function MyEvents({ navigation }) {

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.bgContainer}
            imageStyle={styles.background}
         >
            <ScrollView showsVerticalScrollIndicator={false}>
               <Block middle>
                  <Text
                     style={{ fontStyle: 'normal', marginTop: 20, marginBottom: 20, fontSize: 20, color: 'white', fontWeight: 'bold' }}
                  >My Events
               </Text>
               </Block>
               <View style={styles.container}>

                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />
                  <MyEventsCard navigation={navigation} />
                  


               </View>
            </ScrollView>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10
   },
   test: {
      fontSize: 20,
      fontWeight: 'bold'
   },
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   },
   bgContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
   },
   background: {
      width: width,
      height: height 
   }
})