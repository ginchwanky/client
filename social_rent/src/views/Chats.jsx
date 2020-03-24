import React,  { useState, useEffect } from 'react';
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
import { GiftedChat } from 'react-native-gifted-chat'

import Constants from 'expo-constants';

const { width, height } = Dimensions.get("screen");


export default class Example extends React.Component {
   state = {
     messages: [],
   }
 
   componentDidMount() {
     this.setState({
       messages: [
         {
           _id: 1,
           text: 'Hello developer',
           createdAt: new Date(),
           user: {
             _id: 2,
             name: 'React Native',
             avatar: 'https://placeimg.com/140/140/any',
           },
         },
       ],
     })
   }
 
   onSend(messages = []) {
     this.setState(previousState => ({
       messages: GiftedChat.append(previousState.messages, messages),
     }))
   }
 
   render() {
     return (
       <GiftedChat
         messages={this.state.messages}
         onSend={messages => this.onSend(messages)}
         user={{
           _id: 1,
         }}
       />
     )
   }
 }

const styles = StyleSheet.create({
   statusBar: {
      height: Constants.statusBarHeight,
      backgroundColor: '#2E71DC'
   }
})