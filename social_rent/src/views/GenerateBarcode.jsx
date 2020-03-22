import React, { useState, useEffect } from 'react';
import {
   View,
   StyleSheet,
   Image,
   Dimensions,
   ImageBackground
} from 'react-native'
import {
   Text,
   Block,
   theme
} from 'galio-framework'
import axios from 'axios'
import Constants from 'expo-constants'

const { width, height } = Dimensions.get('screen')

export default function GenerateBarcode({ navigation, route }) {
   const [QrCode, setQrCode] = useState('test');

   return (
      <>
         <View style={styles.statusBar} />
         <ImageBackground
            source={require('../../assets/bg-profile.jpeg')}
            style={styles.background}
         >
            <View style={styles.container}>

               <Block style={styles.barcodeCard}>
                  <Block style={styles.topCard} >

                  </Block>
                  <Block middle style={{ marginTop: 30 }}>
                     <Image
                        source={{
                           uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${QrCode}`,
                           height: 200, width: 200
                        }}
                     />
                  </Block>
               </Block>
               <Block middle style={{ width: 300 }}>
                  <Text
                     size={15}
                     bold
                     style={{ color: 'white', paddingBottom: 30, fontStyle: 'italic', paddingTop: 15, textAlign: 'center' }}
                  >* Show this code to do the payment confirmation
                  </Text>
               </Block>
            </View>
         </ImageBackground>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // backgroundColor: '#2E71DC',
      alignItems: 'center',
      justifyContent: 'center'
   },
   input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
   },
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   },
   barcodeCard: {
      height: height / 2.2,
      width: 300,
      backgroundColor: 'white',
      borderRadius: 25,
   },
   topCard: {
      width: 300,
      height: 70,
      backgroundColor: '#f2f4f7',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25
   },
   background: {
      width,
      height
   }
});