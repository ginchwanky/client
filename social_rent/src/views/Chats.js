import React from 'react'
import {
   StyleSheet,
   View,
   KeyboardAvoidingView
} from 'react-native'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import firebase from "firebase";
firebase.initializeApp({
   apiKey: "AIzaSyCybwYoMg4L_luem4R64UrZoxk65P1PEfM",
   authDomain: "chatapp-53ae1.firebaseapp.com",
   databaseURL: "https://chatapp-53ae1.firebaseio.com",
   projectId: "chatapp-53ae1",
   storageBucket: "chatapp-53ae1.appspot.com",
   messagingSenderId: "811219355085",
   appId: "1:811219355085:web:5df1437b5bffde4d03b084"
});
export default class Example extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         messages: [],
      }
   }

   componentDidMount() {
      this.setState({
         messages: [
            {
               _id: 112312314214143253252,
               text: 'Hi, can i help you?',
               createdAt: new Date(),
               user: {
                  _id: this.props.route.params.dataPeople.id,
                  name: this.props.route.params.dataPeople.name,
                  avatar: `${this.props.route.params.dataPeople.profilePicture}`,
               },
            },
         ],
      })
      this.loadMsg()
   }
   async loadMsg() {
      let data
      let newArr = []
      await firebase
         .database()
         .ref("/messages/").once("value", function (snapshot) {
            snapshot.forEach(function (child) {
               console.log(child.val());
               newArr.push(child.val())
            })
         });
      var joined = this.state.messages.concat(newArr);
      this.setState({ messages: joined.reverse() })
   }
   onSend(messages = []) {
      this.setState(previousState => ({
         messages: GiftedChat.append(previousState.messages, messages),
      }))
      for (const message of messages) {
         this.saveMessage(message);
      }
   }
   saveMessage(message) {
      return firebase
         .database()
         .ref("/messages/")
         .push(message)
         .catch(function (error) {
            console.error("Error saving message to Database:", error);
         });
   }

   customtInputToolbar (props) {
      return (
         <InputToolbar
            {...props}
            containerStyle={{
               backgroundColor: "white",
               borderTopColor: "#E8E8E8",
               borderTopWidth: 1,
               padding: 8
            }}
         />
      );
   };

   render() {
      return (
         <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
            <GiftedChat
               messages={this.state.messages}
               onSend={messages => this.onSend(messages)}
               // renderInputToolbar={props => this.customtInputToolbar(props)}
               user={{
                  _id: this.props.route.params.dataProfile.id,
                  name: this.props.route.params.dataProfile.name,
                  avatar: `${this.props.route.params.dataProfile.profilePicture}`,
               }}
            />
         </KeyboardAvoidingView>
      )
   }
}

const styles = StyleSheet.create({
   background: {
      backgroundColor: 'white'
   }
})