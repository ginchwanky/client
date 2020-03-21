import React from 'react';
import {
   View,
   StyleSheet
} from 'react-native'
import {
   Text
} from 'galio-framework'
// import QRCode from 'react-native-qrcode-svg';

export default function GenerateBarcode(props) {

   return (
      <>
         <Text h1>KONTOL</Text>
         <View style={styles.container}>
            {/* <QRCode
               value="http://awesome.link.qr"
            /> */}
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
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
   }
});