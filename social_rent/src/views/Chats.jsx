import React from 'react';
import {
   StyleSheet,
   View,
   Dimensions
} from 'react-native'
import {
   Block,
   theme,
   Text
} from 'galio-framework'

import Constants from 'expo-constants';

const { width, height } = Dimensions.get("screen");


export default function Chats(props) {

   return (
      <>
      <View style={styles.statusBar}/>
      <Text muted italic={true} h1>INI PAGE CHATSSSSS</Text>
      </>
   )
}

const styles = StyleSheet.create({
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   }
})