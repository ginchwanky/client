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
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get("screen");

export default function Home({ navigation, props }) {
   const {
      isLoading, isLogin, name, email, age, gender, bio, profilePicture
   } = useSelector(state => state)
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
                  style={{ fontStyle: 'normal', marginTop: 20, marginBottom: 20, fontSize: 20, color: 'white', fontWeight: 'bold' }}
               >Available events
               </Text>
                  <Text>{name}</Text>
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
      paddingBottom: 80
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