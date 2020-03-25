import React, { useState } from 'react';
import {
   Platform,
   KeyboardAvoidingView,
   SafeAreaView,
   Dimensions
} from 'react-native'
import {
   Block,
   theme,
   Text
} from 'galio-framework'

import Constants from 'expo-constants';
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../components/Fire'

const { width, height } = Dimensions.get("screen");


export default class Chats extends React.Component {
   state = {
      messages: []
   }

   get user() {
      return {
         _id: Fire.uid,
         name: 'cakra'
      }
   }
   componentDidMount() {
      Fire.shared.on(message =>
         this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
         }))
      );
   }
   componentWillUnmount() {
      Fire.shared.off();
   }
   render() {

      if (Platform.OS === 'android') {
         return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
               <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />
            </KeyboardAvoidingView>
         )
      }
      return <SafeAreaView style={{ flex: 1 }}>{{ chat }}</SafeAreaView>
   }
}
