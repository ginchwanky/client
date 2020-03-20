import React from 'react';
import {
   StyleSheet,
   View,
   Image,
   ScrollView,
   TouchableOpacity,
   Text,
   ImageBackground,
   Dimensions
} from 'react-native'

import {
   Block
} from 'galio-framework'
import Constants from 'expo-constants';

import EventCard from '../components/EventCard'

const { width, height } = Dimensions.get("screen");

export default function Home({ navigation }) {

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={require('../../assets/bg-profile.jpeg')}
            style={styles.bgContainer}
            imageStyle={styles.background}
         >
            <ScrollView showsVerticalScrollIndicator={false}>
            <Block middle>
               <Text
                  style={{ fontStyle: 'italic', marginTop: 20, marginBottom: 20, fontSize: 17, color: 'white', fontWeight: 'bold' }}
               >Swipe right to open the menu >>
               </Text>
            </Block>
               <View style={styles.container}>
                  <EventCard navigation={navigation} />
                  <EventCard navigation={navigation} />
                  <EventCard navigation={navigation} />
                  <EventCard navigation={navigation} />


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
      paddingBottom: 30
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
      height: height / 2
   }
})