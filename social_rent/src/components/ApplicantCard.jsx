import React from 'react';
import {
   StyleSheet,
   Image,
   View,
   Dimensions,
   TouchableOpacity
} from 'react-native'
import {
   Text,
   Block,
   theme,
   Button
} from 'galio-framework'

const { width, height } = Dimensions.get('screen')

export default function ApplicantCard(props) {

   return (
      <>
         <Block row style={{ marginVertical: 5 }}>
            <TouchableOpacity>
               <Image
                  source={{
                     uri: 'https://m.media-amazon.com/images/I/71yspNc9hqL._SS500_.jpg',
                     height: 50, width: 50
                  }}
                  style={{ borderRadius: 100, marginTop: 10, marginBottom: 10 }}
               />
            </TouchableOpacity>
            <Block style={{ marginTop: 0, marginLeft: 10, width: 170 }}>
               <Text p>Niki prakoso</Text>
               <Text muted italic>fee: 200.000</Text>
               <Text muted italic>status: pending</Text>
            </Block>
            <Button
               onlyIcon
               icon="attach-money"
               iconFamily="MaterialIcons"
               iconSize={20}
               color="#50C7C7"
               iconColor="#fff"
               style={{ width: 30, height: 30, marginTop: 20,  }} 
               onPress={() => props.navigation.navigate('Barcode Scanner')}
               />
            <Button
               onlyIcon
               icon="close"
               iconFamily="antdesign"
               iconSize={20}
               color="error"
               iconColor="#fff"
               style={{ width: 30, height: 30, marginTop: 20, marginLeft: 5 }} />
            <Button
               onlyIcon
               icon="check"
               iconFamily="antdesign"
               iconSize={20}
               color="#50C7C7"
               iconColor="#fff"
               style={{ width: 30, height: 30, marginTop: 20, marginLeft: 5 }} />
         </Block>
      </>
   )
}

const styles = StyleSheet.create({

})